import { auth } from '@/auth'
import AuthGuard from '@/components/sections/AuthGuard'
import VehicleGrid from '@/components/sections/VehicleGrid'
import React from 'react'
import prisma from "@/config/db";

const SavedCarsPage = async () => {
  const user = await auth();
  
  const data = await prisma.vehicle.findMany({
    where: {
      savedBy: {
        some: {
          userId: user?.user?.id
        }
      }
    },
    include: {
      savedBy: {
        where: {
          userId: user?.user?.id
        }
      }
    }
  });

  if(!user) {
    return <AuthGuard />
  }

  return (
<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Saved Vehicles</h1>
      {data.length > 0 ? (
        <VehicleGrid
          vehicles={data}
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