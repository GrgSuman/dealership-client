import { NextResponse } from "next/server"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
    try {
        console.log('Login request received')
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            console.error('Missing email or password')
            return new NextResponse("Missing email or password", { status: 400 })
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            console.error('User not found:', email)
            return new NextResponse("Invalid credentials", { status: 401 })
        }

        // Verify password
        const isValid = await compare(password, user.password)

        if (!isValid) {
            console.error('Invalid password for user:', email)
            return new NextResponse("Invalid credentials", { status: 401 })
        }

        // Create token
        const token = sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        )

        console.log('Token created for user:', { id: user.id, email: user.email })

        // Create response
        const response = NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        })

        // Set token cookie with updated settings
        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: false, // Set to false for local development
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        })

        console.log('Login successful, token set in cookie')
        return response
    } catch (error) {
        console.error("Login error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
} 