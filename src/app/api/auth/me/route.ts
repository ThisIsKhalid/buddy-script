import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth/session";
import { UserRepository } from "@/lib/data/repositories/user.repository";

export async function GET() {
  try {
    const userId = await getSessionUserId();
    console.log(`[ME API DEBUG] userId: "${userId}"`);
    if (!userId) {
      console.log(`[ME API DEBUG] No userId found in session`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await UserRepository.findById(userId);
    console.log(`[ME API DEBUG] user found: ${!!user}`);
    if (!user) {
      console.log(`[ME API DEBUG] User not found in database`);
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const { passwordHash: _, ...userWithoutHash } = user;
    return NextResponse.json(userWithoutHash, { status: 200 });
  } catch (error) {
    console.error("Error in auth/me route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred fetching user session" },
      { status: 500 }
    );
  }
}
