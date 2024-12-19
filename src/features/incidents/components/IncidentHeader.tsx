import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface IncidentHeaderProps {
  title: string;
  id: string;
  status: string;
}

export function IncidentHeader({ title, id, status }: IncidentHeaderProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'inProgress':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-500">ID: {id.slice(0, 8)}</p>
      </div>
      {getStatusIcon(status)}
    </div>
  );
}