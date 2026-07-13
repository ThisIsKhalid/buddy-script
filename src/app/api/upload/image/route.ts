import { fetchFromBackend } from "@/lib/api-client/backend-client";
import { getSessionUserId } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const userId = await getSessionUserId();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await request.formData();
    const res = await fetchFromBackend("/uploader/image", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.message || "Upload failed" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ imageUrl: data.data.imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Error in POST upload/image:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during upload" },
      { status: 500 },
    );
  }
}
