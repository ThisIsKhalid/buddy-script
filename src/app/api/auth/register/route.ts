import { setSessionCookie } from "@/lib/auth/session";
import { getBackendUrl } from "@/lib/config/backend";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    const backendUrl = getBackendUrl();

    const regRes = await fetch(`${backendUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const regData = await regRes.json();
    if (!regRes.ok) {
      return NextResponse.json(
        { error: regData.message || "Registration failed" },
        { status: regRes.status },
      );
    }

    // Auto-login after successful registration
    const loginRes = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (loginRes.ok) {
      const loginData = await loginRes.json();
      const { accessToken, refreshToken, user } = loginData.data;

      await setSessionCookie(accessToken);
      const cookieStore = await cookies();
      cookieStore.set({
        name: "refreshToken",
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json(user, { status: 201 });
    }

    return NextResponse.json(regData.data, { status: 201 });
  } catch (error) {
    console.error("Error in registration route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during registration" },
      { status: 500 },
    );
  }
}
