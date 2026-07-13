"use client";

import { Reply } from "@/types";
import { useState } from "react";
import LikeButton from "./LikeButton";
import { formatRelativeTime } from "./PostCard";
import ReactorsPopup from "./ReactorsPopup";

interface ReplyItemProps {
  reply: Reply;
  postId: string;
}

export default function ReplyItem({ reply, postId }: ReplyItemProps) {
  const [likersOpen, setLikersOpen] = useState(false);

  return (
    <div className="flex items-start gap-2 mb-2 transition-colors duration-300">
      {/* Avatar */}
      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-0.5 border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reply.author.avatarUrl || "/assets/images/user.png"}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        {/* Bubble */}
        <div className="relative bg-[#F8FAFD] dark:bg-[#112032]/45 border border-transparent dark:border-border rounded-[6px] px-3.5 py-2.5 transition-colors duration-300 w-full max-w-fit pr-10">
          <h4 className="text-[12px] font-semibold text-text-dark mb-0.5 truncate">
            {reply.author.firstName} {reply.author.lastName}
          </h4>
          <p className="text-[12px] text-text-dark whitespace-pre-wrap break-words">
            {reply.text}
          </p>

          {/* Clickable like badge — opens likers popup */}
          {reply.likeCount > 0 && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setLikersOpen(!likersOpen)}
                className="absolute -right-14 bg-white dark:bg-card border border-border/80 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm z-10 select-none hover:bg-bg-page transition-colors cursor-pointer"
              >
                <span className="text-[11px] leading-none">👍</span>
                <span className="text-[10px] text-primary font-bold">
                  {reply.likeCount}
                </span>
              </button>
              {likersOpen && (
                <ReactorsPopup
                  targetType="reply"
                  postId={postId}
                  commentId={reply.commentId}
                  replyId={reply.id}
                  onClose={() => setLikersOpen(false)}
                />
              )}
            </div>
          )}
        </div>

        {/* Action footer */}
        <ul className="flex items-center gap-1.5 mt-2.5 text-[11px] text-text-muted dark:text-text-dark/70 flex-wrap">
          <li>
            <LikeButton
              targetType="reply"
              postId={postId}
              commentId={reply.commentId}
              replyId={reply.id}
              isLikedByMe={reply.isLikedByMe}
            />
          </li>
          <li>.</li>
          <li>
            <span className="text-[11px] text-text-muted/80 dark:text-text-dark/60">
              {formatRelativeTime(reply.createdAt)
                .replace(" minutes", "m")
                .replace(" minute", "m")
                .replace(" ago", "")}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
