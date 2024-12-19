import { GROQ_API_KEY } from '../config';
import { NewsAnalysis } from '../types';

// Rate limiting configuration
const RATE_LIMIT = 2; // requests per second
const QUEUE_TIMEOUT = 5000; // 5 seconds
let lastRequestTime = 0;
const requestQueue: (() => void)[] = [];

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const processQueue = async () => {
  if (requestQueue.length > 0) {
    const nextRequest = requestQueue.shift();
    if (nextRequest) {
      nextRequest();
    }
  }
};

const enforceRateLimit = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  const timeToWait = Math.max(0, (1000 / RATE_LIMIT) - timeSinceLastRequest);
  
  if (timeToWait > 0) {
    await wait(timeToWait);
  }
  
  lastRequestTime = Date.now();
};

export async function analyzeNews(content: string): Promise<NewsAnalysis> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Analysis request timed out'));
    }, QUEUE_TIMEOUT);

    const executeRequest = async () => {
      try {
        await enforceRateLimit();

        const response = await fetch('https://api.groq.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: "mixtral-8x7b-32768",
            messages: [{
              role: "system",
              content: "You are a disaster news analyst. Analyze news content and provide a sentiment (positive/negative/neutral) and a relevant safety tip."
            }, {
              role: "user",
              content
            }],
            temperature: 0.7,
            max_tokens: 150
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.choices?.[0]?.message?.content) {
          throw new Error('Invalid API response format');
        }

        const analysisText = data.choices[0].message.content;
        
        // Parse the response into structured format
        const sentiment = analysisText.toLowerCase().includes('positive') ? 'positive' :
                         analysisText.toLowerCase().includes('negative') ? 'negative' : 'neutral';
        
        const tipMatch = analysisText.match(/tip:?\s*(.*)/i);
        const tip = tipMatch?.[1]?.trim() || 'Stay alert and follow local authorities\' guidance';

        clearTimeout(timeoutId);
        resolve({ sentiment, tip });

      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      } finally {
        processQueue();
      }
    };

    requestQueue.push(executeRequest);
    if (requestQueue.length === 1) {
      executeRequest();
    }
  });
}