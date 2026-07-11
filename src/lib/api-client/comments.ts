import { Comment, Reply } from "@/types";

export async function fetchCommentsPage(
  postId: string,
  cursor?: string,
  limit = 5
): Promise<{ comments: Comment[]; nextCursor: string | null }> {
  let url = `/api/posts/${postId}/comments?limit=${limit}`;
  if (cursor) {
    url += `&cursor=${encodeURIComponent(cursor)}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export async function createComment(
  postId: string,
  text: string
): Promise<Comment> {
  const res = await fetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return res.json();
}

export async function toggleLikeComment(
  postId: string,
  commentId: string
): Promise<{ isLiked: boolean; likeCount: number }> {
  const res = await fetch(`/api/posts/${postId}/comments/${commentId}/like`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to toggle comment like");
  return res.json();
}

export async function fetchRepliesPage(
  postId: string,
  commentId: string,
  cursor?: string,
  limit = 5
): Promise<{ replies: Reply[]; nextCursor: string | null }> {
  let url = `/api/posts/${postId}/comments/${commentId}/replies?limit=${limit}`;
  if (cursor) {
    url += `&cursor=${encodeURIComponent(cursor)}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch replies");
  return res.json();
}

export async function createReply(
  postId: string,
  commentId: string,
  text: string
): Promise<Reply> {
  const res = await fetch(`/api/posts/${postId}/comments/${commentId}/replies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to post reply");
  return res.json();
}

export async function toggleLikeReply(
  postId: string,
  commentId: string,
  replyId: string
): Promise<{ isLiked: boolean; likeCount: number }> {
  const res = await fetch(`/api/posts/${postId}/comments/${commentId}/replies/${replyId}/like`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to toggle reply like");
  return res.json();
}
