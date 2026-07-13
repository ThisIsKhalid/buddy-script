import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/lib/api-client/posts";
import type { PostsCache } from "@/lib/query-cache-types";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Optimistically prepend the new post to the first page of cache
      queryClient.setQueryData<PostsCache>(["posts"], (oldData) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [{ posts: [newPost], nextCursor: null }],
            pageParams: [undefined],
          };
        }

        const newPages = [...oldData.pages];
        newPages[0] = {
          ...newPages[0],
          posts: [newPost, ...newPages[0].posts],
        };

        return {
          ...oldData,
          pages: newPages,
        };
      });

      // Refetch posts in the background
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
