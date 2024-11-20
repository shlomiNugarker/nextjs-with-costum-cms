/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUser } from "@/services/db/repositories/userRepository";
import { compare } from "bcrypt-ts";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    id: string;
    email?: string | null;
    username?: string | null;
    role: "Admin" | "User";
  }

  interface Session {
    user: User;
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize({ email, password }) {
        const user = await getUser(email as string);
        if (!user) return null;
        const passwordsMatch = await compare(
          password as string,
          user.password!
        );

        if (passwordsMatch) return user as any;
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token?.role) {
        session.user = session.user || {};
        session.user.role = token.role;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminUser = auth?.user.role === "Admin";
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      if ((isOnAdmin && !isLoggedIn) || !isAdminUser) {
        return false;
      }
      if (isOnAdmin && isAdminUser) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/login", nextUrl));
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },
} satisfies NextAuthConfig;
