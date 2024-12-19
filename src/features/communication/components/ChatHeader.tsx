import React from 'react';
import { Bot } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-blue-600">
      <div className="flex items-center space-x-2">
        <Bot className="h-6 w-6 text-white" />
        <h2 className="text-lg font-semibold text-white">Emergency Response Assistant</h2>
      </div>
      <p className="text-sm text-blue-100 mt-1">24/7 AI-powered support for emergency coordination</p>
    </div>
  );
}