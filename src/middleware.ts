import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./config/auth.config";

const { auth } = NextAuth(authConfig);

export default async function middleware(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = session.user as any;
    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute && user.role !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware auth error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/admin"],
};
