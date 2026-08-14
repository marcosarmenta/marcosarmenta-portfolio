import Link from "next/link";
import Image from "next/image";
import { urlFor, type Project } from "@/lib/sanity";

export function CaseStudyCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[12px] bg-border-subtle/40">
        {project.heroImage ? (
          <Image
            src={urlFor(project.heroImage).width(1200).height(960).url()}
            alt={project.title}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-small text-text-secondary">
            {project.title}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        {project.category && (
          <p className="text-[12px] tracking-[-0.12px] text-text-secondary">{project.category}</p>
        )}
        <h3 className="text-[16px] font-medium tracking-[-0.16px] text-text-primary">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
