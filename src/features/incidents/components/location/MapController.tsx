import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapControllerProps {
  center?: [number, number];
}

export function MapController({ center }: MapControllerProps) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [map, center]);
  
  return null;
}