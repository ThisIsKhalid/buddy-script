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
      className="absolute z-[40] bg-white border border-[#e1e8ed] shadow-lg rounded-[6px] w-[250px] max-h-[300px] overflow-y-auto p-4 mt-[35px] left-6 font-sans text-left"
      style={{ display: "block" }}
    >
      <div className="flex justify-between items-center mb-3 pb-1 border-b border-[#F5F5F5]">
        <span className="text-xs font-semibold text-[#112032]">
          Liked by ({likers.length})
        </span>
        <button
          onClick={onClose}
          className="text-base text-[#666] hover:text-primary transition-colors bg-transparent border-none p-0 cursor-pointer outline-none font-sans"
          type="button"
        >
          &times;
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-2 text-xs text-muted">
          Loading...
        </div>
      ) : likers.length === 0 ? (
        <div className="text-center py-2 text-xs text-muted">
          No likes yet.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {likers.map((user) => (
            <div key={user.id} className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl || "/assets/images/Avatar.png"}
                alt=""
                className="w-6 h-6 rounded-full border border-border-color shrink-0 object-cover"
              />
              <span className="text-xs font-medium text-[#112032] truncate">
                {user.firstName} {user.lastName}
              </span>
            </div>
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="text-center mt-2 border-t border-[#F5F5F5] pt-1.5">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-[10px] text-primary hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer outline-none font-sans"
            type="button"
          >
            {isFetchingNextPage ? "Loading more..." : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
}
