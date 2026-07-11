"use client";

import { useState } from "react";
import { useComments, useCreateComment } from "@/hooks/useComments";
import { useAuth } from "@/hooks/useAuth";
import CommentItem from "./CommentItem";

interface CommentListProps {
  postId: string;
}

export default function CommentList({ postId }: CommentListProps) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useComments(postId);

  const createCommentMutation = useCreateComment(postId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || createCommentMutation.isPending) return;

    try {
      await createCommentMutation.mutateAsync(text);
      setText("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  return (
    <div>
      {/* Comment Input Box */}
      {user && (
        <div className="_feed_inner_comment_box">
          <form className="_feed_inner_comment_box_form" onSubmit={handleSubmit}>
            <div className="_feed_inner_comment_box_content d-flex align-items-center w-100">
              <div className="_feed_inner_comment_box_content_image me-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatarUrl || "/assets/images/comment_img.png"}
                  alt=""
                  className="_comment_img"
                  style={{ borderRadius: "50%", width: "32px", height: "32px" }}
                />
              </div>
              <div className="_feed_inner_comment_box_content_txt flex-grow-1">
                <textarea
                  className="form-control _comment_textarea"
                  placeholder="Write a comment..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  style={{ height: "40px", padding: "8px 12px", resize: "none" }}
                ></textarea>
              </div>
            </div>
            <div className="_feed_inner_comment_box_icon d-flex align-items-center">
              <button
                className="_feed_inner_comment_box_icon_btn btn btn-sm btn-primary"
                type="submit"
                disabled={createCommentMutation.isPending || !text.trim()}
                style={{
                  fontSize: "12px",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  border: "none",
                }}
              >
                {createCommentMutation.isPending ? "..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pagination trigger */}
      {hasNextPage && (
        <div className="_previous_comment text-start ps-4 mb-3">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="_previous_comment_link"
            style={{ background: "none", border: "none", color: "#1890FF", fontSize: "13px", padding: 0 }}
          >
            {isFetchingNextPage ? "Loading comments..." : "View previous comments"}
          </button>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="text-center py-2" style={{ fontSize: "12px", color: "#666" }}>
          Loading comments...
        </div>
      ) : (
        <div className="_timline_comment_main">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
