import { setSessionCookie } from "@/lib/auth/session";
import { getBackendUrl } from "@/lib/config/backend";
import { cookies } from "next/headers";

export async function fetchFromBackend(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const backendUrl = getBackendUrl();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("session")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let res = await fetch(`${backendUrl}${endpoint}`, {
    ...options,
    headers,
  });

  // If unauthorized and we have a refresh token, try silent refresh
  if (res.status === 401 && refreshToken) {
    try {
      const refreshRes = await fetch(`${backendUrl}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        const newAccessToken = refreshData.data.accessToken;
        const newRefreshToken = refreshData.data.refreshToken;

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
        res = await fetch(`${backendUrl}${endpoint}`, {
          ...options,
          headers,
        });
      } else {
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
