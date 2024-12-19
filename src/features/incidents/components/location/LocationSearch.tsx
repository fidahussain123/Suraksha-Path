import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationSearchProps {
  address: string;
  error: string;
  onAddressChange: (address: string) => void;
  onSearch: () => void;
}

export function LocationSearch({ address, error, onAddressChange, onSearch }: LocationSearchProps) {
  return (
    <div className="flex space-x-2">
      <div className="flex-1">
        <input
          type="text"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="Enter location address"
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
      <Button
        type="button"
        onClick={onSearch}
        className="flex items-center space-x-2"
      >
        <Search className="w-4 h-4" />
        <span>Search</span>
      </Button>
    </div>
  );
}