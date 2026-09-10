import { getSiteSettings } from "@/lib/sanity";
import { Reveal } from "@/components/motion/Reveal";
import { SectionShell } from "@/components/layout/SectionShell";
import { CalEmbed } from "./CalEmbed";

export async function ContactSection() {
  const siteSettings = await getSiteSettings();

  return (
    <SectionShell
      id="contact"
      className="flex flex-col items-start gap-8 px-6 pb-16 pt-11 sm:flex-row sm:gap-11 sm:px-[50px]"
    >
      <Reveal className="flex w-full flex-col gap-2.5 sm:w-[280px] sm:shrink-0">
        <h2 className="text-[20px] text-text-primary">Let&apos;s bring your idea to life</h2>
        <p className="text-[14px] leading-[24px] text-text-secondary">
          I&apos;m always open to new opportunities, collaborations, and creative conversations.
          Feel free to reach out to discuss your project.
        </p>
      </Reveal>

      <Reveal
        delay={0.1}
        className="w-full flex-1 rounded-lg border border-border-subtle bg-bg-surface p-6"
      >
        <CalEmbed email={siteSettings?.email} />
      </Reveal>
    </SectionShell>
  );
}
