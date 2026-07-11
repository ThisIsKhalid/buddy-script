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

        {/* Bubble and Actions */}
        <div className="flex-1 min-w-0">
          <div className="relative bg-[#F8FAFD] dark:bg-[#112032]/45 border border-transparent dark:border-border rounded-[6px] px-3.5 py-2.5 transition-all duration-300 w-full max-w-fit pr-10">
            <h4 className="text-[13px] font-semibold text-text-dark mb-0.5 truncate">
              {comment.author.firstName} {comment.author.lastName}
            </h4>
            <p className="text-[13px] text-text-dark whitespace-pre-wrap break-words">{comment.text}</p>

            {/* Reaction indicator as absolute overlay */}
            {comment.likeCount > 0 && (
              <div className="absolute bottom-[-10px] right-2 bg-white dark:bg-card border border-border/80 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm z-10 select-none">
                <span className="text-[11px] leading-none">👍</span>
                <span className="text-[10px] text-primary font-bold">{comment.likeCount}</span>
              </div>
            )}
          </div>

          {/* Action footer */}
          <ul className="flex items-center gap-1.5 mt-2.5 text-[12px] text-text-muted dark:text-text-dark/70 flex-wrap">
            <li>
              <LikeButton
                targetType="comment"
                postId={comment.postId}
                commentId={comment.id}
                isLikedByMe={comment.isLikedByMe}
              />
            </li>
            <li>.</li>
            <li>
              <button
                type="button"
                onClick={() => setRepliesOpen(!repliesOpen)}
                className="text-[12px] text-text-muted dark:text-text-dark/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer font-semibold"
              >
                Reply
              </button>
            </li>
            <li>.</li>
            <li>
              <button
                type="button"
                onClick={() => alert("Comment shared (mock action)")}
                className="text-[12px] text-text-muted dark:text-text-dark/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer font-semibold"
              >
                Share
              </button>
            </li>
            <li>.</li>
            <li>
              <span className="text-[12px] text-text-muted/80 dark:text-text-dark/60">
                {formatRelativeTime(comment.createdAt).replace(" minutes", "m").replace(" minute", "m").replace(" ago", "")}
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
