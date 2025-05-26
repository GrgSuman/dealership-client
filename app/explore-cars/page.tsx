import { auth } from '@/auth'
import VehicleGrid from '@/components/sections/VehicleGrid'
import { Button } from '@/components/ui/button'
import prisma from "@/config/db"
import { BodyType, FuelType, Transmission, VehicleCondition } from '@prisma/client'
import { Filter, X } from 'lucide-react'
import React, { Suspense } from 'react'
import Link from 'next/link'
import ExploreCarsSkeleton from '@/components/explore-cars/ExploreCarsSkeleton'

// Client component for clear filters button
const ClearFiltersButton = () => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2"
      asChild
    >
      <Link href="/explore-cars">
        <X className="h-4 w-4 mr-1" />
        Clear all
      </Link>
    </Button>
  )
}

const ExploreCarsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  return (
    <Suspense fallback={<ExploreCarsSkeleton />}>
      <ExploreCarsContent searchParams={searchParams} />
    </Suspense>
  )
}

const ExploreCarsContent = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await searchParams;
  const user = await auth();

  // Build the where clause based on search params
  const whereClause: any = {
    status: 'AVAILABLE',
  };

  if (params.make) {
    whereClause.make = { contains: params.make, mode: 'insensitive' };
  }
  if (params.model) {
    whereClause.model = { contains: params.model, mode: 'insensitive' };
  }
  if (params.minPrice) {
    whereClause.price = { ...whereClause.price, gte: parseFloat(params.minPrice as string) };
  }
  if (params.maxPrice) {
    whereClause.price = { ...whereClause.price, lte: parseFloat(params.maxPrice as string) };
  }
  if (params.bodyType) {
    whereClause.bodyType = params.bodyType;
  }
  if (params.transmission) {
    whereClause.transmission = params.transmission;
  }
  if (params.fuelType) {
    whereClause.fuelType = params.fuelType;
  }
  if (params.condition) {
    whereClause.condition = params.condition;
  }
  if (params.minYear) {
    whereClause.year = { ...whereClause.year, gte: parseInt(params.minYear as string) };
  }
  if (params.maxYear) {
    whereClause.year = { ...whereClause.year, lte: parseInt(params.maxYear as string) };
  }

  // Fetch all data in parallel
  const [makes, models, years, vehicles] = await Promise.all([
    // Get unique makes
    prisma.vehicle.findMany({
      select: { make: true },
      distinct: ['make'],
      orderBy: { make: 'asc' },
    }),
    // Get unique models
    prisma.vehicle.findMany({
      select: { model: true },
      distinct: ['model'],
      orderBy: { model: 'asc' },
    }),
    // Get unique years
    prisma.vehicle.findMany({
      select: { year: true },
      distinct: ['year'],
      orderBy: { year: 'desc' },
    }),
    // Get filtered vehicles
    prisma.vehicle.findMany({
      where: whereClause,
      include: {
        savedBy: {
          where: {
            userId: user?.user?.id
          }
        }
      }
    })
  ]);

  // Transform the data to include isSaved flag
  const vehiclesWithSavedStatus = vehicles.map(vehicle => ({
    ...vehicle,
    isSaved: vehicle.savedBy.length > 0
  }));

  // Count active filters
  const activeFilters = Object.keys(params).filter(key => params[key]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Explore Cars</h1>
            <p className="text-gray-600">Find your perfect vehicle</p>
          </div>

          <div className="flex items-center gap-4">
            {activeFilters.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{activeFilters.length} active filters</span>
                <ClearFiltersButton />
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Make */}
            <div>
              <label className="block text-sm font-medium mb-2">Make</label>
              <select
                className="w-full p-2 border rounded bg-white"
                name="make"
                defaultValue={params.make as string}
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
                defaultValue={params.model as string}
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
                    defaultValue={params.minPrice as string}
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 pl-7 border rounded"
                    name="maxPrice"
                    defaultValue={params.maxPrice as string}
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
                  defaultValue={params.minYear as string}
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
                  defaultValue={params.maxYear as string}
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
                defaultValue={params.bodyType as string}
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
                defaultValue={params.transmission as string}
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
                defaultValue={params.fuelType as string}
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
                defaultValue={params.condition as string}
              >
                <option value="">All Conditions</option>
                {Object.values(VehicleCondition).map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Apply Button */}
            <div className="md:col-span-2 lg:col-span-4 flex justify-end">
              <Button type="submit" className="w-full md:w-auto">
                Apply Filters
              </Button>
            </div>
          </form>
        </div>

        {/* Results Grid */}
        <div>
          <VehicleGrid
            vehicles={vehiclesWithSavedStatus}
            title="Available Vehicles"
            description={`Found ${vehiclesWithSavedStatus.length} vehicles matching your criteria`}
          />
        </div>
      </div>
    </main>
  )
}

export default ExploreCarsPage