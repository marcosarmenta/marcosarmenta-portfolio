"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { urlFor, type Project } from "@/lib/sanity";

const SPRING = { stiffness: 300, damping: 30, mass: 0.5 };
const BUTTON_WIDTH = 152;
const BUTTON_HEIGHT = 48;

export function CaseStudyCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const trackPointer = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - BUTTON_WIDTH / 2);
    y.set(e.clientY - rect.top - BUTTON_HEIGHT / 2);
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    trackPointer(e);
    setHovered(true);
  };

  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col gap-4">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseMove={trackPointer}
        onMouseLeave={() => setHovered(false)}
        className={`relative w-full overflow-hidden rounded-[12px] bg-border-subtle/40 ${
          featured ? "aspect-[16/9]" : "aspect-[5/4]"
        }`}
      >
        {project.heroImage ? (
          <Image
            src={urlFor(project.heroImage)
              .width(featured ? 2000 : 1200)
              .height(featured ? 1125 : 960)
              .url()}
            alt={project.title}
            fill
            sizes={featured ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
            priority={featured}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-small text-text-secondary">
            {project.title}
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ x: springX, y: springY, width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
              className="pointer-events-none absolute left-0 top-0 z-10 flex items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/10 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-white backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_-1px_1px_rgba(255,255,255,0.15),0_8px_24px_rgba(0,0,0,0.3)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/15 to-transparent"
              />
              <span className="relative">View Project</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-0.5">
        {project.category && (
          <p className="text-[12px] tracking-[-0.12px] text-text-secondary">{project.category}</p>
        )}
        <h3
          className={`font-medium tracking-[-0.16px] text-text-primary ${
            featured ? "text-[20px]" : "text-[16px]"
          }`}
        >
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
