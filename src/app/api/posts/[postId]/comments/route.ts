import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth/session";
import { CommentRepository } from "@/lib/data/repositories/comment.repository";
import { commentSchema } from "@/lib/validation/post.schema";
import { sanitizeText } from "@/lib/utils/sanitize";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor") || undefined;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 5; // Default comments limit is smaller (e.g. 5)

    const currentUserId = await getSessionUserId() || undefined;

    const result = await CommentRepository.findCommentsPage(postId, cursor, limit, currentUserId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in GET comments route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred fetching comments" },
      { status: 500 }
    );
  }
}

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

    const body = await request.json();
    const result = commentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { text } = result.data;
    const sanitizedText = sanitizeText(text);

    const comment = await CommentRepository.create({
      postId,
      authorId: currentUserId,
      text: sanitizedText,
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error in POST comments route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred posting comment" },
      { status: 500 }
    );
  }
}
