import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

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

export default RecommendedSection; 