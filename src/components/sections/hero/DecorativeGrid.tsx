"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Decorative grid-square background behind the hero content, drifting
// slower than scroll for subtle depth (no parallax library, no WebGL).
export function DecorativeGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(var(--border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--border-subtle)_1px,transparent_1px)] [background-size:48px_48px]"
      />
    </div>
  );
}
