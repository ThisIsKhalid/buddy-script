import { NextResponse } from "next/server";
import { LikeRepository } from "@/lib/data/repositories/like.repository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor") || undefined;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    const reactionParam = searchParams.get("reaction");
    const reaction: "like" | "dislike" | undefined =
      reactionParam === "dislike" ? "dislike" : reactionParam === "like" ? "like" : undefined;

    const result = await LikeRepository.findReactorsPage("post", postId, reaction, cursor, limit);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in GET post likers:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred fetching post likers" },
      { status: 500 }
    );
  }
}
