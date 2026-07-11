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
    <div className="mt-2 space-y-2 text-left font-sans">
      {/* Replies List */}
      {isLoading ? (
        <div className="text-xs text-muted">Loading replies...</div>
      ) : (
        <div className="space-y-3">
          {replies.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} postId={postId} />
          ))}
        </div>
      )}

      {/* Pagination trigger for Replies */}
      {hasNextPage && (
        <div className="text-left mt-2">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-[11px] text-primary hover:underline bg-transparent border-none p-0 cursor-pointer outline-none font-sans"
            type="button"
          >
            {isFetchingNextPage ? "Loading..." : "View previous replies"}
          </button>
        </div>
      )}

      {/* Reply input box */}
      {user && (
        <form className="flex items-center gap-2 mt-3 w-full" onSubmit={handleSubmit}>
          <div className="w-6 h-6 rounded-full overflow-hidden border border-border-color shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl || "/assets/images/comment_img.png"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <input
              type="text"
              className="w-full h-7 bg-light-gray rounded-[12px] px-3 py-1 text-xs text-[#2D3748] placeholder-muted border border-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              placeholder="Write a reply..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={createReplyMutation.isPending || !text.trim()}
            className="text-xs text-primary hover:text-primary-hover font-semibold bg-transparent border-none p-0 cursor-pointer shrink-0 font-sans ml-1"
          >
            Reply
          </button>
        </form>
      )}
    </div>
  );
}
