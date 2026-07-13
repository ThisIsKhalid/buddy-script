"use client";

type TargetType = "post" | "comment" | "reply";

function getStorageKey(userId: string, targetType: TargetType) {
  return `buddy-script:likes:${userId}:${targetType}`;
}

function readBucket(userId: string, targetType: TargetType): Record<string, boolean> {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(getStorageKey(userId, targetType));
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeBucket(
  userId: string,
  targetType: TargetType,
  bucket: Record<string, boolean>,
) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      getStorageKey(userId, targetType),
      JSON.stringify(bucket),
    );
  } catch {
    // Ignore storage failures and keep the UI functional.
  }
}

export function getPersistedLikeState(
  userId: string | undefined,
  targetType: TargetType,
  targetId: string | undefined,
) {
  if (!userId || !targetId) return undefined;

  const bucket = readBucket(userId, targetType);
  return typeof bucket[targetId] === "boolean" ? bucket[targetId] : undefined;
}

export function setPersistedLikeState(
  userId: string | undefined,
  targetType: TargetType,
  targetId: string | undefined,
  isLiked: boolean,
) {
  if (!userId || !targetId) return;

  const bucket = readBucket(userId, targetType);
  bucket[targetId] = isLiked;
  writeBucket(userId, targetType, bucket);
}
