export interface Location {
  lat: number;
  lng: number;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  location: Location;
  photoUrl?: string;
  timestamp: number;
  status: 'pending' | 'inProgress' | 'resolved';
  severity: 'low' | 'medium' | 'high';
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  timestamp: number;
  userId?: string;
}

export interface IncidentFormData {
  title: string;
  description: string;
  location: Location;
  address: string;
  photoUrl?: string;
  severity: 'low' | 'medium' | 'high';
  reporterLocation: Location | null;
}