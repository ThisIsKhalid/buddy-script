import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth/session";
import { fetchFromBackend, syncUserToInMemoryDb } from "@/lib/api-client/backend-client";

export async function GET() {
  try {
    const userId = await getSessionUserId();
    console.log(`[ME API DEBUG] userId from token: "${userId}"`);
    if (!userId) {
      console.log(`[ME API DEBUG] No userId found in session`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Call backend getMe
    const res = await fetchFromBackend("/auth/me");

    if (!res.ok) {
      console.log(`[ME API DEBUG] Backend /me returned status: ${res.status}`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await res.json();
    const user = data.data;

    // Sync authenticated user to in-memory DB
    syncUserToInMemoryDb(user);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error in auth/me route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred fetching user session" },
      { status: 500 }
    );
  }
}
