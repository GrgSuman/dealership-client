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

interface SavedVehicle {
  id: string
  vehicleId: string
  userId: string
  vehicle: Vehicle
}

interface VehicleGridProps {
  vehicles?: Vehicle[]
}

const VehicleGrid = ({ vehicles: propVehicles }: VehicleGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()
  const isSavedCarsPage = pathname === "/saved-cars"

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        if (propVehicles) {
          setVehicles(propVehicles)
          setLoading(false)
          return
        }

        const endpoint = isSavedCarsPage ? '/api/vehicles/saved' : '/api/admin/vehicles'
        const token = localStorage.getItem('token')

        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        }

        if (isSavedCarsPage && token) {
          headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(endpoint, {
          headers
        })

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Please log in to view saved vehicles')
          }
          throw new Error('Failed to fetch vehicles')
        }

        const data = await response.json()

        // Handle saved vehicles data structure
        const formattedData = isSavedCarsPage
          ? data.map((savedVehicle: SavedVehicle) => ({
            ...savedVehicle.vehicle,
            isSaved: true
          }))
          : data.map((vehicle: Vehicle) => ({
            ...vehicle,
            isSaved: false
          }))

        setVehicles(formattedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        if (err instanceof Error && err.message === 'Please log in to view saved vehicles') {
          // Redirect to login page if not authenticated
          window.location.href = '/login'
        }
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [propVehicles, isSavedCarsPage])

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

      <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
        {vehicles.map((vehicle) => (
          <CarCard key={vehicle.id} vehicle={vehicle} viewMode={viewMode} />
        ))}
      </div>
    </main>
  )
}

export default VehicleGrid
