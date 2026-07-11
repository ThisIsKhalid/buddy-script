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
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="text-center my-4 py-4" style={{ fontFamily: "Poppins" }}>
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted" style={{ fontSize: "14px" }}>Loading feed posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger my-4" role="alert">
        Failed to load feed posts. Please refresh the page.
      </div>
    );
  }

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (posts.length === 0) {
    return (
      <div
        className="text-center my-5 py-5 bg-white border rounded"
        style={{ fontFamily: "Poppins", borderRadius: "6px" }}
      >
        <p className="text-muted" style={{ fontSize: "15px", margin: 0 }}>
          No posts available. Write something above to get started!
        </p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Intersection observer target */}
      <div ref={loadMoreRef} className="text-center py-4" style={{ minHeight: "50px" }}>
        {isFetchingNextPage && (
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Loading more...</span>
          </div>
        )}
      </div>
    </div>
  );
}
