import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verify } from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken"

interface UserJwtPayload extends JwtPayload {
    id: string
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Get the token from the request headers
        const token = request.headers.get("authorization")?.split(" ")[1]
        if (!token) {
            return NextResponse.json(
                { message: "No token provided" },
                { status: 401 }
            )
        }

        // Verify the token and get user data
        let user: UserJwtPayload
        try {
            user = verify(token, JWT_SECRET) as UserJwtPayload
        } catch (error) {
            console.error("Token verification failed:", error)
            return NextResponse.json(
                { message: "Invalid or expired token" },
                { status: 401 }
            )
        }

        if (!user.id) {
            return NextResponse.json(
                { message: "Invalid token payload" },
                { status: 401 }
            )
        }

        // Get the vehicle ID from the URL
        const vehicleId = params.id

        // Check if the vehicle exists
        const vehicle = await prisma.vehicle.findUnique({
            where: { id: vehicleId },
        })

        if (!vehicle) {
            return NextResponse.json(
                { message: "Vehicle not found" },
                { status: 404 }
            )
        }

        // Check if the vehicle is already saved
        const existingSave = await prisma.savedVehicle.findFirst({
            where: {
                userId: user.id,
                vehicleId: vehicleId,
            },
        })

        try {
            if (existingSave) {
                // If already saved, remove it
                await prisma.savedVehicle.delete({
                    where: { id: existingSave.id },
                })
                return NextResponse.json({
                    saved: false,
                    message: "Vehicle removed from saved"
                })
            } else {
                // If not saved, create a new save
                await prisma.savedVehicle.create({
                    data: {
                        userId: user.id,
                        vehicleId: vehicleId,
                    },
                })
                return NextResponse.json({
                    saved: true,
                    message: "Vehicle saved successfully"
                })
            }
        } catch (error) {
            console.error("Database operation failed:", error)
            return NextResponse.json(
                { message: "Failed to update saved status" },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error("Error in save route:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
} 