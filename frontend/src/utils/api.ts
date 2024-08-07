import { MangaRecommendation } from '../Schema/Manga';
import { callApi } from './apiManager';

// Endpoint Variables
const MANGA_RECOMMENDATIONS_ENDPOINT = 'mangaRecommendations';

// Api Fetch Functions
const fetchMangaRecommendations = async (): Promise<MangaRecommendation[]> => {
  return callApi<MangaRecommendation[]>(MANGA_RECOMMENDATIONS_ENDPOINT, {
    method: 'POST', // Specify POST method
    // No body required for this POST request
  });
};


export { fetchMangaRecommendations };