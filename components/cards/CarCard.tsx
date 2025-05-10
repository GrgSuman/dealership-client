import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Heart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

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
  status: string
  condition: string
  createdAt: Date
  isSaved?: boolean
}

interface CarCardProps {
  vehicle: Vehicle
  viewMode: "grid" | "list"
}

const CarCard: React.FC<CarCardProps> = ({ vehicle, viewMode }) => {
  const [isSaved, setIsSaved] = useState(vehicle.isSaved || false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(price / 100)
  }

  const formatOdometer = (odometer: number) => {
    return new Intl.NumberFormat("en-AU").format(odometer)
  }

  const primaryImage = vehicle.images?.[0] ?? "/images/placeholder.jpg"

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaving(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch(`/api/vehicles/${vehicle.id}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login')
          return
        }
        throw new Error(data.message || 'Failed to save vehicle')
      }

      setIsSaved(data.saved)
      toast.success(data.saved ? "Vehicle saved successfully" : "Vehicle removed from saved")
    } catch (error) {
      console.error('Error saving vehicle:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to save vehicle')
    } finally {
      setIsSaving(false)
    }
  }

  const handleClick = () => {
    router.push(`/vehicles/${vehicle.id}`)
  }

  const isNew = new Date(vehicle.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000

  const SaveButton = () => {
    if (!isLoggedIn) return null

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSave}
        disabled={isSaving}
        aria-label={isSaved ? "Remove from saved" : "Save vehicle"}
        aria-pressed={isSaved}
        className={`transition-all duration-300 ${isSaved ? 'hover:bg-red-50' : 'hover:bg-gray-100'}`}
      >
        {isSaving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${isSaved
              ? "fill-red-600 text-red-600 scale-110"
              : "text-gray-400 hover:text-red-400"
              }`}
          />
        )}
      </Button>
    )
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
          {isNew && (
            <Badge className="absolute top-2 left-2 bg-green-500">
              New
            </Badge>
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">
                {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-gray-600">{vehicle.year}</p>
            </div>
            <SaveButton />
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
        {isNew && (
          <Badge className="absolute top-2 left-2 bg-green-500">
            New
          </Badge>
        )}
        <div className="absolute top-2 right-2">
          <SaveButton />
        </div>
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
