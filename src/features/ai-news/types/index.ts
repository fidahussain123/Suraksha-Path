export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  location: string;
  analysis: string;
  googleMapsLink: string;
}

export interface NewsAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  tip: string;
}

export interface ProcessedNewsItem extends Omit<NewsItem, 'analysis'> {
  analysis: NewsAnalysis;
}