"use client";

import { useLenis } from "@/components/providers/SmoothScrollProvider";

// Reserves space above an anchor target so it doesn't land under the fixed nav.
const SCROLL_OFFSET = -112;

export function useAnchorScroll() {
  const lenis = useLenis();

  const scrollToHash = (hash: string): boolean => {
    const el = document.querySelector<HTMLElement>(hash);
    if (!el) return false;
    if (lenis) {
      lenis.scrollTo(el, { offset: SCROLL_OFFSET, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return true;
  };

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return { scrollToHash, scrollToTop };
}
