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
            className="text-[13px] text-text-muted font-semibold hover:underline disabled:opacity-60 cursor-pointer block ml-11"
          >
            {isFetchingNextPage ? "Loading comments..." : "View 4 previous comments"}
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

      {/* Comment input box (oval inline style) */}
      {user && (
        <form onSubmit={handleSubmit} className="flex items-center gap-3 mt-4 w-full">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl || "/assets/images/comment_img.png"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 relative flex items-center bg-[#F8FAFD] dark:bg-[#112032]/60 rounded-full border border-border/10 px-4 py-2">
            <textarea
              className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-sm text-text-dark placeholder-[#8E9C9F] p-0 resize-none h-5 leading-tight pr-14"
              placeholder="Write a comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            {/* Action icons right inside */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {/* Mic Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-text-muted hover:text-primary transition-colors cursor-pointer">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 10v1a7 7 0 01-14 0v-1M12 18v5M8 23h8" />
              </svg>
              {/* Camera Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" fill="none" viewBox="0 0 24 24" className="text-text-muted hover:text-primary transition-colors cursor-pointer">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" />
                <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
