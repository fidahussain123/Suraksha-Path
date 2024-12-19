import { useState, useCallback } from 'react';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

export function useShare() {
  const [error, setError] = useState<string | null>(null);

  const shareContent = useCallback(async (data: ShareData) => {
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        // Fallback for browsers that don't support the Web Share API
        const shareText = `${data.title}\n\n${data.text}\n\n${data.url}`;
        await navigator.clipboard.writeText(shareText);
        alert('Content copied to clipboard!');
      }
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error('Sharing failed:', err);
    }
  }, []);

  return { shareContent, error };
}