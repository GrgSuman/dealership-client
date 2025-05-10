import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get total vehicles
    const totalVehicles = await prisma.vehicle.count({
      where: {
        status: "AVAILABLE",
      },
    })

    // Get active users
    const activeUsers = await prisma.user.count()

    // Get total sales (sum of all sold vehicles)
    const totalSales = await prisma.vehicle.aggregate({
      where: {
        status: "SOLD",
      },
      _sum: {
        price: true,
      },
    })

    // Get recent listings
    const recentListings = await prisma.vehicle.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        make: true,
        model: true,
        year: true,
        price: true,
        status: true,
      },
    })

    return NextResponse.json({
      totalVehicles,
      activeUsers,
      totalSales: totalSales._sum.price || 0,
      pendingReviews: 0, // We'll implement this when we add the review feature
      recentListings: recentListings.map(vehicle => ({
        id: vehicle.id,
        name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        price: vehicle.price,
        status: vehicle.status,
      })),
    })
  } catch (error) {
    console.error("[DASHBOARD_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 