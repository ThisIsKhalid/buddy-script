import { db } from "../db";
import { ReplyRow } from "../types";
import { Reply } from "@/types";
import { encodeCursor, decodeCursor } from "../../utils/cursor";

export class ReplyRepository {
  private static mapRowToReply(row: ReplyRow, currentUserId?: string): Reply {
    const author = db.users.find((u) => u.id === row.authorId);
    const authorInfo = author
      ? {
          id: author.id,
          firstName: author.firstName,
          lastName: author.lastName,
          avatarUrl: author.avatarUrl,
        }
      : {
          id: row.authorId,
          firstName: "Unknown",
          lastName: "User",
          avatarUrl: null,
        };

    const likeCount = db.likes.filter(
      (l) => l.targetType === "reply" && l.targetId === row.id
    ).length;

    const isLikedByMe = currentUserId
      ? db.likes.some(
          (l) => l.targetType === "reply" && l.targetId === row.id && l.userId === currentUserId
        )
      : false;

    return {
      id: row.id,
      commentId: row.commentId,
      authorId: row.authorId,
      author: authorInfo,
      text: row.text,
      likeCount,
      isLikedByMe,
      createdAt: row.createdAt,
    };
  }

  static async findRepliesPage(
    commentId: string,
    cursor?: string,
    limit = 10,
    currentUserId?: string
  ): Promise<{ replies: Reply[]; nextCursor: string | null }> {
    const filteredReplies = db.replies.filter((r) => r.commentId === commentId);

    // Chronological oldest to newest
    filteredReplies.sort((a, b) => {
      const timeDiff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (timeDiff !== 0) return timeDiff;
      return a.id.localeCompare(b.id);
    });

    let startIndex = 0;
    if (cursor) {
      const decoded = decodeCursor(cursor);
      if (decoded) {
        const idx = filteredReplies.findIndex(
          (r) => r.createdAt === decoded.createdAt && r.id === decoded.id
        );
        if (idx !== -1) {
          startIndex = idx + 1;
        }
      }
    }

    const pageRows = filteredReplies.slice(startIndex, startIndex + limit);
    const replies = pageRows.map((row) => this.mapRowToReply(row, currentUserId));

    let nextCursor: string | null = null;
    const hasNextPage = startIndex + limit < filteredReplies.length;
    if (hasNextPage && pageRows.length > 0) {
      const lastItem = pageRows[pageRows.length - 1];
      nextCursor = encodeCursor(lastItem.createdAt, lastItem.id);
    }

    return { replies, nextCursor };
  }

  static async create(data: {
    commentId: string;
    authorId: string;
    text: string;
  }): Promise<Reply> {
    const newRow: ReplyRow = {
      id: `rpl_${Math.random().toString(36).substring(2, 11)}`,
      commentId: data.commentId,
      authorId: data.authorId,
      text: data.text,
      createdAt: new Date().toISOString(),
    };

    db.replies.push(newRow);

    return this.mapRowToReply(newRow, data.authorId);
  }

  static async findById(id: string, currentUserId?: string): Promise<Reply | null> {
    const row = db.replies.find((r) => r.id === id);
    if (!row) return null;
    return this.mapRowToReply(row, currentUserId);
  }

  static async delete(id: string, authorId: string): Promise<boolean> {
    const idx = db.replies.findIndex((r) => r.id === id);
    if (idx === -1) return false;

    const reply = db.replies[idx];
    if (reply.authorId !== authorId) return false;

    // Remove reply
    db.replies.splice(idx, 1);

    // Delete reply likes
    db.likes = db.likes.filter((l) => !(l.targetType === "reply" && l.targetId === id));

    return true;
  }
}
