import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const NoRecommendations = () => {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          No Matching Vehicles Found
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          We couldn't find any vehicles that match your current preferences and budget. 
          Try adjusting your preferences or browse all available cars.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            variant="outline"
            className="bg-white hover:bg-gray-50"
          >
            <Link href="/preferences" className="flex items-center gap-2">
              Adjust Preferences
            </Link>
          </Button>
          <Button
            asChild
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Link href="/explore-cars" className="flex items-center gap-2">
              Browse All Cars
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoRecommendations; 