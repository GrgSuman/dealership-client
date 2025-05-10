import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { compare } from "bcrypt"
import { signIn } from "next-auth/react"

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return new NextResponse("Missing email or password", { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                password: true
            }
        })

        if (!user || !(await compare(password, user.password))) {
            return new NextResponse("Invalid credentials", { status: 401 })
        }

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (result?.error) {
            return new NextResponse(result.error, { status: 401 })
        }

        const { password: _, ...userData } = user
        return NextResponse.json(userData)
    } catch (error) {
        console.error("Login error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
} 