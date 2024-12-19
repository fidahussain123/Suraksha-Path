import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface LocationConfirmationProps {
  address: string;
  onConfirm: () => void;
  onCancel: () => void;
  isSelected: boolean;
}

export function LocationConfirmation({ 
  address, 
  onConfirm, 
  onCancel,
  isSelected 
}: LocationConfirmationProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start space-x-3">
        <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-sm mb-1">Selected Location</h4>
          <p className="text-sm text-gray-600">
            {address || 'Click on the map to select a location'}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={onConfirm}
          disabled={!isSelected}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Confirm Location
        </Button>
      </div>
    </div>
  );
}