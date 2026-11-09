import type { Metadata } from "next";
import { getCategories, getPublishedPosts } from "@/lib/blog";
import { toSummary } from "@/lib/blog-utils";
import BlogExplorer from "@/components/blog/BlogExplorer";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";

// Always read the latest posts, so new articles appear right after publishing.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and lessons from the Professional Techs team on web development, design, SEO and AI.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPublishedPosts(), getCategories()]);

  return (
    <>
      <div className="relative overflow-hidden pt-32 pb-24">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 animate-blob rounded-full bg-brand-indigo/15 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-1/4 h-72 w-72 animate-blob-delay rounded-full bg-brand-cyan/15 blur-3xl" />

        <section className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Blog"
            title="Ideas and lessons from our engineering team"
            description="Practical writing on web development, design, SEO and AI, drawn from the projects we ship."
          />
        </section>

        <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogExplorer posts={posts.map(toSummary)} categories={categories} />
        </section>
      </div>
      <CTASection />
    </>
  );
}
