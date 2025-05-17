import { auth } from '@/auth'
import VehicleGrid from '@/components/sections/VehicleGrid'
import { Button } from '@/components/ui/button'
import prisma from "@/config/db"
import { BodyType, FuelType, Transmission, VehicleCondition } from '@prisma/client'
import { Filter } from 'lucide-react'
import React from 'react'

interface SearchParams {
  make?: string
  model?: string
  minPrice?: string
  maxPrice?: string
  bodyType?: BodyType
  transmission?: Transmission
  fuelType?: FuelType
  condition?: VehicleCondition
  minYear?: string
  maxYear?: string
}

const ExploreCarsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  const user = await auth();

  // Build the where clause based on search params
  const whereClause: any = {
    status: 'AVAILABLE',
  };

  if (searchParams.make) {
    whereClause.make = { contains: searchParams.make, mode: 'insensitive' };
  }
  if (searchParams.model) {
    whereClause.model = { contains: searchParams.model, mode: 'insensitive' };
  }
  if (searchParams.minPrice) {
    whereClause.price = { ...whereClause.price, gte: parseFloat(searchParams.minPrice) };
  }
  if (searchParams.maxPrice) {
    whereClause.price = { ...whereClause.price, lte: parseFloat(searchParams.maxPrice) };
  }
  if (searchParams.bodyType) {
    whereClause.bodyType = searchParams.bodyType;
  }
  if (searchParams.transmission) {
    whereClause.transmission = searchParams.transmission;
  }
  if (searchParams.fuelType) {
    whereClause.fuelType = searchParams.fuelType;
  }
  if (searchParams.condition) {
    whereClause.condition = searchParams.condition;
  }
  if (searchParams.minYear) {
    whereClause.year = { ...whereClause.year, gte: parseInt(searchParams.minYear) };
  }
  if (searchParams.maxYear) {
    whereClause.year = { ...whereClause.year, lte: parseInt(searchParams.maxYear) };
  }

  const data = await prisma.vehicle.findMany({
    where: whereClause,
    include: {
      savedBy: {
        where: {
          userId: user?.user?.id
        }
      }
    }
  });

  // Transform the data to include isSaved flag
  const vehiclesWithSavedStatus = data.map(vehicle => ({
    ...vehicle,
    isSaved: vehicle.savedBy.length > 0
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Explore Cars</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <form className="space-y-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full p-2 border rounded"
                  name="minPrice"
                  defaultValue={searchParams.minPrice}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full p-2 border rounded"
                  name="maxPrice"
                  defaultValue={searchParams.maxPrice}
                />
              </div>
            </div>

            {/* Year Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Year Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="From"
                  className="w-full p-2 border rounded"
                  name="minYear"
                  defaultValue={searchParams.minYear}
                />
                <input
                  type="number"
                  placeholder="To"
                  className="w-full p-2 border rounded"
                  name="maxYear"
                  defaultValue={searchParams.maxYear}
                />
              </div>
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Body Type</label>
              <select
                className="w-full p-2 border rounded"
                name="bodyType"
                defaultValue={searchParams.bodyType}
              >
                <option value="">All</option>
                {Object.values(BodyType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium mb-2">Transmission</label>
              <select
                className="w-full p-2 border rounded"
                name="transmission"
                defaultValue={searchParams.transmission}
              >
                <option value="">All</option>
                {Object.values(Transmission).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Fuel Type</label>
              <select
                className="w-full p-2 border rounded"
                name="fuelType"
                defaultValue={searchParams.fuelType}
              >
                <option value="">All</option>
                {Object.values(FuelType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium mb-2">Condition</label>
              <select
                className="w-full p-2 border rounded"
                name="condition"
                defaultValue={searchParams.condition}
              >
                <option value="">All</option>
                {Object.values(VehicleCondition).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" className="w-full">
              Apply Filters
            </Button>
          </form>
        </div>

        {/* Results Grid */}
        <div className="md:col-span-3">
          <VehicleGrid
            vehicles={vehiclesWithSavedStatus}
            title="Available Vehicles"
            description={`Found ${vehiclesWithSavedStatus.length} vehicles matching your criteria`}
          />
        </div>
      </div>
    </div>
  )
}

export default ExploreCarsPage