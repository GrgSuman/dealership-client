import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/config/db"

// Ensure this is a POST handler
export const POST = async (req: Request) => {
    try {
        // Log the request
        console.log("Registration request received")

        // Parse request body
        let body
        try {
            body = await req.json()
        } catch (e) {
            console.error("Failed to parse request body:", e)
            return new NextResponse(
                JSON.stringify({ error: "Invalid request body" }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
        }

        const { firstName, lastName, email, password } = body

        // Log the parsed data (excluding password)
        console.log("Registration attempt for:", { firstName, lastName, email })

        // Validate input
        if (!firstName || !lastName || !email || !password) {
            console.log("Missing required fields")
            return new NextResponse(
                JSON.stringify({ error: "All fields are required" }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            console.log("Invalid email format:", email)
            return new NextResponse(
                JSON.stringify({ error: "Invalid email format" }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
        }

        // Validate password strength
        if (password.length < 8) {
            console.log("Password too short")
            return new NextResponse(
                JSON.stringify({ error: "Password must be at least 8 characters long" }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            console.log("User already exists:", email)
            return new NextResponse(
                JSON.stringify({ error: "An account with this email already exists" }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
        }

        // Hash password
        const hashedPassword = await hash(password, 12)

        // Create user
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        })

        console.log("User created successfully:", user.id)

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user

        return new NextResponse(
            JSON.stringify({ user: userWithoutPassword }),
            {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    } catch (error) {
        console.error("Registration error:", error)
        // Add more detailed error logging
        if (error instanceof Error) {
            console.error("Error name:", error.name)
            console.error("Error message:", error.message)
            console.error("Error stack:", error.stack)
        }
        return new NextResponse(
            JSON.stringify({
                error: "Failed to create account. Please try again.",
                details: error instanceof Error ? error.message : "Unknown error"
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    }
} 