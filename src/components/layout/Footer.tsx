import Link from "next/link";
import { XLogo } from "@phosphor-icons/react/dist/ssr/XLogo";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import { DribbbleLogo } from "@phosphor-icons/react/dist/ssr/DribbbleLogo";
import { BehanceLogo } from "@phosphor-icons/react/dist/ssr/BehanceLogo";
import type { SiteSettings } from "@/lib/sanity";

const FOOTER_ANCHOR_LINKS = [
  { label: "Home", hash: "#hero" },
  { label: "About", hash: "#about" },
  { label: "Services", hash: "#services" },
  { label: "Contact", hash: "#contact" },
];

const SOCIAL_ICON_MAP = [
  { key: "x", Icon: XLogo, label: "X (Twitter)" },
  { key: "linkedin", Icon: LinkedinLogo, label: "LinkedIn" },
  { key: "dribbble", Icon: DribbbleLogo, label: "Dribbble" },
  { key: "behance", Icon: BehanceLogo, label: "Behance" },
] as const;

export function Footer({ siteSettings }: { siteSettings: SiteSettings | null }) {
  const year = new Date().getFullYear();
  const name = siteSettings?.name ?? "Marcos Armenta";

  const socials = SOCIAL_ICON_MAP.map(({ key, Icon, label }) => ({
    key,
    Icon,
    label,
    href: siteSettings?.socialLinks?.[key],
  })).filter((s): s is typeof s & { href: string } => Boolean(s.href));

  return (
    <footer className="px-6 pb-6 pt-24 md:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10 rounded-lg border border-border-subtle bg-bg-surface px-8 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="text-h2 font-medium text-text-primary">{name}</p>
          {siteSettings?.headline && (
            <p className="mt-3 text-body text-text-secondary">{siteSettings.headline}</p>
          )}
          {siteSettings?.email && (
            <a
              href={`mailto:${siteSettings.email}`}
              className="mt-4 inline-block text-body font-medium text-accent hover:underline"
            >
              {siteSettings.email}
            </a>
          )}
        </div>

        <nav className="flex flex-col gap-3 font-mono text-small text-text-secondary">
          {FOOTER_ANCHOR_LINKS.map((link) => (
            <Link
              key={link.label}
              href={`/${link.hash}`}
              className="transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/work" className="transition-colors hover:text-text-primary">
            Projects
          </Link>
        </nav>

        {socials.length > 0 && (
          <div className="flex items-start gap-4">
            {socials.map(({ key, Icon, label, href }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="text-text-secondary transition-colors hover:text-accent"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        )}
      </div>

      <p className="mx-auto mt-6 w-full max-w-content text-center text-small text-text-secondary md:text-left">
        © {year} {name}. All rights reserved.
      </p>
    </footer>
  );
}
