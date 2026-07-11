"use client";

import { fetchPostLikers } from "@/lib/api-client/posts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface LikersListModalProps {
  postId: string;
  reaction: "like" | "dislike";
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function LikersListModal({
  postId,
  reaction,
  onClose,
  anchorRef,
}: LikersListModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const calculatePosition = useCallback(() => {
    if (anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    } else if (containerRef.current) {
      const rect = containerRef.current.parentElement?.getBoundingClientRect();
      if (rect) {
        setPosition({
          top: rect.bottom + 8,
          left: rect.left,
        });
      }
    }
  }, [anchorRef]);

  useEffect(() => {
    calculatePosition();
    window.addEventListener("resize", calculatePosition);
    window.addEventListener("scroll", calculatePosition, true);
    return () => {
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", calculatePosition, true);
    };
  }, [calculatePosition]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["postReactors", postId, reaction],
      queryFn: ({ pageParam }) =>
        fetchPostLikers(postId, pageParam, 10, reaction),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const likers = data?.pages.flatMap((page) => page.likers) || [];

  const isLike = reaction === "like";
  const title = isLike ? "Liked by" : "Disliked by";
  const accentColor = isLike ? "#1890FF" : "#dc3545";
  const iconPath =
    "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3";

  return createPortal(
    <div
      ref={containerRef}
      className="fixed z-[9999] w-[260px] max-h-[320px] overflow-y-auto bg-card border border-border rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] p-3 transition-colors duration-300"
      style={{ top: position.top, left: position.left }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
        <div className="flex items-center gap-2">
          {/* Reaction icon */}
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: isLike ? "#E8F2FF" : "#FFF0F0" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              style={isLike ? {} : { transform: "scaleY(-1)" }}
            >
              <path
                d={iconPath}
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={accentColor}
                fillOpacity="0.2"
              />
            </svg>
          </div>
          <span className="text-xs font-semibold text-text-dark">
            {title}{" "}
            <span style={{ color: accentColor }}>({likers.length})</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-5 h-5 flex items-center justify-center text-text-muted hover:text-text-dark text-base leading-none cursor-pointer rounded-full hover:bg-bg-page transition-colors"
        >
          ×
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-4 text-xs text-text-muted">
          Loading...
        </div>
      ) : likers.length === 0 ? (
        <div className="text-center py-4 text-xs text-text-muted">
          No {isLike ? "likes" : "dislikes"} yet.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {likers.map((user) => (
            <div key={user.id} className="flex items-center gap-2.5 py-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl || "/assets/images/Avatar.png"}
                alt=""
                className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-border"
              />
              <span className="text-[12px] font-medium text-text-dark truncate">
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
    </div>,
    document.body,
  );
}
