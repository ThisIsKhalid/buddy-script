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
    <div className="flex items-start gap-2 mb-2">
      {/* Avatar */}
      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reply.author.avatarUrl || "/assets/images/comment_img.png"}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        {/* Bubble */}
        <div className="bg-[#f0f2f5] rounded-[10px] px-3 py-2">
          <h4 className="text-[12px] font-semibold text-[#112032] mb-0.5">
            {reply.author.firstName} {reply.author.lastName}
          </h4>
          <p className="text-[12px] text-[#112032]">{reply.text}</p>

          {/* Like count */}
          {reply.likeCount > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1890FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <span className="text-[10px] text-[#5f72a5]">{reply.likeCount}</span>
            </div>
          )}
        </div>

        {/* Action footer */}
        <ul className="flex items-center gap-3 mt-1 text-[11px] text-[#5f72a5]">
          <li>
            <LikeButton
              targetType="reply"
              postId={postId}
              commentId={reply.commentId}
              replyId={reply.id}
              isLikedByMe={reply.isLikedByMe}
            />
            {" ·"}
          </li>
          <li>
            <span className="text-[11px] text-[#5f72a5]">{formatRelativeTime(reply.createdAt)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
