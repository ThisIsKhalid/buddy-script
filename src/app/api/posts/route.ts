import { proxyGet, proxyMutate } from "@/lib/api-client/proxyHelper";
import { getSessionUserId } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return proxyGet("/posts", request, { paginationKeys: { arrayKey: "posts" } });
}

export async function POST(request: Request) {
  const userId = await getSessionUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return proxyMutate("/posts", request);
}
