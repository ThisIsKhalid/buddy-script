import { setSessionCookie } from "@/lib/auth/session";
import { getBackendUrl } from "@/lib/config/backend";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const backendUrl = getBackendUrl();

    const res = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Invalid email or password" },
        { status: res.status },
      );
    }

    const { accessToken, refreshToken, user } = data.data;

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

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login" },
      { status: 500 },
    );
  }
}
