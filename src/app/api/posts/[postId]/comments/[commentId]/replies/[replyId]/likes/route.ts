import { proxyGet } from "@/lib/api-client/proxyHelper";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ postId: string; commentId: string; replyId: string }>;
  },
) {
  const { postId, commentId, replyId } = await params;
  return proxyGet(
    `/posts/${postId}/comments/${commentId}/replies/${replyId}/likes`,
    request,
    { paginationKeys: { arrayKey: "likers" } },
  );
}
