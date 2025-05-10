import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    console.log('Save vehicle request received for ID:', params.id)
    console.log('Request headers:', Object.fromEntries(request.headers.entries()))

    try {
        // Get token from cookie
        const cookieStore = await cookies()
        let token = cookieStore.get("token")?.value

        // If no token in cookie, try to get it from Authorization header
        if (!token) {
            const authHeader = request.headers.get('Authorization')
            if (authHeader?.startsWith('Bearer ')) {
                token = authHeader.substring(7)
            }
        }

        console.log('Token found:', !!token)
        if (token) {
            console.log('Token value:', token)
            console.log('JWT_SECRET:', JWT_SECRET)
        }

        if (!token) {
            console.error("No token found in cookies or Authorization header")
            return new NextResponse("Unauthorized - No token", { status: 401 })
        }

        // Verify token
        try {
            console.log('Verifying token...')
            const decoded = verify(token, JWT_SECRET) as { userId: string; email: string }
            console.log('Token decoded successfully:', decoded)

            if (!decoded.userId) {
                console.error("Invalid token payload - missing userId")
                return new NextResponse("Unauthorized - Invalid token payload", { status: 401 })
            }

            // Verify user exists
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId }
            })

            if (!user) {
                console.error("User not found for token userId:", decoded.userId)
                return new NextResponse("Unauthorized - User not found", { status: 401 })
            }

            console.log('User verified:', { id: user.id, email: user.email })

            const userId = decoded.userId
            const vehicleId = params.id

            console.log('Checking for existing save...')
            // Check if the vehicle is already saved
            const existingSave = await prisma.savedVehicle.findFirst({
                where: {
                    vehicleId,
                    userId,
                },
            })

            console.log('Existing save found:', !!existingSave)

            if (existingSave) {
                // If already saved, remove it
                console.log('Removing existing save...')
                await prisma.savedVehicle.delete({
                    where: {
                        id: existingSave.id,
                    },
                })
                console.log('Save removed successfully')
                return NextResponse.json({ saved: false })
            } else {
                // If not saved, create a new save
                console.log('Creating new save...')
                await prisma.savedVehicle.create({
                    data: {
                        vehicleId,
                        userId,
                    },
                })
                console.log('Save created successfully')
                return NextResponse.json({ saved: true })
            }
        } catch (verifyError) {
            console.error("Token verification error:", verifyError)
            if (verifyError instanceof Error) {
                console.error("Verification error details:", {
                    name: verifyError.name,
                    message: verifyError.message,
                    stack: verifyError.stack
                })
            }
            return new NextResponse("Unauthorized - Invalid token", { status: 401 })
        }
    } catch (error) {
        console.error("Error saving vehicle:", error)
        // Log more details about the error
        if (error instanceof Error) {
            console.error("Error name:", error.name)
            console.error("Error message:", error.message)
            console.error("Error stack:", error.stack)
        }
        return new NextResponse("Internal Server Error", { status: 500 })
    }
} 