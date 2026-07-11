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
        className={`flex-1 flex items-center justify-center gap-2 h-[48px] rounded-[6px] text-sm font-medium transition-colors duration-200 disabled:opacity-60 cursor-pointer ${
          isLikedByMe
            ? "bg-[#e4f1fd] dark:bg-[#123150] text-[#1890FF]"
            : "bg-transparent hover:bg-[#e4f1fd] dark:hover:bg-[#123150] text-[#666666] dark:text-text-dark"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          fill="none"
          viewBox="0 0 19 19"
          className="mr-2"
        >
          <path
            fill={isLikedByMe ? "#FFCC4D" : "currentColor"}
            fillOpacity={isLikedByMe ? "1" : "0.3"}
            d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
          />
          <path
            fill={isLikedByMe ? "#664500" : "currentColor"}
            fillOpacity={isLikedByMe ? "1" : "0.6"}
            d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"
          />
          <path
            fill="#fff"
            d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"
          />
          <path
            fill={isLikedByMe ? "#664500" : "currentColor"}
            fillOpacity={isLikedByMe ? "1" : "0.6"}
            d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"
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
      className={`text-sm font-medium transition-colors cursor-pointer disabled:opacity-60 ${
        isLikedByMe
          ? "text-primary font-semibold"
          : "text-text-muted hover:text-primary dark:text-text-dark"
      }`}
    >
      {isLikedByMe ? "Liked" : "Like"}
    </button>
  );
}
