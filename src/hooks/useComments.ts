import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCommentsPage, createComment } from "@/lib/api-client/comments";
import { useAuthStore } from "@/store/auth.store";
import type { CommentsCache, PostsCache } from "@/lib/query-cache-types";
import type { Comment } from "@/types";

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
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (text: string) => createComment(postId, text),
    onMutate: async (text) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["comments", postId] }),
        queryClient.cancelQueries({ queryKey: ["posts"] }),
      ]);

      const previousComments = queryClient.getQueryData<CommentsCache>(["comments", postId]);
      const previousPosts = queryClient.getQueryData<PostsCache>(["posts"]);
      const optimisticId = `optimistic-comment-${Date.now()}`;

      if (user) {
        const optimisticComment: Comment = {
          id: optimisticId,
          postId,
          authorId: user.id,
          author: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatarUrl: user.avatarUrl,
          },
          text,
          likeCount: 0,
          replyCount: 0,
          isLikedByMe: false,
          createdAt: new Date().toISOString(),
        };

        queryClient.setQueryData<CommentsCache>(["comments", postId], (oldData) => {
          if (!oldData || oldData.pages.length === 0) {
            return {
              pages: [{ comments: [optimisticComment], nextCursor: null }],
              pageParams: [undefined],
            };
          }

          const pages = [...oldData.pages];
          const lastPageIndex = pages.length - 1;
          pages[lastPageIndex] = {
            ...pages[lastPageIndex],
            comments: [...pages[lastPageIndex].comments, optimisticComment],
          };

          return { ...oldData, pages };
        });
      }

      queryClient.setQueryData<PostsCache>(["posts"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) =>
              post.id === postId
                ? { ...post, commentCount: post.commentCount + 1 }
                : post
            ),
          })),
        };
      });

      return { previousComments, previousPosts, optimisticId };
    },
    onError: (_error, _text, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", postId], context.previousComments);
      }
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
    onSuccess: (serverComment, _text, context) => {
      queryClient.setQueryData<CommentsCache>(["comments", postId], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            comments: page.comments.map((comment) =>
              comment.id === context?.optimisticId ? serverComment : comment
            ),
          })),
        };
      });
    },
  });
}
