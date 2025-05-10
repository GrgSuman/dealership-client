"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import VehicleGrid from "@/components/sections/VehicleGrid"
import Sidebar from "@/components/layouts/Sidebar"
import ClientHeader from "@/components/layouts/ClientHeader"
import { toast } from "sonner"

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  description: string
  price: number
  mileage: number
  image: string
  features: string[]
  condition: string
  location: string
  createdAt: string
  updatedAt: string
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch all vehicles on component mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/admin/vehicles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server did not return JSON")
        }

        const data = await response.json()
        setVehicles(data)
        setFilteredVehicles(data) // Initially show all vehicles
      } catch (error) {
        console.error("Error fetching vehicles:", error)
        toast.error("Failed to load vehicles. Please try again later.")
        setVehicles([])
        setFilteredVehicles([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  // Filter vehicles when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredVehicles(vehicles) // Show all vehicles when search is empty
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = vehicles.filter((vehicle) => {
      const make = vehicle.make?.toLowerCase() || ""
      const model = vehicle.model?.toLowerCase() || ""
      const year = vehicle.year?.toString() || ""
      const description = vehicle.description?.toLowerCase() || ""
      const price = vehicle.price?.toString() || ""
      const condition = vehicle.condition?.toLowerCase() || ""

      return (
        make.includes(query) ||
        model.includes(query) ||
        year.includes(query) ||
        description.includes(query) ||
        price.includes(query) ||
        condition.includes(query)
      )
    })

    setFilteredVehicles(filtered)
  }, [searchQuery, vehicles])

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search by make, model, year, price, or condition..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              {searchQuery && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Showing {filteredVehicles.length} of {vehicles.length} vehicles
                </p>
              )}
            </div>

            {/* Vehicle Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Loading vehicles...</p>
              </div>
            ) : (
              <VehicleGrid vehicles={filteredVehicles} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}