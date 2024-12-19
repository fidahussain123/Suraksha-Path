import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import { useStore } from '@/lib/store';
import { INDIA_BOUNDS, INDIA_CENTER } from '@/lib/constants/india-bounds';
import { MapControls } from './components/MapControls';
import { LocationSearch } from './components/LocationSearch';
import { ResourceList } from './components/ResourceList';
import { useResources } from './hooks/useResources';
import 'leaflet/dist/leaflet.css';

function MapController({ center, zoom }: { center?: [number, number]; zoom?: number }) {
  const map = useMap();

  useEffect(() => {
    map.setMaxBounds([
      [INDIA_BOUNDS.south, INDIA_BOUNDS.west],
      [INDIA_BOUNDS.north, INDIA_BOUNDS.east],
    ]);
  }, [map]);

  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);

  return null;
}

export function IncidentMap() {
  const incidents = useStore((state) => state.incidents);
  const [filter, setFilter] = useState('all');
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);
  const { resources } = useResources(selectedDisaster);

  const handleDisasterSearch = (disasterId: string) => {
    const incident = incidents.find(inc => inc.id.slice(0, 8) === disasterId);
    if (incident) {
      setSelectedDisaster(disasterId);
    }
  };

  const selectedIncident = selectedDisaster 
    ? incidents.find(inc => inc.id.slice(0, 8) === selectedDisaster)
    : null;

  const filteredIncidents = incidents.filter((incident) => {
    if (selectedDisaster) {
      return incident.id.slice(0, 8) === selectedDisaster;
    }
    switch (filter) {
      case 'high':
        return incident.severity === 'high';
      case 'active':
        return incident.status !== 'resolved';
      case 'recent':
        const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
        return incident.timestamp > dayAgo;
      default:
        return true;
    }
  });

  return (
    <div className="relative h-[600px] rounded-lg overflow-hidden">
      <MapContainer
        center={[INDIA_CENTER.lat, INDIA_CENTER.lng]}
        zoom={5}
        className="h-full w-full"
        minZoom={4}
      >
        <MapController
          center={selectedIncident ? [selectedIncident.location.lat, selectedIncident.location.lng] : undefined}
          zoom={selectedIncident ? 12 : undefined}
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {filteredIncidents.map((incident) => (
          <Marker key={incident.id} position={[incident.location.lat, incident.location.lng]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-medium">{incident.title}</h3>
                <p className="text-sm mt-1">{incident.description}</p>
                <div className="mt-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    incident.severity === 'high' ? 'bg-red-100 text-red-800' :
                    incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {incident.severity}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedIncident && (
          <Circle
            center={[selectedIncident.location.lat, selectedIncident.location.lng]}
            radius={5000}
            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
          />
        )}

        {resources.map((resource) => (
          <Marker
            key={resource.id}
            position={[resource.location.lat, resource.location.lng]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium">{resource.name}</h3>
                <p className="text-sm mt-1">
                  {resource.quantity} {resource.unit}
                </p>
                <span className={`inline-block px-2 py-1 mt-2 rounded-full text-xs font-medium ${
                  resource.status === 'available' ? 'bg-green-100 text-green-800' :
                  resource.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {resource.status}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <LocationSearch onSearch={handleDisasterSearch} />
      <MapControls
        onCenterIndia={() => setSelectedDisaster(null)}
        onFilterChange={setFilter}
      />
      {selectedDisaster && <ResourceList resources={resources} />}
    </div>
  );
}