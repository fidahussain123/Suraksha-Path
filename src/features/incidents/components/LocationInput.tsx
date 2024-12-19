import React, { useState } from 'react';
import { INDIA_CENTER } from '@/lib/constants/india-bounds';
import { isLocationInIndia } from '@/lib/utils/location';
import { LocationSearch } from './location/LocationSearch';
import { LocationMap } from './location/LocationMap';
import { LocationConfirmation } from './location/LocationConfirmation';
import { useLocationSearch } from './location/useLocationSearch';

interface LocationInputProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

export function LocationInput({ onLocationSelect }: LocationInputProps) {
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([INDIA_CENTER.lat, INDIA_CENTER.lng]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const { error, setError, searchLocation, reverseGeocode } = useLocationSearch();

  const handleLocationSearch = async () => {
    const location = await searchLocation(address);
    if (location) {
      setMarkerPosition([location.lat, location.lng]);
      setSelectedAddress(location.address);
      setShowMap(true);
    }
  };

  const handleMapClick = async (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    
    if (isLocationInIndia(lat, lng)) {
      setMarkerPosition([lat, lng]);
      const address = await reverseGeocode(lat, lng);
      if (address) {
        setSelectedAddress(address);
      }
      setError('');
    } else {
      setError('Selected location must be within India');
    }
  };

  const handleConfirmLocation = () => {
    onLocationSelect({
      lat: markerPosition[0],
      lng: markerPosition[1],
      address: selectedAddress
    });
    setShowMap(false);
  };

  return (
    <div className="space-y-4">
      <LocationSearch
        address={address}
        error={error}
        onAddressChange={setAddress}
        onSearch={handleLocationSearch}
      />

      {showMap && (
        <div className="space-y-4">
          <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200">
            <LocationMap
              position={markerPosition}
              onLocationSelect={handleMapClick}
            />
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <LocationConfirmation
              address={selectedAddress}
              onConfirm={handleConfirmLocation}
              onCancel={() => setShowMap(false)}
              isSelected={!!selectedAddress}
            />
          </div>
        </div>
      )}
    </div>
  );
}