import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { toSummary } from "@/lib/blog-utils";
import PostTable from "@/components/admin/PostTable";
import Button from "@/components/ui/Button";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const posts = await getAllPosts();
  const published = posts.filter((p) => p.status === "published").length;
  const stats = [
    { label: "Total posts", value: posts.length },
    { label: "Published", value: published },
    { label: "Drafts", value: posts.length - published },
    { label: "Categories", value: new Set(posts.map((p) => p.category)).size },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-ink/60">Write, publish and manage your blog articles.</p>
        </div>
        <Button href="/admin/new">
          <Plus className="h-4 w-4" />
          New post
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-surface-border bg-white p-5">
            <p className="text-3xl font-bold text-ink">{s.value}</p>
            <p className="mt-1 text-sm text-ink/60">{s.label}</p>
          </div>
        ))}
      </div>

      <PostTable posts={posts.map(toSummary)} />
    </>
  );
}
