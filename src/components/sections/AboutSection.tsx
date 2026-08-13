import { getSiteSettings } from "@/lib/sanity";
import { Reveal } from "@/components/motion/Reveal";
import { SectionFadeMask } from "@/components/layout/SectionFadeMask";
import { StatBlock } from "./StatBlock";

export async function AboutSection() {
  const siteSettings = await getSiteSettings();

  return (
    <section id="about" className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto flex w-full max-w-content flex-col gap-16 md:flex-row md:items-start md:justify-between">
        <Reveal className="max-w-2xl flex-1">
          <p className="font-mono text-small uppercase tracking-wide text-text-secondary">About</p>
          <p className="mt-6 text-body-lg text-text-primary">
            {siteSettings?.bio ?? "Bio coming soon."}
          </p>
        </Reveal>

        {siteSettings?.stats && siteSettings.stats.length > 0 && (
          <Reveal delay={0.15} className="w-full md:w-auto">
            <StatBlock stats={siteSettings.stats} />
          </Reveal>
        )}
      </div>
      <SectionFadeMask />
    </section>
  );
}
