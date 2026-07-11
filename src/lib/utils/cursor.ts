export function encodeCursor(createdAt: string, id: string): string {
  const raw = `${createdAt}_${id}`;
  if (typeof window === "undefined") {
    return Buffer.from(raw).toString("base64");
  } else {
    return btoa(raw);
  }
}

export function decodeCursor(cursor: string): { createdAt: string; id: string } | null {
  try {
    const raw = typeof window === "undefined"
      ? Buffer.from(cursor, "base64").toString("utf-8")
      : atob(cursor);
    const parts = raw.split("_");
    if (parts.length < 2) return null;
    const id = parts.pop()!;
    const createdAt = parts.join("_");
    return { createdAt, id };
  } catch (err) {
    return null;
  }
}
