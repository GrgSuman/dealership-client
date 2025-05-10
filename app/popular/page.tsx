"use client"

import { useEffect, useState } from "react"
import CarCard from "@/components/cards/CarCard"
import { Loader2 } from "lucide-react"

interface Vehicle {
    id: string
    make: string
    model: string
    year: number
    price: number
    bodyType: string
    transmission: string
    fuelType: string
    odometer: number
    images: string[]
    description: string
    status: string
    condition: string
    features: string[]
    viewsCount: number
    createdAt: Date
}

export default function PopularPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPopularVehicles = async () => {
            try {
                const response = await fetch("/api/vehicles/popular")
                if (!response.ok) {
                    throw new Error("Failed to fetch popular vehicles")
                }
                const data = await response.json()
                setVehicles(data)
            } catch (error) {
                console.error("Error fetching popular vehicles:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPopularVehicles()
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Popular Vehicles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {vehicles.map((vehicle) => (
                    <CarCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        viewMode="grid"
                    />
                ))}
            </div>
            {vehicles.length === 0 && (
                <p className="text-center text-gray-500">No popular vehicles found.</p>
            )}
        </div>
    )
} 