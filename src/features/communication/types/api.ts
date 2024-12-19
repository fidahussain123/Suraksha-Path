export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatRequestBody {
  model: string;
  messages: ChatMessage[];
  temperature: number;
  max_tokens: number;
  top_p: number;
  top_k: number;
}

export interface ChatResponse {
  choices: Array<{
    message?: {
      content: string;
    };
  }>;
  error?: {
    message: string;
    type: string;
  };
}

export type ChatResult = {
  success: boolean;
  message: string;
  error?: string;
};