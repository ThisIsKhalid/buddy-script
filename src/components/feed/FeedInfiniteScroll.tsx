"use client";

import { useEffect, useRef } from "react";
import { usePosts } from "@/hooks/usePosts";
import PostCard from "./PostCard";

export default function FeedInfiniteScroll() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePosts();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        {/* Spinner */}
        <div className="w-8 h-8 rounded-full border-4 border-[#F0F2F5] border-t-[#1890FF] animate-spin mb-3" />
        <p className="text-sm text-[#666666]">Loading feed posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-300 text-red-700 text-sm rounded-md p-4 my-4">
        Failed to load feed posts. Please refresh the page.
      </div>
    );
  }

  const posts = (data?.pages.flatMap((page) => page?.posts ?? []) ?? []).filter(Boolean);

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-md shadow-[7.5px_20px_7.5px_20px_rgba(108,126,147,0.15)] flex flex-col items-center justify-center py-16 my-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" className="text-[#C4C4C4] mb-4">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h8M8 14h5M3 9a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" />
        </svg>
        <p className="text-sm text-[#666666]">No posts available. Write something above to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post?.id} post={post} />
      ))}

      {/* Intersection observer target */}
      <div ref={loadMoreRef} className="flex items-center justify-center py-6 min-h-12.5">
        {isFetchingNextPage && (
          <div className="w-6 h-6 rounded-full border-4 border-[#F0F2F5] border-t-[#1890FF] animate-spin" />
        )}
      </div>
    </div>
  );
}
