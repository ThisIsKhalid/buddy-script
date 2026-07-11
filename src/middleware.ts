import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./lib/auth/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtectedRoute = pathname.startsWith("/feed");

  // Verify JWT
  let userId: string | null = null;
  if (token) {
    const payload = await verifyJWT(token);
    if (payload) {
      userId = payload.userId;
    }
  }

  if (userId) {
    // Redirect authenticated users away from login/register to the feed page
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
    // Redirect root landing to feed
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
  } else {
    // Redirect unauthenticated users trying to access protected routes to login
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Redirect root landing to login
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

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
