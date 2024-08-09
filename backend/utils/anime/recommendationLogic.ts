import { ApiResponseData } from "../../schemas/api/jikan/recommendations";
import { AnimeRecommendation } from "../../schemas/db/anime-recommendations";
import { getAnimeRecommendations } from "../api/anime";
import { getRecommendationsMetaFromDb, updateRecommendationsInDb, updateRecommendationsMetaInDb, getRecommendationsFromDb, transformToAnimeRecommendations} from "./recommendationUtils";

async function getRecommendationsAnime(): Promise<AnimeRecommendation[]> {
  const meta = await getRecommendationsMetaFromDb();

  const shouldUpdate = isUpdateNeeded(meta.lastUpdatedDate);

  if (shouldUpdate) {
    // Fetch new data from API
    const newRecommendations: ApiResponseData = await getAnimeRecommendations();

    const formattedRecommendations: AnimeRecommendation[] = transformToAnimeRecommendations(newRecommendations)
    // Update database with new recommendations
    await updateRecommendationsInDb(formattedRecommendations);
    // Update the last updated timestamp
    const newTimestamp = new Date();
    await updateRecommendationsMetaInDb({ lastUpdatedDate: newTimestamp });
    // Return new data
    return formattedRecommendations;
  } else {
    // Return cached data
    console.log('No Recommendation Update Required')
    return await getRecommendationsFromDb();
  }
}

function isUpdateNeeded(lastUpdatedDate: Date): boolean {
  const oneDayInMs = 24 * 60 * 60 * 1000; // Milliseconds in a day
  const now = new Date();
  return (now.getTime() - lastUpdatedDate.getTime()) > oneDayInMs;
}

export { getRecommendationsAnime }