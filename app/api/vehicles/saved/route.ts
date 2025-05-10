import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verify } from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken"

interface UserJwtPayload extends JwtPayload {
    id: string
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: Request) {
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

        // Get saved vehicles for the user
        const savedVehicles = await prisma.savedVehicle.findMany({
            where: {
                userId: user.id
            },
            include: {
                vehicle: true
            }
        })

        return NextResponse.json(savedVehicles)
    } catch (error) {
        console.error("Error fetching saved vehicles:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
} 