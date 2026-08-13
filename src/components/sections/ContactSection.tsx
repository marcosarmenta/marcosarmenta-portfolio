import { getSiteSettings } from "@/lib/sanity";
import { Reveal } from "@/components/motion/Reveal";
import { SectionFadeMask } from "@/components/layout/SectionFadeMask";
import { CalEmbed } from "./CalEmbed";

export async function ContactSection() {
  const siteSettings = await getSiteSettings();

  return (
    <section id="contact" className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-content">
        <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-small uppercase tracking-wide text-text-secondary">
            Contact
          </p>
          <h2 className="text-h1 text-text-primary">Let&apos;s work together</h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="overflow-hidden rounded-lg border border-border-subtle bg-bg-surface"
        >
          <CalEmbed email={siteSettings?.email} />
        </Reveal>
      </div>
      <SectionFadeMask />
    </section>
  );
}
