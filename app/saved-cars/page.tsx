import { auth } from '@/auth'
import  AuthGuard  from '@/components/sections/AuthGuard'
import React from 'react'
const page = async () => {
  const user = await auth()
  if(!user) {
    return <AuthGuard />
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Saved Vehicles</h1>
    </div>
  )
}

export default page