"use server"

import { auth } from "@/auth"
import prisma from "@/config/db"
import { Preference } from "@/types/types"
import { revalidatePath } from "next/cache"

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

export const getAllSavedVehiclesByUserId = async (userId: string) => {
  const savedVehicles = await prisma.savedVehicle.findMany({
    where: {
      userId,
    }
  })
  return savedVehicles
}

export const getSavedVehicleByUserIdAndVehicleId = async (userId: string, vehicleId: string) => {
  const savedVehicle = await prisma.savedVehicle.findUnique({
    where: {
      userId_vehicleId: {
        userId,
        vehicleId,
      },
    },
  })
  return savedVehicle
}

export const saveVehicle = async (vehicleId: string) => {
  const user = await auth()
  try {
    const isSaved = await getSavedVehicleByUserIdAndVehicleId(user?.user.id, vehicleId)
    if (isSaved) {
      await prisma.savedVehicle.delete({
        where: {
          userId_vehicleId: {
            userId: user?.user.id,
            vehicleId,
          },
        },
      })
    } else {
      await prisma.savedVehicle.create({
        data: {
          userId: user?.user.id,
          vehicleId,
        },
      })
    }
    revalidatePath(`/vehicles/${vehicleId}`)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const trackUserActivity = async ({
  action,
  query,
  carTitles
}: {
  action: string;
  query?: string;
  carTitles?: string;
}) => {
  const user = await auth()
  if (!user?.user.id) return null;

  try {
    // First, try to find an existing activity for this user and action
    const existingActivity = await prisma.activity.findFirst({
      where: {
        userId: user.user.id,
        action: action,
      },
    });

    if (existingActivity) {
      // If activity exists, update it by adding new data to arrays
      const updatedActivity = await prisma.activity.update({
        where: {
          id: existingActivity.id,
        },
        data: {
          // If query exists and isn't already in the array, add it
          query: query ? [...new Set([...(existingActivity.query ? [existingActivity.query] : []), query])].join(',') : existingActivity.query,
          // If carTitles exists and isn't already in the array, add it
          carTitles: carTitles ? [...new Set([...(existingActivity.carTitles || []), carTitles])] : existingActivity.carTitles,
        },
      });
      return updatedActivity;
    } else {
      // If no activity exists, create a new one
      const newActivity = await prisma.activity.create({
        data: {
          userId: user.user.id,
          action,
          query: query || null,
          carTitles: carTitles ? [carTitles] : [],
        },
      });
      return newActivity;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};