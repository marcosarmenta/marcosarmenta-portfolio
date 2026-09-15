import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { StarMark } from "@/components/ui/StarMark";
import { SectionShell } from "@/components/layout/SectionShell";
import { StartProjectButton } from "@/components/sections/StartProjectButton";
import { getSiteSettings } from "@/lib/sanity";
import { getServiceDetailByKey } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "Services | Marcos Armenta",
  description: "Helping businesses build intuitive products that drive growth.",
};

export default async function ServicesPage() {
  const siteSettings = await getSiteSettings();
  const services = siteSettings?.services ?? [];

  return (
    <div className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto flex w-full max-w-content flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 font-mono text-small uppercase tracking-wide text-text-secondary">
            <StarMark />
            Services
          </p>
          <h1 className="text-h1 text-text-primary">Services I Provide</h1>
          <p className="max-w-xl text-body text-text-secondary">
            Helping businesses build intuitive products that drive growth.
          </p>
        </div>

        {services.length > 0 ? (
          <SectionShell className="grid grid-cols-1 gap-[2px] p-0.5 sm:grid-cols-2">
            {services.map((service) => {
              const detail = getServiceDetailByKey(service._key);
              if (!detail) return null;

              return (
                <Link
                  key={service._key}
                  href={`/services/${detail.slug}`}
                  className="group flex h-full flex-col items-start justify-between gap-6 rounded-lg bg-bg-surface p-9 transition-colors duration-300 hover:bg-black"
                >
                  <div className="flex w-full items-start justify-between">
                    <p className="text-[36px] font-medium leading-[36px] text-border-subtle transition-colors duration-300 group-hover:text-accent">
                      {service.number}
                    </p>
                    <ArrowUpRightIcon
                      size={20}
                      className="text-border-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <h2 className="text-[20px] font-medium text-text-primary transition-colors duration-300 group-hover:text-white">
                      {service.title}
                    </h2>
                    <p className="text-[14px] text-text-secondary transition-colors duration-300 group-hover:text-white/60">
                      {detail.summary}
                    </p>
                  </div>
                </Link>
              );
            })}
          </SectionShell>
        ) : (
          <p className="text-body text-text-secondary">Services coming soon.</p>
        )}

        <div className="flex flex-col items-center gap-4 rounded-lg bg-bg-surface px-6 py-16 text-center">
          <h2 className="max-w-lg text-h2 text-text-primary">
            Got a project that needs this kind of attention?
          </h2>
          <p className="max-w-md text-body text-text-secondary">
            Tell me what you&apos;re building. I&apos;ll tell you if I&apos;m the right fit for
            it.
          </p>
          <StartProjectButton className="mt-2" />
        </div>
      </div>
    </div>
  );
}
