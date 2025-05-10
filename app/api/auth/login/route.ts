import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: "Missing email or password" },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                password: true,
                role: true
            }
        })

        if (!user || !(await compare(password, user.password))) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            )
        }

        // Create JWT token
        const token = sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        )

        // Create response with user data
        const { password: _, ...userData } = user
        const response = NextResponse.json({
            user: userData,
            token,
            isAdmin: user.role === "ADMIN"
        })

        // Set token in httpOnly cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/"
        })

        return response
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
} 