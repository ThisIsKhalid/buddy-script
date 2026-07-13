"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikePost } from "@/lib/api-client/posts";
import { toggleLikeComment, toggleLikeReply } from "@/lib/api-client/comments";
import type { CommentsCache, PostsCache, RepliesCache } from "@/lib/query-cache-types";

interface UseLikeToggleProps {
  targetType: "post" | "comment" | "reply";
  postId: string;
  commentId?: string;
  replyId?: string;
}

export function useLikeToggle({ targetType, postId, commentId, replyId }: UseLikeToggleProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (targetType === "post") {
        return toggleLikePost(postId);
      } else if (targetType === "comment" && commentId) {
        return toggleLikeComment(postId, commentId);
      } else if (targetType === "reply" && commentId && replyId) {
        return toggleLikeReply(postId, commentId, replyId);
      }
      throw new Error("Invalid toggle arguments");
    },
    onSuccess: (data) => {
      const { isLiked, likeCount } = data as { isLiked: boolean; likeCount: number };

      if (targetType === "post") {
        queryClient.setQueryData<PostsCache>(["posts"], (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post) =>
                post.id === postId
                  ? { ...post, isLikedByMe: isLiked, likeCount }
                  : post
              ),
            })),
          };
        });
      } else if (targetType === "comment" && commentId) {
        queryClient.setQueryData<CommentsCache>(["comments", postId], (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              comments: page.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, isLikedByMe: isLiked, likeCount }
                  : comment
              ),
            })),
          };
        });
      } else if (targetType === "reply" && commentId && replyId) {
        queryClient.setQueryData<RepliesCache>(["replies", commentId], (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              replies: page.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, isLikedByMe: isLiked, likeCount }
                  : reply
              ),
            })),
          };
        });
      }
    },
  });
}
