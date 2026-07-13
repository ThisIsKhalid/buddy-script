"use client";

import { useAuth } from "@/hooks/useAuth";
import { deletePost, fetchPostLikers } from "@/lib/api-client/posts";
import { Post } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import CommentList from "./CommentList";
import LikeButton from "./LikeButton";
import LikersListModal from "./LikersListModal";

interface PostCardProps {
  post: Post;
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (isNaN(date.getTime())) return "recently";
  if (diffMs < 0) return "Just now";

  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [likersOpen, setLikersOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const likersButtonRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const isAuthor = user?.id === post?.authorId;

  const { data: likersData } = useQuery({
    queryKey: ["postLikersPreview", post?.id],
    queryFn: () => fetchPostLikers(post?.id ?? "", undefined, 3),
    enabled: (post?.likeCount ?? 0) > 0 && !!post?.id,
  });

  const previewLikers = likersData?.likers || [];
  const remainingCount = (post?.likeCount ?? 0) - previewLikers.length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(post?.id ?? ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className="bg-card rounded-[6px] mb-4 shadow-card overflow-hidden transition-colors duration-300 border border-border">
      {/* ── Post header ── */}
      <div className="px-6 pt-6 pb-3">
        <div className="flex items-start justify-between">
          {/* Author info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post?.author?.avatarUrl || "/assets/images/post_img.png"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-text-dark leading-tight">
                {post?.author?.firstName} {post?.author?.lastName}
              </h4>
              <p className="text-[12px] text-text-muted">
                {formatRelativeTime(post?.createdAt ?? "")} .{" "}
                {(post?.visibility?.toLowerCase?.() ?? "public") === "public" ? "Public" : "Private"}
              </p>
            </div>
          </div>

          {/* 3-dot dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-page transition-colors cursor-pointer text-[#C4C4C4]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="17"
                fill="none"
                viewBox="0 0 4 17"
              >
                <circle cx="2" cy="2" r="2" fill="currentColor" />
                <circle cx="2" cy="8" r="2" fill="currentColor" />
                <circle cx="2" cy="15" r="2" fill="currentColor" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-9 w-44 bg-card border border-border rounded-[6px] shadow-[0_4px_20px_rgba(108,126,147,0.2)] z-50 py-1 transition-colors duration-300">
                <button
                  type="button"
                  onClick={() => {
                    alert("Post saved (mock action)");
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-dark hover:bg-bg-page transition-colors text-left cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="#1890FF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.2"
                      d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"
                    />
                  </svg>
                  Save Post
                </button>
                {isAuthor && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-bg-page transition-colors text-left disabled:opacity-50 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="#DC3545"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                        d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5z"
                      />
                    </svg>
                    {deleteMutation.isPending ? "Deleting..." : "Delete Post"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Post body ── */}
      <div className="px-6 pb-3">
        <p className="text-sm text-text-dark whitespace-pre-wrap leading-relaxed">
          {post?.text}
        </p>
        {post?.imageUrl && (
          <div className="mt-3 rounded-[6px] overflow-hidden border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt=""
              className="w-full max-h-[450px] object-cover"
            />
          </div>
        )}
      </div>

      {/* ── Like count + comment count row ── */}
      <div className="relative px-6 py-4 flex items-center justify-between border-b border-border transition-colors duration-300">
        {/* Likers count — click to see who liked */}
        <button
          type="button"
          ref={likersButtonRef}
          onClick={() => setLikersOpen(true)}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="flex items-center">
            {previewLikers.length > 0 && (
              <div className="flex -space-x-1.5 items-center">
                {previewLikers.map((liker, i) => (
                  <div
                    key={liker.id}
                    className="w-[26px] h-[26px] rounded-full border-2 border-card overflow-hidden flex-shrink-0 relative z-[1]"
                    style={{ zIndex: previewLikers.length - i }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={liker.avatarUrl || "/assets/images/post_img.png"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {remainingCount > 0 && (
                  <div className="w-[26px] h-[26px] rounded-full border-2 border-card bg-bg-page flex items-center justify-center text-[11px] font-semibold text-text-dark z-0">
                    +{remainingCount}
                  </div>
                )}
              </div>
            )}
          </div>
          {(post?.likeCount ?? 0) > 0 && (
            <span className="text-[13px] text-text-muted font-medium group-hover:text-primary transition-colors">
              {post?.likeCount}
            </span>
          )}
        </button>

        {/* Right side: comment + share counts */}
        <div className="flex items-center gap-3 text-[13px] text-text-muted font-medium">
          <button
            type="button"
            onClick={() => setCommentsOpen(!commentsOpen)}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            {post?.commentCount ?? 0} Comment
          </button>
          <span>{Math.floor((post?.likeCount ?? 0) * 1.5 + 5)} Share</span>
        </div>

        {/* Likers modal */}
        {likersOpen && (
          <LikersListModal
            postId={post?.id ?? ""}
            onClose={() => setLikersOpen(false)}
            anchorRef={likersButtonRef}
          />
        )}
      </div>

      {/* ── Reaction bar: Like / Comment / Share ── */}
      <div className="flex items-center transition-colors duration-300 px-2 py-1 border-b border-border">
        <LikeButton
          targetType="post"
          postId={post?.id ?? ""}
          isLikedByMe={post?.isLikedByMe ?? false}
        />
        <button
          type="button"
          onClick={() => setCommentsOpen(!commentsOpen)}
          className={`flex-1 flex items-center justify-center gap-2 h-[48px] rounded-[6px] text-sm font-semibold transition-colors cursor-pointer ${commentsOpen
              ? " text-[#1890FF]"
              : "text-[#65676B] hover:bg-bg-page dark:text-text-dark"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            fill="none"
            viewBox="0 0 21 21"
          >
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
            />
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.938 9.313h7.125M10.5 14.063h3.563"
            />
          </svg>
          Comment
        </button>
        <button
          type="button"
          onClick={() => alert("Post shared (mock action)")}
          className="flex-1 flex items-center justify-center gap-2 h-[48px] rounded-[6px] text-sm font-semibold text-[#65676B] hover:bg-bg-page dark:text-text-dark transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="19"
            fill="none"
            viewBox="0 0 24 21"
          >
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"
            />
          </svg>
          Share
        </button>
      </div>

      {/* ── Comments section ── */}
      {commentsOpen && (
        <div className="px-6 pb-4 pt-2 border-t border-border transition-colors duration-300">
          <CommentList postId={post?.id ?? ""} />
        </div>
      )}
    </div>
  );
}
