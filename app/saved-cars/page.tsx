import { auth } from '@/auth'
import AuthGuard from '@/components/sections/AuthGuard'
import VehicleGrid from '@/components/sections/VehicleGrid'
import prisma from '@/config/db'
import React from 'react'

const SavedCarsPage = async () => {
  const session = await auth()
  if (!session?.user) {
    return <AuthGuard />
  }

  // Fetch saved vehicles for the user
  const savedVehicles = await prisma.savedVehicle.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      vehicle: true,
    },
  })

  const vehicles = savedVehicles.map(sv => sv.vehicle)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Saved Vehicles</h1>
      {vehicles.length > 0 ? (
        <VehicleGrid
          vehicles={vehicles}
          title="Your Saved Vehicles"
          description="Vehicles you've saved for later"
        />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No saved vehicles yet</h2>
          <p className="text-gray-600">
            Save vehicles you're interested in to view them here later
          </p>
        </div>
      )}
    </div>
  )
}

export default SavedCarsPage