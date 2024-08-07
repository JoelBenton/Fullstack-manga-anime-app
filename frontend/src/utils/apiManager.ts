import { Platform } from 'react-native';

// Base URL for the API
// Determine base URL based on platform
const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:3000/api/'
  : 'http://localhost:3000/api/';

// Function to handle API calls
async function callApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  try {
    // Make the API request
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse and return the JSON response
    return (await response.json()) as T;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export { callApi };