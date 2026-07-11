"use client";

import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostLikers } from "@/lib/api-client/posts";

interface LikersListModalProps {
  postId: string;
  onClose: () => void;
}

export default function LikersListModal({ postId, onClose }: LikersListModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["postLikers", postId],
    queryFn: ({ pageParam }) => fetchPostLikers(postId, pageParam, 10),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const likers = data?.pages.flatMap((page) => page.likers) || [];

  return (
    <div
      ref={containerRef}
      className="absolute z-50 top-10 left-6 w-[250px] max-h-[300px] overflow-y-auto bg-card border border-border rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.25)] p-3 transition-colors duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-border">
        <span className="text-xs font-semibold text-text-dark">Liked by ({likers.length})</span>
        <button
          type="button"
          onClick={onClose}
          className="w-5 h-5 flex items-center justify-center text-text-muted hover:text-text-dark text-base leading-none cursor-pointer"
        >
          ×
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-2 text-xs text-text-muted">Loading...</div>
      ) : likers.length === 0 ? (
        <div className="text-center py-2 text-xs text-text-muted">No likes yet.</div>
      ) : (
        <div className="flex flex-col gap-2">
          {likers.map((user) => (
            <div key={user.id} className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl || "/assets/images/Avatar.png"}
                alt=""
                className="w-6 h-6 rounded-full object-cover flex-shrink-0 border border-border"
              />
              <span className="text-[12px] font-medium text-text-dark">
                {user.firstName} {user.lastName}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Load more */}
      {hasNextPage && (
        <div className="text-center mt-2 pt-1 border-t border-border">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-[11px] text-primary hover:underline disabled:opacity-60 cursor-pointer"
          >
            {isFetchingNextPage ? "Loading more..." : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
}
