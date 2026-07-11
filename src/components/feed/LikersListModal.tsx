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
      className="_feed_timeline_dropdown"
      style={{
        display: "block",
        position: "absolute",
        zIndex: 1050,
        backgroundColor: "#fff",
        border: "1px solid #e1e8ed",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "8px",
        width: "250px",
        maxHeight: "300px",
        overflowY: "auto",
        padding: "12px",
        marginTop: "35px",
        left: "24px",
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2 pb-1 border-bottom">
        <span style={{ fontWeight: 600, fontSize: "12px", color: "#112032" }}>
          Liked by ({likers.length})
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "16px",
            lineHeight: 1,
            cursor: "pointer",
            color: "#666",
            padding: 0,
            outline: "none"
          }}
          type="button"
        >
          &times;
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-2" style={{ fontSize: "11px", color: "#666" }}>
          Loading...
        </div>
      ) : likers.length === 0 ? (
        <div className="text-center py-2" style={{ fontSize: "11px", color: "#666" }}>
          No likes yet.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {likers.map((user) => (
            <div key={user.id} className="d-flex align-items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl || "/assets/images/Avatar.png"}
                alt=""
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  objectFit: "cover"
                }}
              />
              <span style={{ fontSize: "12px", fontWeight: 500, color: "#112032" }}>
                {user.firstName} {user.lastName}
              </span>
            </div>
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="text-center mt-2 border-top pt-1">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            style={{
              background: "none",
              border: "none",
              color: "#1890FF",
              fontSize: "11px",
              cursor: "pointer",
              padding: 0,
              outline: "none"
            }}
            type="button"
          >
            {isFetchingNextPage ? "Loading more..." : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
}
