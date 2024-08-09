// Importing necessary types and modules
import { getRecommendationsManga } from "../utils/manga/recommendationLogic";
import { getRecommendationsAnime } from "../utils/anime/recommendationLogic";

exports.mangaRecommendations = async (req:any, res:any) => {
  res.send(await getRecommendationsManga());
};

exports.animeRecommendations = async (req:any, res:any) => {
  res.send(await getRecommendationsAnime());
};