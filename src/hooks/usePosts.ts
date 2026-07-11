import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsPage } from "@/lib/api-client/posts";

export function usePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchPostsPage(pageParam, 10),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
