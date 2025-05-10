import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getToken } from "next-auth/jwt"

export async function GET(req: Request) {
  try {
    // Get the raw token
    const token = await getToken({ req })

    // Get the session
    const session = await getServerSession(authOptions)

    // Get user from database
    const user = session?.user?.email ? await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    }) : null

    // Get request headers
    const headers = Object.fromEntries(req.headers.entries())

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      token: {
        raw: token,
        role: token?.role,
        id: token?.id,
      },
      session: {
        user: session?.user,
        expires: session?.expires,
      },
      database: {
        user: user,
        role: user?.role,
      },
      request: {
        headers: headers,
        url: req.url,
        method: req.method,
      },
    })
  } catch (error) {
    return NextResponse.json({
      error: "Debug endpoint error",
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 })
  }
} 