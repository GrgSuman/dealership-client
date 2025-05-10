import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Not authenticated", { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    return NextResponse.json({
      sessionRole: session.user.role,
      databaseRole: user.role,
      user: user,
    })
  } catch (error) {
    console.error("[CHECK_ROLE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 