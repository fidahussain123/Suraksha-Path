import React from 'react';
import { useStore } from '@/lib/store';
import { IncidentCard } from './components/IncidentCard';

export function IncidentList() {
  const incidents = useStore((state) => state.incidents);

  return (
    <div className="space-y-4">
      {incidents.map((incident, index) => (
        <IncidentCard
          key={incident.id}
          incident={incident}
          index={index}
        />
      ))}
    </div>
  );
}