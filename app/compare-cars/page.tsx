import { auth } from '@/auth'
import prisma from '@/config/db'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { trackUserActivity } from '@/app/actions/user/user'

const CompareCarsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await searchParams;
  const session = await auth()
  if (!session?.user) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compare Vehicles</h1>
            <p className="text-gray-600">Sign in to compare vehicles</p>
          </div>
        </div>
      </main>
    )
  }

  // Get vehicle IDs from search params
  const vehicleIds = params.vehicles
    ? (Array.isArray(params.vehicles)
      ? params.vehicles
      : [params.vehicles])
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

  // Important features for comparison
  const mainAttributes = [
    { label: 'Make', key: 'make' },
    { label: 'Model', key: 'model' },
    { label: 'Year', key: 'year' },
    { label: 'Price', key: 'price', format: (v: any) => `$${v?.toLocaleString?.() ?? v}` },
    { label: 'Body Type', key: 'bodyType' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Fuel Type', key: 'fuelType' },
    { label: 'Condition', key: 'condition' },
    { label: 'Odometer', key: 'odometer', format: (v: any) => v ? `${v.toLocaleString()} km` : 'N/A' },
    { label: 'Color', key: 'color' },
    { label: 'Doors', key: 'doors' },
    { label: 'Seats', key: 'seats' },
    { label: 'Cylinders', key: 'cylinders' },
    { label: 'Engine Capacity', key: 'engineCapacity', format: (v: any) => v ? `${v} L` : 'N/A' },
    { label: 'Drive Type', key: 'driveType' },
  ];

  const fuelAttributes = [
    { label: 'Fuel Consumption (Urban)', key: 'fuelConsumptionUrban', format: (v: any) => v ? `${v} L/100km` : 'N/A' },
    { label: 'Fuel Consumption (Extra Urban)', key: 'fuelConsumptionExtraUrban', format: (v: any) => v ? `${v} L/100km` : 'N/A' },
    { label: 'Fuel Consumption (Combined)', key: 'fuelConsumptionCombined', format: (v: any) => v ? `${v} L/100km` : 'N/A' },
  ];

  const regAttributes = [
    { label: 'Registration', key: 'rego' },
    { label: 'VIN', key: 'vin' },
    { label: 'Stock Number', key: 'stockNumber' },
  ];

  // Helper to highlight differences
  function isDifferent(key: string) {
    if (selectedVehicles.length < 2) return false;
    const first = (selectedVehicles[0] as any)[key];
    return selectedVehicles.some(v => (v as any)[key] !== first);
  }

  if (session?.user && selectedVehicles.length > 0) {
    const comparedTitles = selectedVehicles.map(v => `${v.year} ${v.make} ${v.model}`).join(', ');
    await trackUserActivity({
      action: 'compared',
      carTitles: comparedTitles
    });
  }

  return (
    <main className="mx-auto max-w-6xl px-2 sm:px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compare Vehicles</h1>
          <p className="text-base text-gray-600">Compare up to 3 vehicles side by side</p>
        </div>
      </div>

      {/* Vehicle Selection - always visible */}
      <div className="mb-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
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
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Compare Selected Vehicles
          </Button>
        </form>
      </div>

      {/* Vehicle Cards/Header Section */}
      {selectedVehicles.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {selectedVehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center p-4 min-w-[220px]">
              <div className="relative h-24 w-36 mb-2 rounded-lg overflow-hidden bg-gray-50">
                <Image
                  src={vehicle.images[0] || "/placeholder.svg"}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="font-bold text-blue-700 text-sm mb-1 text-center">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1 text-center">
                ${vehicle.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Divider */}
      {selectedVehicles.length > 0 && <div className="border-b border-gray-200 mb-6" />}

      {/* Comparison Table - Spreadsheet Style */}
      {selectedVehicles.length > 0 ? (
        <div className="bg-white rounded-xl  overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-0.5 text-base">
            <tbody>
              {/* Main Attributes Section */}
              <tr>
                <td colSpan={selectedVehicles.length + 1} className="bg-green-600 text-white font-semibold px-4 py-2 text-left text-base  rounded-t-xl">
                  Main Features
                </td>
              </tr>
              {mainAttributes.map(({ label, key, format }) => (
                <tr key={key} className="text-base hover:bg-gray-50 transition-colors">
                  <td className="bg-gray-50 font-medium text-gray-700 px-4 py-2 w-48 border-b border-gray-100">{label}</td>
                  {selectedVehicles.map((vehicle) => {
                    let value: any = (vehicle as any)[key];
                    if (value instanceof Date) value = value.toLocaleDateString();
                    if (Array.isArray(value)) value = value.join(', ');
                    if (value === undefined || value === null) value = 'N/A';
                    let display: string = typeof format === 'function' ? String(format(value)) : String(value);
                    return (
                      <td
                        key={vehicle.id}
                        className={`text-center px-4 py-2 border-b border-gray-100 ${isDifferent(key) ? 'bg-yellow-50' : ''}`}
                      >
                        {display}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Fuel Consumption Section */}
              <tr>
                  <td colSpan={selectedVehicles.length + 1} className="bg-green-600 text-white font-semibold px-4 py-2 text-left text-base ">
                  Fuel Consumption
                </td>
              </tr>
              {fuelAttributes.map(({ label, key, format }) => (
                <tr key={key} className="text-base hover:bg-gray-50 transition-colors">
                  <td className="bg-gray-50 font-medium text-gray-700 px-4 py-2 w-48 border-b border-gray-100">{label}</td>
                  {selectedVehicles.map((vehicle) => {
                    let value: any = (vehicle as any)[key];
                    if (value instanceof Date) value = value.toLocaleDateString();
                    if (Array.isArray(value)) value = value.join(', ');
                    if (value === undefined || value === null) value = 'N/A';
                    let display: string = typeof format === 'function' ? String(format(value)) : String(value);
                    return (
                      <td
                        key={vehicle.id}
                        className={`text-center px-4 py-2 border-b border-gray-100 ${isDifferent(key) ? 'bg-yellow-50' : ''}`}
                      >
                        {display}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Registration Section */}
              <tr>
                <td colSpan={selectedVehicles.length + 1} className="bg-green-600 text-white font-semibold px-4 py-2 text-left text-base ">
                  Registration & Stock
                </td>
              </tr>
              {regAttributes.map((attr) => (
                <tr key={attr.key} className="text-base hover:bg-gray-50 transition-colors">
                  <td className="bg-gray-50 font-medium text-gray-700 px-4 py-2 w-48 border-b border-gray-100">{attr.label}</td>
                  {selectedVehicles.map((vehicle) => {
                    let value: any = (vehicle as any)[attr.key];
                    if (value instanceof Date) value = value.toLocaleDateString();
                    if (Array.isArray(value)) value = value.join(', ');
                    if (value === undefined || value === null) value = 'N/A';
                    let display: string = ('format' in attr && typeof attr.format === 'function') ? String(attr.format(value)) : String(value);
                    return (
                      <td
                        key={vehicle.id}
                        className={`text-center px-4 py-2 border-b border-gray-100 ${isDifferent(attr.key) ? 'bg-yellow-50' : ''}`}
                      >
                        {display}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12 bg-white rounded-xl border border-gray-200 shadow-sm max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg font-medium">Select vehicles to compare from the dropdowns above</p>
          </div>
        </div>
      )}
    </main>
  )
}

export default CompareCarsPage