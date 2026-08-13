import { createClient, defineQuery } from "next-sanity";
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-08-12", // hard-coded to today's UTC date
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SanityImage {
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface SanityFile {
  asset: { _ref: string; _type: "reference" };
}

export interface Stat {
  _key: string;
  value: string;
  label: string;
}

export interface Service {
  _key: string;
  number: string;
  title: string;
  tags?: string[];
}

export interface FaqItem {
  _key: string;
  question: string;
  answer: string;
}

export interface Logo {
  _key: string;
  name: string;
  svg: SanityImage;
}

export interface SocialLinks {
  x?: string;
  linkedin?: string;
  dribbble?: string;
  behance?: string;
}

export interface SiteSettings {
  _id: string;
  name: string;
  roleTitles: string[];
  headline: string;
  subhead?: string;
  bio?: string;
  headshot?: SanityImage;
  availabilityBadge?: string;
  email?: string;
  resumeFile?: SanityFile;
  stats: Stat[];
  services: Service[];
  faq: FaqItem[];
  logos: Logo[];
  socialLinks?: SocialLinks;
}

export type ContentBlockLayout = "full" | "split-2col";

export interface ContentBlock {
  _key: string;
  eyebrow?: string;
  headline?: string;
  body?: unknown[];
  images?: SanityImage[];
  layout: ContentBlockLayout;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  dateRange?: string;
  excerpt?: string;
  heroImage?: SanityImage;
  ctaLabel?: string;
  ctaUrl?: string;
  featured: boolean;
  order?: number;
  contentBlocks: ContentBlock[];
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

const PROJECT_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  category,
  dateRange,
  excerpt,
  heroImage,
  ctaLabel,
  ctaUrl,
  featured,
  order,
  contentBlocks
`;

const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings"][0]{
    _id,
    name,
    roleTitles,
    headline,
    subhead,
    bio,
    headshot,
    availabilityBadge,
    email,
    resumeFile,
    stats,
    services,
    faq,
    logos,
    socialLinks
  }`
);

const ALL_PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)] | order(order asc){ ${PROJECT_FIELDS} }`
);

const FEATURED_PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && featured == true && defined(slug.current)] | order(order asc){ ${PROJECT_FIELDS} }`
);

const PROJECT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{ ${PROJECT_FIELDS} }`
);

// ---------------------------------------------------------------------------
// Typed fetch helpers
// ---------------------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
}

export async function getAllProjects(): Promise<Project[]> {
  return client.fetch<Project[]>(ALL_PROJECTS_QUERY);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch<Project[]>(FEATURED_PROJECTS_QUERY);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug });
}
