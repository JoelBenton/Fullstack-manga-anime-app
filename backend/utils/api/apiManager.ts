// Base URL for the API
const BASE_URL = 'https://api.jikan.moe/v4/';

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