"use client";

import { useState } from "react";
import { useReplies, useCreateReply } from "@/hooks/useReplies";
import { useAuth } from "@/hooks/useAuth";
import ReplyItem from "./ReplyItem";

interface ReplyListProps {
  postId: string;
  commentId: string;
}

export default function ReplyList({ postId, commentId }: ReplyListProps) {
  const { user } = useAuth();
  const [text, setText] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useReplies(postId, commentId);

  const createReplyMutation = useCreateReply(postId, commentId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || createReplyMutation.isPending) return;

    try {
      await createReplyMutation.mutateAsync(text);
      setText("");
    } catch (err) {
      console.error("Error posting reply:", err);
    }
  };

  const replies = data?.pages.flatMap((page) => page.replies) || [];

  return (
    <div className="mt-2 border-start ps-3">
      {/* Replies List */}
      {isLoading ? (
        <div className="text-muted" style={{ fontSize: "11px" }}>Loading replies...</div>
      ) : (
        <div className="reply-items-container">
          {replies.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} postId={postId} />
          ))}
        </div>
      )}

      {/* Pagination trigger for Replies */}
      {hasNextPage && (
        <div className="mb-2">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            style={{ background: "none", border: "none", color: "#1890FF", fontSize: "11px", padding: 0, cursor: "pointer" }}
          >
            {isFetchingNextPage ? "Loading..." : "View previous replies"}
          </button>
        </div>
      )}

      {/* Reply input box */}
      {user && (
        <form className="d-flex align-items-center mt-2" onSubmit={handleSubmit}>
          <div className="me-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl || "/assets/images/comment_img.png"}
              alt=""
              style={{ borderRadius: "50%", width: "24px", height: "24px" }}
            />
          </div>
          <div className="flex-grow-1">
            <input
              type="text"
              className="form-control"
              placeholder="Write a reply..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                fontSize: "12px",
                padding: "4px 10px",
                borderRadius: "12px",
                height: "28px"
              }}
            />
          </div>
          <button
            type="submit"
            disabled={createReplyMutation.isPending || !text.trim()}
            className="btn btn-sm btn-link ms-1 text-primary"
            style={{ fontSize: "12px", padding: 0 }}
          >
            Reply
          </button>
        </form>
      )}
    </div>
  );
}
