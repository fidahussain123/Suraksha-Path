export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatConfig {
  systemPrompt: string;
  model: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  topK: number;
}