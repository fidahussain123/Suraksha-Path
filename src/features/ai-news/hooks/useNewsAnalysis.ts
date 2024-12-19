import { analyzeNews } from '../services/newsAnalysis';
import type { NewsAnalysis } from '../types';

export async function analyzeNewsWithGroq(content: string): Promise<NewsAnalysis> {
  try {
    return await analyzeNews(content);
  } catch (error) {
    console.warn('News analysis failed:', error);
    // Return a neutral fallback response instead of throwing
    return {
      sentiment: 'neutral',
      tip: 'Stay alert and follow local authorities\' guidance'
    };
  }
}