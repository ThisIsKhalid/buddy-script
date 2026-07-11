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
    <div className="border-l-2 border-[#DFDFDF] pl-3">
      {/* Replies list */}
      {isLoading ? (
        <div className="text-[11px] text-[#666]">Loading replies...</div>
      ) : (
        <div>
          {replies.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} postId={postId} />
          ))}
        </div>
      )}

      {/* Load more replies */}
      {hasNextPage && (
        <div className="mb-2">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-[11px] text-[#1890FF] hover:underline disabled:opacity-60"
          >
            {isFetchingNextPage ? "Loading..." : "View previous replies"}
          </button>
        </div>
      )}

      {/* Reply input */}
      {user && (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl || "/assets/images/comment_img.png"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border border-[#DFDFDF] rounded-[12px] px-3 py-1 text-xs text-[#112032] placeholder-[#C4C4C4] bg-[#F0F2F5] focus:outline-none focus:border-[#1890FF] transition-colors h-7"
              placeholder="Write a reply..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              disabled={createReplyMutation.isPending || !text.trim()}
              className="text-xs text-[#1890FF] font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              Reply
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
