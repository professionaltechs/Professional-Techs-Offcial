import { NextResponse } from "next/server";
import { BlogError, deletePost, getPostById, updatePost } from "@/lib/blog";
import { cleanOptional, postPatchSchema } from "@/lib/blog-schema";
import { isAdminRequest } from "@/lib/require-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const post = await getPostById(params.id);
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json({ post });
}

async function handleUpdate(req: Request, { params }: Ctx) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = postPatchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid post data." }, { status: 400 });
  }

  try {
    const changes = cleanOptional(parsed.data);
    const post = await updatePost(params.id, changes);
    return NextResponse.json({ post });
  } catch (err) {
    if (err instanceof BlogError) {
      return NextResponse.json({ error: err.message }, { status: err.code === "NOT_FOUND" ? 404 : 409 });
    }
    console.error("Update post error:", err);
    return NextResponse.json({ error: "Could not update the post. Check the server logs." }, { status: 500 });
  }
}

// PUT = full edit from the editor, PATCH = quick changes (publish/unpublish).
export const PUT = handleUpdate;
export const PATCH = handleUpdate;

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await deletePost(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof BlogError) return NextResponse.json({ error: err.message }, { status: 404 });
    console.error("Delete post error:", err);
    return NextResponse.json({ error: "Could not delete the post." }, { status: 500 });
  }
}
