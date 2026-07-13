type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | object | null;
};

export async function apiFetch<T>(
  input: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  const body =
    options.body &&
    typeof options.body === "object" &&
    !(options.body instanceof FormData) &&
    !(options.body instanceof Blob) &&
    !(options.body instanceof URLSearchParams)
      ? JSON.stringify(options.body)
      : options.body;

  if (body && typeof body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(input, {
    ...options,
    headers,
    body: body as BodyInit | null | undefined,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error || errorBody?.message || "Request failed");
  }

  return res.json() as Promise<T>;
}
