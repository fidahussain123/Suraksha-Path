import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center h-64 text-red-500">
      <AlertTriangle className="w-6 h-6 mr-2" />
      <span>{message}</span>
    </div>
  );
}