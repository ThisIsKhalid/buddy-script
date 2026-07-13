import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSessionCookie } from "@/lib/auth/session";
import { fetchFromBackend } from "@/lib/api-client/backend-client";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // Call backend logout
    await fetchFromBackend("/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    // Clear cookies on frontend
    await deleteSessionCookie();
    const nextCookies = await cookies();
    nextCookies.delete("refreshToken");

    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in logout route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during logout" },
      { status: 500 }
    );
  }
}
