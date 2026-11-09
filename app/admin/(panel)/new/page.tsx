import type { Metadata } from "next";
import { getCategories } from "@/lib/blog";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "New post" };

export default async function NewPostPage() {
  const categories = (await getCategories(false)).map((c) => c.name);
  return <PostForm categories={categories} />;
}
