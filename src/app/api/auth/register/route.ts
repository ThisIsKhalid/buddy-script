import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { registerSchema } from "@/lib/validation/auth.schema";
import { setSessionCookie } from "@/lib/auth/session";
import { syncUserToInMemoryDb } from "@/lib/api-client/backend-client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password } = result.data;

    // 1. Call backend register
    const regRes = await fetch("http://localhost:8000/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const regData = await regRes.json();

    if (!regRes.ok) {
      return NextResponse.json(
        { error: regData.message || "Registration failed" },
        { status: regRes.status }
      );
    }

    // 2. Call backend login for auto-login
    const loginRes = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (loginRes.ok) {
      const loginData = await loginRes.json();
      const { accessToken, refreshToken, user } = loginData.data;

      // Set cookies
      await setSessionCookie(accessToken);
      const cookieStore = await cookies();
      cookieStore.set({
        name: "refreshToken",
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      // Sync authenticated user to in-memory DB
      syncUserToInMemoryDb(user);

      return NextResponse.json(user, { status: 201 });
    }

    // Return register success user details if login failed
    return NextResponse.json(regData.data, { status: 201 });
  } catch (error) {
    console.error("Error in registration route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during registration" },
      { status: 500 }
    );
  }
}
