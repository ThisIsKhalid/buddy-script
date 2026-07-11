"use client";

import { useState, useRef, useEffect } from "react";
import { Post } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/lib/api-client/posts";
import LikeButton from "./LikeButton";
import CommentList from "./CommentList";
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
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
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
  const queryClient = useQueryClient();

  const isAuthor = user?.id === post.authorId;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(post.id),
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
    <div className="bg-white py-6 rounded-[6px] border border-border-color shadow-sm mb-4 text-left font-sans relative">
      {/* Top section: Author and options */}
      <div className="px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-border-color shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.author.avatarUrl || "/assets/images/post_img.png"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              <h4 className="text-xs md:text-sm font-semibold text-[#112032] m-0">
                {post.author.firstName} {post.author.lastName}
              </h4>
              <p className="text-[10px] md:text-xs text-muted m-0 mt-0.5">
                {formatRelativeTime(post.createdAt)} .{" "}
                <span className="capitalize font-medium text-muted">
                  {post.visibility === "public" ? "🌐 Public" : "🔒 Private"}
                </span>
              </p>
            </div>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <div>
              <button
                className="flex items-center justify-center p-1 text-[#C4C4C4] hover:text-primary transition-colors cursor-pointer bg-transparent border-none outline-none"
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                  <circle cx="2" cy="2" r="2" fill="currentColor" />
                  <circle cx="2" cy="8" r="2" fill="currentColor" />
                  <circle cx="2" cy="15" r="2" fill="currentColor" />
                </svg>
              </button>
            </div>

            {dropdownOpen && (
              <div
                className="absolute right-0 top-7 w-[180px] bg-white border border-border-color rounded-[6px] shadow-lg py-2 z-30 flex flex-col"
                style={{ display: "block" }}
              >
                <button
                  className="flex items-center gap-2 px-4 py-2.5 text-xs text-[#4A5568] hover:text-primary hover:bg-light-gray transition-all text-left bg-transparent border-none w-full cursor-pointer font-sans"
                  onClick={() => alert("Post saved (mock action)")}
                >
                  <span className="text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"/>
                    </svg>
                  </span>
                  Save Post
                </button>
                {isAuthor && (
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 transition-all text-left bg-transparent border-none w-full cursor-pointer font-sans"
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                  >
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"/>
                      </svg>
                    </span>
                    {deleteMutation.isPending ? "Deleting..." : "Delete Post"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Text body */}
        <p className="text-xs md:text-sm text-[#112032] leading-relaxed mt-3 mb-0 break-words whitespace-pre-wrap">
          {post.text}
        </p>

        {/* Image body (if attached) */}
        {post.imageUrl && (
          <div className="relative mt-3 overflow-hidden rounded-[6px] max-h-[450px] border border-border-color">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.imageUrl} alt="Attached" className="w-full h-full object-cover block" />
          </div>
        )}
      </div>

      {/* Likers Stack & Counts */}
      <div className="flex items-center justify-between mt-4 px-6 border-b border-[#F5F5F5] pb-3 select-none">
        <div
          className="flex items-center cursor-pointer relative group"
          onClick={() => setLikersOpen(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/react_img1.png" alt="Like avatar" className="w-[18px] h-[18px] rounded-full border border-white z-20 object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/react_img2.png" alt="Like avatar" className="w-[18px] h-[18px] rounded-full border border-white z-10 -ml-1.5 object-cover" />
          <p className="text-xs text-[#5f72a5] font-semibold ml-2 m-0 hover:text-primary transition-colors">
            {post.likeCount > 0 ? `${post.likeCount}` : "0"}
          </p>
        </div>
        <div>
          <button
            onClick={() => setCommentsOpen(!commentsOpen)}
            className="text-xs text-[#5f72a5] hover:text-primary transition-colors bg-transparent border-none p-0 cursor-pointer font-sans"
            type="button"
          >
            <span>{post.commentCount}</span> Comment{post.commentCount !== 1 ? "s" : ""}
          </button>
        </div>
      </div>

      {/* Like, Comment, and Share Actions */}
      <div className="flex items-center justify-around py-1 border-b border-[#F5F5F5] last:border-b-0">
        <LikeButton targetType="post" postId={post.id} isLikedByMe={post.isLikedByMe} />
        
        <button
          className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 text-xs md:text-sm font-semibold text-[#5f72a5] hover:text-primary hover:bg-light-gray rounded-[6px] transition-all bg-transparent border-none cursor-pointer select-none font-sans ${commentsOpen ? "text-primary bg-light-blue-bg" : ""}`}
          onClick={() => setCommentsOpen(!commentsOpen)}
          type="button"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
            <path stroke="currentColor" strokeWidth="1.5" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"/>
            <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563"/>
          </svg>
          Comment
        </button>

        <button
          className="flex-1 py-2 px-3 flex items-center justify-center gap-2 text-xs md:text-sm font-semibold text-[#5f72a5] hover:text-primary hover:bg-light-gray rounded-[6px] transition-all bg-transparent border-none cursor-pointer select-none font-sans"
          type="button"
          onClick={() => alert("Post shared (mock action)")}
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 21">
            <path stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"/>
          </svg>
          Share
        </button>
      </div>

      {/* Nested Comment Area */}
      {commentsOpen && (
        <div className="px-6 mt-4">
          <CommentList postId={post.id} />
        </div>
      )}

      {/* Likers List modal */}
      {likersOpen && (
        <LikersListModal postId={post.id} onClose={() => setLikersOpen(false)} />
      )}
    </div>
  );
}
