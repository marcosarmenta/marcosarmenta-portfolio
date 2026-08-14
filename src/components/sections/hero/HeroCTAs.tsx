"use client";

import type { MouseEvent } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useAnchorScroll } from "@/lib/useAnchorScroll";

export function HeroCTAs() {
  const { scrollToHash } = useAnchorScroll();

  const handleClick = (hash: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToHash(hash);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <MagneticButton href="#contact" variant="primary" onClick={handleClick("#contact")}>
        Book a Free Call
      </MagneticButton>
      <MagneticButton href="#work" variant="secondary" onClick={handleClick("#work")}>
        See My Projects
      </MagneticButton>
    </div>
  );
}
