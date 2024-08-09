import { useState, useEffect } from 'react';
import { fetchMangaRecommendations, fetchAnimeRecommendations } from '../utils/api';
import { MangaRecommendation } from '../Schema/Manga';
import { AnimeRecommendation } from '../Schema/Anime';

const useFetchMangaRecommendations = () => {
  const [recommendations, setRecommendations] = useState<MangaRecommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await fetchMangaRecommendations();
        setRecommendations(data);
      } catch (err) {
        setError('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  return { recommendations, loading, error };
};

const useFetchAnimeRecommendations = () => {
  const [recommendations, setRecommendations] = useState<AnimeRecommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await fetchAnimeRecommendations();
        setRecommendations(data);
      } catch (err) {
        setError('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  return { recommendations, loading, error };
};

export { useFetchMangaRecommendations, useFetchAnimeRecommendations }