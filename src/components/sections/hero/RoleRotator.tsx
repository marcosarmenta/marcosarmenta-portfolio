"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_OUT } from "@/lib/motion";

export function RoleRotator({
  titles,
  className = "font-medium text-accent",
}: {
  titles: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (titles.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % titles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [titles.length]);

  const current = titles[index] ?? "";

  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className={`inline-block ${className}`}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
