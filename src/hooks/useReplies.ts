import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRepliesPage, createReply } from "@/lib/api-client/comments";
import type { CommentsCache } from "@/lib/query-cache-types";

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

  return useMutation({
    mutationFn: (text: string) => createReply(postId, commentId, text),
    onSuccess: () => {
      // Invalidate replies for this comment
      queryClient.invalidateQueries({ queryKey: ["replies", commentId] });

      // Reactively increment replyCount on parent comment inside comments cache
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
    },
  });
}
