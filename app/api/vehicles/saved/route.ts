import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

interface SavedVehicle {
    id: string
    vehicleId: string
    userId: string
    vehicle: {
        id: string
        make: string
        model: string
        year: number
        price: number
        bodyType: string
        transmission: string
        fuelType: string
        odometer: number
        color: string
        stockNumber: string
        description: string
        features: string[]
        images: string[]
        status: string
        condition: string
    }
}

export async function GET() {
    try {
        // Get token from cookie
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value

        if (!token) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // Verify token
        const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key") as { userId: string }
        const userId = decoded.userId

        // Get all saved vehicles for the current user
        const savedVehicles = await prisma.savedVehicle.findMany({
            where: {
                userId,
            },
            include: {
                vehicle: true,
            },
        })

        // Transform the data to match the expected format
        const vehicles = savedVehicles.map((saved: SavedVehicle) => ({
            ...saved.vehicle,
            isSaved: true,
        }))

        return NextResponse.json(vehicles)
    } catch (error) {
        console.error("Error fetching saved vehicles:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
} 