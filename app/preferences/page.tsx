import React from 'react'
import Preferences from './Preferences'
import { auth } from '@/auth'
import AuthGuard from '@/components/sections/AuthGuard'
const page = async () => {
  const user = await auth()
  if (!user) {
    return <AuthGuard/>
  }
  return (
    <>
      <Preferences />
    </>
  )
}

export default page