import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getPostById } from "@/lib/blog";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit post" };

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);
  if (!post) return notFound();
  const categories = (await getCategories(false)).map((c) => c.name);
  return <PostForm key={post.id} initial={post} categories={categories} />;
}
