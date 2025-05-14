import { auth } from '@/auth'
import  AuthGuard  from '@/components/sections/AuthGuard'
import React from 'react'
import prisma from '@/config/db'

const page = async () => {
  const user = await auth()
  const vehicles = await prisma.vehicle.findMany({})
  if(!user) {
    return <AuthGuard />
  }
  return (
    <div>page</div>
  )
}

export default page