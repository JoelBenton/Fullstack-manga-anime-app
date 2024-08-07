import mysql, { Pool, PoolConnection } from 'mysql2/promise';

// Create a pool of connections
const db: Pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT)
});

// Function to get a connection from the pool
export async function getConnection(): Promise<PoolConnection> {
    return await db.getConnection();
}

// Function to execute queries
export async function query(connection: PoolConnection, sql: string, values?: any[]): Promise<[any[], any[]]> {
    return await connection.query(sql, values);
}

export default db;