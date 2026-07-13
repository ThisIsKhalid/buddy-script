import { proxyGet } from "@/lib/api-client/proxyHelper";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;
  return proxyGet(`/users/${userId}`, request);
}
