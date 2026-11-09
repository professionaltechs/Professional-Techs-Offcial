// Server-only storage layer for blog posts.
//
// Posts live in data/posts.json. To move to a database later (Supabase,
// MongoDB, ...), only the functions in this file need to change — every page,
// API route and the dashboard goes through them.
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { BlogPost, BlogPostInput } from "@/types";

export const DATA_DIR = path.join(process.cwd(), "data");
const POSTS_FILE = path.join(DATA_DIR, "posts.json");

export class BlogError extends Error {
  code: "SLUG_TAKEN" | "NOT_FOUND";
  constructor(code: "SLUG_TAKEN" | "NOT_FOUND", message: string) {
    super(message);
    this.code = code;
  }
}

// Serialise writes so two saves can't overwrite each other.
let queue: Promise<unknown> = Promise.resolve();
function locked<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function readAll(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(POSTS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(posts: BlogPost[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), "utf8");
}

const byDateDesc = (a: BlogPost, b: BlogPost) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

/** Every post, drafts included (dashboard). */
export async function getAllPosts(): Promise<BlogPost[]> {
  return (await readAll()).sort(byDateDesc);
}

/** Published posts only (public site). */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  return (await getAllPosts()).filter((p) => p.status === "published");
}

export async function getPostBySlug(slug: string, includeDrafts = false): Promise<BlogPost | null> {
  const post = (await readAll()).find((p) => p.slug === slug);
  if (!post) return null;
  if (post.status !== "published" && !includeDrafts) return null;
  return post;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  return (await readAll()).find((p) => p.id === id) ?? null;
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const others = (await getPublishedPosts()).filter((p) => p.id !== post.id);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export async function getCategories(publishedOnly = true): Promise<{ name: string; count: number }[]> {
  const posts = publishedOnly ? await getPublishedPosts() : await getAllPosts();
  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function createPost(input: BlogPostInput): Promise<BlogPost> {
  return locked(async () => {
    const posts = await readAll();
    if (posts.some((p) => p.slug === input.slug)) {
      throw new BlogError("SLUG_TAKEN", "Another post already uses this slug.");
    }
    const now = new Date().toISOString();
    const post: BlogPost = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
    posts.push(post);
    await writeAll(posts);
    return post;
  });
}

export function updatePost(id: string, changes: Partial<BlogPostInput>): Promise<BlogPost> {
  return locked(async () => {
    const posts = await readAll();
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) throw new BlogError("NOT_FOUND", "Post not found.");
    if (changes.slug && posts.some((p) => p.slug === changes.slug && p.id !== id)) {
      throw new BlogError("SLUG_TAKEN", "Another post already uses this slug.");
    }
    const updated: BlogPost = { ...posts[index], ...changes, updatedAt: new Date().toISOString() };
    posts[index] = updated;
    await writeAll(posts);
    return updated;
  });
}

export function deletePost(id: string): Promise<void> {
  return locked(async () => {
    const posts = await readAll();
    const next = posts.filter((p) => p.id !== id);
    if (next.length === posts.length) throw new BlogError("NOT_FOUND", "Post not found.");
    await writeAll(next);
  });
}
