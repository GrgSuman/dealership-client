import React from "react";
import VehicleGrid from "@/components/sections/VehicleGrid";
import NoRecommendations from "./NoRecommendations";
import { prepareUserDataForRecommendations } from "@/app/actions/user/recommendations";
import { getRecommendations } from "@/lib/recommendations";

const RecommendationsSection = async () => {
  const userData = await prepareUserDataForRecommendations();
  const recommendations = await getRecommendations(userData);

  if (recommendations?.recommendations?.length === 0) {
    return <NoRecommendations />;
  }

  return (
    <VehicleGrid
      vehicles={recommendations?.recommendations}
      title="Recommended for you"
      description="Based on your activities and preferences"
    />
  );
};

export default RecommendationsSection; 