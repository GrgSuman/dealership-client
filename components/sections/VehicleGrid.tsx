"use client"

import { useState, useEffect } from "react"
import CarCard from "@/components/cards/CarCard"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"
import { usePathname } from "next/navigation"

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  bodyType: string
  transmission: string
  fuelType: string
  fuelConsumptionUrban: number
  fuelConsumptionExtraUrban: number
  fuelConsumptionCombined: number
  engineCapacity: number
  cylinders: number
  odometer: number
  driveType: string
  doors: number
  seats: number
  color: string
  rego: string
  vin: string
  stockNumber: string
  images: string[]
  description: string
  status: string
  condition: string
  features: string[]
  viewsCount: number
  createdAt: Date
  updatedAt: Date
  isSaved?: boolean
}

const VehicleGrid = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()
  const isSavedCarsPage = pathname === "/saved-cars"

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const endpoint = isSavedCarsPage ? '/api/vehicles/saved' : '/api/admin/vehicles'
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles')
        }
        const data = await response.json()
        // Add default values for optional fields
        const formattedData = data.map((vehicle: any) => ({
          ...vehicle,
          fuelConsumptionUrban: vehicle.fuelConsumptionUrban || 0,
          fuelConsumptionExtraUrban: vehicle.fuelConsumptionExtraUrban || 0,
          fuelConsumptionCombined: vehicle.fuelConsumptionCombined || 0,
          engineCapacity: vehicle.engineCapacity || 0,
          cylinders: vehicle.cylinders || 0,
          driveType: vehicle.driveType || 'FWD',
          doors: vehicle.doors || 4,
          seats: vehicle.seats || 5,
          rego: vehicle.rego || '',
          vin: vehicle.vin || '',
          viewsCount: vehicle.viewsCount || 0,
          isSaved: isSavedCarsPage ? true : false
        }))
        setVehicles(formattedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [isSavedCarsPage])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Loading vehicles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isSavedCarsPage ? "Saved Vehicles" : "Featured Vehicles"}
          </h1>
          <p className="text-gray-600">
            {isSavedCarsPage
              ? "View your saved vehicles"
              : "Browse our selection of premium vehicles"}
          </p>
        </div>

        <div className="flex items-center bg-gray-100 p-1 rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
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
