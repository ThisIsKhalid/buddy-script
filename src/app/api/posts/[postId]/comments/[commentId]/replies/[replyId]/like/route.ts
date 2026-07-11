import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth/session";
import { LikeRepository } from "@/lib/data/repositories/like.repository";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ postId: string; commentId: string; replyId: string }> }
) {
  try {
    const { replyId } = await params;
    const currentUserId = await getSessionUserId();
    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await LikeRepository.toggleLike(currentUserId, "reply", replyId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in POST reply like:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred toggling reply like" },
      { status: 500 }
    );
  }
}
