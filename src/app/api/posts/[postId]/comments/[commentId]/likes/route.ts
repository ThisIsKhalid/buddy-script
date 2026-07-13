import { proxyGet } from "@/lib/api-client/proxyHelper";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string; commentId: string }> },
) {
  const { postId, commentId } = await params;
  return proxyGet(`/posts/${postId}/comments/${commentId}/likes`, request, {
    paginationKeys: { arrayKey: "likers" },
  });
}
