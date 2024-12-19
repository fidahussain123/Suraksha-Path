import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Resource } from '../types/resources';

interface ResourceContactProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
}

export function ResourceContact({ resource, isOpen, onClose }: ResourceContactProps) {
  const handleCall = () => {
    window.location.href = `tel:${resource.contact.phone}`;
  };

  const handleChat = () => {
    // In a real app, this would open a chat interface
    alert('Chat functionality would be implemented here');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Resource Center</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">{resource.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {resource.quantity} {resource.unit} available
            </p>
            <div className="mt-2">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                resource.status === 'available' ? 'bg-green-100 text-green-800' :
                resource.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {resource.status}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleCall}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleChat}
              className="w-full flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Chat</span>
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Available 24/7 for emergency assistance
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}