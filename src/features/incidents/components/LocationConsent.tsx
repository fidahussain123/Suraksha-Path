import React from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationConsentProps {
  onAccept: () => void;
  onDecline: () => void;
  loading: boolean;
}

export function LocationConsent({ onAccept, onDecline, loading }: LocationConsentProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <MapPin className="w-5 h-5 text-blue-500 mt-1" />
        <div className="flex-1">
          <h3 className="font-medium text-blue-900">Share Your Current Location</h3>
          <p className="text-sm text-blue-700 mt-1">
            Sharing your current location helps emergency responders reach you faster.
            This information will only be used for emergency response purposes.
          </p>
          
          {loading ? (
            <div className="flex items-center space-x-2 mt-4 text-blue-700">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></span>
              <span>Getting location...</span>
            </div>
          ) : (
            <div className="flex space-x-3 mt-4">
              <Button
                size="sm"
                onClick={onAccept}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Share Location
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onDecline}
                className="text-blue-700 border-blue-300 hover:bg-blue-100"
              >
                No, thanks
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}