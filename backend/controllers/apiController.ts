// Importing necessary types and modules
import { getRecommendations } from "../utils/manga/recommendationLogic";

exports.mangaRecommendations = async (req:any, res:any) => {
  res.send(await getRecommendations());
};