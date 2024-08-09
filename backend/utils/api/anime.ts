import { ApiResponseData } from "../../schemas/api/jikan/recommendations";
import { callApi } from "./apiManager";

async function getAnimeRecommendations(): Promise<ApiResponseData> {
    const endpoint = 'recommendations/anime'; 
    return await callApi<ApiResponseData>(endpoint);
}

export { getAnimeRecommendations }