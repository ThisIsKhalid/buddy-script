import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRepliesPage, createReply } from "@/lib/api-client/comments";
import { useAuthStore } from "@/store/auth.store";
import type { CommentsCache, RepliesCache } from "@/lib/query-cache-types";
import type { Reply } from "@/types";

export function useReplies(postId: string, commentId: string) {
  return useInfiniteQuery({
    queryKey: ["replies", commentId],
    queryFn: ({ pageParam }) => fetchRepliesPage(postId, commentId, pageParam, 5),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

export function useCreateReply(postId: string, commentId: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (text: string) => createReply(postId, commentId, text),
    onMutate: async (text) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["replies", commentId] }),
        queryClient.cancelQueries({ queryKey: ["comments", postId] }),
      ]);

      const previousReplies = queryClient.getQueryData<RepliesCache>(["replies", commentId]);
      const previousComments = queryClient.getQueryData<CommentsCache>(["comments", postId]);
      const optimisticId = `optimistic-reply-${Date.now()}`;

      if (user) {
        const optimisticReply: Reply = {
          id: optimisticId,
          commentId,
          authorId: user.id,
          author: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatarUrl: user.avatarUrl,
          },
          text,
          likeCount: 0,
          isLikedByMe: false,
          createdAt: new Date().toISOString(),
        };

        queryClient.setQueryData<RepliesCache>(["replies", commentId], (oldData) => {
          if (!oldData || oldData.pages.length === 0) {
            return {
              pages: [{ replies: [optimisticReply], nextCursor: null }],
              pageParams: [undefined],
            };
          }

          const pages = [...oldData.pages];
          const lastPageIndex = pages.length - 1;
          pages[lastPageIndex] = {
            ...pages[lastPageIndex],
            replies: [...pages[lastPageIndex].replies, optimisticReply],
          };

          return { ...oldData, pages };
        });
      }

      queryClient.setQueryData<CommentsCache>(["comments", postId], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            comments: page.comments.map((comment) =>
              comment.id === commentId
                ? { ...comment, replyCount: comment.replyCount + 1 }
                : comment
            ),
          })),
        };
      });

      return { previousReplies, previousComments, optimisticId };
    },
    onError: (_error, _text, context) => {
      if (context?.previousReplies) {
        queryClient.setQueryData(["replies", commentId], context.previousReplies);
      }
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", postId], context.previousComments);
      }
    },
    onSuccess: (serverReply, _text, context) => {
      queryClient.setQueryData<RepliesCache>(["replies", commentId], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            replies: page.replies.map((reply) =>
              reply.id === context?.optimisticId ? serverReply : reply
            ),
          })),
        };
      });
    },
  });
}
