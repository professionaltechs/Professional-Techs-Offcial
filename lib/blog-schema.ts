import { z } from "zod";

const coverImage = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || v.startsWith("/") || /^https?:\/\//i.test(v), {
    message: "Cover image must be an uploaded image or a full https:// link.",
  });

export const postInputSchema = z.object({
  title: z.string().trim().min(3, "Title is too short.").max(160),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only use lowercase letters, numbers and hyphens."),
  excerpt: z.string().trim().min(10, "Write a short summary (at least 10 characters).").max(320),
  content: z.string().min(1, "The article body is empty."),
  coverImage: coverImage.optional(),
  category: z.string().trim().min(2, "Category is required.").max(40),
  tags: z.array(z.string().trim().min(1).max(30)).max(10),
  author: z.string().trim().min(2, "Author is required.").max(60),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  publishedAt: z.string().refine((v) => !Number.isNaN(Date.parse(v)), "Invalid publish date."),
  seoTitle: z.string().trim().max(70).optional(),
  seoDescription: z.string().trim().max(170).optional(),
});

export const postPatchSchema = postInputSchema.partial();

/**
 * Turns empty optional strings into undefined so they aren't stored.
 * Only touches keys that are actually present, so partial updates
 * (like publish/unpublish) never wipe other fields.
 */
export function cleanOptional<T extends object>(data: T): T {
  const out = { ...data } as Record<string, unknown>;
  for (const key of ["coverImage", "seoTitle", "seoDescription"]) {
    if (key in out && !out[key]) out[key] = undefined;
  }
  return out as unknown as T;
}