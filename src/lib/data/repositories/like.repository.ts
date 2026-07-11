import { db } from "../db";
import { LikeRow } from "../types";
import { User } from "@/types";
import { encodeCursor, decodeCursor } from "../../utils/cursor";

export class LikeRepository {
  static async toggleReaction(
    userId: string,
    targetType: "post" | "comment" | "reply",
    targetId: string,
    reaction: "like" | "dislike"
  ): Promise<{
    isLiked: boolean;
    isDisliked: boolean;
    likeCount: number;
    dislikeCount: number;
  }> {
    const existingIndex = db.likes.findIndex(
      (l) => l.targetType === targetType && l.targetId === targetId && l.userId === userId
    );

    if (existingIndex !== -1) {
      const existing = db.likes[existingIndex];
      if (existing.reaction === reaction) {
        // Same reaction → remove (un-react)
        db.likes.splice(existingIndex, 1);
      } else {
        // Opposite reaction → switch
        db.likes[existingIndex] = { ...existing, reaction };
      }
    } else {
      // No existing reaction → add
      const newLike: LikeRow = {
        id: `like_${Math.random().toString(36).substring(2, 11)}`,
        userId,
        targetType,
        targetId,
        reaction,
        createdAt: new Date().toISOString(),
      };
      db.likes.push(newLike);
    }

    const targetReactions = db.likes.filter(
      (l) => l.targetType === targetType && l.targetId === targetId
    );

    const likeCount = targetReactions.filter((l) => l.reaction === "like").length;
    const dislikeCount = targetReactions.filter((l) => l.reaction === "dislike").length;

    const myReaction = targetReactions.find((l) => l.userId === userId);
    const isLiked = myReaction?.reaction === "like";
    const isDisliked = myReaction?.reaction === "dislike";

    return { isLiked, isDisliked, likeCount, dislikeCount };
  }

  // Legacy alias used by comment/reply routes (they still use "like" only)
  static async toggleLike(
    userId: string,
    targetType: "post" | "comment" | "reply",
    targetId: string
  ): Promise<{ isLiked: boolean; likeCount: number }> {
    const result = await this.toggleReaction(userId, targetType, targetId, "like");
    return { isLiked: result.isLiked, likeCount: result.likeCount };
  }

  static async findReactorsPage(
    targetType: "post" | "comment" | "reply",
    targetId: string,
    reaction?: "like" | "dislike",
    cursor?: string,
    limit = 10
  ): Promise<{ likers: User[]; nextCursor: string | null }> {
    let targetLikes = db.likes.filter(
      (l) => l.targetType === targetType && l.targetId === targetId
    );

    if (reaction) {
      targetLikes = targetLikes.filter((l) => l.reaction === reaction);
    }

    // Sort likes by createdAt DESC
    targetLikes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    let startIndex = 0;
    if (cursor) {
      const decoded = decodeCursor(cursor);
      if (decoded) {
        const idx = targetLikes.findIndex(
          (l) => l.createdAt === decoded.createdAt && l.id === decoded.id
        );
        if (idx !== -1) {
          startIndex = idx + 1;
        }
      }
    }

    const pageLikes = targetLikes.slice(startIndex, startIndex + limit);
    const likers: User[] = [];

    for (const like of pageLikes) {
      const user = db.users.find((u) => u.id === like.userId);
      if (user) {
        likers.push({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatarUrl: user.avatarUrl,
          createdAt: user.createdAt,
        });
      }
    }

    let nextCursor: string | null = null;
    const hasNextPage = startIndex + limit < targetLikes.length;
    if (hasNextPage && pageLikes.length > 0) {
      const lastLike = pageLikes[pageLikes.length - 1];
      nextCursor = encodeCursor(lastLike.createdAt, lastLike.id);
    }

    return { likers, nextCursor };
  }

  // Legacy alias for findLikersPage (likes/route.ts)
  static async findLikersPage(
    targetType: "post" | "comment" | "reply",
    targetId: string,
    cursor?: string,
    limit = 10
  ): Promise<{ likers: User[]; nextCursor: string | null }> {
    return this.findReactorsPage(targetType, targetId, "like", cursor, limit);
  }
}
