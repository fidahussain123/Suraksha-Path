export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  location: string;
  analysis: string;
  googleMapsLink: string;
}

export interface DisasterNewsState {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
}