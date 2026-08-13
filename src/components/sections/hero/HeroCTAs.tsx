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
    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
      <MagneticButton href="#work" variant="primary" onClick={handleClick("#work")}>
        View My Work
      </MagneticButton>
      <MagneticButton href="#contact" variant="secondary" onClick={handleClick("#contact")}>
        Get in Touch
      </MagneticButton>
    </div>
  );
}
