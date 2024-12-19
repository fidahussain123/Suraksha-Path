import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';

interface LocationSearchProps {
  onSearch: (disasterId: string) => void;
}

export function LocationSearch({ onSearch }: LocationSearchProps) {
  const [disasterId, setDisasterId] = useState('');
  const { incidents } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (incidents.some(incident => incident.id.slice(0, 8) === disasterId)) {
      onSearch(disasterId);
    } else {
      alert('Please enter a valid Disaster ID');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="absolute top-4 left-4 z-[400] bg-white rounded-lg shadow-lg p-4 w-72">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Disaster ID
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={disasterId}
              onChange={(e) => setDisasterId(e.target.value)}
              placeholder="e.g., abc123de"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Button type="submit" size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}