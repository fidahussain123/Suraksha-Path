import { useState, useCallback } from 'react';
import { getChatResponse } from '../services/chatService';
import { CHAT_CONFIG } from '../config/chatConfig';
import type { Message } from '../types';
import { handleChatError } from '../utils/errorHandling';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: "Hello! I'm your Emergency Response Assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: Omit<Message, 'id'>) => {
    setMessages(prev => [...prev, { ...message, id: crypto.randomUUID() }]);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    try {
      setIsLoading(true);

      // Add user message
      addMessage({
        content: content.trim(),
        sender: 'user',
        timestamp: new Date()
      });

      // Get AI response
      const response = await getChatResponse(content, CHAT_CONFIG);
      
      // Add bot response
      addMessage({
        content: response,
        sender: 'bot',
        timestamp: new Date()
      });
    } catch (error) {
      const errorMessage = handleChatError(error);
      
      // Add error message
      addMessage({
        content: errorMessage,
        sender: 'bot',
        timestamp: new Date()
      });
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  return {
    messages,
    isLoading,
    sendMessage
  };
}