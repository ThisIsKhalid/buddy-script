export type Visibility = "public" | "private";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  author: Pick<User, "id" | "firstName" | "lastName" | "avatarUrl">;
  text: string;
  imageUrl: string | null;
  visibility: Visibility;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  isLikedByMe: boolean;
  isDislikedByMe: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: Pick<User, "id" | "firstName" | "lastName" | "avatarUrl">;
  text: string;
  likeCount: number;
  replyCount: number;
  isLikedByMe: boolean;
  createdAt: string;
}

export interface Reply {
  id: string;
  commentId: string;
  authorId: string;
  author: Pick<User, "id" | "firstName" | "lastName" | "avatarUrl">;
  text: string;
  likeCount: number;
  isLikedByMe: boolean;
  createdAt: string;
}

export interface Like {
  id: string;
  userId: string;
  targetType: "post" | "comment" | "reply";
  targetId: string;
  createdAt: string;
}
