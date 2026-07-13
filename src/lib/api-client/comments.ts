import { Comment, Reply, User } from "@/types";
import { apiFetch } from "./client";

export async function fetchCommentsPage(
  postId: string,
  cursor?: string,
  limit = 5
): Promise<{ comments: Comment[]; nextCursor: string | null }> {
  let url = `/api/posts/${postId}/comments?limit=${limit}`;
  if (cursor) {
    url += `&cursor=${encodeURIComponent(cursor)}`;
  }
  return apiFetch(url);
}

export async function createComment(
  postId: string,
  text: string
): Promise<Comment> {
  return apiFetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    body: { text },
  });
}

export async function toggleLikeComment(
  postId: string,
  commentId: string
): Promise<{ isLiked: boolean; likeCount: number }> {
  return apiFetch(`/api/posts/${postId}/comments/${commentId}/like`, {
    method: "POST",
  });
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
  return apiFetch(url);
}

export async function createReply(
  postId: string,
  commentId: string,
  text: string
): Promise<Reply> {
  return apiFetch(`/api/posts/${postId}/comments/${commentId}/replies`, {
    method: "POST",
    body: { text },
  });
}

export async function toggleLikeReply(
  postId: string,
  commentId: string,
  replyId: string
): Promise<{ isLiked: boolean; likeCount: number }> {
  return apiFetch(`/api/posts/${postId}/comments/${commentId}/replies/${replyId}/like`, {
    method: "POST",
  });
}

export async function fetchCommentLikers(
  postId: string,
  commentId: string,
  cursor?: string,
  limit = 10
): Promise<{ likers: User[]; nextCursor: string | null }> {
  let url = `/api/posts/${postId}/comments/${commentId}/likes?limit=${limit}`;
  if (cursor) url += `&cursor=${encodeURIComponent(cursor)}`;
  return apiFetch(url);
}

export async function fetchReplyLikers(
  postId: string,
  commentId: string,
  replyId: string,
  cursor?: string,
  limit = 10
): Promise<{ likers: User[]; nextCursor: string | null }> {
  let url = `/api/posts/${postId}/comments/${commentId}/replies/${replyId}/likes?limit=${limit}`;
  if (cursor) url += `&cursor=${encodeURIComponent(cursor)}`;
  return apiFetch(url);
}
