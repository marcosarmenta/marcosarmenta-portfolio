import { HeroSection } from "@/components/sections/hero/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CaseStudiesBentoGrid } from "@/components/sections/CaseStudiesBentoGrid";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CaseStudiesBentoGrid />
      <ServicesSection />
      <FAQAccordion />
      <ContactSection />
    </>
  );
}
