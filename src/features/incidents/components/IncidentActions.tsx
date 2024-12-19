import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShare } from '@/hooks/useShare';
import { useStore } from '@/lib/store';
import { SOSDialog } from './SOSDialog';

interface IncidentActionsProps {
  incidentId: string;
  likes: string[];
  commentsCount: number;
  status: string;
  onLike: () => void;
  onCommentToggle: () => void;
  title: string;
  description: string;
}

export function IncidentActions({
  incidentId,
  likes,
  commentsCount,
  status,
  onLike,
  onCommentToggle,
  title,
  description
}: IncidentActionsProps) {
  const [showSOSDialog, setShowSOSDialog] = useState(false);
  const { shareContent } = useShare();
  const updateIncidentStatus = useStore(state => state.updateIncidentStatus);

  const handleShare = async () => {
    await shareContent({
      title,
      text: description,
      url: window.location.href
    });
  };

  const handleResolve = () => {
    updateIncidentStatus(incidentId, 'resolved');
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLike}
          className="flex items-center space-x-1"
        >
          <ThumbsUp className={`w-4 h-4 ${likes.length ? 'text-blue-500' : ''}`} />
          <span>{likes.length || 0}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCommentToggle}
          className="flex items-center space-x-1"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{commentsCount}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowSOSDialog(true)}
          className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white animate-pulse"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>SOS EMERGENCY</span>
        </Button>
        {status !== 'resolved' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleResolve}
            className="flex items-center space-x-1 text-green-600 hover:text-green-700"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Resolve</span>
          </Button>
        )}
      </div>

      <SOSDialog
        isOpen={showSOSDialog}
        onClose={() => setShowSOSDialog(false)}
        incidentType={title}
        location={description}
      />
    </>
  );
}