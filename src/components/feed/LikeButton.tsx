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
        className={`flex-1 flex items-center justify-center gap-2 h-[48px] rounded-[6px] text-sm font-semibold transition-colors duration-200 disabled:opacity-60 cursor-pointer ${
          isLikedByMe
            ? "bg-[#E8F2FF] dark:bg-[#112032] text-[#1890FF]"
            : "bg-transparent hover:bg-[#E8F2FF] dark:hover:bg-[#112032] text-[#65676B] dark:text-text-dark"
        }`}
      >
        <span className="text-[17px] leading-none mb-[1px]">😆</span>
        <span>Haha</span>
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
