"use client";

import { useAuth } from "@/hooks/useAuth";
import { useCreateReply, useReplies } from "@/hooks/useReplies";
import { useState } from "react";
import ReplyItem from "./ReplyItem";
import Image from "next/image";

interface ReplyListProps {
  postId: string;
  commentId: string;
}

export default function ReplyList({ postId, commentId }: ReplyListProps) {
  const { user } = useAuth();
  const [text, setText] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useReplies(postId, commentId);

  const createReplyMutation = useCreateReply(postId, commentId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || createReplyMutation.isPending) return;
    const submittedText = text;
    setText("");
    try {
      await createReplyMutation.mutateAsync(submittedText);
    } catch (err) {
      setText(submittedText);
      console.error("Error posting reply:", err);
    }
  };

  const replies = data?.pages.flatMap((page) => page.replies) || [];

  return (
    <div className="border-l-2 border-border pl-3 transition-colors duration-300">
      {/* Replies list */}
      {isLoading ? (
        <div className="text-[11px] text-text-muted">Loading replies...</div>
      ) : (
        <div className="space-y-2">
          {replies.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} postId={postId} />
          ))}
        </div>
      )}

      {/* Load more replies */}
      {hasNextPage && (
        <div className="mb-2 mt-2">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-[11px] text-primary hover:underline disabled:opacity-60 cursor-pointer"
          >
            {isFetchingNextPage ? "Loading..." : "View previous replies"}
          </button>
        </div>
      )}

      {/* Reply input */}
      {user && (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-border">
            <Image
              src={user?.avatarUrl || "/assets/images/user.png"}
              alt=""
              className="w-full h-full object-cover"
              width={24}
              height={24}
            />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border border-border rounded-xl px-3 py-1 text-xs text-text-dark placeholder-[#C4C4C4] bg-bg-page focus:outline-none focus:border-primary transition-colors h-7 duration-300"
              placeholder="Write a reply..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              disabled={createReplyMutation.isPending || !text.trim()}
              className="text-xs text-primary font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
            >
              Reply
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
