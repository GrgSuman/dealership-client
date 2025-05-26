import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

const NoSavedCars = () => {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Your Collection is Empty
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Start building your collection of favorite vehicles. Save cars you're interested in to easily access them later and get personalized recommendations.
        </p>
        <Button
          asChild
          className="bg-green-600 hover:bg-green-700 transition-colors"
        >
          <Link href="/explore-cars" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Explore Cars
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NoSavedCars; 