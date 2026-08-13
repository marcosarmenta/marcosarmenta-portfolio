"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/csr/CaretDown";
import { EASE_OUT } from "@/lib/motion";
import type { FaqItem } from "@/lib/sanity";

export function FAQAccordionList({ items }: { items: FaqItem[] }) {
  const [openKey, setOpenKey] = useState<string | null>(items[0]?._key ?? null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openKey === item._key;
        return (
          <div
            key={item._key}
            className="overflow-hidden rounded-md border border-border-subtle bg-bg-surface"
          >
            <button
              type="button"
              onClick={() => setOpenKey(isOpen ? null : item._key)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-body font-medium text-text-primary">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="shrink-0 text-text-secondary"
              >
                <CaretDownIcon size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-body text-text-secondary">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
