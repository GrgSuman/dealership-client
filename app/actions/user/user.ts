"use server"

import { auth } from "@/auth"
import prisma from "@/config/db"
import { Preference } from "@/types/types"

export const getUserPreference = async (userId: string) => {
 try {
  const userPreference = await prisma.preference.findUnique({
    where: {
      userId,
    },
  })
  return userPreference
 } catch (error) {
  console.log(error)
  return null
 }
}

export const addPreference = async (preference: Preference) => {
  const user = await auth()

  try {
    const newPreference = await prisma.preference.upsert({
      where: {
        userId: user?.user.id,
      },
      update: {
        budgetMin: preference.budgetMin,
        budgetMax: preference.budgetMax,
        carTypes: preference.carTypes,
        fuelTypes: preference.fuelTypes,
        brand: preference.brand,
        features: preference.features,
        primarilyUse: preference.primarilyUse,
        topPriorities: preference.topPriorities,
      },
      create: {
        userId: user?.user.id,
        budgetMin: preference.budgetMin,
        budgetMax: preference.budgetMax,
        carTypes: preference.carTypes,
        fuelTypes: preference.fuelTypes,
        brand: preference.brand,
        features: preference.features,
        primarilyUse: preference.primarilyUse,
        topPriorities: preference.topPriorities,
      },
    })
    return newPreference
  } catch (error) {
    console.log(error)
    return null
  }
}
