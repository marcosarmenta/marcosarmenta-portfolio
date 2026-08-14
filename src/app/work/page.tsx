import type { Metadata } from "next";
import { getAllProjects } from "@/lib/sanity";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";

export const metadata: Metadata = {
  title: "Work | Marcos Armenta",
  description: "Case studies and selected projects.",
};

export default async function WorkIndexPage() {
  const projects = await getAllProjects();

  return (
    <div className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-content">
        <div className="mb-12 flex flex-col gap-3">
          <p className="font-mono text-small uppercase tracking-wide text-text-secondary">Work</p>
          <h1 className="text-h1 text-text-primary">All Projects</h1>
        </div>

        {projects.length > 0 ? (
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <StaggerItem key={project._id}>
                <CaseStudyCard project={project} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <p className="text-body text-text-secondary">Projects coming soon.</p>
        )}
      </div>
    </div>
  );
}
