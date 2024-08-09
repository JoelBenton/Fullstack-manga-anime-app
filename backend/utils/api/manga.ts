import { ApiResponseData } from "../../schemas/api/jikan/recommendations";
import { callApi } from "../api/apiManager";

async function getMangaRecommendations(): Promise<ApiResponseData> {
    const endpoint = 'recommendations/manga'; 
    return await callApi<ApiResponseData>(endpoint);
}

export { getMangaRecommendations }