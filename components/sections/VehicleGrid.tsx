"use client"

import { useState } from "react"
import CarCard from "@/components/cards/CarCard"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"
import { vehicles } from "@/data"

const VehicleGrid = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Featured Vehicles</h1>
          <p className="text-gray-600">Browse our selection of premium vehicles</p>
        </div>

        <div className="flex items-center bg-gray-100 p-1 rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid" ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "list" ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
            aria-label="List view"
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">Showing {vehicles.length} vehicles</p>

      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col space-y-4"
        }
      >
        {vehicles.map((vehicle) => (
          <CarCard key={vehicle.id} vehicle={vehicle} viewMode={viewMode} />
        ))}
      </div>
    </main>
  )
}

export default VehicleGrid