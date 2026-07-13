import { proxyGet, proxyMutate } from "@/lib/api-client/proxyHelper";
import { getSessionUserId } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  return proxyGet(`/posts/${postId}/comments`, request, {
    paginationKeys: { arrayKey: "comments" },
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const userId = await getSessionUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { postId } = await params;
  return proxyMutate(`/posts/${postId}/comments`, request);
}
