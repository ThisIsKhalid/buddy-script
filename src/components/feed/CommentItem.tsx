"use client";

import { useState } from "react";
import { Comment } from "@/types";
import { formatRelativeTime } from "./PostCard";
import LikeButton from "./LikeButton";
import ReplyList from "./ReplyList";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const [repliesOpen, setRepliesOpen] = useState(false);

  return (
    <div className="_comment_main d-flex flex-column mb-3" style={{ fontFamily: "Poppins" }}>
      <div className="d-flex align-items-start">
        <div className="_comment_image me-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={comment.author.avatarUrl || "/assets/images/comment_img.png"}
            alt=""
            style={{ borderRadius: "50%", width: "32px", height: "32px" }}
          />
        </div>
        <div className="flex-grow-1">
          <div className="_comment_area p-2 px-3" style={{ backgroundColor: "#f5f7fb", borderRadius: "12px" }}>
            <h4
              className="_comment_title"
              style={{ fontSize: "13px", fontWeight: 600, margin: "0 0 2px 0", color: "#112032" }}
            >
              {comment.author.firstName} {comment.author.lastName}
            </h4>
            <p className="_comment_para" style={{ fontSize: "13px", margin: 0, color: "#112032" }}>
              {comment.text}
            </p>

            {/* Comment Reaction indicators */}
            {comment.likeCount > 0 && (
              <div className="_total_reactions mt-1 d-flex align-items-center">
                <div className="_total_react d-flex align-items-center">
                  <span className="_reaction_like me-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </span>
                </div>
                <span className="_total" style={{ fontSize: "11px", color: "#5f72a5" }}>
                  {comment.likeCount}
                </span>
              </div>
            )}
          </div>

          {/* Comment action footer links */}
          <div className="_comment_reply mt-1">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list d-flex align-items-center" style={{ listStyle: "none", padding: 0, margin: 0, gap: "10px", fontSize: "12px", color: "#5f72a5" }}>
                <li>
                  <LikeButton
                    targetType="comment"
                    postId={comment.postId}
                    commentId={comment.id}
                    isLikedByMe={comment.isLikedByMe}
                  />
                  {" ."}
                </li>
                <li>
                  <button
                    onClick={() => setRepliesOpen(!repliesOpen)}
                    style={{ background: "none", border: "none", padding: 0, font: "inherit", cursor: "pointer", color: "inherit" }}
                  >
                    Reply
                  </button>
                  {" ."}
                </li>
                <li>
                  <button
                    onClick={() => alert("Comment shared (mock action)")}
                    style={{ background: "none", border: "none", padding: 0, font: "inherit", cursor: "pointer", color: "inherit" }}
                  >
                    Share
                  </button>
                  {" ."}
                </li>
                <li>
                  <span className="_time_link">{formatRelativeTime(comment.createdAt)}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Nested Replies Section */}
          {repliesOpen && (
            <div className="mt-2 ms-4">
              <ReplyList postId={comment.postId} commentId={comment.id} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
