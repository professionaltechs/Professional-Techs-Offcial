export interface Project {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  coverImage?: string;
  images: string[];
  video?: string;
  liveUrl?: string;
  year: string;
}

export interface Service {
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

export type PostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown */
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  status: PostStatus;
  featured: boolean;
  /** ISO date string shown on the post */
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export type BlogPostInput = Omit<BlogPost, "id" | "createdAt" | "updatedAt">;

/** Lightweight version of a post (no body) for listing pages. */
export type BlogPostSummary = Omit<BlogPost, "content"> & { readingTime: number };
