import { ApiResponseData, Recommendation, Entry } from "../../schemas/api/jikan/manga-recommendations";
import { MangaRecommendation, MangaRecommendationsMeta } from "../../schemas/db/manga-recommendations";
import { getConnection, query } from '../../config/dbConfig';
import { PoolConnection } from 'mysql2/promise';

/*
Methods For Managing Manga Recommendations Metadata (Database).
*/

async function getRecommendationsMetaFromDb(): Promise<MangaRecommendationsMeta> {
    let connection: PoolConnection | undefined;
    try {
        // Get a connection from the pool
        connection = await getConnection();
        
        // Execute the query
        const [rows] = await query(connection, 'SELECT last_updated_date FROM recommendations_meta WHERE id = 1');
        const row = rows[0] as { last_updated_date: Date };
        
        // Return the data as MangaRecommendationsMeta
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

async function updateRecommendationsMetaInDb(meta: MangaRecommendationsMeta): Promise<void> {
    let connection: PoolConnection | undefined;
    try {
        // Get a connection from the pool
        connection = await getConnection();

        // Execute the query
        await query(connection, 'UPDATE recommendations_meta SET last_updated_date = ? WHERE id = 1', [meta.lastUpdatedDate]);
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

async function getRecommendationsFromDb(): Promise<MangaRecommendation[]> {
    let connection: PoolConnection | undefined;
    try {
        // Get a connection from the pool
        connection = await getConnection();

        // Execute the query
        const [rows] = await query(connection, 'SELECT title, url, image, content FROM manga_recommendations');
        
        // Cast and return the data as MangaRecommendation[]
        return rows as MangaRecommendation[];
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

async function updateRecommendationsInDb(recommendations: MangaRecommendation[]): Promise<void> {
    let connection: PoolConnection | undefined;
    try {
        // Get a connection from the pool
        connection = await getConnection();
        
        // Clear existing recommendations
        await query(connection, 'TRUNCATE TABLE manga_recommendations');
          
        // Insert new recommendations
        const insertQuery = 'INSERT INTO manga_recommendations (title, url, image, content) VALUES ?';
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
Manga Recommendation Data Handling Utils
*/

// Function to transform API response data to MangaRecommendation[]
function transformToMangaRecommendations(apiResponse: ApiResponseData): MangaRecommendation[] {
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
function removeDuplicates(recommendations: MangaRecommendation[]): MangaRecommendation[] {
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

export { getRecommendationsMetaFromDb, updateRecommendationsMetaInDb, getRecommendationsFromDb, updateRecommendationsInDb, transformToMangaRecommendations };