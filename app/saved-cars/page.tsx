import { auth } from '@/auth'
import VehicleGrid from '@/components/sections/VehicleGrid'
import prisma from '@/config/db'
import React from 'react'

const SavedCarsPage = async () => {
  const session = await auth()
  if (!session?.user) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Saved Vehicles</h1>
            <p className="text-gray-600">Sign in to view your saved vehicles</p>
          </div>
        </div>
      </main>
    )
  }

  const savedVehicles = await prisma.vehicle.findMany({
    where: {
      savedBy: {
        some: {
          userId: session.user.id
        }
      }
    },
    include: {
      savedBy: {
        where: {
          userId: session.user.id
        }
      }
    }
  })

  const vehiclesWithSavedStatus = savedVehicles.map(vehicle => ({
    ...vehicle,
    isSaved: true
  }))

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Vehicles</h1>
          <p className="text-gray-600">Your collection of favorite vehicles</p>
        </div>
      </div>

      <VehicleGrid
        vehicles={vehiclesWithSavedStatus}
        title="Saved Vehicles"
        description={`You have ${vehiclesWithSavedStatus.length} saved vehicles`}
      />
    </main>
  )
}

export default SavedCarsPage