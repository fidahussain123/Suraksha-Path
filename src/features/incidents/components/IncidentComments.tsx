import React from 'react';
import { Button } from '@/components/ui/button';

interface Comment {
  text: string;
  timestamp: number;
  userId?: string;
}

interface IncidentCommentsProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
}

export function IncidentComments({ comments, onAddComment }: IncidentCommentsProps) {
  const [newComment, setNewComment] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="border-t pt-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button type="submit" size="sm">Post</Button>
        </form>
      </div>
      {comments.map((comment, i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm">{comment.text}</p>
          <span className="text-xs text-gray-500">
            {new Date(comment.timestamp).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}