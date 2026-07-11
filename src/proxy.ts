import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./lib/auth/jwt";
import { db } from "./lib/data/db";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtectedRoute = pathname.startsWith("/feed");

  // Verify JWT
  let userId: string | null = null;
  if (token) {
    const payload = await verifyJWT(token);
    if (payload) {
      // Check if user actually exists in database
      const userExists = db.users.some((u) => u.id === payload.userId);
      if (userExists) {
        userId = payload.userId;
      } else {
        console.log(`[PROXY DEBUG] Token has userId "${payload.userId}" but user is not in database!`);
      }
    }
  }

  console.log(`[PROXY DEBUG] Pathname: "${pathname}", isProtectedRoute: ${isProtectedRoute}, hasToken: ${!!token}, userId: "${userId}"`);

  if (userId) {
    // Redirect authenticated users away from login/register to the feed page
    if (isAuthRoute) {
      console.log(`[PROXY DEBUG] Authenticated user on auth route -> redirect to /feed`);
      return NextResponse.redirect(new URL("/feed", request.url));
    }
    // Redirect root landing to feed
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
  } else {
    // Redirect unauthenticated users trying to access protected routes to login
    if (isProtectedRoute) {
      console.log(`[PROXY DEBUG] Unauthenticated user on protected route -> redirect to /login`);
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Redirect root landing to login
    if (pathname === "/") {
      console.log(`[PROXY DEBUG] Unauthenticated user on root -> redirect to /login`);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  console.log(`[PROXY DEBUG] Fallback NextResponse.next()`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - assets (design assets)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|assets|favicon.ico).*)",
  ],
};
