import { INDIA_BOUNDS } from '../constants/india-bounds';

export const isLocationInIndia = (lat: number, lng: number): boolean => {
  return (
    lat >= INDIA_BOUNDS.south &&
    lat <= INDIA_BOUNDS.north &&
    lng >= INDIA_BOUNDS.west &&
    lng <= INDIA_BOUNDS.east
  );
};