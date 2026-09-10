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
    <div className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-content">
        {/* Breadcrumb */}
        <Reveal>
          <Link
            href="/work"
            className="mb-10 inline-flex items-center gap-2 text-small text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeftIcon size={14} />
            All Projects
          </Link>
        </Reveal>

        {/* Meta bar */}
        <Reveal delay={0.05} className="mb-6 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-small uppercase tracking-wide text-text-secondary">
            {disciplines.map((d) => (
              <span key={d}>{d}</span>
            ))}
            {project.location && <span>{project.location}</span>}
          </div>

          {project.ctaUrl && (
            <div className="flex items-center gap-3">
              <a
                href={project.ctaUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-accent px-3 py-1.5 font-mono text-small uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-white"
              >
                {project.ctaLabel ?? "View Live Site"}
                <ArrowUpRightIcon size={12} />
              </a>
              <span className="h-px flex-1 bg-accent/40" aria-hidden />
              <ArrowRightIcon size={14} className="shrink-0 text-accent" aria-hidden />
            </div>
          )}
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.1} className="mb-12 flex flex-col gap-6">
          <h1 className="max-w-3xl text-h1 text-text-primary">{project.excerpt ?? project.title}</h1>
          {introBlock?.body && (
            <div className="max-w-2xl text-body text-text-secondary">
              <PortableText value={introBlock.body} />
            </div>
          )}
          {project.heroImage && (
            <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-border-subtle/40">
              <Image
                src={urlFor(project.heroImage).width(2000).height(1250).url()}
                alt={project.title}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            </div>
          )}
        </Reveal>

        {/* 01 / 02 sections */}
        <div className="flex flex-col gap-16">
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
          <Reveal className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.galleryImages.map((image, i) => (
              <ContentImage key={i} image={image} />
            ))}
          </Reveal>
        )}

        {/* Project nav */}
        {(previousProject || nextProject) && (
          <div className="mt-24 grid grid-cols-1 gap-4 border-t border-border-subtle pt-8 sm:grid-cols-2">
            {previousProject ? (
              <Link
                href={`/work/${previousProject.slug}`}
                className="group flex flex-col gap-2 sm:items-start"
              >
                <span className="inline-flex items-center gap-2 text-small text-text-secondary">
                  <ArrowLeftIcon size={14} className="transition-transform group-hover:-translate-x-1" />
                  Previous
                </span>
                <span className="text-[16px] font-medium text-text-primary">
                  {previousProject.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {nextProject && (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex flex-col gap-2 sm:items-end sm:text-right"
              >
                <span className="inline-flex items-center gap-2 text-small text-text-secondary">
                  Next
                  <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-[16px] font-medium text-text-primary">{nextProject.title}</span>
              </Link>
            )}
          </div>
        )}

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
