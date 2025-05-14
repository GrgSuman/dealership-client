// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
    accountStatus?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      accountStatus: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    accountStatus?: string;
  }
}