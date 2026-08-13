"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { XLogo } from "@phosphor-icons/react/dist/csr/XLogo";
import { LinkedinLogo } from "@phosphor-icons/react/dist/csr/LinkedinLogo";
import { DribbbleLogo } from "@phosphor-icons/react/dist/csr/DribbbleLogo";
import { BehanceLogo } from "@phosphor-icons/react/dist/csr/BehanceLogo";
import { useAnchorScroll } from "@/lib/useAnchorScroll";
import { LiveClock } from "@/components/nav/LiveClock";
import type { SocialLinks } from "@/lib/sanity";

type NavLink =
  | { label: string; kind: "home" }
  | { label: string; kind: "anchor"; hash: string }
  | { label: string; kind: "route"; href: string };

const NAV_LINKS: NavLink[] = [
  { label: "Home", kind: "home" },
  { label: "About", kind: "anchor", hash: "#about" },
  { label: "Projects", kind: "route", href: "/work" },
  { label: "Services", kind: "anchor", hash: "#services" },
  { label: "Contact", kind: "anchor", hash: "#contact" },
];

const SOCIAL_ICON_MAP = [
  { key: "x", Icon: XLogo, label: "X (Twitter)" },
  { key: "linkedin", Icon: LinkedinLogo, label: "LinkedIn" },
  { key: "dribbble", Icon: DribbbleLogo, label: "Dribbble" },
  { key: "behance", Icon: BehanceLogo, label: "Behance" },
] as const;

export function StickyNav({ socialLinks }: { socialLinks?: SocialLinks }) {
  const pathname = usePathname();
  const { scrollToHash, scrollToTop } = useAnchorScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHomeClick = (e: MouseEvent) => {
    setMenuOpen(false);
    if (pathname !== "/") return;
    e.preventDefault();
    scrollToTop();
  };

  const handleAnchorClick = (e: MouseEvent, hash: string) => {
    setMenuOpen(false);
    if (pathname !== "/") return;
    if (scrollToHash(hash)) e.preventDefault();
  };

  const socials = SOCIAL_ICON_MAP.map(({ key, Icon, label }) => ({
    key,
    Icon,
    label,
    href: socialLinks?.[key],
  })).filter((s): s is typeof s & { href: string } => Boolean(s.href));

  const renderLink = (link: NavLink, className: string) => {
    if (link.kind === "home") {
      return (
        <Link key={link.label} href="/" onClick={handleHomeClick} className={className}>
          {link.label}
        </Link>
      );
    }
    if (link.kind === "route") {
      return (
        <Link
          key={link.label}
          href={link.href}
          onClick={() => setMenuOpen(false)}
          className={className}
        >
          {link.label}
        </Link>
      );
    }
    return (
      <Link
        key={link.label}
        href={`/${link.hash}`}
        onClick={(e) => handleAnchorClick(e, link.hash)}
        className={className}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="fixed inset-x-0 top-6 z-50 px-6 md:px-8">
      <div className="mx-auto flex w-full max-w-content items-center justify-between gap-6 rounded-lg border border-border-subtle/60 bg-bg-surface/70 px-6 py-4 backdrop-blur-xl">
        <Link
          href="/"
          onClick={handleHomeClick}
          className="text-body font-medium text-text-primary"
        >
          Marcos Armenta
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) =>
            renderLink(
              link,
              "text-small font-medium text-text-primary transition-colors hover:text-accent"
            )
          )}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LiveClock />
          {socials.length > 0 && (
            <div className="flex items-center gap-4 border-l border-border-subtle pl-6">
              {socials.map(({ key, Icon, label, href }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="text-text-secondary transition-colors hover:text-accent"
                >
                  <Icon size={18} weight="regular" />
                </a>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-sm text-text-primary md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <XIcon size={22} /> : <ListIcon size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-2 w-full max-w-content rounded-lg border border-border-subtle/60 bg-bg-surface/95 p-6 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => renderLink(link, "text-body font-medium text-text-primary"))}
          </nav>

          {socials.length > 0 && (
            <div className="mt-6 flex items-center gap-5 border-t border-border-subtle pt-6">
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

          <div className="mt-6">
            <LiveClock />
          </div>
        </div>
      )}
    </header>
  );
}
