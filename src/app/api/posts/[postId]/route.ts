import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth/session";
import { PostRepository } from "@/lib/data/repositories/post.repository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const currentUserId = await getSessionUserId() || undefined;

    const post = await PostRepository.findById(postId, currentUserId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error in GET post by ID:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const currentUserId = await getSessionUserId();
    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const success = await PostRepository.delete(postId, currentUserId);
    if (!success) {
      return NextResponse.json(
        { error: "Post not found or unauthorized to delete" },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE post:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred deleting post" },
      { status: 500 }
    );
  }
}
