import VehicleGrid from '@/components/sections/VehicleGrid'
import prisma from '@/config/db'
import React from 'react'

const Home = async () => {
  const data = await prisma.vehicle.findMany({})
  return (
    <div>
      <VehicleGrid vehicles={data} />
    </div>
  )
}

export default Home