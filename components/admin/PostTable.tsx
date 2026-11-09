"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ExternalLink, FileText, Loader2, Pencil, Search, Star, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatDate, placeholderGradient } from "@/lib/blog-utils";
import { cn } from "@/lib/utils";
import type { BlogPostSummary } from "@/types";

type Filter = "all" | "published" | "draft";
type Notice = { type: "success" | "error"; text: string } | null;

export default function PostTable({ posts }: { posts: BlogPostSummary[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<BlogPostSummary | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      posts.filter((p) => {
        if (filter !== "all" && p.status !== filter) return false;
        if (!q) return true;
        return [p.title, p.category, p.slug].join(" ").toLowerCase().includes(q);
      }),
    [posts, filter, q]
  );

  useEffect(() => {
    if (!toDelete) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setToDelete(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toDelete]);

  async function request(id: string, init: RequestInit, success: string) {
    setBusyId(id);
    setNotice(null);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        ...init,
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const text = res.status === 401 ? "Your session expired. Sign in again." : data.error || "Something went wrong.";
        setNotice({ type: "error", text });
      } else {
        setNotice({ type: "success", text: success });
        router.refresh();
      }
    } catch {
      setNotice({ type: "error", text: "Could not reach the server." });
    } finally {
      setBusyId(null);
    }
  }

  const togglePublish = (post: BlogPostSummary) => {
    const next = post.status === "published" ? "draft" : "published";
    return request(
      post.id,
      { method: "PATCH", body: JSON.stringify({ status: next }) },
      next === "published" ? "Published." : "Moved to drafts."
    );
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    const post = toDelete;
    setToDelete(null);
    await request(post.id, { method: "DELETE" }, "Post deleted.");
  };

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: posts.length },
    { id: "published", label: "Published", count: posts.filter((p) => p.status === "published").length },
    { id: "draft", label: "Drafts", count: posts.filter((p) => p.status === "draft").length },
  ];

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === t.id
                  ? "bg-brand-indigo text-white"
                  : "border border-surface-border bg-white text-ink/70 hover:border-brand-indigo hover:text-brand-indigo"
              )}
            >
              {t.label} <span className={filter === t.id ? "text-white/70" : "text-ink/40"}>{t.count}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts"
            aria-label="Search posts"
            className="w-full rounded-full border border-surface-border bg-white py-2.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/10"
          />
        </div>
      </div>

      {notice && (
        <p
          role="status"
          className={cn(
            "mt-4 rounded-xl border px-4 py-3 text-sm",
            notice.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          )}
        >
          {notice.text}
        </p>
      )}

      <div className="mt-4 overflow-hidden rounded-2xl border border-surface-border bg-white">
        {posts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-ink">No posts yet</h2>
            <p className="mt-1 text-sm text-ink/60">Write your first article and it will show up here.</p>
            <div className="mt-6">
              <Button href="/admin/new">Write your first post</Button>
            </div>
          </div>
        ) : visible.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-ink/60">No posts match this filter.</p>
        ) : (
          <ul className="divide-y divide-surface-border">
            {visible.map((post) => {
              const busy = busyId === post.id;
              return (
                <li key={post.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-brand-gradient-soft">
                      {post.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.coverImage} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div
                          className={cn(
                            "flex h-full w-full items-center justify-center bg-gradient-to-br",
                            placeholderGradient(post.slug)
                          )}
                        >
                          <FileText className="h-4 w-4 text-brand-indigo/50" aria-hidden />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 font-semibold text-ink">
                        <span className="truncate">{post.title}</span>
                        {post.featured && (
                          <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" aria-label="Featured" />
                        )}
                      </p>
                      <p className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-ink/50">
                        <span>{post.category}</span>
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className="truncate">/blog/{post.slug}</span>
                      </p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "inline-flex w-fit shrink-0 items-center rounded-full px-3 py-1 text-xs font-medium",
                      post.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    )}
                  >
                    {post.status === "published" ? "Published" : "Draft"}
                  </span>

                  <div className="flex shrink-0 items-center gap-1">
                    {busy ? (
                      <Loader2 className="mx-3 h-4 w-4 animate-spin text-ink/50" aria-label="Working" />
                    ) : (
                      <>
                        <IconLink href={`/admin/edit/${post.id}`} label="Edit">
                          <Pencil className="h-4 w-4" />
                        </IconLink>
                        <IconLink href={`/blog/${post.slug}`} label="View on site" external>
                          <ExternalLink className="h-4 w-4" />
                        </IconLink>
                        <IconButton
                          label={post.status === "published" ? "Move to drafts" : "Publish"}
                          onClick={() => togglePublish(post)}
                        >
                          {post.status === "published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </IconButton>
                        <IconButton label="Delete" danger onClick={() => setToDelete(post)}>
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {toDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 px-4"
          onClick={() => setToDelete(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-glow-lg sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="delete-title" className="text-lg font-semibold text-ink">
              Delete this post?
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              &ldquo;{toDelete.title}&rdquo; will be removed from the blog. This can&apos;t be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                autoFocus
                onClick={() => setToDelete(null)}
                className="rounded-full border border-surface-border px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-indigo"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Delete post
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const iconBase =
  "flex h-9 w-9 items-center justify-center rounded-lg text-ink/60 transition-colors hover:bg-base-alt hover:text-brand-indigo";

function IconLink({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={iconBase}
      {...(external ? { target: "_blank" } : {})}
    >
      {children}
    </Link>
  );
}

function IconButton({
  label,
  onClick,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(iconBase, danger && "hover:!bg-red-50 hover:!text-red-600")}
    >
      {children}
    </button>
  );
}
