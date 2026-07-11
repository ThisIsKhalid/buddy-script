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
    <div className="flex items-start gap-2.5 mb-2 font-sans text-left">
      <div className="w-6 h-6 rounded-full overflow-hidden border border-border-color shrink-0 mt-0.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reply.author.avatarUrl || "/assets/images/comment_img.png"}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="bg-[#f0f2f5] p-2 px-3 rounded-[10px] inline-block max-w-full">
          <h5 className="text-xs font-semibold text-[#112032] mb-0.5">
            {reply.author.firstName} {reply.author.lastName}
          </h5>
          <p className="text-xs text-[#112032] leading-normal m-0 whitespace-pre-wrap">
            {reply.text}
          </p>

          {/* Reply Like counts */}
          {reply.likeCount > 0 && (
            <div className="mt-1 flex items-center gap-1">
              <span className="text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
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
              <span className="text-[10px] text-[#5f72a5] font-semibold">{reply.likeCount}</span>
            </div>
          )}
        </div>

        {/* Action footer for Reply */}
        <div className="mt-1 pl-1">
          <ul className="flex items-center gap-2 list-none p-0 m-0 text-[11px] text-[#5f72a5] font-medium select-none">
            <li className="flex items-center gap-1.5">
              <LikeButton
                targetType="reply"
                postId={postId}
                commentId={reply.commentId}
                replyId={reply.id}
                isLikedByMe={reply.isLikedByMe}
              />
              <span className="text-gray-300">.</span>
            </li>
            <li>
              <span className="text-[10px] text-gray-400 font-normal">
                {formatRelativeTime(reply.createdAt)}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
