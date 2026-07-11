import { db } from "./db";
import { UserRow, PostRow, CommentRow, ReplyRow, LikeRow } from "./types";

// Precomputed bcrypt hash for "password123" to avoid slow startup hashing 15 times
const PRECOMPUTED_PASSWORD_HASH = "$2a$10$e0M24.8.tLp1690t9JigIeX/s1N5HkP8X5cO66KzY9ZfQfDle17Ua";

const DUMMY_FIRST_NAMES = [
  "John", "Sarah", "David", "Emma", "Michael", "Sophia", "James", "Olivia",
  "Robert", "Isabella", "William", "Mia", "Joseph", "Charlotte", "Charles"
];

const DUMMY_LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia",
  "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez"
];

const DUMMY_POST_TEXTS = [
  "Just started a new project today! Super excited to see where this journey takes us. Code is flowing nicely.",
  "Had a wonderful weekend hiking in the mountains. The view at the peak was absolutely breathtaking!",
  "Thinking about the future of web development. Server components, edge functions, and AI integrations are changing everything.",
  "Coffee, code, and classic rock. The perfect combination for a productive Saturday morning.",
  "Just finished reading an incredible book on software architecture. Highly recommend diving into domain-driven design.",
  "Our team just launched the new beta! Check it out and let me know your thoughts.",
  "Beautiful sunset tonight. Sometimes you just need to step away from the screen and appreciate nature.",
  "Spent the morning debugging a single semicolon. We've all been there, right?",
  "Healthy lunch prep for the week ahead! Staying energized is key to staying productive.",
  "A quiet evening at home with a hot cup of tea and some lofi music playing in the background."
];

const DUMMY_COMMENT_TEXTS = [
  "Wow, this is awesome! Congrats!",
  "Absolutely love this. Keep it up!",
  "Great post, thanks for sharing this perspective.",
  "Could not agree more. Well said!",
  "This looks amazing! Where was this taken?",
  "Interesting point. Have you considered the alternative approach?",
  "That sounds like a productive day!",
  "Count me in next time!"
];

const DUMMY_REPLY_TEXTS = [
  "Thanks! Appreciate the support.",
  "Haha exactly!",
  "I was thinking the same thing.",
  "I actually wrote a blog post about that alternative!",
  "It was taken in Yosemite! Highly recommend visiting."
];

export function seedDatabase() {
  // Only seed if database is empty
  if (db.users.length > 0) return;

  // 1. Seed 15 Users
  const users: UserRow[] = [];
  for (let i = 0; i < 15; i++) {
    const id = `usr_${i + 1}`;
    const firstName = DUMMY_FIRST_NAMES[i];
    const lastName = DUMMY_LAST_NAMES[i];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    // Cycle through available chat avatar images
    const avatarNum = (i % 7) + 1;
    const avatarUrl = `/assets/images/chat${avatarNum}_img.png`;

    users.push({
      id,
      firstName,
      lastName,
      email,
      passwordHash: PRECOMPUTED_PASSWORD_HASH,
      avatarUrl,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000 + i * 2 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  db.users = users;

  // 2. Seed ~200 Posts
  const posts: PostRow[] = [];
  const comments: CommentRow[] = [];
  const replies: ReplyRow[] = [];
  const likes: LikeRow[] = [];

  let postCount = 0;
  let commentCount = 0;
  let replyCount = 0;
  let likeCount = 0;

  // Generate posts spread over 30 days
  for (let i = 0; i < 200; i++) {
    const id = `post_${i + 1}`;
    const author = users[Math.floor(Math.random() * users.length)];
    const text = DUMMY_POST_TEXTS[Math.floor(Math.random() * DUMMY_POST_TEXTS.length)] + ` (#${i + 1})`;
    
    // 25% chance of post having an image
    let imageUrl: string | null = null;
    if (Math.random() < 0.25) {
      const imgNum = (i % 9) + 1;
      imageUrl = `/assets/images/photos${imgNum}.png`;
    }

    // 80% public, 20% private visibility
    const visibility = Math.random() < 0.8 ? "public" : "private";

    // Set post timestamp: older posts first, newer posts last
    const postTime = Date.now() - (200 - i) * 3.5 * 60 * 60 * 1000;
    const createdAt = new Date(postTime).toISOString();

    posts.push({
      id,
      authorId: author.id,
      text,
      imageUrl,
      visibility,
      createdAt,
    });

    // 3. Comments for this post (randomly 0 to 4 comments)
    const numComments = Math.floor(Math.random() * 5);
    for (let c = 0; c < numComments; c++) {
      const commentId = `cmt_${++commentCount}`;
      const commentAuthor = users[Math.floor(Math.random() * users.length)];
      const commentText = DUMMY_COMMENT_TEXTS[Math.floor(Math.random() * DUMMY_COMMENT_TEXTS.length)];
      
      const commentTime = postTime + (c + 1) * 30 * 60 * 1000;
      
      comments.push({
        id: commentId,
        postId: id,
        authorId: commentAuthor.id,
        text: commentText,
        createdAt: new Date(commentTime).toISOString(),
      });

      // 4. Replies for this comment (randomly 0 to 2 replies)
      const numReplies = Math.floor(Math.random() * 3);
      for (let r = 0; r < numReplies; r++) {
        const replyId = `rpl_${++replyCount}`;
        const replyAuthor = users[Math.floor(Math.random() * users.length)];
        const replyText = DUMMY_REPLY_TEXTS[Math.floor(Math.random() * DUMMY_REPLY_TEXTS.length)];
        
        const replyTime = commentTime + (r + 1) * 10 * 60 * 1000;

        replies.push({
          id: replyId,
          commentId,
          authorId: replyAuthor.id,
          text: replyText,
          createdAt: new Date(replyTime).toISOString(),
        });

        // Likes on replies (randomly 0 to 3 likes)
        const numReplyLikes = Math.floor(Math.random() * 4);
        const likedUsers = new Set<string>();
        for (let l = 0; l < numReplyLikes; l++) {
          const user = users[Math.floor(Math.random() * users.length)];
          if (!likedUsers.has(user.id)) {
            likedUsers.add(user.id);
            likes.push({
              id: `like_${++likeCount}`,
              userId: user.id,
              targetType: "reply",
              targetId: replyId,
              createdAt: new Date(replyTime + (l + 1) * 60 * 1000).toISOString(),
            });
          }
        }
      }

      // Likes on comments (randomly 0 to 4 likes)
      const numCommentLikes = Math.floor(Math.random() * 5);
      const likedUsers = new Set<string>();
      for (let l = 0; l < numCommentLikes; l++) {
        const user = users[Math.floor(Math.random() * users.length)];
        if (!likedUsers.has(user.id)) {
          likedUsers.add(user.id);
          likes.push({
            id: `like_${++likeCount}`,
            userId: user.id,
            targetType: "comment",
            targetId: commentId,
            createdAt: new Date(commentTime + (l + 1) * 60 * 1000).toISOString(),
          });
        }
      }
    }

    // Likes on post (randomly 0 to 8 likes)
    const numPostLikes = Math.floor(Math.random() * 9);
    const likedUsers = new Set<string>();
    for (let l = 0; l < numPostLikes; l++) {
      const user = users[Math.floor(Math.random() * users.length)];
      if (!likedUsers.has(user.id)) {
        likedUsers.add(user.id);
        likes.push({
          id: `like_${++likeCount}`,
          userId: user.id,
          targetType: "post",
          targetId: id,
          createdAt: new Date(postTime + (l + 1) * 5 * 60 * 1000).toISOString(),
        });
      }
    }
  }

  db.posts = posts;
  db.comments = comments;
  db.replies = replies;
  db.likes = likes;

  console.log(`Database seeded with:
    - ${db.users.length} Users
    - ${db.posts.length} Posts
    - ${db.comments.length} Comments
    - ${db.replies.length} Replies
    - ${db.likes.length} Likes
  `);
}
