import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Car, Gauge, Calendar } from "lucide-react"

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
}

interface CarCardProps {
  vehicle: Vehicle
  viewMode: "grid" | "list"
}

const CarCard: React.FC<CarCardProps> = ({ vehicle, viewMode }) => {
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

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.01] hover:shadow-lg flex flex-col md:flex-row">
        <div className="relative h-48 md:h-auto md:w-1/3">
          <Image
            src={primaryImage || "/placeholder.svg"}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            {vehicle.condition}
          </div>
          {vehicle.status !== "AVAILABLE" && (
            <div className="absolute bottom-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              {vehicle.status}
            </div>
          )}
        </div>

        <div className="p-4 md:w-2/3 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <span className="text-lg font-bold text-green-600">{formatPrice(vehicle.price)}</span>
          </div>

          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3 gap-2">
            <div className="flex items-center">
              <Gauge className="w-4 h-4 mr-1" />
              <span>{formatOdometer(vehicle.odometer)} km</span>
            </div>
            <span className="mx-1">•</span>
            <div className="flex items-center">
              <Car className="w-4 h-4 mr-1" />
              <span>{vehicle.bodyType}</span>
            </div>
            <span className="mx-1">•</span>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{vehicle.year}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{vehicle.description}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {vehicle.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="bg-gray-50">
                {feature}
              </Badge>
            ))}
            {vehicle.features.length > 3 && (
              <Badge variant="outline" className="bg-gray-50">
                +{vehicle.features.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex justify-between items-center mt-auto">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{vehicle.transmission}</span> • {vehicle.fuelType}
            </div>
            <Link
              href={`/vehicles/${vehicle.id}`}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-2 rounded-lg transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={primaryImage || "/placeholder.svg"}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          {vehicle.condition}
        </div>
        {vehicle.status !== "AVAILABLE" && (
          <div className="absolute bottom-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
            {vehicle.status}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <span className="text-lg font-bold text-green-600">{formatPrice(vehicle.price)}</span>
        </div>

        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3 gap-2">
          <div className="flex items-center">
            <Gauge className="w-4 h-4 mr-1" />
            <span>{formatOdometer(vehicle.odometer)} km</span>
          </div>
          <span className="mx-1">•</span>
          <div className="flex items-center">
            <Car className="w-4 h-4 mr-1" />
            <span>{vehicle.bodyType}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {vehicle.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {feature}
            </Badge>
          ))}
          {vehicle.features.length > 3 && (
            <Badge variant="outline" className="bg-gray-50">
              +{vehicle.features.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{vehicle.transmission}</span> • {vehicle.fuelType}
          </div>
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-2 rounded-lg transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CarCard
