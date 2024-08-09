import { ApiResponseData, Recommendation, Entry } from "../../schemas/api/jikan/recommendations";
import { AnimeRecommendation, AnimeRecommendationsMeta } from "../../schemas/db/anime-recommendations";
import { getConnection, query } from '../../config/dbConfig';
import { PoolConnection } from 'mysql2/promise';

/*
Methods For Managing Anime Recommendations Metadata (Database).
*/

async function getRecommendationsMetaFromDb(): Promise<AnimeRecommendationsMeta> {
    let connection: PoolConnection | undefined;
    try {
        // Get a connection from the pool
        connection = await getConnection();
        
        // Execute the query
        const [rows] = await query(connection, 'SELECT last_updated_date FROM anime_recommendations_meta WHERE id = 1');
        const row = rows[0] as { last_updated_date: Date };
        
        // Return the data as AnimeRecommendationsMeta
        return { lastUpdatedDate: new Date(row.last_updated_date) };
    } catch (error) {
        console.error('Error fetching recommendations meta:', error);
        throw error; // Re-throw the error to be handled by the caller
    } finally {
        // Release the connection back to the pool
        if (connection) {
            await connection.release(); // Release the connection properly
        }
    }
}

async function updateRecommendationsMetaInDb(meta: AnimeRecommendationsMeta): Promise<void> {
    let connection: PoolConnection | undefined;
    try {
        // Get a connection from the pool
        connection = await getConnection();

        // Execute the query
        await query(connection, 'UPDATE anime_recommendations_meta SET last_updated_date = ? WHERE id = 1', [meta.lastUpdatedDate]);
    } catch (error) {
        // Handle error and log it
        console.error('Error updating recommendations meta:', error);
        throw error; // Re-throw the error to be handled by the caller
    } finally {
        // Release the connection back to the pool
        if (connection) {
            await connection.release(); // Release the connection properly
        }
    }
}

/*
Methods For Managing Recommendations Data (Database)
*/

async function getRecommendationsFromDb(): Promise<AnimeRecommendation[]> {
    let connection: PoolConnection | undefined;
    try {
        // Get a connection from the pool
        connection = await getConnection();

        // Execute the query
        const [rows] = await query(connection, 'SELECT title, url, image, content FROM anime_recommendations');
        
        // Cast and return the data as AnimeRecommendation[]
        return rows as AnimeRecommendation[];
    } catch (error) {
        // Handle the error and log it
        console.error('Error fetching recommendations data:', error);
        throw error; // Re-throw the error to be handled by the caller
    } finally {
        // Release the connection back to the pool
        if (connection) {
            await connection.release(); // Release the connection properly
        }
    }
}

async function updateRecommendationsInDb(recommendations: AnimeRecommendation[]): Promise<void> {
    let connection: PoolConnection | undefined;
    try {
        // Get a connection from the pool
        connection = await getConnection();
        
        // Clear existing recommendations
        await query(connection, 'TRUNCATE TABLE anime_recommendations');
          
        // Insert new recommendations
        const insertQuery = 'INSERT INTO anime_recommendations (title, url, image, content) VALUES ?';
        const uniqueRecommendations = removeDuplicates(recommendations);
        const values = uniqueRecommendations.map(rec => [rec.title, rec.url, rec.image, rec.content]);
        await query(connection, insertQuery, [values]);
    } catch (error) {
        console.error('Error updating recommendations data:', error);
        throw error; // Re-throw the error to be handled by the caller
    } finally {
        // Release the connection back to the pool
        if (connection) {
            await connection.release(); // Release the connection properly
        }
    }
}

/*
Anime Recommendation Data Handling Utils
*/

// Function to transform API response data to AnimeRecommendation[]
function transformToAnimeRecommendations(apiResponse: ApiResponseData): AnimeRecommendation[] {
    // Extract recommendations from the API response
    return apiResponse.data.flatMap((recommendation: Recommendation) =>
        recommendation.entry.map((entry: Entry) => ({
            title: entry.title,
            url: entry.url,
            image: entry.images.jpg.image_url, // Assuming you want the 'jpg' image URL
            content: recommendation.content,
        }))
    );
}

// Function to remove duplicate recommendations based on URL
function removeDuplicates(recommendations: AnimeRecommendation[]): AnimeRecommendation[] {
    const seenUrls = new Set<string>();
    return recommendations.filter((rec) => {
        if (seenUrls.has(rec.url)) {
            return false; // Skip duplicates
        } else {
            seenUrls.add(rec.url);
            return true; // Include unique entries
        }
    });
}

export { getRecommendationsMetaFromDb, updateRecommendationsMetaInDb, getRecommendationsFromDb, updateRecommendationsInDb, transformToAnimeRecommendations };