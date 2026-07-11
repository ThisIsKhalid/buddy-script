import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCommentsPage, createComment } from "@/lib/api-client/comments";

export function useComments(postId: string) {
  return useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) => fetchCommentsPage(postId, pageParam, 5),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => createComment(postId, text),
    onSuccess: (newComment) => {
      // Invalidate comments for this post
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });

      // Reactively increment commentCount on the post object in feed cache
      queryClient.setQueryData(["posts"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: any) =>
              post.id === postId
                ? { ...post, commentCount: post.commentCount + 1 }
                : post
            ),
          })),
        };
      });
    },
  });
}
