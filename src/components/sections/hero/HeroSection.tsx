import Image from "next/image";
import { getSiteSettings, urlFor } from "@/lib/sanity";
import { SectionShell } from "@/components/layout/SectionShell";
import { RoleRotator } from "./RoleRotator";
import { LogoMarquee } from "./LogoMarquee";
import { HeroCTAs } from "./HeroCTAs";

export async function HeroSection() {
  const siteSettings = await getSiteSettings();
  const initials = (siteSettings?.name ?? "MA")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // The headline's final word carries the one accent moment in the hero, so
  // it's split off here rather than marked up in the CMS.
  const headlineWords = siteSettings?.headline?.trim().split(/\s+/) ?? [];
  const headlineLead = headlineWords.slice(0, -1).join(" ");
  const headlineLastWord = headlineWords[headlineWords.length - 1];

  return (
    <SectionShell id="hero" className="p-0.5">
      <div className="relative overflow-hidden rounded-xl bg-bg-surface pl-6 pr-6 sm:pl-12">
        {siteSettings?.availabilityBadge && (
          <span className="absolute right-6 top-6 inline-flex items-center gap-2.5 whitespace-nowrap rounded-[50px] bg-bg-canvas px-3 py-1.5 text-[12px] text-text-primary">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {siteSettings.availabilityBadge}
          </span>
        )}

        <div className="flex flex-col items-start gap-7 py-11">
          <div className="flex items-center gap-5">
            <div className="h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full border border-border-subtle bg-bg-canvas">
              {siteSettings?.headshot ? (
                <Image
                  src={urlFor(siteSettings.headshot).width(176).height(176).url()}
                  alt={siteSettings.name}
                  width={176}
                  height={176}
                  className="h-full w-full object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-mono text-body text-text-secondary">
                  {initials}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-0.5">
              <p className="text-[20px] font-semibold text-text-primary">
                {siteSettings?.name ?? "Marcos Armenta"}
              </p>
              {siteSettings?.roleTitles && siteSettings.roleTitles.length > 0 && (
                <div className="text-[14px] text-text-secondary">
                  <RoleRotator
                    titles={siteSettings.roleTitles}
                    className="font-normal text-text-secondary"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start gap-7">
            <div className="flex flex-col gap-3">
              {headlineLastWord && (
                <p className="max-w-xl text-[32px] font-semibold leading-[1.15] tracking-[-0.96px] text-text-primary">
                  {headlineLead && `${headlineLead} `}
                  <span className="relative inline-block whitespace-nowrap">
                    {headlineLastWord}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-[3px] rounded-full bg-accent"
                    />
                  </span>
                </p>
              )}
              {siteSettings?.subhead && (
                <p className="max-w-lg text-body text-text-secondary">{siteSettings.subhead}</p>
              )}
            </div>

            <HeroCTAs />
          </div>
        </div>

        {siteSettings?.logos && siteSettings.logos.length > 0 && (
          <div className="flex flex-col gap-3 pb-11">
            <p className="text-body font-medium text-text-primary">
              Trusted by 200+ Brands including:
            </p>
            <LogoMarquee logos={siteSettings.logos} />
          </div>
        )}
      </div>
    </SectionShell>
  );
}
