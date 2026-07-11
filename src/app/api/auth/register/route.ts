import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validation/auth.schema";
import { UserRepository } from "@/lib/data/repositories/user.repository";
import { hashPassword } from "@/lib/auth/password";
import { signJWT } from "@/lib/auth/jwt";
import { setSessionCookie } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password } = result.data;

    // Check if user already exists
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const newUser = await UserRepository.create({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    // Generate JWT token
    const token = await signJWT({ userId: newUser.id });

    // Set secure cookie
    await setSessionCookie(token);

    // Return user (without password hash)
    const { passwordHash: _, ...userWithoutHash } = newUser;
    return NextResponse.json(userWithoutHash, { status: 201 });
  } catch (error) {
    console.error("Error in registration route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during registration" },
      { status: 500 }
    );
  }
}
