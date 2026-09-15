"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDownIcon } from "@phosphor-icons/react/dist/csr/CaretDown";
import { CaretUpIcon } from "@phosphor-icons/react/dist/csr/CaretUp";

export interface ExperienceEntry {
  company: string;
  role: string;
  dates: string;
  logo: string;
  description: string;
}

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="rounded-lg border border-border-subtle bg-bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border-subtle">
            <Image src={entry.logo} alt="" fill sizes="48px" className="object-cover" />
          </div>
          <div>
            <p className="text-[16px] font-medium text-text-primary">{entry.company}</p>
            <p className="font-mono text-[12px] uppercase tracking-wide text-text-secondary">
              {entry.role}
            </p>
          </div>
        </div>
        <span className="shrink-0 whitespace-nowrap font-mono text-[12px] uppercase tracking-wide text-text-secondary">
          {entry.dates}
        </span>
      </div>
      {entry.description && (
        <p className="mt-3 text-[14px] leading-[22px] text-text-secondary">{entry.description}</p>
      )}
    </div>
  );
}

export function ExperienceBento({ entries }: { entries: ExperienceEntry[] }) {
  const [expanded, setExpanded] = useState(false);
  const [first, ...rest] = entries;

  if (!first) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full">
        {!expanded && rest.length > 0 && (
          <div
            aria-hidden
            className="absolute inset-x-4 -bottom-3 -z-10 h-6 rounded-b-lg border border-border-subtle bg-bg-surface"
          />
        )}

        <ExperienceCard entry={first} />

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex flex-col gap-4">
                {rest.map((entry) => (
                  <ExperienceCard key={entry.company} entry={entry} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {rest.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-surface px-4 py-2 font-mono text-[12px] uppercase tracking-wide text-text-primary transition-colors hover:border-accent hover:text-accent"
        >
          {expanded ? "Hide" : "Show All"}
          {expanded ? <CaretUpIcon size={14} /> : <CaretDownIcon size={14} />}
        </button>
      )}
    </div>
  );
}
