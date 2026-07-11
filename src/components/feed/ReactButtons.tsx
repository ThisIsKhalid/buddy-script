"use client";

import { useLikeToggle } from "@/hooks/useLikeToggle";

interface ReactButtonsProps {
  postId: string;
  isLikedByMe: boolean;
  isDislikedByMe: boolean;
}

export default function ReactButtons({ postId, isLikedByMe, isDislikedByMe }: ReactButtonsProps) {
  const likeMutation = useLikeToggle({ targetType: "post", postId, reaction: "like" });
  const dislikeMutation = useLikeToggle({ targetType: "post", postId, reaction: "dislike" });

  const isPending = likeMutation.isPending || dislikeMutation.isPending;

  return (
    <div className="flex-1 flex items-center">
      {/* 👍 Like Button */}
      <button
        type="button"
        onClick={() => likeMutation.mutate()}
        disabled={isPending}
        className={`flex-1 flex items-center justify-center gap-2 h-[48px] rounded-l-[6px] text-sm font-semibold transition-all duration-200 disabled:opacity-60 cursor-pointer border-r border-border ${
          isLikedByMe
            ? "bg-[#E8F2FF] dark:bg-[#112032] text-[#1890FF]"
            : "bg-transparent hover:bg-[#E8F2FF]/70 dark:hover:bg-[#112032]/50 text-[#65676B] dark:text-text-dark"
        }`}
        title="Like"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          className="flex-shrink-0"
        >
          <path
            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
            stroke={isLikedByMe ? "#1890FF" : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isLikedByMe ? "#1890FF" : "none"}
            fillOpacity={isLikedByMe ? "0.2" : "0"}
          />
        </svg>
        <span className={isLikedByMe ? "text-[#1890FF]" : ""}>Like</span>
      </button>

      {/* 👎 Dislike Button */}
      <button
        type="button"
        onClick={() => dislikeMutation.mutate()}
        disabled={isPending}
        className={`flex-1 flex items-center justify-center gap-2 h-[48px] rounded-r-[6px] text-sm font-semibold transition-all duration-200 disabled:opacity-60 cursor-pointer ${
          isDislikedByMe
            ? "bg-[#FFF0F0] dark:bg-[#2d1010] text-[#dc3545]"
            : "bg-transparent hover:bg-[#FFF0F0]/70 dark:hover:bg-[#2d1010]/50 text-[#65676B] dark:text-text-dark"
        }`}
        title="Dislike"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          style={{ transform: "scaleY(-1)" }}
          className="flex-shrink-0"
        >
          <path
            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
            stroke={isDislikedByMe ? "#dc3545" : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isDislikedByMe ? "#dc3545" : "none"}
            fillOpacity={isDislikedByMe ? "0.2" : "0"}
          />
        </svg>
        <span className={isDislikedByMe ? "text-[#dc3545]" : ""}>Dislike</span>
      </button>
    </div>
  );
}
