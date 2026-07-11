import { cookies } from "next/headers";
import { verifyJWT } from "./jwt";

const COOKIE_NAME = "session";

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll().map(c => c.name);
  const token = cookieStore.get(COOKIE_NAME)?.value;
  console.log(`[SESSION DBG] cookies: ${JSON.stringify(allCookies)}, hasSessionToken: ${!!token}`);
  if (!token) return null;
  const payload = await verifyJWT(token);
  console.log(`[SESSION DBG] verifyJWT result payload:`, payload);
  return payload ? payload.userId : null;
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function deleteSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
