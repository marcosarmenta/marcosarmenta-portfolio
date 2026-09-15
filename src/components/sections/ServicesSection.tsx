import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { getSiteSettings } from "@/lib/sanity";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { SectionShell } from "@/components/layout/SectionShell";
import { ServiceCard } from "./ServiceCard";
import { StarMark } from "@/components/ui/StarMark";
import { getServiceDetailByKey } from "@/lib/services-content";

export async function ServicesSection() {
  const siteSettings = await getSiteSettings();
  const services = (siteSettings?.services ?? []).map((service) => {
    const slug = getServiceDetailByKey(service._key)?.slug;
    return { service, href: slug ? `/services/${slug}` : undefined };
  });

  return (
    <SectionShell
      id="services"
      className="flex flex-col items-start gap-8 px-6 pb-[47px] pt-[41px] sm:px-[50px]"
    >
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col gap-2.5">
          <h2 className="flex items-center gap-2 text-[20px] text-text-primary">
            <StarMark />
            Services I Provide
          </h2>
          <p className="text-body text-text-secondary">
            Helping businesses build intuitive products that drive growth.
          </p>
        </div>
        <Link
          href="/services"
          className="group flex shrink-0 items-center gap-1 font-mono text-[12px] uppercase tracking-wide text-text-secondary transition-colors hover:text-accent"
        >
          View All
          <ArrowUpRightIcon
            size={12}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      {services.length > 0 ? (
        <StaggerGroup className="grid w-full grid-cols-1 gap-[2px] sm:grid-cols-2">
          {services.map(({ service, href }) => (
            <StaggerItem key={service._key}>
              <ServiceCard service={service} href={href} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <p className="text-body text-text-secondary">Services coming soon.</p>
      )}
    </SectionShell>
  );
}
