import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Car, Gauge, Calendar, Heart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// This type matches your schema
interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number // in cents
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

interface CarCardProps {
  vehicle: Vehicle
  viewMode: "grid" | "list"
}

const CarCard: React.FC<CarCardProps> = ({ vehicle, viewMode }) => {
  const [isSaved, setIsSaved] = useState(vehicle.isSaved || false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(price / 100) // Convert cents to dollars
  }

  const formatOdometer = (odometer: number) => {
    return new Intl.NumberFormat("en-AU").format(odometer)
  }

  // Get the first image from the images array or use a placeholder
  const primaryImage =
    vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : "/placeholder.svg?height=400&width=600"

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      toast.error("Please log in to save vehicles")
      router.push("/login")
      return
    }

    setIsSaving(true)
    try {
      console.log('Sending save request for vehicle:', vehicle.id)
      console.log('User from localStorage:', user)

      // Get token from cookie
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1]

      console.log('Token from cookie:', token)

      const response = await fetch(`/api/vehicles/${vehicle.id}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add token to headers
        },
        credentials: 'include', // Important: This ensures cookies are sent with the request
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))

      const responseText = await response.text()
      console.log('Raw response:', responseText)

      if (response.status === 401) {
        // If unauthorized, clear local storage and redirect to login
        localStorage.removeItem("user")
        window.dispatchEvent(new Event("userChanged"))
        toast.error("Your session has expired. Please log in again.")
        router.push("/login?error=session_expired")
        return
      }

      if (!response.ok) {
        throw new Error(`Failed to save vehicle: ${responseText}`)
      }

      const data = JSON.parse(responseText)
      console.log('Parsed response data:', data)

      setIsSaved(data.saved)
      toast.success(data.saved ? "Vehicle saved" : "Vehicle removed from saved")
    } catch (error) {
      console.error('Error saving vehicle:', error)
      toast.error(error instanceof Error ? error.message : "Failed to save vehicle")
    } finally {
      setIsSaving(false)
    }
  }

  const handleClick = () => {
    router.push(`/vehicles/${vehicle.id}`)
  }

  if (viewMode === "list") {
    return (
      <div
        className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative w-48 h-32">
          <Image
            src={primaryImage}
            alt={`${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">
                {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-gray-600">{vehicle.year}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              disabled={isSaving}
              aria-label={isSaved ? "Remove from saved" : "Save vehicle"}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
              )}
            </Button>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Price:</span> {formatPrice(vehicle.price)}
            </div>
            <div>
              <span className="font-medium">Odometer:</span> {formatOdometer(vehicle.odometer)} km
            </div>
            <div>
              <span className="font-medium">Transmission:</span> {vehicle.transmission}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view (default)
  return (
    <div
      className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="relative h-48">
        <Image
          src={primaryImage}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={handleSave}
          disabled={isSaving}
          aria-label={isSaved ? "Remove from saved" : "Save vehicle"}
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
          )}
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-gray-600">{vehicle.year}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-lg font-bold">{formatPrice(vehicle.price)}</span>
          <span className="text-sm text-gray-600">{formatOdometer(vehicle.odometer)} km</span>
        </div>
      </div>
    </div>
  )
}

export default CarCard
