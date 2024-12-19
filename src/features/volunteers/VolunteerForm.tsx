import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';

interface VolunteerFormProps {
  onClose?: () => void;
}

export function VolunteerForm({ onClose }: VolunteerFormProps) {
  const { addVolunteer, incidents } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    skills: [] as string[],
    availability: true,
    location: { lat: 0, lng: 0 },
    disasterId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidents.some(incident => incident.id.slice(0, 8) === formData.disasterId)) {
      alert('Please enter a valid Disaster ID');
      return;
    }
    addVolunteer(formData);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Disaster ID</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.disasterId}
          onChange={(e) => setFormData({ ...formData, disasterId: e.target.value })}
          placeholder="Enter the disaster ID you want to help with"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="First Aid, Search and Rescue, etc."
          onChange={(e) => setFormData({
            ...formData,
            skills: e.target.value.split(',').map(skill => skill.trim()),
          })}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="availability"
          checked={formData.availability}
          onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="availability" className="ml-2 block text-sm text-gray-700">
          Available for immediate deployment
        </label>
      </div>

      <Button type="submit" className="w-full">Register as Volunteer</Button>
    </form>
  );
}