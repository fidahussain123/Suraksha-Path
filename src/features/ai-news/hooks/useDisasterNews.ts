import { useState, useEffect } from 'react';
import type { NewsItem, DisasterNewsState } from '../types';

// Simulated API call since we can't run Python in the browser
const fetchDisasterNews = async (): Promise<NewsItem[]> => {
  // This is a mock implementation
  return [
    {
      title: "Heavy Flooding Reported in Kerala's Coastal Areas",
      link: "https://example.com/news/1",
      pubDate: new Date().toISOString(),
      location: "Kerala",
      analysis: "🔴 Negative: Severe flooding affecting coastal communities. Safety tip: Move to higher ground and follow local evacuation orders.",
      googleMapsLink: "https://www.google.com/maps/search/Kerala"
    },
    {
      title: "Earthquake Alert System Successfully Prevents Casualties in Gujarat",
      link: "https://example.com/news/2",
      pubDate: new Date(Date.now() - 86400000).toISOString(),
      location: "Gujarat",
      analysis: "✅ Positive: Early warning system proved effective. Safety tip: Keep emergency supplies ready and know your evacuation routes.",
      googleMapsLink: "https://www.google.com/maps/search/Gujarat"
    },
    {
      title: "Landslide Warning Issued for Uttarakhand Hills",
      link: "https://example.com/news/3",
      pubDate: new Date(Date.now() - 172800000).toISOString(),
      location: "Uttarakhand",
      analysis: "⚠️ Warning: High risk of landslides in hilly regions. Safety tip: Avoid travel in affected areas and stay tuned to local updates.",
      googleMapsLink: "https://www.google.com/maps/search/Uttarakhand"
    }
  ];
};

export function useDisasterNews(): DisasterNewsState {
  const [state, setState] = useState<DisasterNewsState>({
    news: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchDisasterNews();
        setState({
          news: data,
          loading: false,
          error: null
        });
      } catch (error) {
        setState({
          news: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch news'
        });
      }
    };

    loadNews();
  }, []);

  return state;
}