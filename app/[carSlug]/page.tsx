import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { vehicles } from '@/data'

const CarDetail = async ({ params }: { params:  Promise<{ 'carSlug': string }> }) => {

  const { carSlug } = await params

  // Find the vehicle by ID from the URL slug
  const vehicle = vehicles.find(v => v.id === carSlug)
  
  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
          <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-green-600 hover:text-green-700 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Vehicles
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Hero Image Section */}
        <div className="relative h-96 w-full">
          <Image
            src={vehicle.imageUrl}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded">
            {vehicle.condition}
          </div>
        </div>

        {/* Vehicle Info Section */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <div className="flex items-center text-gray-600 mb-2">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{vehicle.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{formatMileage(vehicle.mileage)} miles</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="font-bold text-green-600 mb-2">
                {formatPrice(vehicle.price)}
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors w-full md:w-auto">
                Contact Seller
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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

          {/* Specifications */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Make</span>
                  <span className="font-medium">{vehicle.make}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Model</span>
                  <span className="font-medium">{vehicle.model}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Year</span>
                  <span className="font-medium">{vehicle.year}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-medium">{vehicle.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mileage</span>
                  <span className="font-medium">{formatMileage(vehicle.mileage)} miles</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Transmission</span>
                  <span className="font-medium">{vehicle.transmission}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Fuel Type</span>
                  <span className="font-medium">{vehicle.fuelType}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Color</span>
                  <span className="font-medium">{vehicle.color}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Body Type</span>
                  <span className="font-medium">{vehicle.bodyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{vehicle.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetail