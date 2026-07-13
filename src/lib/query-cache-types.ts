import type { InfiniteData } from "@tanstack/react-query";
import type { Comment, Post, Reply } from "@/types";

export type PostsCache = InfiniteData<{
  posts: Post[];
  nextCursor: string | null;
}>;

export type CommentsCache = InfiniteData<{
  comments: Comment[];
  nextCursor: string | null;
}>;

export type RepliesCache = InfiniteData<{
  replies: Reply[];
  nextCursor: string | null;
}>;
