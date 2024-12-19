import React from 'react';
import { ExternalLink, MapPin, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ProcessedNewsItem } from '../types';

interface NewsCardProps {
  news: ProcessedNewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{news.title}</CardTitle>
          <Badge 
            variant={
              news.analysis.sentiment === 'positive' ? 'success' :
              news.analysis.sentiment === 'negative' ? 'error' : 'default'
            }
            className="flex items-center gap-1"
          >
            {news.analysis.sentiment === 'positive' ? <ThumbsUp className="w-4 h-4" /> :
             news.analysis.sentiment === 'negative' ? <ThumbsDown className="w-4 h-4" /> :
             <AlertCircle className="w-4 h-4" />}
            {news.analysis.sentiment}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <a
              href={news.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              {news.location}
            </a>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-yellow-800">
              Safety Tip: {news.analysis.tip}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Published: {new Date(news.pubDate).toLocaleString()}
        </span>
        <a
          href={news.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          Read More <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </CardFooter>
    </Card>
  );
}