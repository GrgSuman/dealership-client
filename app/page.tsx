import { auth } from "@/auth";
import VehicleGrid from "@/components/sections/VehicleGrid";
import { Button } from "@/components/ui/button";
import prisma from "@/config/db";
import { ArrowRight, LogIn } from "lucide-react";
import React, { Suspense } from "react";
import Link from "next/link";
import { prepareUserDataForRecommendations } from "./actions/user/recommendations";
import { cache } from 'react';



const Home = async () => {
  // Fetch all data in parallel
  const [data, user] = await Promise.all([
    prisma.vehicle.findMany({}),
    auth()
  ]);




  return (
    <div>


      <VehicleGrid
        vehicles={data}
        title="Featured Vehicles"
        description="Browse our selection of premium vehicles"
      />

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