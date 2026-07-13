import { cookies } from "next/headers";
import { setSessionCookie } from "@/lib/auth/session";
import { db } from "@/lib/data/db";

const BACKEND_URL = "http://localhost:8000/api/v1";

export function syncUserToInMemoryDb(user: { id: string; firstName: string; lastName: string; email: string }) {
  if (!db.users.some((u) => u.id === user.id)) {
    db.users.push({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      passwordHash: "",
      avatarUrl: "/assets/images/chat1_img.png",
      createdAt: new Date().toISOString(),
    });
  }
}

export async function fetchFromBackend(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("session")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let res = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // If unauthorized and we have a refresh token, try silent refresh
  if (res.status === 401 && refreshToken) {
    console.log("[AUTH PROXY] Access token expired/invalid. Attempting silent token refresh...");
    try {
      const refreshRes = await fetch(`${BACKEND_URL}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        const newAccessToken = refreshData.data.accessToken;
        const newRefreshToken = refreshData.data.refreshToken;

        console.log("[AUTH PROXY] Token refresh successful. Saving new cookies and retrying request.");

        // Set the new cookies
        await setSessionCookie(newAccessToken);
        const nextCookies = await cookies();
        nextCookies.set({
          name: "refreshToken",
          value: newRefreshToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        // Retry the original request
        headers.set("Authorization", `Bearer ${newAccessToken}`);
        res = await fetch(`${BACKEND_URL}${endpoint}`, {
          ...options,
          headers,
        });
      } else {
        console.log("[AUTH PROXY] Token refresh failed. Revoking cookies.");
        const nextCookies = await cookies();
        nextCookies.delete("session");
        nextCookies.delete("refreshToken");
      }
    } catch (err) {
      console.error("[AUTH PROXY] Silent refresh exception:", err);
    }
  }

  return res;
}
