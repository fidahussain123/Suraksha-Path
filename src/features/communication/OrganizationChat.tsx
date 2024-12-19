import React, { useState } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { useChat } from './hooks/useChat';

export function OrganizationChat() {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage.trim();
    setInputMessage('');
    await sendMessage(message);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-sm border border-gray-200">
      <ChatHeader />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput
        message={inputMessage}
        isLoading={isLoading}
        onMessageChange={setInputMessage}
        onSubmit={handleSubmit}
      />
    </div>
  );
}