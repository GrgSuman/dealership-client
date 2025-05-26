import React from "react";

const RecommendationsLoading = () => (
  <div>
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recommended for you</h1>
          <p className="text-gray-600">Based on your activities and preferences</p>
        </div>
      </div>
    </div>
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
        ))}
      </div>
    </div>
  </div>
);

export default RecommendationsLoading; 