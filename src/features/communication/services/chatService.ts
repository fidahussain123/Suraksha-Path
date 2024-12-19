import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatServiceError } from '../utils/errorHandling';
import type { ChatConfig } from '../types';

const API_KEY = import.meta.env.VITE_GOOGLE_AI_KEY || 'AIzaSyAWjI_0zrCRkR5Iq1xiep26QxaPfzaLaIY';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getChatResponse(message: string, config: ChatConfig): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: config.model });

    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: config.maxTokens,
        temperature: config.temperature,
        topP: config.topP,
        topK: config.topK,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    });

    // Send the system prompt first to establish context
    const result = await chat.sendMessage(`${config.systemPrompt}\n\nUser message: ${message}`);
    const response = await result.response;
    
    const text = response.text();
    if (!text) {
      throw new ChatServiceError('Empty response from AI service');
    }

    return text;
  } catch (error) {
    console.error('Chat service error:', error);
    if (error instanceof ChatServiceError) {
      throw error;
    }
    throw new ChatServiceError('Failed to get response from AI service. Please try again.');
  }
}