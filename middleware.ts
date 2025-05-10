import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = token?.role === "ADMIN"
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
    const isUserRoute = !isAdminRoute && req.nextUrl.pathname !== "/"

    // If admin user tries to access user routes, redirect to admin dashboard
    if (isAdmin && isUserRoute) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }

    // If non-admin user tries to access admin routes, redirect to home
    if (!isAdmin && isAdminRoute) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    // If admin user is on home page, redirect to admin dashboard
    if (isAdmin && req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/admin", req.url))
    }

    // Allow access if the above conditions are not met
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      }
    },
  }
)

export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/api/admin/:path*",
    "/vehicles/:path*",
    "/profile/:path*",
    "/favorites/:path*",
    "/search/:path*"
  ]
} 