import { HeroSection } from "@/components/sections/hero/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CaseStudiesBentoGrid } from "@/components/sections/CaseStudiesBentoGrid";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionShell } from "@/components/layout/SectionShell";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionShell className="flex flex-col items-center gap-10 px-0.5 pt-0.5 pb-[44px]">
        <AboutSection />
        <CaseStudiesBentoGrid />
      </SectionShell>
      <ServicesSection />
      <ContactSection />
    </>
  );
}
