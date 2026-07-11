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
    <div className="font-sans">
      {/* Comment Input Box */}
      {user && (
        <div className="border border-border-color rounded-[6px] p-4 bg-white mb-4">
          <form className="flex items-center justify-between gap-3 w-full" onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 flex-grow">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-border-color shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatarUrl || "/assets/images/comment_img.png"}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <textarea
                  className="w-full h-10 border border-[#E8E8E8] rounded-[6px] py-2 px-3 text-xs text-[#2D3748] placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                  placeholder="Write a comment..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                ></textarea>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="py-1.5 px-3 bg-primary hover:bg-primary-hover hover:shadow-sm text-white rounded-[6px] text-xs font-semibold border-none disabled:opacity-50 disabled:cursor-not-allowed transition-all font-sans cursor-pointer"
                type="submit"
                disabled={createCommentMutation.isPending || !text.trim()}
              >
                {createCommentMutation.isPending ? "..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pagination trigger */}
      {hasNextPage && (
        <div className="text-left pl-4 mb-3">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-xs text-primary hover:underline bg-transparent border-none p-0 cursor-pointer outline-none font-sans"
            type="button"
          >
            {isFetchingNextPage ? "Loading comments..." : "View previous comments"}
          </button>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="text-center py-2 text-xs text-muted">
          Loading comments...
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
