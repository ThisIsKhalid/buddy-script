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
  if (diffMs < 0) return "Just now"; // Handle clock drift

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
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      {/* Top section: Author and options */}
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.author.avatarUrl || "/assets/images/post_img.png"}
                alt=""
                className="_post_img"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">
                {post.author.firstName} {post.author.lastName}
              </h4>
              <p className="_feed_inner_timeline_post_box_para">
                {formatRelativeTime(post.createdAt)} .{" "}
                <span style={{ textTransform: "capitalize", fontSize: "12px", color: "#666" }}>
                  {post.visibility === "public" ? "🌐 Public" : "🔒 Private"}
                </span>
              </p>
            </div>
          </div>
          
          <div className="_feed_inner_timeline_post_box_dropdown" ref={dropdownRef}>
            <div className="_feed_timeline_post_dropdown">
              <button
                className="_feed_timeline_post_dropdown_link"
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ background: "none", border: "none", outline: "none" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </button>
            </div>

            {dropdownOpen && (
              <div
                className="_feed_timeline_dropdown _timeline_dropdown"
                style={{ display: "block", right: 0, top: "25px" }}
              >
                <ul className="_feed_timeline_dropdown_list" style={{ padding: "8px 0", margin: 0, listStyle: "none" }}>
                  <li className="_feed_timeline_dropdown_item">
                    <button
                      className="_feed_timeline_dropdown_link"
                      style={{ background: "none", border: "none", width: "100%", textAlign: "left", display: "flex", alignItems: "center", padding: "8px 16px" }}
                      onClick={() => alert("Post saved (mock action)")}
                    >
                      <span className="me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"/>
                        </svg>
                      </span>
                      Save Post
                    </button>
                  </li>
                  {isAuthor && (
                    <li className="_feed_timeline_dropdown_item">
                      <button
                        className="_feed_timeline_dropdown_link text-danger"
                        style={{ background: "none", border: "none", width: "100%", textAlign: "left", display: "flex", alignItems: "center", padding: "8px 16px" }}
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                      >
                        <span className="me-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                            <path stroke="#DC3545" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"/>
                          </svg>
                        </span>
                        {deleteMutation.isPending ? "Deleting..." : "Delete Post"}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Text body */}
        <p className="_feed_inner_timeline_post_para mt-2" style={{ whiteSpace: "pre-wrap", color: "#112032" }}>
          {post.text}
        </p>

        {/* Image body (if attached) */}
        {post.imageUrl && (
          <div className="_feed_inner_timeline_image mt-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.imageUrl} alt="" className="_time_img" style={{ maxHeight: "450px", objectFit: "cover", width: "100%", borderRadius: "6px" }} />
          </div>
        )}
      </div>

      {/* Likers Stack & Counts */}
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26 d-flex justify-content-between align-items-center mt-3">
        <div
          className="_feed_inner_timeline_total_reacts_image"
          onClick={() => setLikersOpen(true)}
          style={{ cursor: "pointer" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/react_img1.png" alt="Image" className="_react_img1" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/react_img2.png" alt="Image" className="_react_img" />
          <p className="_feed_inner_timeline_total_reacts_para">
            {post.likeCount > 0 ? `${post.likeCount}` : "0"}
          </p>
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1" style={{ margin: 0 }}>
            <button
              onClick={() => setCommentsOpen(!commentsOpen)}
              style={{ background: "none", border: "none", color: "inherit", padding: 0 }}
            >
              <span>{post.commentCount}</span> Comment{post.commentCount !== 1 ? "s" : ""}
            </button>
          </p>
        </div>
      </div>

      {/* Like, Comment, and Share Actions */}
      <div className="_feed_inner_timeline_reaction">
        <LikeButton targetType="post" postId={post.id} isLikedByMe={post.isLikedByMe} />
        
        <button
          className={`_feed_inner_timeline_reaction_comment _feed_reaction ${commentsOpen ? "_feed_reaction_active" : ""}`}
          onClick={() => setCommentsOpen(!commentsOpen)}
          style={{ background: "none", border: "none" }}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"/>
                <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563"/>
              </svg>
              Comment
            </span>
          </span>
        </button>

        <button
          className="_feed_inner_timeline_reaction_share _feed_reaction"
          style={{ background: "none", border: "none" }}
          onClick={() => alert("Post shared (mock action)")}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
                <path stroke="#000" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"/>
              </svg>
              Share
            </span>
          </span>
        </button>
      </div>

      {/* Nested Comment Area */}
      {commentsOpen && (
        <div className="_feed_inner_timeline_cooment_area" style={{ display: "block" }}>
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
