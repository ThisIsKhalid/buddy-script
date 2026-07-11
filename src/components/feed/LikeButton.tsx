"use client";

import { useLikeToggle } from "@/hooks/useLikeToggle";

interface LikeButtonProps {
  targetType: "post" | "comment" | "reply";
  postId: string;
  commentId?: string;
  replyId?: string;
  isLikedByMe: boolean;
}

export default function LikeButton({
  targetType,
  postId,
  commentId,
  replyId,
  isLikedByMe,
}: LikeButtonProps) {
  const { mutate, isPending } = useLikeToggle({
    targetType,
    postId,
    commentId,
    replyId,
  });

  if (targetType === "post") {
    return (
      <button
        type="button"
        onClick={() => mutate()}
        disabled={isPending}
        className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
          isLikedByMe ? "text-[#1890FF]" : "text-[#666666] hover:text-[#1890FF]"
        } disabled:opacity-60`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
          <path
            fill={isLikedByMe ? "#1890FF" : "#FFCC4D"}
            d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
          />
          <path
            fill="#fff"
            d="M12.35 8.5c.36 0 .65.29.65.65v1.2a1.8 1.8 0 01-1.8 1.8H7.8a1.8 1.8 0 01-1.8-1.8v-3a1.8 1.8 0 011.8-1.8h.36c.21 0 .39.14.44.35l.4 1.6H12.35z"
          />
        </svg>
        {isLikedByMe ? "Liked" : "Like"}
      </button>
    );
  }

  // Text-link like for comment / reply
  return (
    <button
      type="button"
      onClick={() => mutate()}
      disabled={isPending}
      className={`text-xs font-medium transition-colors ${
        isLikedByMe ? "text-[#1890FF] font-semibold" : "text-[#5f72a5] hover:text-[#1890FF]"
      } disabled:opacity-60`}
    >
      {isLikedByMe ? "Liked" : "Like"}
    </button>
  );
}
