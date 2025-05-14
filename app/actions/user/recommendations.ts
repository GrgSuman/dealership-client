import { auth } from "@/auth"
import prisma from "@/config/db"

export const prepareUserDataForRecommendations = async () => {
  const user = await auth()
  if (!user?.user.id) return null

    // Fetch all data in parallel
    const [userActivities, userPreferences,userSavedVehicles] = await Promise.all([
        // Get all activities
        prisma.activity.findMany({
          where: {
            userId: user.user.id,
          },
          select: {
            action: true,
            carTitles: true,
            query: true,
          }
        }),
    
        // Get preferences
        prisma.preference.findUnique({
          where: {
            userId: user.user.id,
          },
          select: {
            budgetMin: true,
            budgetMax: true,
            carTypes: true,
            fuelTypes: true,
            brand: true,
            features: true,
            primarilyUse: true,
            topPriorities: true
          }
        }),

        // Get saved vehicles
        prisma.savedVehicle.findMany({
            where: {
                userId: user.user.id,
            },
            include: {
                vehicle: {
                    select: {
                        make: true,
                        model: true,
                        year: true,
                    }
                }
            }
        })
      ])

    const savedVehicleTitles = userSavedVehicles.map((item) => {
    const { year, make, model } = item.vehicle;
    return `${year} ${make} ${model}`;
    });

    const data = {
        activities: userActivities,
        preferences: userPreferences,
        savedVehicles: savedVehicleTitles
    }
    return data
}



