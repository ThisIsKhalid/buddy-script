import { NextResponse } from "next/server";
import { LikeRepository } from "@/lib/data/repositories/like.repository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string; commentId: string }> }
) {
  try {
    const { commentId } = await params;
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor") || undefined;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 10;

    const result = await LikeRepository.findReactorsPage("comment", commentId, "like", cursor, limit);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in GET comment likers:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred fetching comment likers" },
      { status: 500 }
    );
  }
}
