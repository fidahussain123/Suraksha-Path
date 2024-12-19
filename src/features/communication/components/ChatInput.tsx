import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  message: string;
  isLoading: boolean;
  onMessageChange: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({ message, isLoading, onMessageChange, onSubmit }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t bg-white">
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !message.trim()}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        For immediate emergency assistance, please call 112 or your local emergency number.
      </p>
    </form>
  );
}