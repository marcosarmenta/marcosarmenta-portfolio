import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { StarMark } from "@/components/ui/StarMark";
import { SectionShell } from "@/components/layout/SectionShell";
import { StartProjectButton } from "@/components/sections/StartProjectButton";
import { getSiteSettings, type Service } from "@/lib/sanity";
import { SERVICE_DETAILS, getServiceDetail } from "@/lib/services-content";

export async function generateStaticParams() {
  return SERVICE_DETAILS.map((detail) => ({ slug: detail.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) return {};

  const siteSettings = await getSiteSettings();
  const service = siteSettings?.services.find((s) => s._key === detail.key);

  return {
    title: service ? `${service.title} | Marcos Armenta` : "Services | Marcos Armenta",
    description: detail.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) notFound();

  const siteSettings = await getSiteSettings();
  const service: Service | undefined = siteSettings?.services.find((s) => s._key === detail.key);
  if (!service) notFound();

  return (
    <div className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto flex w-full max-w-content flex-col gap-8">
        <Link
          href="/services"
          className="inline-flex w-fit items-center gap-2 text-small text-text-secondary transition-colors hover:text-accent"
        >
          <ArrowLeftIcon size={14} />
          All Services
        </Link>

        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 font-mono text-small uppercase tracking-wide text-text-secondary">
            <StarMark />
            Service {service.number}
          </p>
          <h1 className="text-h1 text-text-primary">{service.title}</h1>
          <p className="max-w-2xl text-body text-text-secondary">{detail.summary}</p>
        </div>

        <SectionShell className="flex flex-col gap-4 p-0.5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* What's included */}
            <div className="flex flex-col gap-4 rounded-lg bg-bg-surface p-6 sm:p-8">
              <p className="font-mono text-small uppercase tracking-wide text-text-secondary">
                What&apos;s Included
              </p>
              <ul className="flex flex-col gap-3">
                {detail.whatsIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] text-text-primary">
                    <CheckIcon size={16} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools/tags */}
            <div className="flex flex-col gap-4 rounded-lg bg-bg-surface p-6 sm:p-8">
              <p className="font-mono text-small uppercase tracking-wide text-text-secondary">
                Tools &amp; Focus
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-subtle px-3 py-1.5 font-mono text-[12px] uppercase tracking-wide text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="flex flex-col gap-6 rounded-lg bg-bg-surface p-6 sm:p-8">
            <p className="font-mono text-small uppercase tracking-wide text-text-secondary">
              Process
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {detail.process.map((step, i) => (
                <div key={step.title} className="flex flex-col gap-2">
                  <p className="font-mono text-[12px] text-text-secondary/70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-[15px] font-medium text-text-primary">{step.title}</p>
                  <p className="text-[14px] leading-[22px] text-text-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing CTA */}
          <div className="flex flex-col items-center gap-4 rounded-lg bg-bg-surface px-6 py-16 text-center">
            <h2 className="max-w-lg text-h2 text-text-primary">
              Ready to talk about {service.title.toLowerCase()}?
            </h2>
            <p className="max-w-md text-body text-text-secondary">
              Tell me what you&apos;re building. I&apos;ll tell you if I&apos;m the right fit for
              it.
            </p>
            <StartProjectButton className="mt-2" />
          </div>
        </SectionShell>
      </div>
    </div>
  );
}
