import Link from "next/link";
import Image from "next/image";
import { urlFor, type Project } from "@/lib/sanity";

export function CaseStudyCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-surface"
    >
      <div className="relative flex-1 overflow-hidden bg-border-subtle/40">
        {project.heroImage ? (
          <Image
            src={urlFor(project.heroImage).width(1200).height(900).url()}
            alt={project.title}
            fill
            sizes={large ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-small text-text-secondary">
            {project.title}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 p-6">
        {project.category && (
          <p className="font-mono text-small text-text-secondary">{project.category}</p>
        )}
        <h3 className={large ? "text-h1 text-text-primary" : "text-h2 text-text-primary"}>
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
