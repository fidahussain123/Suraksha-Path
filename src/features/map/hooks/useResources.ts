import { useState, useEffect } from 'react';
import type { Resource } from '../types/resources';
import { useStore } from '@/lib/store';

// Dummy data generator for resources
const generateDummyResources = (lat: number, lng: number): Resource[] => {
  return [
    {
      id: '1',
      type: 'food',
      name: 'Emergency Food Supplies',
      quantity: 500,
      unit: 'packets',
      location: { lat: lat + 0.01, lng: lng + 0.01 },
      status: 'available',
      contact: { phone: '+91-9876543210', email: 'food@relief.org' }
    },
    {
      id: '2',
      type: 'water',
      name: 'Drinking Water',
      quantity: 1000,
      unit: 'liters',
      location: { lat: lat - 0.01, lng: lng - 0.01 },
      status: 'low',
      contact: { phone: '+91-9876543211', email: 'water@relief.org' }
    },
    {
      id: '3',
      type: 'shelter',
      name: 'Emergency Shelter',
      quantity: 50,
      unit: 'tents',
      location: { lat: lat + 0.02, lng: lng + 0.02 },
      status: 'available',
      contact: { phone: '+91-9876543212', email: 'shelter@relief.org' }
    },
    {
      id: '4',
      type: 'medical',
      name: 'First Aid Kits',
      quantity: 100,
      unit: 'kits',
      location: { lat: lat - 0.02, lng: lng - 0.02 },
      status: 'critical',
      contact: { phone: '+91-9876543213', email: 'medical@relief.org' }
    },
    {
      id: '5',
      type: 'clothing',
      name: 'Emergency Clothing',
      quantity: 200,
      unit: 'sets',
      location: { lat: lat + 0.015, lng: lng + 0.015 },
      status: 'available',
      contact: { phone: '+91-9876543214', email: 'clothing@relief.org' }
    }
  ];
};

export function useResources(disasterId: string | null) {
  const [resources, setResources] = useState<Resource[]>([]);
  const { incidents } = useStore();

  useEffect(() => {
    if (disasterId) {
      const incident = incidents.find(inc => inc.id.slice(0, 8) === disasterId);
      if (incident) {
        const dummyResources = generateDummyResources(
          incident.location.lat,
          incident.location.lng
        );
        setResources(dummyResources);
      }
    } else {
      setResources([]);
    }
  }, [disasterId, incidents]);

  return { resources };
}