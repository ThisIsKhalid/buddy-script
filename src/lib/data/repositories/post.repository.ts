import { db } from "../db";
import { PostRow } from "../types";
import { Post, Visibility } from "@/types";
import { encodeCursor, decodeCursor } from "../../utils/cursor";

export class PostRepository {
  private static mapRowToPost(row: PostRow, currentUserId?: string): Post {
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
      (l) => l.targetType === "post" && l.targetId === row.id
    ).length;

    const commentCount = db.comments.filter((c) => c.postId === row.id).length;

    const isLikedByMe = currentUserId
      ? db.likes.some(
          (l) => l.targetType === "post" && l.targetId === row.id && l.userId === currentUserId
        )
      : false;

    return {
      id: row.id,
      authorId: row.authorId,
      author: authorInfo,
      text: row.text,
      imageUrl: row.imageUrl,
      visibility: row.visibility,
      likeCount,
      commentCount,
      isLikedByMe,
      createdAt: row.createdAt,
    };
  }

  static async findFeedPage(
    cursor?: string,
    limit = 10,
    currentUserId?: string
  ): Promise<{ posts: Post[]; nextCursor: string | null }> {
    // 1. Filter posts by visibility
    // Public posts: visible to everyone
    // Private posts: only visible to the author
    let filteredPosts = db.posts.filter((post) => {
      if (post.visibility === "public") return true;
      return currentUserId ? post.authorId === currentUserId : false;
    });

    // 2. Sort by createdAt DESC, then id DESC
    filteredPosts.sort((a, b) => {
      const timeDiff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (timeDiff !== 0) return timeDiff;
      return b.id.localeCompare(a.id);
    });

    // 3. Find start index using cursor
    let startIndex = 0;
    if (cursor) {
      const decoded = decodeCursor(cursor);
      if (decoded) {
        const idx = filteredPosts.findIndex(
          (p) => p.createdAt === decoded.createdAt && p.id === decoded.id
        );
        if (idx !== -1) {
          startIndex = idx + 1; // start after the cursor element
        }
      }
    }

    // 4. Slice the items for this page
    const pageRows = filteredPosts.slice(startIndex, startIndex + limit);
    const posts = pageRows.map((row) => this.mapRowToPost(row, currentUserId));

    // 5. Generate nextCursor
    let nextCursor: string | null = null;
    const hasNextPage = startIndex + limit < filteredPosts.length;
    if (hasNextPage && pageRows.length > 0) {
      const lastItem = pageRows[pageRows.length - 1];
      nextCursor = encodeCursor(lastItem.createdAt, lastItem.id);
    }

    return { posts, nextCursor };
  }

  static async findById(id: string, currentUserId?: string): Promise<Post | null> {
    const postRow = db.posts.find((p) => p.id === id);
    if (!postRow) return null;

    // Check visibility authorization
    if (postRow.visibility === "private" && postRow.authorId !== currentUserId) {
      return null;
    }

    return this.mapRowToPost(postRow, currentUserId);
  }

  static async create(data: {
    authorId: string;
    text: string;
    imageUrl: string | null;
    visibility: Visibility;
  }): Promise<Post> {
    const newRow: PostRow = {
      id: `post_${Math.random().toString(36).substring(2, 11)}`,
      authorId: data.authorId,
      text: data.text,
      imageUrl: data.imageUrl,
      visibility: data.visibility,
      createdAt: new Date().toISOString(),
    };

    db.posts.unshift(newRow); // New posts added at the beginning

    return this.mapRowToPost(newRow, data.authorId);
  }

  static async delete(id: string, authorId: string): Promise<boolean> {
    const idx = db.posts.findIndex((p) => p.id === id);
    if (idx === -1) return false;

    const post = db.posts[idx];
    if (post.authorId !== authorId) return false; // Not author

    // 1. Remove the post
    db.posts.splice(idx, 1);

    // 2. Cascade delete likes on post
    db.likes = db.likes.filter((l) => !(l.targetType === "post" && l.targetId === id));

    // 3. Cascade delete comments, comment likes, and replies
    const postComments = db.comments.filter((c) => c.postId === id);
    const postCommentIds = postComments.map((c) => c.id);

    // Filter out comments
    db.comments = db.comments.filter((c) => c.postId !== id);

    // Filter out likes on comments
    db.likes = db.likes.filter(
      (l) => !(l.targetType === "comment" && postCommentIds.includes(l.targetId))
    );

    // Find replies to delete
    const commentReplies = db.replies.filter((r) => postCommentIds.includes(r.commentId));
    const replyIds = commentReplies.map((r) => r.id);

    // Filter out replies
    db.replies = db.replies.filter((r) => !postCommentIds.includes(r.commentId));

    // Filter out likes on replies
    db.likes = db.likes.filter(
      (l) => !(l.targetType === "reply" && replyIds.includes(l.targetId))
    );

    return true;
  }
}
