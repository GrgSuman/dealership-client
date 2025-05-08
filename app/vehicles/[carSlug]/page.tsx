import Link from "next/link"
import { ImageGallery } from "@/app/vehicles/[carSlug]/ImageGallery"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Car, Fuel, Info, Gauge, Calendar, Cog, DollarSign, Palette, Key, Hash, BarChart3, Eye } from "lucide-react"
import { vehicles } from "@/data"

const VehicleDetail = async ({ params }: { params: { carSlug: string } }) => {
  const { carSlug } = params

  // Find the vehicle by ID from the URL slug
  const vehicle = vehicles.find((v) => v.id === carSlug)

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
            <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link href="/vehicles">Return to Vehicles</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(price / 100)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-AU").format(num)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Link href="/" className="text-green-600 hover:text-green-700 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Vehicles
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <ImageGallery images={vehicle.images} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {vehicle.condition}
                </Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  {vehicle.bodyType}
                </Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  {vehicle.transmission}
                </Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  {vehicle.fuelType}
                </Badge>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{vehicle.description}</p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {vehicle.features.map((feature, index) => (
                  <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Price and Title Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <Eye className="w-4 h-4 mr-1" />
                <span>{vehicle.viewsCount} views</span>
              </div>

              <div className="text-3xl font-bold text-green-600 mb-4">{formatPrice(vehicle.price)}</div>

              <Button className="w-full mb-2">Contact Seller</Button>
              <Button variant="outline" className="w-full">
                Request Test Drive
              </Button>
            </div>
          </div>

          {/* Vehicle Details Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Vehicle Details</h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2 text-green-600" />
                    <span>Year</span>
                  </div>
                  <span className="font-medium">{vehicle.year}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Gauge className="w-5 h-5 mr-2 text-green-600" />
                    <span>Odometer</span>
                  </div>
                  <span className="font-medium">{formatNumber(vehicle.odometer)} km</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Car className="w-5 h-5 mr-2 text-green-600" />
                    <span>Body Type</span>
                  </div>
                  <span className="font-medium">{vehicle.bodyType}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Cog className="w-5 h-5 mr-2 text-green-600" />
                    <span>Transmission</span>
                  </div>
                  <span className="font-medium">{vehicle.transmission}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Fuel className="w-5 h-5 mr-2 text-green-600" />
                    <span>Fuel Type</span>
                  </div>
                  <span className="font-medium">{vehicle.fuelType}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Palette className="w-5 h-5 mr-2 text-green-600" />
                    <span>Color</span>
                  </div>
                  <span className="font-medium">{vehicle.color}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Info className="w-5 h-5 mr-2 text-green-600" />
                    <span>Engine</span>
                  </div>
                  <span className="font-medium">
                    {vehicle.engineCapacity}L {vehicle.cylinders} Cyl
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                    <span>Fuel Economy</span>
                  </div>
                  <span className="font-medium">{vehicle.fuelConsumptionCombined}L/100km</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Car className="w-5 h-5 mr-2 text-green-600" />
                    <span>Drive Type</span>
                  </div>
                  <span className="font-medium">{vehicle.driveType}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Key className="w-5 h-5 mr-2 text-green-600" />
                    <span>Registration</span>
                  </div>
                  <span className="font-medium">{vehicle.rego}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Hash className="w-5 h-5 mr-2 text-green-600" />
                    <span>VIN</span>
                  </div>
                  <span className="font-medium text-xs">{vehicle.vin}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    <span>Stock Number</span>
                  </div>
                  <span className="font-medium">{vehicle.stockNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleDetail
