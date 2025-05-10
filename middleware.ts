import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export function middleware(request: NextRequest) {
    // Skip middleware for API routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.next()
    }

    const token = request.cookies.get("token")?.value

    // List of paths that require authentication
    const protectedPaths = ["/dashboard", "/profile", "/cars/new"]
    const isProtectedPath = protectedPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    )

    if (isProtectedPath) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url))
        }

        try {
            // Verify token
            verify(token, JWT_SECRET)
            return NextResponse.next()
        } catch (error) {
            // Token is invalid
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    // List of paths that should redirect to dashboard if user is authenticated
    const authPaths = ["/login", "/signup"]
    const isAuthPath = authPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    )

    if (isAuthPath && token) {
        try {
            // Verify token
            verify(token, JWT_SECRET)
            return NextResponse.redirect(new URL("/", request.url))
        } catch (error) {
            // Token is invalid, clear it
            const response = NextResponse.next()
            response.cookies.delete("token")
            return response
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
} 