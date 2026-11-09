// Client-safe helpers (no Node APIs). Safe to import from client components.
import type { BlogPost, BlogPostSummary } from "@/types";
import { SITE_URL } from "@/lib/constants";

export function slugify(input: string): string {
  return input
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function wordCount(md: string): number {
  const text = stripMarkdown(md);
  return text ? text.split(" ").length : 0;
}

export function readingTime(md: string): number {
  return Math.max(1, Math.ceil(wordCount(md) / 200));
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function toSummary(post: BlogPost): BlogPostSummary {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...rest } = post;
  return { ...rest, readingTime: readingTime(content) };
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Pulls ## and ### headings out of markdown (ignores code fences). */
export function extractHeadings(md: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of md.split("\n")) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const text = match[2]
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    const id = slugify(text);
    if (id) headings.push({ id, text, level: match[1].length as 2 | 3 });
  }
  return headings;
}

/** Deterministic gradient for posts without a cover image. */
export function placeholderGradient(seed: string): string {
  const gradients = [
    "from-brand-indigo/25 via-brand-violet/20 to-brand-cyan/25",
    "from-brand-violet/25 via-brand-indigo/15 to-brand-cyan/20",
    "from-brand-cyan/25 via-brand-indigo/20 to-brand-violet/25",
  ];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return gradients[hash % gradients.length];
}

export function absoluteUrl(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  return pathOrUrl.startsWith("/") ? `${SITE_URL}${pathOrUrl}` : pathOrUrl;
}
