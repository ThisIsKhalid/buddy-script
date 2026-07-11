import { db } from "../db";
import { UserRow } from "../types";

export class UserRepository {
  static async findByEmail(email: string): Promise<UserRow | null> {
    const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return user ? { ...user } : null;
  }

  static async findById(id: string): Promise<UserRow | null> {
    const user = db.users.find((u) => u.id === id);
    return user ? { ...user } : null;
  }

  static async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
  }): Promise<UserRow> {
    const id = `usr_${Math.random().toString(36).substring(2, 11)}`;
    const avatarNum = Math.floor(Math.random() * 7) + 1;
    const newUser: UserRow = {
      id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.toLowerCase(),
      passwordHash: data.passwordHash,
      avatarUrl: `/assets/images/chat${avatarNum}_img.png`,
      createdAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    return { ...newUser };
  }
}
