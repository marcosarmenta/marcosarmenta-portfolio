import { getSiteSettings } from "@/lib/sanity";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { SectionFadeMask } from "@/components/layout/SectionFadeMask";
import { ServiceCard } from "./ServiceCard";

export async function ServicesSection() {
  const siteSettings = await getSiteSettings();
  const services = siteSettings?.services ?? [];

  return (
    <section id="services" className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-content">
        <div className="mb-12 flex flex-col gap-3">
          <p className="font-mono text-small uppercase tracking-wide text-text-secondary">
            What I Do
          </p>
          <h2 className="text-h1 text-text-primary">Services</h2>
        </div>

        {services.length > 0 ? (
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <StaggerItem key={service._key}>
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <p className="text-body text-text-secondary">Services coming soon.</p>
        )}
      </div>
      <SectionFadeMask />
    </section>
  );
}
