import { decodeJwt, SignJWT, jwtVerify } from "jose";

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is required to sign or verify JWTs");
  }

  return new TextEncoder().encode(secret);
}

export async function signJWT(payload: { userId: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifyJWT(token: string): Promise<{ userId: string } | null> {
  if (!process.env.JWT_SECRET) return null;

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const userId = getUserIdFromPayload(payload);
    return userId ? { userId } : null;
  } catch {
    return null;
  }
}

export function decodeTokenUserId(token: string): string | null {
  try {
    return getUserIdFromPayload(decodeJwt(token));
  } catch {
    return null;
  }
}

function getUserIdFromPayload(payload: Record<string, unknown>): string | null {
  const userId = payload.userId ?? payload.sub;
  return typeof userId === "string" ? userId : null;
}
