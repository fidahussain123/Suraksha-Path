import { API_CONFIG } from '../config/apiConfig';
import { ChatServiceError } from '../utils/errorHandling';
import type { ChatRequestBody, ChatResponse } from '../types/api';

export async function makeApiRequest(body: ChatRequestBody): Promise<ChatResponse> {
  try {
    const response = await fetch(API_CONFIG.GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new ChatServiceError(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices) {
      throw new ChatServiceError('Invalid API response format');
    }

    return data;
  } catch (error) {
    if (error instanceof ChatServiceError) {
      throw error;
    }
    throw new ChatServiceError('Failed to make API request', error);
  }
}