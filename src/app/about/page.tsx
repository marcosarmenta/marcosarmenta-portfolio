import type { Metadata } from "next";
import Image from "next/image";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { StarMark } from "@/components/ui/StarMark";
import { SectionShell } from "@/components/layout/SectionShell";
import { StartProjectButton } from "@/components/sections/StartProjectButton";
import { ExperienceBento, type ExperienceEntry } from "@/components/about/ExperienceBento";
import { ScrollColorText } from "@/components/sections/ScrollColorText";
import { bioToRuns } from "@/lib/bio";
import { getSiteSettings, urlFor, fileUrl } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About | Marcos Armenta",
  description: "Bio, work experience, skills, and education.",
};

const WORK_EXPERIENCE: ExperienceEntry[] = [
  {
    company: "RVNW Studios",
    role: "Creative Director",
    dates: "Oct 2018 — Present",
    logo: "/images/rvnw-profile-image.png",
    description:
      "Founder of a design and development studio building brand systems, digital products, and high-performance websites for startups and growing businesses. Own strategy, UX/UI, and development end-to-end across Framer, WordPress, Shopify, and Webflow — from concept through launch and every client relationship in between.",
  },
  {
    company: "Provisions Media",
    role: "Design + Development Manager",
    dates: "Aug 2023 — Feb 2024",
    logo: "/images/pm-logo.png",
    description:
      "Directed digital strategy and web initiatives for a full-service marketing agency. Reduced project turnaround time 30% and improved cross-functional delivery between design and engineering.",
  },
  {
    company: "Vander Group",
    role: "Digital Project Manager",
    dates: "Feb 2017 — Jun 2019",
    logo: "/images/vander-logo.png",
    description:
      "Led SEO/SEM and digital ad strategy that drove 40%+ organic traffic growth and a 25% drop in ad spend while improving conversion rates.",
  },
  {
    company: "LGNDVRY",
    role: "Creative Director",
    dates: "Jul 2011 — Oct 2016",
    logo: "/images/lgndvry-logo.png",
    description:
      "Founded a hip-hop and culture media platform, growing it from zero to 500K monthly visitors. Directed brand identity and editorial design; managed a network of writers, photographers, and designers.",
  },
  {
    company: "DJ Cos The Kid",
    role: "Disc Jockey",
    dates: "2007 — 2017",
    logo: "/images/disk_jockey.png",
    description:
      "Not on the résumé, but it comes up in almost every call — a decade spinning clubs, private events, and radio sets, including supporting acts on tour and sharing stages with some of the biggest names in the game. Ask about it.",
  },
];

const SKILLS = [
  { label: "Design", items: "Brand Identity, Design Systems, Visual Design, Prototyping, Wireframing, Motion Design" },
  { label: "Development", items: "Next.js, TypeScript, Tailwind, Framer, WordPress, Shopify, Webflow" },
  { label: "Marketing", items: "Digital Strategy, SEO, Analytics, Growth Marketing" },
  { label: "Leadership", items: "Creative Direction, Client Management, Team Development" },
  { label: "Tools", items: "Figma, Adobe CC, ClickUp, Cursor" },
] as const;

const EDUCATION = [
  { school: "Duke University", credential: "Full-Stack Web Development Certificate", year: "2019" },
  { school: "California Institute of the Arts", credential: "Graphic Design Certificate", year: "2016" },
] as const;

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();

  return (
    <div className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto flex w-full max-w-content flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 font-mono text-small uppercase tracking-wide text-text-secondary">
            <StarMark />
            About
          </p>
          <h1 className="text-h1 text-text-primary">About Me</h1>
        </div>

        <SectionShell className="flex flex-col gap-4 p-0.5">
          {/* Bio */}
          <div className="flex flex-col gap-6 rounded-lg bg-bg-surface p-6 sm:flex-row sm:p-8">
            {siteSettings?.headshot && (
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border-subtle sm:h-32 sm:w-32">
                <Image
                  src={urlFor(siteSettings.headshot).width(256).height(256).url()}
                  alt=""
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-1 flex-col gap-4">
              {siteSettings?.bio && siteSettings.bio.length > 0 ? (
                <ScrollColorText
                  as="p"
                  runs={bioToRuns(siteSettings.bio)}
                  className="max-w-2xl break-words text-body-lg text-text-primary"
                />
              ) : (
                <p className="max-w-2xl text-body text-text-secondary">Bio coming soon.</p>
              )}

              <div className="flex flex-wrap items-center gap-4">
                {siteSettings?.email && (
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="text-[14px] text-text-primary underline hover:text-accent"
                  >
                    {siteSettings.email}
                  </a>
                )}
                {siteSettings?.resumeFile && (
                  <a
                    href={fileUrl(siteSettings.resumeFile)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-[14px] text-text-primary transition-colors hover:border-accent hover:text-accent"
                  >
                    <DownloadSimpleIcon size={16} />
                    Download Resume
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="flex flex-col gap-5 rounded-lg bg-bg-surface p-6 sm:p-8">
            <p className="font-mono text-small uppercase tracking-wide text-text-secondary">
              Experience
            </p>
            <ExperienceBento entries={WORK_EXPERIENCE} />
          </div>

          {/* Skills + Education */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-lg bg-bg-surface p-6 sm:p-8">
              <p className="font-mono text-small uppercase tracking-wide text-text-secondary">
                Skills
              </p>
              <div className="flex flex-col gap-3">
                {SKILLS.map((group) => (
                  <div key={group.label} className="flex flex-col gap-1 border-b border-border-subtle pb-3 last:border-0 last:pb-0">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-text-secondary/70">
                      {group.label}
                    </p>
                    <p className="text-[14px] text-text-primary">{group.items}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-lg bg-bg-surface p-6 sm:p-8">
              <p className="font-mono text-small uppercase tracking-wide text-text-secondary">
                Education
              </p>
              <div className="flex flex-col gap-4">
                {EDUCATION.map((entry) => (
                  <div key={entry.school} className="flex flex-col gap-1">
                    <p className="text-[15px] font-medium text-text-primary">{entry.school}</p>
                    <p className="text-[14px] text-text-secondary">{entry.credential}</p>
                    <p className="font-mono text-[12px] text-text-secondary/70">{entry.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Closing CTA */}
          <div className="flex flex-col items-center gap-4 rounded-lg bg-bg-surface px-6 py-16 text-center">
            <h2 className="max-w-lg text-h2 text-text-primary">
              Got a project that needs this kind of attention?
            </h2>
            <p className="max-w-md text-body text-text-secondary">
              Tell me what you&apos;re building. I&apos;ll tell you if I&apos;m the right fit for
              it.
            </p>
            <StartProjectButton className="mt-2" />
          </div>
        </SectionShell>
      </div>
    </div>
  );
}
