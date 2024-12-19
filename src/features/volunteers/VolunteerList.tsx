import React from 'react';
import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Star, MapPin, Clock } from 'lucide-react';

export function VolunteerList() {
  const { volunteers } = useStore();

  return (
    <div className="space-y-4">
      {volunteers.map((volunteer, index) => (
        <Card
          key={volunteer.id}
          className="p-4 hover-scale animate-fade-in gradient-border"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">{volunteer.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4" />
                <span>2.5 km away</span>
                <Clock className="w-4 h-4 ml-2" />
                <span>Available Now</span>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">4.8</span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {volunteer.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}