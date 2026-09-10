"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { useAnchorScroll } from "@/lib/useAnchorScroll";
import { LiveClock } from "@/components/nav/LiveClock";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useBookingModal } from "@/components/booking/BookingModalProvider";

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

export function StickyNav() {
  const pathname = usePathname();
  const { scrollToHash, scrollToTop } = useAnchorScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openBookingModal } = useBookingModal();

  const handleStartProject = () => {
    setMenuOpen(false);
    openBookingModal();
  };

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
    <header className="sticky top-6 z-50 px-6 md:px-8">
      <div className="mx-auto flex w-full max-w-content items-center justify-center gap-10 rounded-[10px] bg-[rgba(244,245,246,0.2)] px-5 py-[18px] backdrop-blur-xl">
        <LiveClock />

        <nav className="hidden items-center gap-5 md:flex">
          {NAV_LINKS.map((link) =>
            renderLink(link, "whitespace-nowrap text-[14px] font-semibold text-text-primary transition-colors hover:text-accent")
          )}
        </nav>

        <MagneticButton
          variant="primary"
          onClick={handleStartProject}
          className="hidden lg:inline-flex"
        >
          Start a Project
        </MagneticButton>

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
        <div className="mx-auto mt-2 w-full max-w-content rounded-[10px] bg-[rgba(244,245,246,0.9)] p-6 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) =>
              renderLink(link, "text-[14px] font-semibold text-text-primary")
            )}
          </nav>

          <div className="mt-6 border-t border-border-subtle pt-6">
            <MagneticButton variant="primary" onClick={handleStartProject} className="w-full">
              Start a Project
            </MagneticButton>
          </div>
        </div>
      )}
    </header>
  );
}
