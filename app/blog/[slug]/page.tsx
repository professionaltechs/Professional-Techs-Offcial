import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { absoluteUrl, extractHeadings, formatDate, readingTime, toSummary } from "@/lib/blog-utils";
import { isAdminRequest } from "@/lib/require-admin";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import BlogCard, { PostCover } from "@/components/blog/BlogCard";
import PostContent from "@/components/blog/PostContent";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import ReadingProgress from "@/components/blog/ReadingProgress";
import CTASection from "@/components/sections/CTASection";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/shared/FadeIn";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Article not found" };

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const image = absoluteUrl(post.coverImage);

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  // Drafts are only visible to a signed-in admin (for previewing).
  const isAdmin = await isAdminRequest();
  const post = await getPostBySlug(params.slug, isAdmin);
  if (!post) return notFound();

  const related = (await getRelatedPosts(post, 3)).map(toSummary);
  const headings = extractHeadings(post.content);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const minutes = readingTime(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.coverImage),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: url,
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="relative overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 animate-blob rounded-full bg-brand-violet/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-brand-indigo"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          {post.status !== "published" && (
            <div className="mt-6 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              This is a draft preview. Only you can see this page while you are signed in.
            </div>
          )}

          <header className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{post.category}</Badge>
              <span className="flex items-center gap-1.5 text-sm text-ink/50">
                <Calendar className="h-4 w-4" aria-hidden />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-ink/50">
                <Clock className="h-4 w-4" aria-hidden />
                {minutes} min read
              </span>
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/60">{post.excerpt}</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-white">
                {post.author.trim().charAt(0).toUpperCase()}
              </span>
              <span className="text-sm font-medium text-ink">{post.author}</span>
            </div>
          </header>

          {post.coverImage && (
            <PostCover
              post={post}
              priority
              className="mt-10 aspect-video rounded-3xl shadow-glow"
            />
          )}

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <article className="min-w-0 max-w-3xl">
              <PostContent content={post.content} />

              {post.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-2 border-t border-surface-border pt-8">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-surface-border bg-white p-6">
                <p className="text-sm font-medium text-ink">Found this useful? Share it.</p>
                <ShareButtons url={url} title={post.title} />
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-base-alt py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Keep reading</h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.08}>
                  <BlogCard post={p} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
