"use client";

import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCommentLikers, fetchReplyLikers } from "@/lib/api-client/comments";

interface ReactorsPopupProps {
  /** Context determining which API to call */
  targetType: "comment" | "reply";
  postId: string;
  commentId: string;
  replyId?: string;
  onClose: () => void;
}

export default function ReactorsPopup({
  targetType,
  postId,
  commentId,
  replyId,
  onClose,
}: ReactorsPopupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey:
      targetType === "comment"
        ? ["commentLikers", commentId]
        : ["replyLikers", replyId],
    queryFn: ({ pageParam }) =>
      targetType === "comment"
        ? fetchCommentLikers(postId, commentId, pageParam, 10)
        : fetchReplyLikers(postId, commentId, replyId!, pageParam, 10),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const likers = data?.pages.flatMap((p) => p.likers) || [];

  return (
    <div
      ref={containerRef}
      className="absolute z-50 bottom-full mb-2 left-0 w-[200px] max-h-[240px] overflow-y-auto bg-card border border-border rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.18)] p-2.5 transition-colors duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-border">
        <div className="flex items-center gap-1.5">
          <span className="text-base leading-none">👍</span>
          <span className="text-[11px] font-semibold text-text-dark">
            Liked by ({likers.length})
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-text-muted hover:text-text-dark cursor-pointer text-sm leading-none w-4 h-4 flex items-center justify-center"
        >
          ×
        </button>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="text-[11px] text-text-muted text-center py-2">Loading...</div>
      ) : likers.length === 0 ? (
        <div className="text-[11px] text-text-muted text-center py-2">No likes yet.</div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {likers.map((user) => (
            <div key={user.id} className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl || "/assets/images/Avatar.png"}
                alt=""
                className="w-5 h-5 rounded-full object-cover flex-shrink-0 border border-border"
              />
              <span className="text-[11px] font-medium text-text-dark truncate">
                {user.firstName} {user.lastName}
              </span>
            </div>
          ))}
        </div>
      )}

      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-1.5 pt-1 border-t border-border w-full text-[10px] text-primary hover:underline disabled:opacity-60 cursor-pointer"
        >
          {isFetchingNextPage ? "Loading..." : "Show more"}
        </button>
      )}
    </div>
  );
}
