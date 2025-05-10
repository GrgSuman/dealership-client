// import NextAuth, { NextAuthOptions } from "next-auth";
// import { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "@/config/db";

// export const authOptions: NextAuthOptions = {
//     session: {
//         strategy: "jwt",
//     },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     async signIn({account, profile}) {
//         if (!profile?.email) {
//             throw new Error("Missing email for Google sign in");
//         }
//         await prisma.user.upsert({
//             where: {
//                 email: profile.email,
//             },
//             create: {
//                 email: profile.email,
//                 name: profile.name,
//                 password: "",
//             },
//             update: {
//                 name: profile.name,
//             },
         
//         });
//         return true;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }; 

import { prisma } from '@/lib/prisma'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role?: string
  }
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile')
      }

      const user = await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name,
          password: "",
          role: "USER", // Default role for new users
        },
        update: {
          name: profile.name,
        },
      })

      return true
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role || "USER" // Ensure role is set
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      if (profile?.email) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
          select: {
            id: true,
            role: true,
          },
        })
        
        if (dbUser) {
          token.id = dbUser.id
          token.role = dbUser.role
        }
      }
      return token
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/',
    error: '/error',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }