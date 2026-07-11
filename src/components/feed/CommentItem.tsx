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
    <div className="flex flex-col gap-1 transition-colors duration-300">
      <div className="flex items-start gap-2">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={comment.author.avatarUrl || "/assets/images/comment_img.png"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bubble */}
        <div className="flex-1 min-w-0">
          <div className="bg-[#F6F6F6] dark:bg-card border border-transparent dark:border-border rounded-[12px] px-3 py-2 transition-all duration-300 w-full max-w-fit">
            <h4 className="text-[13px] font-semibold text-text-dark mb-0.5 truncate">
              {comment.author.firstName} {comment.author.lastName}
            </h4>
            <p className="text-[13px] text-text-dark whitespace-pre-wrap break-words">{comment.text}</p>

            {/* Reaction indicators */}
            {comment.likeCount > 0 && (
              <div className="flex items-center gap-1 mt-1 bg-bg-page dark:bg-[#112032] px-2 py-0.5 rounded-full w-fit border border-border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1890FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <span className="text-[10px] text-primary font-semibold">{comment.likeCount}</span>
              </div>
            )}
          </div>

          {/* Action footer */}
          <ul className="flex items-center gap-2 mt-1 text-[12px] text-text-muted dark:text-text-dark/70 flex-wrap">
            <li>
              <LikeButton
                targetType="comment"
                postId={comment.postId}
                commentId={comment.id}
                isLikedByMe={comment.isLikedByMe}
              />
            </li>
            <li className="text-text-muted/40 dark:text-text-dark/30">·</li>
            <li>
              <button
                type="button"
                onClick={() => setRepliesOpen(!repliesOpen)}
                className="text-[12px] text-text-muted dark:text-text-dark/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
              >
                Reply
              </button>
            </li>
            <li className="text-text-muted/40 dark:text-text-dark/30">·</li>
            <li>
              <button
                type="button"
                onClick={() => alert("Comment shared (mock action)")}
                className="text-[12px] text-text-muted dark:text-text-dark/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
              >
                Share
              </button>
            </li>
            <li className="text-text-muted/40 dark:text-text-dark/30">·</li>
            <li>
              <span className="text-[12px] text-text-muted/80 dark:text-text-dark/60">
                {formatRelativeTime(comment.createdAt)}
              </span>
            </li>
          </ul>

          {/* Nested replies */}
          {repliesOpen && (
            <div className="mt-2 ml-4">
              <ReplyList postId={comment.postId} commentId={comment.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
