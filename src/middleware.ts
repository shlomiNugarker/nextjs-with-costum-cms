import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./config/auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  if (isAdminRoute && (session.user as any).role !== "Admin") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/api/:path*",
    "/admin/:path*",
    "/admin",
    // "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
