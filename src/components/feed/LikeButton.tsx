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
        className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 text-xs md:text-sm font-semibold hover:bg-light-gray rounded-[6px] transition-all bg-transparent border-none cursor-pointer select-none font-sans ${
          isLikedByMe ? "text-primary bg-[#e8f4ff]" : "text-[#5f72a5]"
        }`}
        onClick={() => mutate()}
        disabled={isPending}
        type="button"
      >
        <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
            <path
              fill={isLikedByMe ? "#377DFF" : "#FFCC4D"}
              d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
            />
            <path
              fill="#fff"
              d="M12.35 8.5c.36 0 .65.29.65.65v1.2a1.8 1.8 0 01-1.8 1.8H7.8a1.8 1.8 0 01-1.8-1.8v-3a1.8 1.8 0 011.8-1.8h.36c.21 0 .39.14.44.35l.4 1.6H12.35z"
            />
          </svg>
          {isLikedByMe ? "Liked" : "Like"}
        </span>
      </button>
    );
  }

  // Text-link like for comment / reply list items
  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className={`bg-transparent border-none p-0 m-0 cursor-pointer outline-none font-sans text-xs transition-colors hover:text-primary ${
        isLikedByMe ? "text-primary font-semibold" : "text-inherit"
      }`}
      type="button"
    >
      {isLikedByMe ? "Liked" : "Like"}
    </button>
  );
}
