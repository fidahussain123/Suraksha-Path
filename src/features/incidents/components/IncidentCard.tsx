import React from 'react';
import { Card } from '@/components/ui/card';
import { IncidentHeader } from './IncidentHeader';
import { IncidentActions } from './IncidentActions';
import { IncidentComments } from './IncidentComments';
import { MapPin } from 'lucide-react';
import { useStore } from '@/lib/store';

interface IncidentCardProps {
  incident: any;
  index: number;
}

export function IncidentCard({ incident, index }: IncidentCardProps) {
  const { likeIncident, addComment } = useStore();
  const [showComments, setShowComments] = React.useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card
      className={`hover-scale animate-fade-in ${incident.status === 'resolved' ? 'opacity-75' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-4">
        <IncidentHeader
          title={incident.title}
          id={incident.id}
          status={incident.status}
        />
        
        <div className="mt-2 flex items-center space-x-2">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
            {incident.severity}
          </span>
          {incident.status === 'resolved' && (
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Resolved
            </span>
          )}
        </div>

        <p className="text-gray-600 mt-2">{incident.description}</p>

        {/* Location display */}
        {incident.address && (
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{incident.address}</span>
          </div>
        )}
        
        {incident.photoUrl && (
          <div className="mt-4 relative rounded-lg overflow-hidden">
            <img
              src={incident.photoUrl}
              alt="Incident"
              className="w-full h-48 object-cover rounded-lg hover:opacity-95 transition-opacity cursor-pointer"
              onClick={() => {
                // Open image in new tab for full view
                window.open(incident.photoUrl, '_blank');
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>{new Date(incident.timestamp).toLocaleString()}</span>
          <IncidentActions
            incidentId={incident.id}
            likes={incident.likes}
            commentsCount={incident.comments?.length || 0}
            status={incident.status}
            onLike={() => likeIncident(incident.id)}
            onCommentToggle={() => setShowComments(!showComments)}
            title={incident.title}
            description={incident.description}
          />
        </div>

        {showComments && (
          <div className="mt-4">
            <IncidentComments
              comments={incident.comments}
              onAddComment={(text) => addComment(incident.id, text)}
            />
          </div>
        )}
      </div>
    </Card>
  );
}