import { NextResponse } from "next/server";
import { fetchFromBackend } from "./backend-client";

/**
 * Forward a GET request to the backend and return the unwrapped response.
 * For paginated endpoints, pass `paginationKeys` to reshape the response.
 */
export async function proxyGet(
  endpoint: string,
  request: Request,
  options?: {
    paginationKeys?: { arrayKey: string; cursorKey?: string };
  },
) {
  const { searchParams } = new URL(request.url);
  const qs = searchParams.toString();
  const url = qs ? `${endpoint}?${qs}` : endpoint;

  const res = await fetchFromBackend(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: err.message || err.error || "Request failed" },
      { status: res.status },
    );
  }

  const json = await res.json();

  if (options?.paginationKeys) {
    const { arrayKey, cursorKey = "nextCursor" } = options.paginationKeys;
    return NextResponse.json({
      [arrayKey]: json.data ?? [],
      [cursorKey]: json.meta?.nextCursor ?? null,
    });
  }

  return NextResponse.json(json.data);
}

/**
 * Forward a mutation (POST/DELETE/PATCH) to the backend.
 * If the backend wraps the result in `data.data`, it is unwrapped automatically.
 */
export async function proxyMutate(
  endpoint: string,
  request: Request,
) {
  const body = await request.text();

  const res = await fetchFromBackend(endpoint, {
    method: request.method,
    headers: {
      "Content-Type": request.headers.get("content-type") ?? "application/json",
    },
    body: body || undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: err.message || "Request failed" },
      { status: res.status },
    );
  }

  const json = await res.json();
  return NextResponse.json(json.data ?? json, { status: res.status });
}
