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
    <div className="flex flex-col mb-3 font-sans text-left">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-border-color shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={comment.author.avatarUrl || "/assets/images/comment_img.png"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="bg-[#f5f7fb] p-2.5 px-4 rounded-[12px] inline-block max-w-full">
            <h5 className="text-[13px] font-semibold text-[#112032] mb-0.5">
              {comment.author.firstName} {comment.author.lastName}
            </h5>
            <p className="text-[13px] text-[#112032] leading-normal m-0 whitespace-pre-wrap">
              {comment.text}
            </p>

            {/* Comment Reaction indicators */}
            {comment.likeCount > 0 && (
              <div className="mt-1 flex items-center gap-1">
                <span className="text-primary">
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
                <span className="text-[11px] text-[#5f72a5] font-semibold">
                  {comment.likeCount}
                </span>
              </div>
            )}
          </div>

          {/* Comment action footer links */}
          <div className="mt-1 pl-3">
            <ul className="flex items-center gap-2.5 list-none p-0 m-0 text-xs text-[#5f72a5] font-medium select-none">
              <li className="flex items-center gap-1.5">
                <LikeButton
                  targetType="comment"
                  postId={comment.postId}
                  commentId={comment.id}
                  isLikedByMe={comment.isLikedByMe}
                />
                <span className="text-gray-300">.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <button
                  onClick={() => setRepliesOpen(!repliesOpen)}
                  className="bg-transparent border-none p-0 cursor-pointer outline-none hover:text-primary transition-colors font-sans text-xs"
                  type="button"
                >
                  Reply
                </button>
                <span className="text-gray-300">.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <button
                  onClick={() => alert("Comment shared (mock action)")}
                  className="bg-transparent border-none p-0 cursor-pointer outline-none hover:text-primary transition-colors font-sans text-xs"
                  type="button"
                >
                  Share
                </button>
                <span className="text-gray-300">.</span>
              </li>
              <li>
                <span className="text-[11px] text-gray-400 font-normal">
                  {formatRelativeTime(comment.createdAt)}
                </span>
              </li>
            </ul>
          </div>

          {/* Nested Replies Section */}
          {repliesOpen && (
            <div className="mt-3 ml-6 border-l border-border-color pl-3">
              <ReplyList postId={comment.postId} commentId={comment.id} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
