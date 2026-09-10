import { getFeaturedProjects } from "@/lib/sanity";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CaseStudyCard } from "./CaseStudyCard";
import { StarMark } from "@/components/ui/StarMark";

export async function CaseStudiesBentoGrid() {
  const projects = (await getFeaturedProjects()).slice(0, 4);

  return (
    <div id="work" className="flex w-full flex-col items-center gap-10 px-6 pb-11 sm:px-12">
      <div className="flex w-full flex-col gap-3">
        <h2 className="flex items-center gap-2 text-[20px] text-text-primary">
          <StarMark />
          Some of My Work
        </h2>
        <p className="max-w-xl text-body text-text-secondary">
          A selection of projects showcasing strategy, design thinking, and measurable impact.
        </p>
      </div>

      {projects.length > 0 ? (
        <StaggerGroup className="grid w-full grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project._id}>
              <CaseStudyCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <p className="text-body text-text-secondary">Case studies coming soon.</p>
      )}

      <MagneticButton href="/work" variant="secondary">
        See All Projects
      </MagneticButton>
    </div>
  );
}
