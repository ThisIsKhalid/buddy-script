import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation/auth.schema";
import { UserRepository } from "@/lib/data/repositories/user.repository";
import { comparePasswords } from "@/lib/auth/password";
import { signJWT } from "@/lib/auth/jwt";
import { setSessionCookie } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Find user
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare passwords
    const isValid = await comparePasswords(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await signJWT({ userId: user.id });

    // Set secure cookie
    await setSessionCookie(token);

    // Return user (without password hash)
    const { passwordHash: _, ...userWithoutHash } = user;
    return NextResponse.json(userWithoutHash, { status: 200 });
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login" },
      { status: 500 }
    );
  }
}
