export interface ServiceDetail {
  key: string;
  slug: string;
  summary: string;
  whatsIncluded: string[];
  process: { title: string; description: string }[];
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    key: "service-brand",
    slug: "brand-identity",
    summary:
      "A brand system that holds up everywhere it shows up — from a logo mark to a full identity guide your team can actually use.",
    whatsIncluded: [
      "Brand strategy & positioning",
      "Logo & mark design",
      "Color, type & visual language",
      "Brand guidelines document",
    ],
    process: [
      { title: "Discover", description: "Positioning, audience, and competitive landscape." },
      { title: "Explore", description: "Concept directions, explored wide before narrowing." },
      { title: "Refine", description: "Logo, palette, and type system locked in." },
      { title: "Deliver", description: "Guidelines document plus every source file." },
    ],
  },
  {
    key: "service-web",
    slug: "web-design-build",
    summary:
      "Design and development end-to-end — a site that looks considered and ships fast, built on modern tooling instead of a page builder.",
    whatsIncluded: [
      "UX/UI design in Figma",
      "Component-based design system",
      "Next.js build with a Sanity CMS",
      "Performance & SEO fundamentals",
    ],
    process: [
      { title: "Plan", description: "Sitemap, content model, and technical approach." },
      { title: "Design", description: "Wireframes through high-fidelity, component by component." },
      { title: "Build", description: "Next.js front end wired to a Sanity-managed CMS." },
      { title: "Launch", description: "QA, performance pass, and a clean handoff." },
    ],
  },
  {
    key: "service-product",
    slug: "product-design",
    summary:
      "Design work that doesn't only live on a screen — logos, flyers, brochures, packaging, and everything else a growing brand needs printed, shared, or shipped.",
    whatsIncluded: [
      "Logo & mark variations",
      "Flyers & event collateral",
      "Brochures & sales materials",
      "Packaging & merch design",
    ],
    process: [
      { title: "Brief", description: "What it's for, where it shows up, and who sees it." },
      { title: "Concepts", description: "A few directions, explored quickly." },
      { title: "Refinement", description: "One direction, sharpened to final." },
      { title: "Delivery", description: "Print-ready files in whatever format you need." },
    ],
  },
  {
    key: "service-marketing",
    slug: "marketing-ops",
    summary:
      "The operational backbone behind the brand — websites, e-commerce, and portals built to actually run the business, not just represent it.",
    whatsIncluded: [
      "Website builds on WordPress, Shopify & Webflow",
      "E-commerce setup & optimization",
      "Client & customer portals",
      "Ongoing digital strategy",
    ],
    process: [
      { title: "Audit", description: "What's working, what isn't, and why." },
      { title: "Strategy", description: "A plan tied to actual business outcomes." },
      { title: "Build", description: "Implementation, integration, and testing." },
      { title: "Optimize", description: "Iteration based on real usage data." },
    ],
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}

export function getServiceDetailByKey(key: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.key === key);
}
