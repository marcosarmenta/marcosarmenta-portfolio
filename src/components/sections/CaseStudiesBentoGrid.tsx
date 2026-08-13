import { getFeaturedProjects } from "@/lib/sanity";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionFadeMask } from "@/components/layout/SectionFadeMask";
import { CaseStudyCard } from "./CaseStudyCard";

const BENTO_AREA = ["bento-large", "bento-small-1", "bento-small-2", "bento-small-3"];

export async function CaseStudiesBentoGrid() {
  const projects = (await getFeaturedProjects()).slice(0, 4);

  return (
    <section id="work" className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-content">
        <div className="mb-12 flex flex-col gap-3">
          <p className="font-mono text-small uppercase tracking-wide text-text-secondary">
            Selected Work
          </p>
          <h2 className="text-h1 text-text-primary">Case Studies</h2>
        </div>

        {projects.length > 0 ? (
          <StaggerGroup className="bento-grid">
            {projects.map((project, i) => (
              <StaggerItem key={project._id} className={BENTO_AREA[i]}>
                <CaseStudyCard project={project} large={i === 0} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <p className="text-body text-text-secondary">Case studies coming soon.</p>
        )}

        <div className="mt-12 flex justify-center">
          <MagneticButton href="/work" variant="secondary">
            See All Projects
          </MagneticButton>
        </div>
      </div>
      <SectionFadeMask />
    </section>
  );
}
