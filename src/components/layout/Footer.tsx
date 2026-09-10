import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/sanity";
import { LiveClock } from "@/components/nav/LiveClock";
import { FooterStartProjectLink } from "./FooterStartProjectLink";

const SOCIAL_ICON_MAP = [
  { key: "x", src: "/images/icons/x.svg", label: "X (Twitter)", width: 12, height: 13 },
  { key: "linkedin", src: "/images/icons/linkedin.svg", label: "LinkedIn", width: 12, height: 12 },
  { key: "dribbble", src: "/images/icons/dribbble.svg", label: "Dribbble", width: 12, height: 12 },
  { key: "behance", src: "/images/icons/behance.svg", label: "Behance", width: 12, height: 8 },
] as const;

const SITEMAP_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
] as const;

export function Footer({ siteSettings }: { siteSettings: SiteSettings | null }) {
  const year = new Date().getFullYear();
  const name = siteSettings?.name ?? "Marcos Armenta";
  const roles = siteSettings?.roleTitles?.join(" · ");

  const socials = SOCIAL_ICON_MAP.map(({ key, src, label, width, height }) => ({
    key,
    src,
    label,
    width,
    height,
    href: siteSettings?.socialLinks?.[key],
  })).filter((s): s is typeof s & { href: string } => Boolean(s.href));

  return (
    <footer className="px-6 pb-24 pt-6 md:px-8">
      <div className="mx-auto w-full max-w-content rounded-md bg-bg-surface px-8 py-10 text-[14px] text-text-secondary">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.2fr_1fr_1fr]">
          {/* Brand + live status */}
          <div className="flex flex-col gap-3">
            <p className="text-[16px] font-medium text-text-primary">{name}</p>
            {roles && <p className="max-w-[240px] text-text-secondary">{roles}</p>}
            <div className="pt-1">
              <LiveClock />
            </div>
            {siteSettings?.availabilityBadge && (
              <span className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-[50px] bg-[#e7f8e2] px-3 py-1.5 text-[12px] text-[#42b91d]">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#42b91d]" />
                {siteSettings.availabilityBadge}
              </span>
            )}
          </div>

          {/* Sitemap */}
          <div className="flex flex-col gap-3">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-text-primary">
              Sitemap
            </p>
            <nav className="flex flex-col gap-2.5">
              {SITEMAP_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Get in touch */}
          <div className="flex flex-col gap-3">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-text-primary">
              Get in Touch
            </p>
            <div className="flex flex-col gap-2.5">
              {siteSettings?.email && (
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="transition-colors hover:text-text-primary"
                >
                  {siteSettings.email}
                </a>
              )}
              <FooterStartProjectLink />
            </div>

            {socials.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                {socials.map(({ key, src, label, href, width, height }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle transition-colors hover:border-text-primary"
                  >
                    <Image src={src} alt="" width={width} height={height} unoptimized />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {year} {name}
          </p>
          <div className="flex items-center gap-2.5">
            <Link href="/privacy" className="transition-colors hover:text-text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
