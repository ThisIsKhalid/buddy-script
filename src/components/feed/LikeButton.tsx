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
        className={`flex-1 flex items-center justify-center gap-2 h-[48px] rounded-[6px] text-sm font-semibold transition-all duration-200 disabled:opacity-60 cursor-pointer ${
          isLikedByMe
            ? " text-[#1890FF]"
            : "bg-transparent hover:bg-[#E8F2FF]/70 dark:hover:bg-[#112032]/50 text-[#65676B] dark:text-text-dark"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
            stroke={isLikedByMe ? "#1890FF" : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isLikedByMe ? "#1890FF" : "none"}
            fillOpacity={isLikedByMe ? "0.15" : "0"}
          />
        </svg>
        <span>{isLikedByMe ? "Liked" : "Like"}</span>
      </button>
    );
  }

  // Text-link like for comment / reply
  return (
    <button
      type="button"
      onClick={() => mutate()}
      disabled={isPending}
      className={`text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60 ${
        isLikedByMe
          ? "text-primary"
          : "text-text-muted hover:text-primary dark:text-text-dark"
      }`}
    >
      {isLikedByMe ? "Liked" : "Like"}
    </button>
  );
}
