import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth/session";
import { LikeRepository } from "@/lib/data/repositories/like.repository";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const currentUserId = await getSessionUserId();
    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const reaction: "like" | "dislike" = body.reaction === "dislike" ? "dislike" : "like";

    const result = await LikeRepository.toggleReaction(currentUserId, "post", postId, reaction);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in POST post like:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred toggling post like" },
      { status: 500 }
    );
  }
}
