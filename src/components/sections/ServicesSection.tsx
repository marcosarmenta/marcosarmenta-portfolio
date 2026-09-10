import { getSiteSettings } from "@/lib/sanity";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { SectionShell } from "@/components/layout/SectionShell";
import { ServiceCard } from "./ServiceCard";
import { StarMark } from "@/components/ui/StarMark";

export async function ServicesSection() {
  const siteSettings = await getSiteSettings();
  const services = siteSettings?.services ?? [];

  return (
    <SectionShell
      id="services"
      className="flex flex-col items-start gap-8 px-6 pb-[47px] pt-[41px] sm:px-[50px]"
    >
      <div className="flex flex-col gap-2.5">
        <h2 className="flex items-center gap-2 text-[20px] text-text-primary">
          <StarMark />
          Services I Provide
        </h2>
        <p className="text-body text-text-secondary">
          Helping businesses build intuitive products that drive growth.
        </p>
      </div>

      {services.length > 0 ? (
        <StaggerGroup className="grid w-full grid-cols-1 gap-[2px] sm:grid-cols-2">
          {services.map((service) => (
            <StaggerItem key={service._key}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <p className="text-body text-text-secondary">Services coming soon.</p>
      )}
    </SectionShell>
  );
}
