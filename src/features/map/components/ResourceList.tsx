import React, { useState } from 'react';
import { Package, Droplet, Home, Heart, Shirt, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResourceContact } from './ResourceContact';
import type { Resource } from '../types/resources';

interface ResourceListProps {
  resources: Resource[];
}

export function ResourceList({ resources }: ResourceListProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'food':
        return <Package className="w-5 h-5 text-orange-500" />;
      case 'water':
        return <Droplet className="w-5 h-5 text-blue-500" />;
      case 'shelter':
        return <Home className="w-5 h-5 text-purple-500" />;
      case 'medical':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'clothing':
        return <Shirt className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusColor = (status: Resource['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <>
      <div className="absolute right-4 top-20 z-[400] bg-white rounded-lg shadow-lg p-4 w-72 max-h-[calc(100vh-160px)] overflow-y-auto">
        <h3 className="font-semibold mb-4">Available Resources</h3>
        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {getResourceIcon(resource.type)}
                <div className="flex-1">
                  <h4 className="font-medium capitalize">{resource.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-500">
                      {resource.quantity} {resource.unit}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(resource.status)}`}>
                      {resource.status}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-2 flex items-center justify-center space-x-2"
                    onClick={() => setSelectedResource(resource)}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Contact</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedResource && (
        <ResourceContact
          resource={selectedResource}
          isOpen={!!selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}
    </>
  );
}