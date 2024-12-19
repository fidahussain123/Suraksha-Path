import { LOCATIONS } from '../config';

export function extractLocation(title: string): string {
  for (const location of LOCATIONS) {
    if (title.toLowerCase().includes(location.toLowerCase())) {
      return location;
    }
  }
  return "Unknown Location";
}