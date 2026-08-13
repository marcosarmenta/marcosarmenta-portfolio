"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const word = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: 12 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

// Splits the headline into words and reveals each with a clip-path mask
// sliding up, staggered — reads as a per-line reveal regardless of where the
// browser happens to wrap a CMS-driven string.
export function HeadlineReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <motion.h1 variants={container} initial="hidden" animate="visible" className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 pr-[0.3em] align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
