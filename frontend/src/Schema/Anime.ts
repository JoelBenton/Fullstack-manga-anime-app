export interface AnimeRecommendation {
    title: string;
    url: string;
    image: string;
    content: string;
}

export interface AnimeListProps {
    recommendations: AnimeRecommendation[];
    loading: boolean;
    error: string | null;
  }