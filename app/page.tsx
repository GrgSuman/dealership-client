import { auth } from "@/auth";
import VehicleGrid from "@/components/sections/VehicleGrid";
import { Button } from "@/components/ui/button";
import prisma from "@/config/db";
import { ArrowRight } from "lucide-react";
import React, { Suspense } from "react";
import Link from "next/link";
import RecommendationsSection from "@/components/recommendations/RecommendationsSection";
import RecommendedSection from "@/components/recommendations/RecommendedSection";
import RecommendationsLoading from "@/components/recommendations/RecommendationsLoading";

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

export default Home;