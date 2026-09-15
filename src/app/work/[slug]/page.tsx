import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { getAllProjects, getProjectBySlug, urlFor, type Project } from "@/lib/sanity";
import { Reveal } from "@/components/motion/Reveal";
import { StartProjectButton } from "@/components/sections/StartProjectButton";
import { SectionShell } from "@/components/layout/SectionShell";
import { CategoryChip } from "@/components/ui/CategoryChip";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Marcos Armenta`,
    description: project.excerpt,
  };
}

function ContentImage({
  image,
  className = "",
}: {
  image: NonNullable<Project["heroImage"]>;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-[12px] ${className}`}>
      <Image
        src={urlFor(image).width(1200).height(900).url()}
        alt=""
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([getProjectBySlug(slug), getAllProjects()]);

  if (!project) notFound();

  const disciplines = project.category?.split("·").map((d) => d.trim()).filter(Boolean) ?? [];
  const [introBlock, ...sectionBlocks] = project.contentBlocks ?? [];

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : undefined;
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : undefined;

  return (
    <div className="py-24 md:py-32">
      <SectionShell className="flex flex-col gap-8 p-6 sm:p-8">
        {/* Header / meta card */}
        <Reveal className="flex flex-col gap-8 rounded-lg bg-bg-surface p-6 sm:p-8">
          <Link
            href="/work"
            className="inline-flex w-fit items-center gap-2 text-small text-text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeftIcon size={14} />
            All Projects
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {disciplines.map((d) => (
                <CategoryChip key={d}>{d}</CategoryChip>
              ))}
              {project.location && <CategoryChip>{project.location}</CategoryChip>}
            </div>

            {project.ctaUrl && (
              <a
                href={project.ctaUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg bg-text-primary px-4 py-2 text-small font-medium text-bg-canvas transition-colors hover:bg-accent"
              >
                {project.ctaLabel ?? "View Live Site"}
                <ArrowUpRightIcon size={14} />
              </a>
            )}
          </div>
        </Reveal>

        {/* Main content / description card */}
        <Reveal delay={0.05} className="flex flex-col gap-6 rounded-lg bg-bg-surface p-6 sm:p-8">
          <h1 className="max-w-3xl text-h1 text-text-primary">{project.excerpt ?? project.title}</h1>
          {introBlock?.body && (
            <div className="max-w-2xl text-body text-text-secondary">
              <PortableText value={introBlock.body} />
            </div>
          )}
        </Reveal>

        {/* Hero image / mockup card */}
        {project.heroImage && (
          <Reveal delay={0.1} className="rounded-lg bg-bg-surface p-3 sm:p-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-border-subtle/40">
              <Image
                src={urlFor(project.heroImage).width(2000).height(1250).url()}
                alt={project.title}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        )}
      </SectionShell>

      <div className="mx-auto w-full max-w-content">
        {/* 01 / 02 sections */}
        <div className="mt-16 flex flex-col gap-16">
          {sectionBlocks.map((block) => (
            <Reveal key={block._key} className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                {block.eyebrow && (
                  <p className="font-mono text-small uppercase tracking-wide text-text-secondary">
                    {block.eyebrow} — {block.eyebrow === "01" ? "Solution" : "Result"}
                  </p>
                )}
                {block.headline && (
                  <h2 className="max-w-2xl text-h2 text-text-primary">{block.headline}</h2>
                )}
                {block.body && (
                  <div className="max-w-2xl text-body text-text-secondary">
                    <PortableText value={block.body} />
                  </div>
                )}
              </div>

              {block.images && block.images.length > 0 && (
                <div
                  className={
                    block.layout === "split-2col" && block.images.length === 2
                      ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
                      : "flex flex-col gap-4"
                  }
                >
                  {block.images.map((image, i) => (
                    <ContentImage key={i} image={image} />
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>

        {/* Gallery */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <Reveal className="mt-16 flex flex-col gap-6">
            <p className="font-mono text-small uppercase tracking-wide text-text-secondary">
              03 — Gallery
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.galleryImages.map((image, i) => (
                <ContentImage key={i} image={image} />
              ))}
            </div>
          </Reveal>
        )}

      </div>

      {/* Project nav */}
      {(previousProject || nextProject) && (
        <SectionShell className="mt-8 grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 sm:p-8">
          {previousProject ? (
            <Link
              href={`/work/${previousProject.slug}`}
              className="group flex flex-col items-start gap-2 rounded-lg border border-border-subtle bg-bg-surface p-4 text-left transition-colors hover:border-accent"
            >
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-text-secondary">
                <ArrowLeftIcon size={18} className="transition-transform group-hover:-translate-x-1" />
                Previous
              </span>
              <span className="text-body-lg font-bold text-text-primary">
                {previousProject.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className="group flex flex-col items-end gap-2 rounded-lg border border-border-subtle bg-bg-surface p-4 text-right transition-colors hover:border-accent"
            >
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-text-secondary">
                Next
                <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-body-lg font-bold text-text-primary">{nextProject.title}</span>
            </Link>
          )}
        </SectionShell>
      )}

      <div className="mx-auto w-full max-w-content">
        {/* Closing CTA band */}
        <Reveal className="mt-16 flex flex-col items-center gap-4 rounded-xl bg-bg-surface px-6 py-16 text-center">
          <h2 className="max-w-lg text-h2 text-text-primary">
            Got a project that needs this kind of attention?
          </h2>
          <p className="max-w-md text-body text-text-secondary">
            Tell me what you&apos;re building. I&apos;ll tell you if I&apos;m the right fit for
            it.
          </p>
          <StartProjectButton className="mt-2" />
        </Reveal>
      </div>
    </div>
  );
}
