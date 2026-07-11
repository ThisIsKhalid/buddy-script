export type Visibility = "public" | "private";

export interface UserRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface PostRow {
  id: string;
  authorId: string;
  text: string;
  imageUrl: string | null;
  visibility: Visibility;
  createdAt: string;
}

export interface CommentRow {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  createdAt: string;
}

export interface ReplyRow {
  id: string;
  commentId: string;
  authorId: string;
  text: string;
  createdAt: string;
}

export interface LikeRow {
  id: string;
  userId: string;
  targetType: "post" | "comment" | "reply";
  targetId: string;
  createdAt: string;
}
