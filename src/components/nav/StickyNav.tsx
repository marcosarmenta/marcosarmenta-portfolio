"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
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
  { key: "x", src: "/images/icons/social-x.svg", label: "X (Twitter)" },
  { key: "linkedin", src: "/images/icons/social-linkedin.svg", label: "LinkedIn" },
  { key: "dribbble", src: "/images/icons/social-dribbble.svg", label: "Dribbble" },
  { key: "behance", src: "/images/icons/social-behance.svg", label: "Behance" },
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

  const socials = SOCIAL_ICON_MAP.map(({ key, src, label }) => ({
    key,
    src,
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
    <header className="sticky top-6 z-50 mx-auto w-fit max-w-[calc(100%-3rem)]">
      <div className="flex items-center justify-center gap-10 rounded-[10px] bg-[rgba(244,245,246,0.2)] px-5 py-[18px] backdrop-blur-xl">
        <LiveClock />

        <nav className="hidden items-center gap-5 md:flex">
          {NAV_LINKS.map((link) =>
            renderLink(link, "whitespace-nowrap text-[14px] font-semibold text-text-primary transition-colors hover:text-accent")
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {socials.map(({ key, src, label, href }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="transition-opacity hover:opacity-70"
            >
              <Image src={src} alt="" width={32} height={32} />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center text-text-primary md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mt-2 w-64 rounded-[10px] bg-[rgba(244,245,246,0.9)] p-6 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) =>
              renderLink(link, "text-[14px] font-semibold text-text-primary")
            )}
          </nav>

          {socials.length > 0 && (
            <div className="mt-6 flex items-center gap-3 border-t border-border-subtle pt-6">
              {socials.map(({ key, src, label, href }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="transition-opacity hover:opacity-70"
                >
                  <Image src={src} alt="" width={28} height={28} />
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
