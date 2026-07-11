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
      {/* View previous comments */}
      {hasNextPage && (
        <div className="mb-3">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-[13px] text-primary font-medium hover:underline disabled:opacity-60 cursor-pointer"
          >
            {isFetchingNextPage ? "Loading comments..." : "View previous comments"}
          </button>
        </div>
      )}

      {/* Comments list */}
      {isLoading ? (
        <div className="text-center py-2 text-xs text-text-muted">Loading comments...</div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {/* Comment input box */}
      {user && (
        <form onSubmit={handleSubmit} className="flex items-start gap-2 mt-4">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl || "/assets/images/comment_img.png"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <textarea
              className="flex-1 border border-border rounded-[20px] px-4 py-2 text-sm text-text-dark placeholder-[#C4C4C4] bg-bg-page focus:outline-none focus:border-primary resize-none h-9 overflow-hidden transition-colors"
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={createCommentMutation.isPending || !text.trim()}
              className="bg-[#1890FF] hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2 rounded-[6px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
            >
              {createCommentMutation.isPending ? "..." : "Send"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
