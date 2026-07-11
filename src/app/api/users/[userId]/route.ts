import { NextResponse } from "next/server";
import { UserRepository } from "@/lib/data/repositories/user.repository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const user = await UserRepository.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { passwordHash: _, ...userWithoutHash } = user;
    return NextResponse.json(userWithoutHash, { status: 200 });
  } catch (error) {
    console.error("Error in GET user route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred fetching user" },
      { status: 500 }
    );
  }
}
