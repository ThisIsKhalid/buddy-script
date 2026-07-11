import { NextResponse } from "next/server";
import { deleteSessionCookie } from "@/lib/auth/session";

export async function POST() {
  try {
    await deleteSessionCookie();
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in logout route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during logout" },
      { status: 500 }
    );
  }
}
