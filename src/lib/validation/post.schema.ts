import { z } from "zod";

export const createPostSchema = z.object({
  text: z.string().min(1, "Post text cannot be empty").max(1000, "Post text is too long"),
  imageUrl: z.string().nullable().optional(),
  visibility: z.enum(["public", "private"]),
});

export const commentSchema = z.object({
  text: z.string().min(1, "Comment text cannot be empty").max(500, "Comment text is too long"),
});

export const replySchema = z.object({
  text: z.string().min(1, "Reply text cannot be empty").max(500, "Reply text is too long"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
export type ReplyInput = z.infer<typeof replySchema>;
