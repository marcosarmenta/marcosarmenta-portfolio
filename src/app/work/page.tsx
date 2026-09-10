import type { Metadata } from "next";
import { getAllProjects } from "@/lib/sanity";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { WorkProjectGrid } from "@/components/sections/WorkProjectGrid";
import { StarMark } from "@/components/ui/StarMark";

export const metadata: Metadata = {
  title: "Work | Marcos Armenta",
  description: "Case studies and selected projects.",
};

export default async function WorkIndexPage() {
  const projects = await getAllProjects();
  const [featuredProject, ...restProjects] = projects;

  // A 2-column grid leaves a dangling last row exactly when the rest-count
  // is odd (i.e. the total project count is even). Repeat the featured
  // project as a filler card in that case so every row stays full.
  const gridProjects =
    featuredProject && restProjects.length % 2 !== 0
      ? [...restProjects, featuredProject]
      : restProjects;

  return (
    <div className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-content">
        <div className="mb-12 flex flex-col gap-3">
          <p className="flex items-center gap-2 font-mono text-small uppercase tracking-wide text-text-secondary">
            <StarMark />
            Work
          </p>
          <h1 className="text-h1 text-text-primary">All Projects</h1>
        </div>

        {featuredProject ? (
          <>
            <Reveal className="mb-9">
              <CaseStudyCard project={featuredProject} featured />
            </Reveal>
            <WorkProjectGrid projects={gridProjects} />
          </>
        ) : (
          <p className="text-body text-text-secondary">Projects coming soon.</p>
        )}
      </div>
    </div>
  );
}
