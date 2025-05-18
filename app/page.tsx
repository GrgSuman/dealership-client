import { auth } from "@/auth";
import VehicleGrid from "@/components/sections/VehicleGrid";
import { Button } from "@/components/ui/button";
import prisma from "@/config/db";
import { ArrowRight, LogIn } from "lucide-react";
import React, { Suspense } from "react";
import Link from "next/link";
import { prepareUserDataForRecommendations } from "./actions/user/recommendations";
import { cache } from 'react';

// Cache the recommendations fetch
const getRecommendations = cache(async (userData: any) => {
  try {
    const response = await fetch(
      "https://rag-car-recommender-fastapi.onrender.com/get-recommendations",
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

// Loading component for recommendations
const RecommendationsLoading = () => (
  <div className="animate-pulse">
    <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 w-96 bg-gray-200 rounded mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
      ))}
    </div>
  </div>
);

const Home = async () => {
  // Fetch all data in parallel
  const [data, user] = await Promise.all([
    prisma.vehicle.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    }),
    auth()
  ]);

  return (
    <div>
      {user ? (
        <Suspense fallback={<RecommendationsLoading />}>
          <RecommendationsSection />
        </Suspense>
      ) : (
        <RecommendedSection />
      )}

      <VehicleGrid
        vehicles={data}
        title="New Arrivals"
        description="Check out our latest additions"
      />

      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Button
          asChild
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
        >
          <Link href="/explore-cars" className="flex items-center gap-2">
            Explore More
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

// Separate component for recommendations
const RecommendationsSection = async () => {
  const userData = await prepareUserDataForRecommendations();
  const recommendations = await getRecommendations(userData);

  return (
    <VehicleGrid
      vehicles={recommendations?.recommendations}
      title="Recommended for you"
      description="Based on your activities and preferences"
    />
  );
};

export default Home;

const RecommendedSection = () => {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Your Personalized Recommendations
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Get tailored vehicle suggestions that match your preferences, budget,
          and lifestyle. Sign in to unlock your personalized car recommendations
          and discover your perfect match.
        </p>
        <Button
          asChild
          className="bg-green-600 hover:bg-green-700 transition-colors"
        >
          <Link href="/signin" className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Sign In for Personalized Recommendations
          </Link>
        </Button>
      </div>
    </div>
  );
};