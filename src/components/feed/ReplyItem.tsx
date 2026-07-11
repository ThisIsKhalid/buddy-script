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
    <div className="d-flex align-items-start mb-2" style={{ fontFamily: "Poppins" }}>
      <div className="me-2 mt-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reply.author.avatarUrl || "/assets/images/comment_img.png"}
          alt=""
          style={{ borderRadius: "50%", width: "24px", height: "24px" }}
        />
      </div>
      <div className="flex-grow-1">
        <div className="p-2 px-3" style={{ backgroundColor: "#f0f2f5", borderRadius: "10px" }}>
          <h4
            style={{ fontSize: "12px", fontWeight: 600, margin: "0 0 2px 0", color: "#112032" }}
          >
            {reply.author.firstName} {reply.author.lastName}
          </h4>
          <p style={{ fontSize: "12px", margin: 0, color: "#112032" }}>
            {reply.text}
          </p>

          {/* Reply Like counts */}
          {reply.likeCount > 0 && (
            <div className="mt-1 d-flex align-items-center">
              <span className="_reaction_like me-1">
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
              <span style={{ fontSize: "10px", color: "#5f72a5" }}>{reply.likeCount}</span>
            </div>
          )}
        </div>

        {/* Action footer for Reply */}
        <div className="mt-1">
          <ul
            className="d-flex align-items-center"
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              gap: "8px",
              fontSize: "11px",
              color: "#5f72a5",
            }}
          >
            <li>
              <LikeButton
                targetType="reply"
                postId={postId}
                commentId={reply.commentId}
                replyId={reply.id}
                isLikedByMe={reply.isLikedByMe}
              />
              {" ."}
            </li>
            <li>
              <span className="_time_link">{formatRelativeTime(reply.createdAt)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
