import { proxyGet } from "@/lib/api-client/proxyHelper";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  return proxyGet(`/posts/${postId}/likes`, request, {
    paginationKeys: { arrayKey: "likers" },
  });
}
