"use client";

import { Reply } from "@/types";
import { formatRelativeTime } from "./PostCard";
import LikeButton from "./LikeButton";

interface ReplyItemProps {
  reply: Reply;
  postId: string;
}

export default function ReplyItem({ reply, postId }: ReplyItemProps) {
  return (
    <div className="flex items-start gap-2 mb-2 transition-colors duration-300">
      {/* Avatar */}
      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-0.5 border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reply.author.avatarUrl || "/assets/images/comment_img.png"}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        {/* Bubble */}
        <div className="bg-[#f0f2f5] dark:bg-bg-page rounded-[10px] px-3 py-2 transition-colors duration-300 w-full max-w-fit border border-transparent dark:border-border">
          <h4 className="text-[12px] font-semibold text-text-dark mb-0.5 truncate">
            {reply.author.firstName} {reply.author.lastName}
          </h4>
          <p className="text-[12px] text-text-dark whitespace-pre-wrap break-words">{reply.text}</p>

          {/* Like count */}
          {reply.likeCount > 0 && (
            <div className="flex items-center gap-1 mt-1 bg-card dark:bg-[#112032] px-1.5 py-0.5 rounded-full w-fit border border-border">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1890FF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <span className="text-[9px] text-primary font-semibold">{reply.likeCount}</span>
            </div>
          )}
        </div>

        {/* Action footer */}
        <ul className="flex items-center gap-2 mt-1 text-[11px] text-text-muted dark:text-text-dark/70 flex-wrap">
          <li>
            <LikeButton
              targetType="reply"
              postId={postId}
              commentId={reply.commentId}
              replyId={reply.id}
              isLikedByMe={reply.isLikedByMe}
            />
          </li>
          <li className="text-text-muted/40 dark:text-text-dark/30">·</li>
          <li>
            <span className="text-[11px] text-text-muted/80 dark:text-text-dark/60">
              {formatRelativeTime(reply.createdAt)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
