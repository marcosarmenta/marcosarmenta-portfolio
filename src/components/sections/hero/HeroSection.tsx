import Image from "next/image";
import { getSiteSettings, urlFor } from "@/lib/sanity";
import { SectionFadeMask } from "@/components/layout/SectionFadeMask";
import { RoleRotator } from "./RoleRotator";
import { LogoMarquee } from "./LogoMarquee";
import { HeadlineReveal } from "./HeadlineReveal";
import { DecorativeGrid } from "./DecorativeGrid";
import { HeroCTAs } from "./HeroCTAs";

export async function HeroSection() {
  const siteSettings = await getSiteSettings();
  const initials = (siteSettings?.name ?? "MA")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section id="hero" className="relative overflow-hidden px-6 pb-32 md:px-8">
      <DecorativeGrid />

      <div className="relative mx-auto flex w-full max-w-content flex-col items-center gap-8 text-center">
        <div className="h-[120px] w-[120px] overflow-hidden rounded-full border border-border-subtle bg-bg-surface md:h-[160px] md:w-[160px]">
          {siteSettings?.headshot ? (
            <Image
              src={urlFor(siteSettings.headshot).width(320).height(320).url()}
              alt={siteSettings.name}
              width={320}
              height={320}
              className="h-full w-full object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-h2 text-text-secondary">
              {initials}
            </div>
          )}
        </div>

        {siteSettings?.roleTitles && siteSettings.roleTitles.length > 0 && (
          <div className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-surface/70 px-4 py-2 font-mono text-small text-text-secondary">
            <span>Currently:</span>
            <RoleRotator titles={siteSettings.roleTitles} />
          </div>
        )}

        {siteSettings?.headline && (
          <HeadlineReveal
            text={siteSettings.headline}
            className="text-balance max-w-3xl text-display text-text-primary"
          />
        )}

        {siteSettings?.subhead && (
          <p className="max-w-xl text-body-lg text-text-secondary">{siteSettings.subhead}</p>
        )}

        {siteSettings?.availabilityBadge && (
          <span className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-4 py-2 font-mono text-small text-text-secondary">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {siteSettings.availabilityBadge}
          </span>
        )}

        <HeroCTAs />

        {siteSettings?.logos && siteSettings.logos.length > 0 && (
          <div className="w-full pt-12">
            <LogoMarquee logos={siteSettings.logos} />
          </div>
        )}
      </div>

      <SectionFadeMask />
    </section>
  );
}
