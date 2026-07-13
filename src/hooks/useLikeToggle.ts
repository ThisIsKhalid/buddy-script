"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikePost } from "@/lib/api-client/posts";
import { toggleLikeComment, toggleLikeReply } from "@/lib/api-client/comments";
import { useAuthStore } from "@/store/auth.store";
import { setPersistedLikeState } from "@/lib/like-state";
import type { CommentsCache, PostsCache, RepliesCache } from "@/lib/query-cache-types";

interface UseLikeToggleProps {
  targetType: "post" | "comment" | "reply";
  postId: string;
  commentId?: string;
  replyId?: string;
}

export function useLikeToggle({ targetType, postId, commentId, replyId }: UseLikeToggleProps) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const getTargetId = () => {
    if (targetType === "post") return postId;
    if (targetType === "comment") return commentId;
    return replyId;
  };

  const applyLikeState = (isLiked: boolean, likeCount: number) => {
    if (targetType === "post") {
      queryClient.setQueryData<PostsCache>(["posts"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) =>
              post.id === postId ? { ...post, isLikedByMe: isLiked, likeCount } : post
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
              comment.id === commentId ? { ...comment, isLikedByMe: isLiked, likeCount } : comment
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
              reply.id === replyId ? { ...reply, isLikedByMe: isLiked, likeCount } : reply
            ),
          })),
        };
      });
    }
  };

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
    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["posts"] }),
        queryClient.cancelQueries({ queryKey: ["comments", postId] }),
        commentId
          ? queryClient.cancelQueries({ queryKey: ["replies", commentId] })
          : Promise.resolve(),
      ]);

      const previousPosts = queryClient.getQueryData<PostsCache>(["posts"]);
      const previousComments = queryClient.getQueryData<CommentsCache>(["comments", postId]);
      const previousReplies = commentId
        ? queryClient.getQueryData<RepliesCache>(["replies", commentId])
        : undefined;

      if (targetType === "post") {
        const post = previousPosts?.pages
          .flatMap((page) => page.posts)
          .find((item) => item.id === postId);
        if (post) {
          const nextLiked = !post.isLikedByMe;
          setPersistedLikeState(user?.id, targetType, getTargetId(), nextLiked);
          applyLikeState(nextLiked, Math.max(0, post.likeCount + (nextLiked ? 1 : -1)));
        }
      } else if (targetType === "comment" && commentId) {
        const comment = previousComments?.pages
          .flatMap((page) => page.comments)
          .find((item) => item.id === commentId);
        if (comment) {
          const nextLiked = !comment.isLikedByMe;
          setPersistedLikeState(user?.id, targetType, getTargetId(), nextLiked);
          applyLikeState(nextLiked, Math.max(0, comment.likeCount + (nextLiked ? 1 : -1)));
        }
      } else if (targetType === "reply" && replyId) {
        const reply = previousReplies?.pages
          .flatMap((page) => page.replies)
          .find((item) => item.id === replyId);
        if (reply) {
          const nextLiked = !reply.isLikedByMe;
          setPersistedLikeState(user?.id, targetType, getTargetId(), nextLiked);
          applyLikeState(nextLiked, Math.max(0, reply.likeCount + (nextLiked ? 1 : -1)));
        }
      }

      return { previousPosts, previousComments, previousReplies };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
        const post = context.previousPosts.pages
          .flatMap((page) => page.posts)
          .find((item) => item.id === postId);
        if (post) {
          setPersistedLikeState(user?.id, "post", postId, post.isLikedByMe);
        }
      }
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", postId], context.previousComments);
        if (commentId) {
          const comment = context.previousComments.pages
            .flatMap((page) => page.comments)
            .find((item) => item.id === commentId);
          if (comment) {
            setPersistedLikeState(user?.id, "comment", commentId, comment.isLikedByMe);
          }
        }
      }
      if (context?.previousReplies && commentId) {
        queryClient.setQueryData(["replies", commentId], context.previousReplies);
        if (replyId) {
          const reply = context.previousReplies.pages
            .flatMap((page) => page.replies)
            .find((item) => item.id === replyId);
          if (reply) {
            setPersistedLikeState(user?.id, "reply", replyId, reply.isLikedByMe);
          }
        }
      }
    },
    onSuccess: (data) => {
      const { isLiked, likeCount } = data as { isLiked: boolean; likeCount: number };
      setPersistedLikeState(user?.id, targetType, getTargetId(), isLiked);
      applyLikeState(isLiked, likeCount);
    },
  });
}
