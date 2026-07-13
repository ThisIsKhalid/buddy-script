import { fetchFromBackend } from "@/lib/api-client/backend-client";
import { getSessionUserId } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getSessionUserId();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const res = await fetchFromBackend("/auth/me");
    if (!res.ok)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await res.json();
    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    console.error("Error in auth/me route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred fetching user session" },
      { status: 500 },
    );
  }
}
