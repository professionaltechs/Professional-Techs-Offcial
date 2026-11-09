import { NextResponse } from "next/server";
import { BlogError, createPost, getAllPosts } from "@/lib/blog";
import { cleanOptional, postInputSchema } from "@/lib/blog-schema";
import { isAdminRequest } from "@/lib/require-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ posts: await getAllPosts() });
}

export async function POST(req: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = postInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid post data." }, { status: 400 });
  }

  try {
    const post = await createPost(cleanOptional(parsed.data));
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    if (err instanceof BlogError && err.code === "SLUG_TAKEN") {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    console.error("Create post error:", err);
    return NextResponse.json({ error: "Could not save the post. Check the server logs." }, { status: 500 });
  }
}
