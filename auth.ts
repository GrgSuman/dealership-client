import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "./config/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 5 * 50
    },
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    let existingUser = await prisma.user.findUnique({
                        where: { email: user.email as string },
                    });

                    if (!existingUser) {
                        // Create new user
                        console.log("Creating new user")
                        existingUser = await prisma.user.create({
                            data: {
                                name: user.name as string,
                                email: user.email as string,
                            }
                        })
                    }

                    user.role = existingUser.role
                    user.id = existingUser.id
                    user.accountStatus = existingUser.accountStatus

                    return true
                } catch (error) {
                    console.error("Error in signIn:", error)
                    return false
                }
            }
            return true
        },
        async authorized({ request, auth }) {
            const { pathname } = request.nextUrl


            // private routes and their required roles
            const privateRoutes = [
                { path: "/admin", role: "ADMIN" },
                { path: "/user", role: "USER" }
            ]

            // Check if the current path matches any protected route
            const matchedRoute = privateRoutes.find((route) => pathname.startsWith(route.path))

            if (matchedRoute) {
                // Check if user is logged in and has the correct role
                if (!auth) return false
                return auth.user.role === matchedRoute.role
            }
            // For all other routes, allow access
            return true
        },
        async jwt({ token, user, account }) {
            if (account?.provider === "google") {
                token.role = user.role
                token.id = user.id
                token.accountStatus = user.accountStatus
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role
            session.user.id = token.id
            session.user.accountStatus = token.accountStatus
            return session;
        },
    },
})