import { auth } from '@/auth'
import VehicleGrid from '@/components/sections/VehicleGrid'
import { Button } from '@/components/ui/button'
import prisma from "@/config/db"
import { BodyType, FuelType, Transmission, VehicleCondition } from '@prisma/client'
import { Filter, X } from 'lucide-react'
import React from 'react'

const ExploreCarsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const user = await auth();

  // Fetch unique values for dropdowns
  const [makes, models, years] = await Promise.all([
    prisma.vehicle.findMany({
      select: { make: true },
      distinct: ['make'],
      orderBy: { make: 'asc' },
    }),
    prisma.vehicle.findMany({
      select: { model: true },
      distinct: ['model'],
      orderBy: { model: 'asc' },
    }),
    prisma.vehicle.findMany({
      select: { year: true },
      distinct: ['year'],
      orderBy: { year: 'desc' },
    }),
  ]);

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
    whereClause.price = { ...whereClause.price, gte: parseFloat(searchParams.minPrice as string) };
  }
  if (searchParams.maxPrice) {
    whereClause.price = { ...whereClause.price, lte: parseFloat(searchParams.maxPrice as string) };
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
    whereClause.year = { ...whereClause.year, gte: parseInt(searchParams.minYear as string) };
  }
  if (searchParams.maxYear) {
    whereClause.year = { ...whereClause.year, lte: parseInt(searchParams.maxYear as string) };
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

  // Count active filters
  const activeFilters = Object.keys(searchParams).filter(key => searchParams[key]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Explore Cars</h1>
        <div className="flex items-center gap-4">
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{activeFilters.length} active filters</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={() => window.location.href = '/explore-cars'}
              >
                <X className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            </div>
          )}
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <form className="space-y-6">
            {/* Make */}
            <div>
              <label className="block text-sm font-medium mb-2">Make</label>
              <select
                className="w-full p-2 border rounded bg-white"
                name="make"
                defaultValue={searchParams.make as string}
              >
                <option value="">All Makes</option>
                {makes.map(({ make }) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <select
                className="w-full p-2 border rounded bg-white"
                name="model"
                defaultValue={searchParams.model as string}
              >
                <option value="">All Models</option>
                {models.map(({ model }) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full p-2 pl-7 border rounded"
                    name="minPrice"
                    defaultValue={searchParams.minPrice as string}
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 pl-7 border rounded"
                    name="maxPrice"
                    defaultValue={searchParams.maxPrice as string}
                  />
                </div>
              </div>
            </div>

            {/* Year Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Year Range</label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="w-full p-2 border rounded bg-white"
                  name="minYear"
                  defaultValue={searchParams.minYear as string}
                >
                  <option value="">From</option>
                  {years.map(({ year }) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full p-2 border rounded bg-white"
                  name="maxYear"
                  defaultValue={searchParams.maxYear as string}
                >
                  <option value="">To</option>
                  {years.map(({ year }) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Body Type</label>
              <select
                className="w-full p-2 border rounded bg-white"
                name="bodyType"
                defaultValue={searchParams.bodyType as string}
              >
                <option value="">All Body Types</option>
                {Object.values(BodyType).map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium mb-2">Transmission</label>
              <select
                className="w-full p-2 border rounded bg-white"
                name="transmission"
                defaultValue={searchParams.transmission as string}
              >
                <option value="">All Transmissions</option>
                {Object.values(Transmission).map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Fuel Type</label>
              <select
                className="w-full p-2 border rounded bg-white"
                name="fuelType"
                defaultValue={searchParams.fuelType as string}
              >
                <option value="">All Fuel Types</option>
                {Object.values(FuelType).map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium mb-2">Condition</label>
              <select
                className="w-full p-2 border rounded bg-white"
                name="condition"
                defaultValue={searchParams.condition as string}
              >
                <option value="">All Conditions</option>
                {Object.values(VehicleCondition).map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
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