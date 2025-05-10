import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const vehicleId = params.id

        // Check if vehicle exists
        const vehicle = await prisma.vehicle.findUnique({
            where: { id: vehicleId },
        })

        if (!vehicle) {
            return new NextResponse("Vehicle not found", { status: 404 })
        }

        // Check if vehicle is already saved
        const existingSave = await prisma.savedVehicle.findFirst({
            where: {
                userId: session.user.id,
                vehicleId: vehicleId,
            },
        })

        if (existingSave) {
            // Remove save
            await prisma.savedVehicle.delete({
                where: { id: existingSave.id },
            })
            return NextResponse.json({ saved: false })
        }

        // Save vehicle
        await prisma.savedVehicle.create({
            data: {
                userId: session.user.id,
                vehicleId: vehicleId,
            },
        })

        return NextResponse.json({ saved: true })
    } catch (error) {
        console.error("Error saving vehicle:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
} 