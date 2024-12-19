import React from 'react';
import { Button } from '@/components/ui/button';
import { INDIA_CENTER } from '@/lib/constants/india-bounds';

interface MapControlsProps {
  onCenterIndia: () => void;
  onFilterChange: (filter: string) => void;
}

export function MapControls({ onCenterIndia, onFilterChange }: MapControlsProps) {
  return (
    <div className="absolute top-4 right-4 z-[400] bg-white rounded-lg shadow-lg p-2 space-y-2">
      <Button
        size="sm"
        onClick={onCenterIndia}
        className="w-full"
      >
        Center on India
      </Button>
      <select
        onChange={(e) => onFilterChange(e.target.value)}
        className="w-full rounded-lg border-gray-300 text-sm"
      >
        <option value="all">All Incidents</option>
        <option value="high">High Severity</option>
        <option value="active">Active Only</option>
        <option value="recent">Recent (24h)</option>
      </select>
    </div>
  );
}