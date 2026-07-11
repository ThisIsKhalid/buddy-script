import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth/session";
import { LikeRepository } from "@/lib/data/repositories/like.repository";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ postId: string; commentId: string }> }
) {
  try {
    const { commentId } = await params;
    const currentUserId = await getSessionUserId();
    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await LikeRepository.toggleLike(currentUserId, "comment", commentId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in POST comment like:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred toggling comment like" },
      { status: 500 }
    );
  }
}
