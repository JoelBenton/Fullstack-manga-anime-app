export interface MangaRecommendation {
    title: string;
    url: string;
    image: string;
    content: string;
}

export interface MangaListProps {
    recommendations: MangaRecommendation[];
    loading: boolean;
    error: string | null;
  }