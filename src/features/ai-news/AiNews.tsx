import React from 'react';
import { Cpu, AlertTriangle } from 'lucide-react';
import { NewsCard } from './components/NewsCard';
import { useDisasterNews } from './hooks/useDisasterNews';

export function AiNews() {
  const { news, loading, error } = useDisasterNews();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <AlertTriangle className="w-6 h-6 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Cpu className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold gradient-text">AI-Powered Disaster Insights</h2>
        </div>
        <span className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </span>
      </div>

      <p className="text-gray-600">
        Real-time disaster news analysis powered by AI, providing critical updates and safety recommendations.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {news.map((item, index) => (
          <NewsCard key={index} news={item} index={index} />
        ))}
      </div>
    </div>
  );
}