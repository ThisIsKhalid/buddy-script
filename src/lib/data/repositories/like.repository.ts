import { db } from "../db";
import { LikeRow } from "../types";
import { User } from "@/types";
import { encodeCursor, decodeCursor } from "../../utils/cursor";

export class LikeRepository {
  static async toggleLike(
    userId: string,
    targetType: "post" | "comment" | "reply",
    targetId: string
  ): Promise<{ isLiked: boolean; likeCount: number }> {
    const existingIndex = db.likes.findIndex(
      (l) => l.targetType === targetType && l.targetId === targetId && l.userId === userId
    );

    let isLiked = false;

    if (existingIndex !== -1) {
      // Unlike
      db.likes.splice(existingIndex, 1);
      isLiked = false;
    } else {
      // Like
      const newLike: LikeRow = {
        id: `like_${Math.random().toString(36).substring(2, 11)}`,
        userId,
        targetType,
        targetId,
        createdAt: new Date().toISOString(),
      };
      db.likes.push(newLike);
      isLiked = true;
    }

    const likeCount = db.likes.filter(
      (l) => l.targetType === targetType && l.targetId === targetId
    ).length;

    return { isLiked, likeCount };
  }

  static async findLikersPage(
    targetType: "post" | "comment" | "reply",
    targetId: string,
    cursor?: string,
    limit = 10
  ): Promise<{ likers: User[]; nextCursor: string | null }> {
    const targetLikes = db.likes.filter((l) => l.targetType === targetType && l.targetId === targetId);

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
}
