import { UserRow, PostRow, CommentRow, ReplyRow, LikeRow } from "./types";

class InMemoryDatabase {
  public users: UserRow[] = [];
  public posts: PostRow[] = [];
  public comments: CommentRow[] = [];
  public replies: ReplyRow[] = [];
  public likes: LikeRow[] = [];

  constructor() {
    // Initialized empty, will be seeded by seed.ts
  }
}

// Prevent database instance from being re-instantiated during Next.js Hot Module Replacement (HMR)
const globalForDb = globalThis as unknown as {
  db: InMemoryDatabase | undefined;
};

export const db = globalForDb.db ?? new InMemoryDatabase();

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}
