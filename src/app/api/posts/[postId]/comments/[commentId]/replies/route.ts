import { proxyGet, proxyMutate } from "@/lib/api-client/proxyHelper";
import { getSessionUserId } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string; commentId: string }> },
) {
  const { postId, commentId } = await params;
  return proxyGet(`/posts/${postId}/comments/${commentId}/replies`, request, {
    paginationKeys: { arrayKey: "replies" },
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ postId: string; commentId: string }> },
) {
  const userId = await getSessionUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { postId, commentId } = await params;
  return proxyMutate(`/posts/${postId}/comments/${commentId}/replies`, request);
}
