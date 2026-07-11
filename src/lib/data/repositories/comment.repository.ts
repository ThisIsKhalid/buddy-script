import { db } from "../db";
import { CommentRow } from "../types";
import { Comment } from "@/types";
import { encodeCursor, decodeCursor } from "../../utils/cursor";

export class CommentRepository {
  private static mapRowToComment(row: CommentRow, currentUserId?: string): Comment {
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
      (l) => l.targetType === "comment" && l.targetId === row.id
    ).length;

    const replyCount = db.replies.filter((r) => r.commentId === row.id).length;

    const isLikedByMe = currentUserId
      ? db.likes.some(
          (l) => l.targetType === "comment" && l.targetId === row.id && l.userId === currentUserId
        )
      : false;

    return {
      id: row.id,
      postId: row.postId,
      authorId: row.authorId,
      author: authorInfo,
      text: row.text,
      likeCount,
      replyCount,
      isLikedByMe,
      createdAt: row.createdAt,
    };
  }

  static async findCommentsPage(
    postId: string,
    cursor?: string,
    limit = 10,
    currentUserId?: string
  ): Promise<{ comments: Comment[]; nextCursor: string | null }> {
    const filteredComments = db.comments.filter((c) => c.postId === postId);

    // Comments typically render oldest-to-newest for chronological reading.
    // Let's sort comments by createdAt ASC, then id ASC.
    filteredComments.sort((a, b) => {
      const timeDiff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (timeDiff !== 0) return timeDiff;
      return a.id.localeCompare(b.id);
    });

    let startIndex = 0;
    if (cursor) {
      const decoded = decodeCursor(cursor);
      if (decoded) {
        const idx = filteredComments.findIndex(
          (c) => c.createdAt === decoded.createdAt && c.id === decoded.id
        );
        if (idx !== -1) {
          startIndex = idx + 1;
        }
      }
    }

    const pageRows = filteredComments.slice(startIndex, startIndex + limit);
    const comments = pageRows.map((row) => this.mapRowToComment(row, currentUserId));

    let nextCursor: string | null = null;
    const hasNextPage = startIndex + limit < filteredComments.length;
    if (hasNextPage && pageRows.length > 0) {
      const lastItem = pageRows[pageRows.length - 1];
      nextCursor = encodeCursor(lastItem.createdAt, lastItem.id);
    }

    return { comments, nextCursor };
  }

  static async create(data: {
    postId: string;
    authorId: string;
    text: string;
  }): Promise<Comment> {
    const newRow: CommentRow = {
      id: `cmt_${Math.random().toString(36).substring(2, 11)}`,
      postId: data.postId,
      authorId: data.authorId,
      text: data.text,
      createdAt: new Date().toISOString(),
    };

    db.comments.push(newRow);

    return this.mapRowToComment(newRow, data.authorId);
  }

  static async findById(id: string, currentUserId?: string): Promise<Comment | null> {
    const row = db.comments.find((c) => c.id === id);
    if (!row) return null;
    return this.mapRowToComment(row, currentUserId);
  }

  static async delete(id: string, authorId: string): Promise<boolean> {
    const idx = db.comments.findIndex((c) => c.id === id);
    if (idx === -1) return false;

    const comment = db.comments[idx];
    if (comment.authorId !== authorId) return false;

    // Remove comment
    db.comments.splice(idx, 1);

    // Delete comment likes
    db.likes = db.likes.filter((l) => !(l.targetType === "comment" && l.targetId === id));

    // Delete comment replies
    const replies = db.replies.filter((r) => r.commentId === id);
    const replyIds = replies.map((r) => r.id);

    db.replies = db.replies.filter((r) => r.commentId !== id);

    // Delete reply likes
    db.likes = db.likes.filter((l) => !(l.targetType === "reply" && replyIds.includes(l.targetId)));

    return true;
  }
}
