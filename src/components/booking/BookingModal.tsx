"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { useBookingModal } from "./BookingModalProvider";
import { CalEmbed } from "@/components/sections/CalEmbed";

export function BookingModal({ email }: { email?: string }) {
  const { isOpen, close } = useBookingModal();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-3xl max-h-[90vh] flex-col overflow-y-auto rounded-lg border border-border-subtle bg-bg-surface p-6 shadow-xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle text-text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              <XIcon size={16} />
            </button>
            <h2 className="mb-4 pr-10 text-[18px] text-text-primary">Start a Project</h2>
            <CalEmbed email={email} namespace="booking-modal" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
