import type { Metadata } from "next";
import { getAllProjects } from "@/lib/sanity";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { WorkProjectGrid } from "@/components/sections/WorkProjectGrid";
import { StarMark } from "@/components/ui/StarMark";
import { SectionShell } from "@/components/layout/SectionShell";

export const metadata: Metadata = {
  title: "Work | Marcos Armenta",
  description: "Case studies and selected projects.",
};

export default async function WorkIndexPage() {
  const projects = await getAllProjects();
  const [featuredProject, ...restProjects] = projects;

  // A 2-column grid leaves a dangling last row exactly when the rest-count
  // is odd (i.e. the total project count is even). Rather than repeating
  // the featured project as filler (which duplicates real content), pull
  // the actual last project out of the grid and render it full-width in
  // the same layout as the featured card at the top.
  const hasTrailingFeatured = featuredProject && restProjects.length % 2 !== 0;
  const trailingFeatured = hasTrailingFeatured
    ? restProjects[restProjects.length - 1]
    : undefined;
  const gridProjects = hasTrailingFeatured ? restProjects.slice(0, -1) : restProjects;

  return (
    <div className="py-24 md:py-32">
      <div className="mx-auto mb-12 w-full max-w-content">
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 font-mono text-small uppercase tracking-wide text-text-secondary">
            <StarMark />
            Work
          </p>
          <h1 className="text-h1 text-text-primary">All Projects</h1>
        </div>
      </div>

      {featuredProject ? (
        <SectionShell className="flex flex-col gap-9 p-6 sm:p-12">
          <Reveal>
            <CaseStudyCard project={featuredProject} featured />
          </Reveal>
          <WorkProjectGrid projects={gridProjects} trailingFeatured={trailingFeatured} />
        </SectionShell>
      ) : (
        <div className="mx-auto w-full max-w-content">
          <p className="text-body text-text-secondary">Projects coming soon.</p>
        </div>
      )}
    </div>
  );
}
