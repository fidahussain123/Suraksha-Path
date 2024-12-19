import React, { useState } from 'react';
import { Upload, X, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { useLocation } from '@/features/incidents/hooks/useLocation';

interface PhotoUploadProps {
  onPhotoSelect: (photoUrl: string, location?: { lat: number; lng: number }) => void;
}

export function PhotoUpload({ onPhotoSelect }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { location, loading, error, getCurrentLocation } = useLocation();
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onPhotoSelect(result); // Send the base64 string immediately
        setShowLocationPrompt(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationConsent = async () => {
    await getCurrentLocation();
    if (preview && location) {
      onPhotoSelect(preview, { lat: location.latitude, lng: location.longitude });
    }
    setShowLocationPrompt(false);
  };

  const handleSkipLocation = () => {
    setShowLocationPrompt(false);
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    onPhotoSelect('');
    setShowLocationPrompt(false);
  };

  return (
    <div className="relative">
      {showLocationPrompt && preview && (
        <div className="absolute inset-0 z-10 bg-white bg-opacity-90 rounded-lg p-4">
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <MapPin className="w-8 h-8 text-blue-500" />
            <h3 className="text-lg font-medium text-center">Add Location to Photo?</h3>
            <p className="text-sm text-gray-600 text-center">
              Adding location helps emergency responders better understand the situation
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={handleLocationConsent}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {loading ? 'Getting Location...' : 'Add Location'}
              </Button>
              <Button variant="outline" onClick={handleSkipLocation}>
                Skip
              </Button>
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </div>
        </div>
      )}

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={handleRemovePhoto}
            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="block">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">Click or drag photo to upload</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}