import { auth } from '@/auth'
import AuthGuard from '@/components/sections/AuthGuard'
import prisma from '@/config/db'
import Image from 'next/image'
import React from 'react'

const CompareCarsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

  
  const session = await auth()
  if (!session?.user) {
    return <AuthGuard />
  }

  // Get vehicle IDs from search params
  const vehicleIds = searchParams.vehicles
    ? (Array.isArray(searchParams.vehicles)
      ? searchParams.vehicles
      : [searchParams.vehicles])
    : []

  // Fetch all vehicles
  const allVehicles = await prisma.vehicle.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Filter selected vehicles from allVehicles
  const selectedVehicles = allVehicles.filter(vehicle => 
    vehicleIds.includes(vehicle.id)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Compare Vehicles</h1>

      {/* Vehicle Selection */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Select Vehicles to Compare</h2>
        <form action="/compare-cars" method="get" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex flex-col">
                <label htmlFor={`vehicle${index}`} className="text-sm font-medium text-gray-700 mb-1">
                  Vehicle {index}
                </label>
                <select
                  id={`vehicle${index}`}
                  name="vehicles"
                  className="border rounded-md p-2"
                  defaultValue={vehicleIds[index - 1] || ''}
                >
                  <option value="">Select a vehicle</option>
                  {allVehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.year} {vehicle.make} {vehicle.model} - ${vehicle.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Compare Selected Vehicles
          </button>
        </form>
      </div>

      {/* Selected Vehicles List */}
      {selectedVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={vehicle.images[0] || "/placeholder.svg"}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h2>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-green-600">
                    ${vehicle.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600">{vehicle.bodyType}</p>
                  <p className="text-gray-600">{vehicle.transmission}</p>
                  <p className="text-gray-600">{vehicle.fuelType}</p>
                  <p className="text-gray-600">{vehicle.odometer.toLocaleString()} km</p>
                  <p className="text-gray-600">{vehicle.condition}</p>
                </div>
                <a
                  href={`/vehicles/${vehicle.id}`}
                  className="mt-4 block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          Select vehicles to compare from the dropdowns above
        </div>
      )}
    </div>
  )
}

export default CompareCarsPage