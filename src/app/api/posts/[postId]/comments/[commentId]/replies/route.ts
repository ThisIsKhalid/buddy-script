import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth/session";
import { ReplyRepository } from "@/lib/data/repositories/reply.repository";
import { replySchema } from "@/lib/validation/post.schema";
import { sanitizeText } from "@/lib/utils/sanitize";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string; commentId: string }> }
) {
  try {
    const { commentId } = await params;
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor") || undefined;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 5;

    const currentUserId = await getSessionUserId() || undefined;

    const result = await ReplyRepository.findRepliesPage(commentId, cursor, limit, currentUserId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in GET replies route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred fetching replies" },
      { status: 500 }
    );
  }
}

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

    const body = await request.json();
    const result = replySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { text } = result.data;
    const sanitizedText = sanitizeText(text);

    const reply = await ReplyRepository.create({
      commentId,
      authorId: currentUserId,
      text: sanitizedText,
    });

    return NextResponse.json(reply, { status: 201 });
  } catch (error) {
    console.error("Error in POST replies route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred posting reply" },
      { status: 500 }
    );
  }
}
