"use client";

import { useAuth } from "@/hooks/useAuth";
import { getPersistedLikeState } from "@/lib/like-state";
import { Reply } from "@/types";
import Image from "next/image";
import { useState } from "react";
import LikeButton from "./LikeButton";
import { formatRelativeTime } from "./PostCard";
import ReactorsPopup from "./ReactorsPopup";

interface ReplyItemProps {
  reply: Reply;
  postId: string;
}

type LikeUser = { id?: string | null; userId?: string | null };
type LikeRecord = string | LikeUser | null | undefined;
type ReplyLikeFallback = {
  isLikedByMe?: boolean | null;
  isLiked?: boolean | null;
  likedByMe?: boolean | null;
  likes?: LikeRecord[];
  likedUsers?: LikeRecord[];
  likedBy?: LikeRecord[];
};

function resolveIsLikedByMe(
  item: ReplyLikeFallback,
  currentUserId?: string,
): boolean | undefined {
  if (typeof item.isLikedByMe === "boolean") return item.isLikedByMe;
  if (typeof item.isLiked === "boolean") return item.isLiked;
  if (typeof item.likedByMe === "boolean") return item.likedByMe;

  if (!currentUserId) return undefined;

  const candidates = [item.likes, item.likedUsers, item.likedBy];
  const found = candidates.some((records) =>
    Array.isArray(records)
      ? records.some((record) => {
          if (!record) return false;
          if (typeof record === "string") return record === currentUserId;
          return (
            record.userId === currentUserId || record.id === currentUserId
          );
        })
      : false,
  );

  return found ? true : undefined;
}

export default function ReplyItem({ reply, postId }: ReplyItemProps) {
  const { user } = useAuth();
  const [likersOpen, setLikersOpen] = useState(false);
  const explicitLikedState = resolveIsLikedByMe(
    reply as Reply & ReplyLikeFallback,
    user?.id,
  );
  const persistedLikedState = getPersistedLikeState(
    user?.id,
    "reply",
    reply.id,
  );
  const isLikedByMe = persistedLikedState ?? explicitLikedState ?? false;

  return (
    <div className="flex items-start gap-2 mb-2 transition-colors duration-300">
      {/* Avatar */}
      <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5 border border-border">
        {}
        <Image
          src={reply?.author?.avatarUrl || "/assets/images/user.png"}
          alt=""
          className="w-full h-full object-cover"
          width={24}
          height={24}
        />
      </div>

      <div className="flex-1 min-w-0">
        {/* Bubble */}
        <div className="relative bg-[#F8FAFD] dark:bg-[#112032]/45 border border-transparent dark:border-border rounded-md px-3.5 py-2.5 transition-colors duration-300 w-full max-w-fit pr-10">
          <h4 className="text-[12px] font-semibold text-text-dark mb-0.5 truncate">
            {reply?.author?.firstName} {reply?.author?.lastName}
          </h4>
          <p className="text-[12px] text-text-dark whitespace-pre-wrap wrap-break-word">
            {reply?.text}
          </p>

          {/* Clickable like badge — opens likers popup */}
          {reply?.likeCount > 0 && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setLikersOpen(!likersOpen)}
                className="absolute -right-14 bg-white dark:bg-card border border-border/80 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm z-10 select-none hover:bg-bg-page transition-colors cursor-pointer"
              >
                <span className="text-[11px] leading-none">👍</span>
                <span className="text-[10px] text-primary font-bold">
                  {reply.likeCount}
                </span>
              </button>
              {likersOpen && (
                <ReactorsPopup
                  targetType="reply"
                  postId={postId}
                  commentId={reply?.commentId}
                  replyId={reply?.id}
                  onClose={() => setLikersOpen(false)}
                />
              )}
            </div>
          )}
        </div>

        {/* Action footer */}
        <ul className="flex items-center gap-1.5 mt-2.5 text-[11px] text-text-muted dark:text-text-dark/70 flex-wrap">
          <li>
            <LikeButton
              targetType="reply"
              postId={postId}
              commentId={reply?.commentId}
              replyId={reply?.id}
              isLikedByMe={isLikedByMe}
            />
          </li>
          <li>.</li>
          <li>
            <span className="text-[11px] text-text-muted/80 dark:text-text-dark/60">
              {formatRelativeTime(reply?.createdAt)
                .replace(" minutes", "m")
                .replace(" minute", "m")
                .replace(" ago", "")}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
