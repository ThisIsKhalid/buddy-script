import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth/session";
import { PostRepository } from "@/lib/data/repositories/post.repository";
import { createPostSchema } from "@/lib/validation/post.schema";
import { sanitizeText } from "@/lib/utils/sanitize";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor") || undefined;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 10;

    const currentUserId = await getSessionUserId() || undefined;

    const result = await PostRepository.findFeedPage(cursor, limit, currentUserId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in GET posts route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred fetching posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const currentUserId = await getSessionUserId();
    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = createPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { text, imageUrl, visibility } = result.data;
    const sanitizedText = sanitizeText(text);

    const post = await PostRepository.create({
      authorId: currentUserId,
      text: sanitizedText,
      imageUrl: imageUrl || null,
      visibility,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error in POST posts route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred creating post" },
      { status: 500 }
    );
  }
}
