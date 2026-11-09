"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import BlogCard, { FeaturedPostCard } from "@/components/blog/BlogCard";
import FadeIn from "@/components/shared/FadeIn";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { BlogPostSummary } from "@/types";

const PAGE_SIZE = 9;

interface Props {
  posts: BlogPostSummary[];
  categories: { name: string; count: number }[];
}

export default function BlogExplorer({ posts, categories }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const q = query.trim().toLowerCase();
  const filtering = q !== "" || category !== "All";

  const filtered = useMemo(
    () =>
      posts.filter((p) => {
        if (category !== "All" && p.category !== category) return false;
        if (!q) return true;
        return [p.title, p.excerpt, p.category, ...p.tags].join(" ").toLowerCase().includes(q);
      }),
    [posts, category, q]
  );

  const featured = !filtering ? posts.find((p) => p.featured) ?? posts[0] : undefined;
  const rest = featured ? filtered.filter((p) => p.id !== featured.id) : filtered;
  const shown = rest.slice(0, visible);

  const reset = () => {
    setQuery("");
    setCategory("All");
    setVisible(PAGE_SIZE);
  };

  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-surface-border bg-white px-6 py-16 text-center">
        <h3 className="text-xl font-semibold text-ink">New articles are on the way</h3>
        <p className="mt-2 text-ink/60">Check back soon for guides and lessons from our team.</p>
      </div>
    );
  }

  const pills = [{ name: "All", count: posts.length }, ...categories];

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {pills.map((c) => (
            <button
              key={c.name}
              role="tab"
              aria-selected={category === c.name}
              onClick={() => {
                setCategory(c.name);
                setVisible(PAGE_SIZE);
              }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                category === c.name
                  ? "bg-brand-gradient text-white shadow-glow"
                  : "border border-surface-border bg-white text-ink/70 hover:border-brand-indigo hover:text-brand-indigo"
              )}
            >
              {c.name}
              <span className={cn("ml-2 text-xs", category === c.name ? "text-white/80" : "text-ink/40")}>
                {c.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Search articles"
            aria-label="Search articles"
            className="w-full rounded-full border border-surface-border bg-white py-3 pl-11 pr-10 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/10"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink/40 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {featured && (
        <FadeIn className="mt-10">
          <FeaturedPostCard post={featured} />
        </FadeIn>
      )}

      {shown.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((post, i) => (
            <FadeIn key={post.id} delay={(i % 3) * 0.08}>
              <BlogCard post={post} />
            </FadeIn>
          ))}
        </div>
      ) : (
        !featured && (
          <div className="mt-10 rounded-3xl border border-surface-border bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-semibold text-ink">No articles match your search</h3>
            <p className="mt-2 text-ink/60">Try a different word or pick another category.</p>
            <div className="mt-6">
              <Button variant="secondary" onClick={reset}>
                Clear filters
              </Button>
            </div>
          </div>
        )
      )}

      {rest.length > visible && (
        <div className="mt-12 text-center">
          <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Show more articles
          </Button>
        </div>
      )}
    </div>
  );
}
