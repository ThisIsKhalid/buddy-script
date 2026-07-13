import { Post, User } from "@/types";
import { apiFetch } from "./client";

export async function fetchPostsPage(
  cursor?: string,
  limit = 10
): Promise<{ posts: Post[]; nextCursor: string | null }> {
  let url = `/api/posts?limit=${limit}`;
  if (cursor) {
    url += `&cursor=${encodeURIComponent(cursor)}`;
  }
  return apiFetch(url);
}

export async function createPost(data: {
  text?: string;
  imageUrl: string | null;
  visibility: "public" | "private";
}): Promise<Post> {
  return apiFetch("/api/posts", {
    method: "POST",
    body: data,
  });
}

export async function deletePost(postId: string): Promise<void> {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
}

export async function toggleLikePost(
  postId: string
): Promise<{ isLiked: boolean; likeCount: number }> {
  return apiFetch(`/api/posts/${postId}/like`, {
    method: "POST",
  });
}

export async function fetchPostLikers(
  postId: string,
  cursor?: string,
  limit = 10
): Promise<{ likers: User[]; nextCursor: string | null }> {
  let url = `/api/posts/${postId}/likes?limit=${limit}`;
  if (cursor) {
    url += `&cursor=${encodeURIComponent(cursor)}`;
  }
  return apiFetch(url);
}
