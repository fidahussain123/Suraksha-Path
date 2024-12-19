import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PhotoUpload } from '@/components/PhotoUpload';
import { LocationInput } from './components/LocationInput';
import { LocationConsent } from './components/LocationConsent';
import { useLocation } from './hooks/useLocation';
import { useStore } from '@/lib/store';
import type { IncidentFormData } from './types';

interface IncidentFormProps {
  onClose?: () => void;
}

export function IncidentForm({ onClose }: IncidentFormProps) {
  const addIncident = useStore((state) => state.addIncident);
  const { location, loading: locationLoading, getCurrentLocation } = useLocation();
  const [showLocationConsent, setShowLocationConsent] = useState(true);
  const [formData, setFormData] = useState<IncidentFormData>({
    title: '',
    description: '',
    location: { lat: 0, lng: 0 },
    address: '',
    photoUrl: '',
    severity: 'medium',
    reporterLocation: null
  });

  const handleLocationConsent = () => {
    getCurrentLocation();
    setShowLocationConsent(false);
  };

  const handleDeclineLocation = () => {
    setShowLocationConsent(false);
  };

  React.useEffect(() => {
    if (location) {
      setFormData(prev => ({
        ...prev,
        reporterLocation: {
          lat: location.latitude,
          lng: location.longitude
        }
      }));
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.location.lat === 0 && formData.location.lng === 0) {
      alert('Please select incident location');
      return;
    }
    
    // Create the incident with all data including the photo
    addIncident({
      ...formData,
      status: 'pending',
      photoUrl: formData.photoUrl || undefined
    });
    
    onClose?.();
  };

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setFormData(prev => ({
      ...prev,
      location: { lat: location.lat, lng: location.lng },
      address: location.address,
    }));
  };

  const handlePhotoSelect = (photoUrl: string, photoLocation?: { lat: number; lng: number }) => {
    setFormData(prev => ({
      ...prev,
      photoUrl,
      ...(photoLocation && { location: photoLocation })
    }));
  };

  return (
    <Card className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6 p-4">
        <div className="flex items-center space-x-2 text-red-500">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Report New Incident</h3>
        </div>

        {showLocationConsent && (
          <LocationConsent
            onAccept={handleLocationConsent}
            onDecline={handleDeclineLocation}
            loading={locationLoading}
          />
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photo Evidence</label>
            <PhotoUpload onPhotoSelect={handlePhotoSelect} />
          </div>

          <LocationInput onLocationSelect={handleLocationSelect} />
          
          {formData.address && (
            <div className="text-sm text-gray-500 italic">
              Selected incident location: {formData.address}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <div className="flex space-x-4">
              {['low', 'medium', 'high'].map((severity) => (
                <button
                  key={severity}
                  type="button"
                  className={`px-4 py-2 rounded-lg capitalize ${
                    formData.severity === severity
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, severity: severity as any }))}
                >
                  {severity}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit Report
        </Button>
      </form>
    </Card>
  );
}