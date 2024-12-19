import React from 'react';
import { User, Bot } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col space-y-1 max-w-[80%] ${
        message.sender === 'user' ? 'items-end' : 'items-start'
      }`}>
        <div className={`flex items-center space-x-2 ${
          message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
        }`}>
          <div className={`p-2 rounded-full ${
            message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-200'
          }`}>
            {message.sender === 'user' ? (
              <User className="h-4 w-4 text-blue-600" />
            ) : (
              <Bot className="h-4 w-4 text-gray-600" />
            )}
          </div>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
        <div className={`p-3 rounded-lg ${
          message.sender === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-white border border-gray-200'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
}