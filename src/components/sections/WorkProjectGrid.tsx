"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CaseStudyCard } from "./CaseStudyCard";
import type { Project } from "@/lib/sanity";

// Reveal two at a time (one grid row) so the infinite-scroll cadence matches
// the 2-column layout below the full-width featured project.
const PAGE_SIZE = 2;

export function WorkProjectGrid({ projects }: { projects: Project[] }) {
  const [visibleCount, setVisibleCount] = useState(Math.min(PAGE_SIZE, projects.length));
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleCount >= projects.length) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisibleCount((count) => Math.min(count + PAGE_SIZE, projects.length));
        }
      },
      // Generous margin so the next row loads well before it's reached,
      // and keeps working even if the page is short enough that the
      // sentinel starts near the fold.
      { rootMargin: "600px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, projects.length]);

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2">
        {visibleProjects.map((project, i) => (
          // Keyed by id+index (not id alone) since the featured project can
          // reappear as a filler card at the end of an odd-length grid.
          <motion.div
            key={`${project._id}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <CaseStudyCard project={project} />
          </motion.div>
        ))}
      </div>
      {visibleCount < projects.length && (
        <div ref={sentinelRef} aria-hidden className="h-px w-full" />
      )}
    </>
  );
}
