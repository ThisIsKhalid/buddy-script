import { Post, User } from "@/types";

export async function fetchPostsPage(
  cursor?: string,
  limit = 10
): Promise<{ posts: Post[]; nextCursor: string | null }> {
  let url = `/api/posts?limit=${limit}`;
  if (cursor) {
    url += `&cursor=${encodeURIComponent(cursor)}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch posts feed");
  return res.json();
}

export async function createPost(data: {
  text: string;
  imageUrl: string | null;
  visibility: "public" | "private";
}): Promise<Post> {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to create post");
  }
  return res.json();
}

export async function deletePost(postId: string): Promise<void> {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
}

export async function toggleLikePost(
  postId: string,
  reaction: "like" | "dislike" = "like"
): Promise<{ isLiked: boolean; isDisliked: boolean; likeCount: number; dislikeCount: number }> {
  const res = await fetch(`/api/posts/${postId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reaction }),
  });
  if (!res.ok) throw new Error("Failed to toggle post like");
  return res.json();
}

export async function fetchPostLikers(
  postId: string,
  cursor?: string,
  limit = 10,
  reaction?: "like" | "dislike"
): Promise<{ likers: User[]; nextCursor: string | null }> {
  let url = `/api/posts/${postId}/likes?limit=${limit}`;
  if (cursor) {
    url += `&cursor=${encodeURIComponent(cursor)}`;
  }
  if (reaction) {
    url += `&reaction=${reaction}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch post likers");
  return res.json();
}
