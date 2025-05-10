import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // Get saved vehicles for the user
        const savedVehicles = await prisma.savedVehicle.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                vehicle: true
            },
        })

        return NextResponse.json(savedVehicles)
    } catch (error) {
        console.error("Error fetching saved vehicles:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
} 