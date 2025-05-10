import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import type { NextRequest } from "next/server"

// Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// List of paths that don't require authentication
const publicPaths = [
    "/",
    "/login",
    "/register",
    "/api/auth/login",
    "/api/auth/register",
    "/api/vehicles",
    "/api/vehicles/[id]",
]

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Check if the path is public
    if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
        return NextResponse.next()
    }

    // Get token from Authorization header first, then fall back to cookie
    const authHeader = request.headers.get('Authorization')
    let token = null

    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7).trim()
    } else {
        token = request.cookies.get("token")?.value
    }

    if (!token) {
        // For API routes, return 401
        if (path.startsWith('/api/')) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        // For other routes, redirect to login
        return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
        // Verify token
        const decoded = verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as any

        // Check if user is trying to access admin routes
        if (path.startsWith('/admin') && decoded.role !== 'ADMIN') {
            return NextResponse.redirect(new URL("/", request.url))
        }

        // Add user info to request headers for API routes
        if (path.startsWith('/api/')) {
            const requestHeaders = new Headers(request.headers)
            requestHeaders.set('x-user-id', decoded.id)
            requestHeaders.set('x-user-email', decoded.email)
            requestHeaders.set('x-user-role', decoded.role)

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            })
        }

        return NextResponse.next()
    } catch (error) {
        // For API routes, return 401
        if (path.startsWith('/api/')) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        // For other routes, redirect to login
        return NextResponse.redirect(new URL("/login", request.url))
    }
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
        "/((?!_next/static|_next/image|favicon.ico|public).*)",
    ],
} 