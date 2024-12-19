import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isLocationInIndia } from './utils/location';
import type { Incident } from '@/features/incidents/types';

interface DisasterStore {
  incidents: Incident[];
  volunteers: any[];
  addIncident: (incident: Omit<Incident, 'id' | 'timestamp' | 'likes' | 'comments'>) => string;
  updateIncidentStatus: (id: string, status: Incident['status']) => void;
  addVolunteer: (volunteer: any) => void;
  updateVolunteerAvailability: (id: string, availability: boolean) => void;
  likeIncident: (id: string) => void;
  addComment: (id: string, text: string) => void;
}

export const useStore = create<DisasterStore>()(
  persist(
    (set) => ({
      incidents: [],
      volunteers: [],
      addIncident: (incident) => {
        if (!isLocationInIndia(incident.location.lat, incident.location.lng)) {
          alert('Location must be within India');
          return '';
        }
        const id = crypto.randomUUID();
        set((state) => ({
          incidents: [
            {
              ...incident,
              id,
              timestamp: Date.now(),
              likes: [],
              comments: [],
            },
            ...state.incidents,
          ],
        }));
        alert(`Incident reported successfully! Your Disaster ID is: ${id.slice(0, 8)}`);
        return id;
      },
      updateIncidentStatus: (id, status) =>
        set((state) => ({
          incidents: state.incidents.map((incident) =>
            incident.id === id ? { ...incident, status } : incident
          ),
        })),
      addVolunteer: (volunteer) =>
        set((state) => ({
          volunteers: [
            ...state.volunteers,
            {
              ...volunteer,
              id: crypto.randomUUID(),
            },
          ],
        })),
      updateVolunteerAvailability: (id, availability) =>
        set((state) => ({
          volunteers: state.volunteers.map((volunteer) =>
            volunteer.id === id ? { ...volunteer, availability } : volunteer
          ),
        })),
      likeIncident: (id) =>
        set((state) => ({
          incidents: state.incidents.map((incident) =>
            incident.id === id
              ? {
                  ...incident,
                  likes: incident.likes.includes('user')
                    ? incident.likes.filter((userId) => userId !== 'user')
                    : [...incident.likes, 'user'],
                }
              : incident
          ),
        })),
      addComment: (id, text) =>
        set((state) => ({
          incidents: state.incidents.map((incident) =>
            incident.id === id
              ? {
                  ...incident,
                  comments: [
                    ...incident.comments,
                    { 
                      id: crypto.randomUUID(),
                      text, 
                      timestamp: Date.now(), 
                      userId: 'user' 
                    },
                  ],
                }
              : incident
          ),
        })),
    }),
    {
      name: 'disaster-response-storage',
    }
  )
);