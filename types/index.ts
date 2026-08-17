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
