"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bold,
  Code,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Loader2,
  Quote,
  Trash2,
  Upload,
} from "lucide-react";
import PostContent from "@/components/blog/PostContent";
import { readingTime, slugify, wordCount } from "@/lib/blog-utils";
import { cn } from "@/lib/utils";
import type { BlogPost, PostStatus } from "@/types";

const field =
  "w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/10";

const card = "rounded-2xl border border-surface-border bg-white p-5 sm:p-6";

function Label({ htmlFor, children, hint }: { htmlFor?: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {children}
      </label>
      {hint && <span className="text-xs text-ink/40">{hint}</span>}
    </div>
  );
}

async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(res.status === 401 ? "Your session expired. Sign in again." : data.error || "Upload failed.");
  }
  return data.url as string;
}

interface Props {
  initial?: BlogPost;
  categories: string[];
}

export default function PostForm({ initial, categories }: Props) {
  const router = useRouter();
  const editing = Boolean(initial);
  const wasPublished = initial?.status === "published";

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(editing);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [tags, setTags] = useState(initial?.tags.join(", ") ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "Professional Techs Team");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [publishDate, setPublishDate] = useState(
    (initial?.publishedAt ?? new Date().toISOString()).slice(0, 10)
  );
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(initial?.seoDescription ?? "");

  const [tab, setTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState<PostStatus | null>(null);
  const [error, setError] = useState("");
  const [coverUploading, setCoverUploading] = useState(false);
  const [inlineUploading, setInlineUploading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  // ---- editor helpers -----------------------------------------------------
  type Edit = { value: string; selStart: number; selEnd: number };

  function applyEdit(fn: (value: string, start: number, end: number) => Edit) {
    const ta = textareaRef.current;
    if (!ta) return;
    const result = fn(content, ta.selectionStart, ta.selectionEnd);
    setContent(result.value);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(result.selStart, result.selEnd);
    });
  }

  const wrap = (before: string, after: string, placeholder: string) =>
    applyEdit((v, s, e) => {
      const selected = v.slice(s, e) || placeholder;
      return {
        value: v.slice(0, s) + before + selected + after + v.slice(e),
        selStart: s + before.length,
        selEnd: s + before.length + selected.length,
      };
    });

  const prefixLines = (prefix: string) =>
    applyEdit((v, s, e) => {
      const lineStart = v.lastIndexOf("\n", s - 1) + 1;
      const nextBreak = v.indexOf("\n", e);
      const lineEnd = nextBreak === -1 ? v.length : nextBreak;
      const block = v
        .slice(lineStart, lineEnd)
        .split("\n")
        .map((line) => prefix + line)
        .join("\n");
      return {
        value: v.slice(0, lineStart) + block + v.slice(lineEnd),
        selStart: lineStart,
        selEnd: lineStart + block.length,
      };
    });

  const insertText = (text: string) =>
    applyEdit((v, s, e) => ({
      value: v.slice(0, s) + text + v.slice(e),
      selStart: s + text.length,
      selEnd: s + text.length,
    }));

  async function onInlineImage(file?: File) {
    if (!file) return;
    setInlineUploading(true);
    setError("");
    try {
      const url = await uploadImage(file);
      setTab("write");
      insertText(`\n\n![Describe the image](${url})\n\n`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setInlineUploading(false);
      if (inlineInputRef.current) inlineInputRef.current.value = "";
    }
  }

  async function onCoverImage(file?: File) {
    if (!file) return;
    setCoverUploading(true);
    setError("");
    try {
      setCoverImage(await uploadImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setCoverUploading(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  }

  // ---- save ---------------------------------------------------------------
  async function save(status: PostStatus) {
    if (saving) return;
    setError("");

    const finalSlug = (slug.trim() || slugify(title)).toLowerCase();
    if (!title.trim()) return setError("Add a title before saving.");
    if (!finalSlug) return setError("Add a slug (the post's web address).");
    if (excerpt.trim().length < 10) return setError("Write a short summary of at least 10 characters.");
    if (!content.trim()) return setError("The article body is empty.");
    if (category.trim().length < 2) return setError("Choose or type a category.");
    if (!author.trim()) return setError("Add an author name.");

    const payload = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim(),
      content,
      coverImage: coverImage.trim(),
      category: category.trim(),
      tags: Array.from(new Set(tags.split(",").map((t) => t.trim()).filter(Boolean))),
      author: author.trim(),
      status,
      featured,
      publishedAt:
        initial && initial.publishedAt.slice(0, 10) === publishDate
          ? initial.publishedAt
          : `${publishDate}T09:00:00.000Z`,
      seoTitle: seoTitle.trim(),
      seoDescription: seoDescription.trim(),
    };

    setSaving(status);
    try {
      const res = await fetch(editing ? `/api/admin/posts/${initial!.id}` : "/api/admin/posts", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(res.status === 401 ? "Your session expired. Sign in again, then save." : data.error || "Could not save the post.");
        setSaving(null);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Could not reach the server. Your text is still here, so try again.");
      setSaving(null);
    }
  }

  const toolbar: { label: string; Icon: typeof Bold; run: () => void }[] = [
    { label: "Heading", Icon: Heading2, run: () => prefixLines("## ") },
    { label: "Sub-heading", Icon: Heading3, run: () => prefixLines("### ") },
    { label: "Bold", Icon: Bold, run: () => wrap("**", "**", "bold text") },
    { label: "Italic", Icon: Italic, run: () => wrap("*", "*", "italic text") },
    { label: "Link", Icon: LinkIcon, run: () => wrap("[", "](https://)", "link text") },
    { label: "Bulleted list", Icon: List, run: () => prefixLines("- ") },
    { label: "Numbered list", Icon: ListOrdered, run: () => prefixLines("1. ") },
    { label: "Quote", Icon: Quote, run: () => prefixLines("> ") },
    { label: "Code block", Icon: Code, run: () => wrap("```\n", "\n```", "code") },
  ];

  const primaryLabel = wasPublished ? "Update post" : "Publish";
  const secondaryLabel = wasPublished ? "Move to drafts" : "Save draft";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-brand-indigo"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{editing ? "Edit post" : "New post"}</h1>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem]">
        {/* ---------- main column ---------- */}
        <div className="space-y-6">
          <div className={card}>
            <Label htmlFor="title">Title</Label>
            <input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              placeholder="A clear, specific headline"
              className={cn(field, "text-base font-semibold")}
              maxLength={160}
            />

            <div className="mt-5">
              <Label htmlFor="slug" hint="Web address of the post">
                Slug
              </Label>
              <div className="flex items-center rounded-xl border border-surface-border bg-white focus-within:border-brand-indigo focus-within:ring-4 focus-within:ring-brand-indigo/10">
                <span className="pl-4 text-sm text-ink/40">/blog/</span>
                <input
                  id="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(slugify(e.target.value));
                  }}
                  className="w-full rounded-xl bg-transparent px-1 py-3 text-sm text-ink outline-none"
                  maxLength={120}
                />
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="excerpt" hint={`${excerpt.length}/320`}>
                Summary
              </Label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                maxLength={320}
                placeholder="Shown on the blog page and in search results"
                className={field}
              />
            </div>
          </div>

          <div className={card}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex rounded-full bg-base-alt p-1" role="tablist">
                {(["write", "preview"] as const).map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors",
                      tab === t ? "bg-white text-ink shadow-sm" : "text-ink/60 hover:text-ink"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {tab === "write" && (
                <div className="flex flex-wrap items-center gap-1">
                  {toolbar.map(({ label, Icon, run }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={run}
                      aria-label={label}
                      title={label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-ink/60 transition-colors hover:bg-base-alt hover:text-brand-indigo"
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => inlineInputRef.current?.click()}
                    disabled={inlineUploading}
                    aria-label="Insert image"
                    title="Insert image"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-ink/60 transition-colors hover:bg-base-alt hover:text-brand-indigo disabled:opacity-60"
                  >
                    {inlineUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                  </button>
                  <input
                    ref={inlineInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => onInlineImage(e.target.files?.[0])}
                  />
                </div>
              )}
            </div>

            <div className="mt-4">
              {tab === "write" ? (
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  aria-label="Article body in Markdown"
                  placeholder={"Start writing. Use ## for headings, **bold**, - for lists, and the buttons above for links and images."}
                  className={cn(field, "min-h-[30rem] resize-y font-mono leading-relaxed")}
                />
              ) : (
                <div className="min-h-[30rem] rounded-xl border border-surface-border p-5 sm:p-8">
                  {content.trim() ? (
                    <PostContent content={content} />
                  ) : (
                    <p className="text-sm text-ink/50">Nothing to preview yet. Write something in the Write tab.</p>
                  )}
                </div>
              )}
            </div>

            <p className="mt-3 text-xs text-ink/50">
              {wordCount(content)} words, about {content.trim() ? readingTime(content) : 0} min read. Markdown is supported.
            </p>
          </div>
        </div>

        {/* ---------- side column ---------- */}
        <div className="space-y-6">
          <div className={card}>
            <h2 className="text-sm font-semibold text-ink">Publish</h2>
            <p className="mt-1 text-sm text-ink/60">
              Status:{" "}
              <span className={wasPublished ? "font-medium text-emerald-700" : "font-medium text-amber-700"}>
                {wasPublished ? "Published" : editing ? "Draft" : "New"}
              </span>
            </p>

            <div className="mt-5">
              <Label htmlFor="date">Publish date</Label>
              <input
                id="date"
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className={field}
              />
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-ink">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-surface-border accent-brand-indigo"
              />
              <span>
                Feature this post
                <span className="block text-xs text-ink/50">Shown large at the top of the blog page.</span>
              </span>
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <button
                onClick={() => save("draft")}
                disabled={saving !== null}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-surface-border bg-white px-5 py-3 text-sm font-semibold text-ink transition-all hover:border-brand-indigo disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving === "draft" && <Loader2 className="h-4 w-4 animate-spin" />}
                {secondaryLabel}
              </button>
              <button
                onClick={() => save("published")}
                disabled={saving !== null}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {saving === "published" && <Loader2 className="h-4 w-4 animate-spin" />}
                {primaryLabel}
              </button>
            </div>
          </div>

          <div className={card}>
            <h2 className="text-sm font-semibold text-ink">Cover image</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-dashed border-surface-border bg-base">
              {coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverImage} alt="Cover preview" className="aspect-[16/10] w-full object-cover" />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center px-4 text-center text-xs text-ink/50">
                  No cover image. A gradient is shown instead.
                </div>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => coverInputRef.current?.click()}
                disabled={coverUploading}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-surface-border bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-indigo disabled:opacity-60"
              >
                {coverUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Upload
              </button>
              {coverImage && (
                <button
                  onClick={() => setCoverImage("")}
                  aria-label="Remove cover image"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border text-ink/60 transition-colors hover:border-red-300 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <input
                ref={coverInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={(e) => onCoverImage(e.target.files?.[0])}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="cover-url" hint="JPG, PNG, WebP or GIF, up to 5 MB">
                Or paste an image link
              </Label>
              <input
                id="cover-url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://"
                className={field}
              />
            </div>
          </div>

          <div className={card}>
            <h2 className="text-sm font-semibold text-ink">Details</h2>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <input
                  id="category"
                  list="category-options"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Web Development"
                  className={field}
                  maxLength={40}
                />
                <datalist id="category-options">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
              <div>
                <Label htmlFor="tags" hint="Separate with commas">
                  Tags
                </Label>
                <input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Next.js, Performance"
                  className={field}
                />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className={field}
                  maxLength={60}
                />
              </div>
            </div>
          </div>

          <div className={card}>
            <h2 className="text-sm font-semibold text-ink">Search engine listing</h2>
            <p className="mt-1 text-xs text-ink/50">Leave these empty to use the title and summary.</p>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="seo-title" hint={`${seoTitle.length}/70`}>
                  SEO title
                </Label>
                <input
                  id="seo-title"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  maxLength={70}
                  className={field}
                />
              </div>
              <div>
                <Label htmlFor="seo-desc" hint={`${seoDescription.length}/170`}>
                  SEO description
                </Label>
                <textarea
                  id="seo-desc"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  maxLength={170}
                  rows={3}
                  className={field}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
