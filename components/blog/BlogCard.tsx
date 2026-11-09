import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, FileText } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import Badge from "@/components/ui/Badge";
import { formatDate, placeholderGradient } from "@/lib/blog-utils";
import { cn } from "@/lib/utils";
import type { BlogPostSummary } from "@/types";

export function PostCover({
  post,
  className,
  priority = false,
}: {
  post: Pick<BlogPostSummary, "title" | "coverImage" | "slug">;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-brand-gradient-soft", className)}>
      {post.coverImage ? (
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority={priority}
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-gradient-to-br",
            placeholderGradient(post.slug)
          )}
        >
          <FileText className="h-10 w-10 text-brand-indigo/40" aria-hidden />
        </div>
      )}
    </div>
  );
}

function Author({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-2 text-sm text-ink/70">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
        {name.trim().charAt(0).toUpperCase()}
      </span>
      {name}
    </span>
  );
}

export default function BlogCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <GlowCard className="flex h-full flex-col overflow-hidden !p-0">
        <PostCover post={post} className="aspect-[16/10]" />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-3">
            <Badge>{post.category}</Badge>
            <span className="text-xs text-ink/40">{formatDate(post.publishedAt)}</span>
          </div>
          <h3 className="mt-4 line-clamp-2 text-xl font-semibold text-ink transition-colors group-hover:text-brand-indigo">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/60">{post.excerpt}</p>
          <div className="mt-auto flex items-center justify-between pt-6">
            <Author name={post.author} />
            <span className="flex items-center gap-1 text-xs text-ink/50">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </GlowCard>
    </Link>
  );
}

export function FeaturedPostCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <GlowCard className="grid overflow-hidden !p-0 lg:grid-cols-2">
        <PostCover post={post} priority className="aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]" />
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Featured</Badge>
            <span className="text-sm text-ink/50">{post.category}</span>
            <span className="text-xs text-ink/40">{formatDate(post.publishedAt)}</span>
          </div>
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-brand-indigo sm:text-3xl">
            {post.title}
          </h2>
          <p className="mt-4 leading-relaxed text-ink/60">{post.excerpt}</p>
          <div className="mt-8 flex items-center justify-between">
            <Author name={post.author} />
            <span className="flex items-center gap-1 text-sm font-semibold text-brand-indigo">
              Read article
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </GlowCard>
    </Link>
  );
}
