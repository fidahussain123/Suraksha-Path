import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { MapController } from './MapController';
import 'leaflet/dist/leaflet.css';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface LocationMapProps {
  position: [number, number];
  onLocationSelect: (e: L.LeafletMouseEvent) => void;
}

export function LocationMap({ position, onLocationSelect }: LocationMapProps) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      className="h-full w-full"
      onClick={onLocationSelect}
    >
      <MapController center={position} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker 
        position={position}
        icon={icon}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const position = marker.getLatLng();
            onLocationSelect({ latlng: position } as L.LeafletMouseEvent);
          },
        }}
      />
    </MapContainer>
  );
}