import { cache } from 'react';

// Cache the recommendations fetch
export const getRecommendations = cache(async (userData: any) => {
  try {
    const response = await fetch(
      // "https://rag-car-recommender-fastapi.onrender.com/get-recommendations",
      "http://localhost:8000/get-recommendations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.PYTHON_API_KEY as string,
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch recommendations: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return null;
  }
}); 