import React from 'react'
import Preferences from './Preferences'
import { auth } from '@/auth'
import AuthGuard from '@/components/sections/AuthGuard'
import { getUserPreference } from '../actions/user/user'
import { Preference } from '@/types/types'
const page = async () => {
  const user = await auth()

  if (!user) {
    return <AuthGuard/>
  }
  const userPreference = await getUserPreference(user.user.id)
  return (
    <>
      <Preferences userPreference={userPreference as Preference} />
    </>
  )
}

export default page