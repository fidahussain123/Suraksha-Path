import { useState } from 'react';
import { isLocationInIndia } from '@/lib/utils/location';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

export function useLocationSearch() {
  const [error, setError] = useState('');

  const searchLocation = async (address: string): Promise<Location | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)},India`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon: lng } = data[0];
        const numLat = parseFloat(lat);
        const numLng = parseFloat(lng);

        if (isLocationInIndia(numLat, numLng)) {
          setError('');
          return {
            lat: numLat,
            lng: numLng,
            address: data[0].display_name
          };
        } else {
          setError('Location must be within India');
        }
      } else {
        setError('Location not found');
      }
    } catch (err) {
      setError('Failed to fetch location');
    }
    return null;
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name;
    } catch (err) {
      console.error('Failed to fetch address:', err);
      return null;
    }
  };

  return {
    error,
    setError,
    searchLocation,
    reverseGeocode
  };
}