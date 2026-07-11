import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth/session";
import { UserRepository } from "@/lib/data/repositories/user.repository";

export async function GET() {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await UserRepository.findById(userId);
    if (!user) {
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
