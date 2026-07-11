"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikePost } from "@/lib/api-client/posts";
import { toggleLikeComment, toggleLikeReply } from "@/lib/api-client/comments";

interface UseLikeToggleProps {
  targetType: "post" | "comment" | "reply";
  postId: string;
  commentId?: string;
  replyId?: string;
  reaction?: "like" | "dislike";
}

export function useLikeToggle({
  targetType,
  postId,
  commentId,
  replyId,
  reaction = "like",
}: UseLikeToggleProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (targetType === "post") {
        return toggleLikePost(postId, reaction);
      } else if (targetType === "comment" && commentId) {
        return toggleLikeComment(postId, commentId);
      } else if (targetType === "reply" && commentId && replyId) {
        return toggleLikeReply(postId, commentId, replyId);
      }
      throw new Error("Invalid toggle arguments");
    },
    onSuccess: (data) => {
      if (targetType === "post") {
        const { isLiked, isDisliked, likeCount, dislikeCount } = data as {
          isLiked: boolean;
          isDisliked: boolean;
          likeCount: number;
          dislikeCount: number;
        };

        // Update post in the infinite scroll feed cache
        queryClient.setQueryData(["posts"], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              posts: page.posts.map((post: any) =>
                post.id === postId
                  ? { ...post, isLikedByMe: isLiked, isDislikedByMe: isDisliked, likeCount, dislikeCount }
                  : post
              ),
            })),
          };
        });
      } else if (targetType === "comment" && commentId) {
        const { isLiked, likeCount } = data as { isLiked: boolean; likeCount: number };

        // Update comment in the post's comments cache
        queryClient.setQueryData(["comments", postId], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              comments: page.comments.map((comment: any) =>
                comment.id === commentId
                  ? { ...comment, isLikedByMe: isLiked, likeCount }
                  : comment
              ),
            })),
          };
        });
      } else if (targetType === "reply" && commentId && replyId) {
        const { isLiked, likeCount } = data as { isLiked: boolean; likeCount: number };

        // Update reply in the comment's replies cache
        queryClient.setQueryData(["replies", commentId], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              replies: page.replies.map((reply: any) =>
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
