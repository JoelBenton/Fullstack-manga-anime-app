import { MangaRecommendation } from '../Schema/Manga';
import { AnimeRecommendation } from '../Schema/Anime';
import { callApi } from './apiManager';

// Endpoint Variables
const MANGA_RECOMMENDATIONS_ENDPOINT = 'mangaRecommendations';
const ANIME_RECOMMENDATIONS_ENDPOINT = 'animeRecommendations';

// Api Fetch Functions
const fetchMangaRecommendations = async (): Promise<MangaRecommendation[]> => {
  return callApi<MangaRecommendation[]>(MANGA_RECOMMENDATIONS_ENDPOINT, {
    method: 'POST', // Specify POST method
    // No body required for this POST request
  });
};

const fetchAnimeRecommendations = async (): Promise<AnimeRecommendation[]> => {
  return callApi<AnimeRecommendation[]>(ANIME_RECOMMENDATIONS_ENDPOINT, {
    method: 'POST', // Specify POST method
    // No body required for this POST request
  });
};


export { fetchMangaRecommendations, fetchAnimeRecommendations };