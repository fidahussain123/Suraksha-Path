import { useState, useEffect } from 'react';
import { analyzeNewsWithGroq } from './useNewsAnalysis';
import { extractLocation } from '../utils/location';
import { NEWS_REFRESH_INTERVAL } from '../config';
import type { ProcessedNewsItem } from '../types';

export function useNews() {
  const [news, setNews] = useState<ProcessedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisasterNews = async () => {
      try {
        // Use a CORS proxy to handle the news feed
        const response = await fetch(
          "https://api.allorigins.win/raw?url=" + encodeURIComponent(
            "https://news.google.com/rss/search?q=disaster+India&hl=en-IN&gl=IN&ceid=IN:en"
          ),
          {
            headers: {
              'Accept': 'application/xml'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const xmlText = await response.text();
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
        // Check for parsing errors
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
          throw new Error('Failed to parse XML feed');
        }

        const items = xmlDoc.querySelectorAll("item");
        
        const newsItems = await Promise.all(Array.from(items).slice(0, 10).map(async (item) => {
          try {
            const title = item.querySelector("title")?.textContent || "";
            const link = item.querySelector("link")?.textContent || "";
            const pubDate = item.querySelector("pubDate")?.textContent || "";
            
            if (title.toLowerCase().includes("disaster") || title.toLowerCase().includes("emergency")) {
              const location = extractLocation(title);
              const googleMapsLink = `https://www.google.com/maps/search/${encodeURIComponent(location)}`;
              const analysis = await analyzeNewsWithGroq(title);
              
              return {
                title,
                link,
                pubDate,
                location,
                googleMapsLink,
                analysis
              };
            }
          } catch (itemError) {
            console.warn('Error processing news item:', itemError);
            return null;
          }
          return null;
        }));
        
        const validNewsItems = newsItems.filter((item): item is ProcessedNewsItem => item !== null);
        
        if (validNewsItems.length === 0) {
          throw new Error('No valid news items found');
        }

        setNews(validNewsItems);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Unable to fetch news updates. Please try again later.');
        // Keep existing news items if available
        setNews(prev => prev.length > 0 ? prev : []);
      } finally {
        setLoading(false);
      }
    };

    fetchDisasterNews();
    const interval = setInterval(fetchDisasterNews, NEWS_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { news, loading, error };
}