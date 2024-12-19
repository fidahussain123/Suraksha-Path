export class ChatServiceError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'ChatServiceError';
  }
}

export function handleChatError(error: unknown): string {
  console.error('Chat service error:', error);
  
  if (error instanceof ChatServiceError) {
    const baseMessage = 'I apologize, but I encountered an issue while processing your request.';
    return `${baseMessage} ${error.message}. Please try again.`;
  }
  
  return 'I apologize, but I encountered an unexpected error. Please try again later.';
}