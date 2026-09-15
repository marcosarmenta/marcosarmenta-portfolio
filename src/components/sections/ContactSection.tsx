import { Reveal } from "@/components/motion/Reveal";
import { SectionShell } from "@/components/layout/SectionShell";
import { StarMark } from "@/components/ui/StarMark";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ContactSection() {
  return (
    <SectionShell
      id="contact"
      className="flex flex-col items-start gap-8 px-6 pb-16 pt-11 sm:flex-row sm:items-center sm:gap-11 sm:px-[50px]"
    >
      <Reveal className="flex w-full flex-col gap-2.5 sm:w-[280px] sm:shrink-0">
        <h2 className="flex items-center gap-2 text-[20px] text-text-primary">
          <StarMark />
          Let&apos;s bring your idea to life
        </h2>
        <p className="text-[14px] leading-[24px] text-text-secondary">
          I&apos;m always open to new opportunities, collaborations, and creative conversations.
          Feel free to reach out to discuss your project.
        </p>
      </Reveal>

      <Reveal
        delay={0.1}
        className="flex w-full flex-1 items-center justify-between gap-6 rounded-lg border border-border-subtle bg-bg-surface p-6"
      >
        <p className="text-[14px] text-text-secondary">
          Book a call, message me directly, or find me on socials.
        </p>
        <MagneticButton href="/contact" variant="primary">
          Get in Touch
        </MagneticButton>
      </Reveal>
    </SectionShell>
  );
}
