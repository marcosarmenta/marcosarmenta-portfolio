"use client";

import { useBookingModal } from "@/components/booking/BookingModalProvider";

export function FooterStartProjectLink() {
  const { open } = useBookingModal();

  return (
    <button
      type="button"
      onClick={open}
      className="text-left transition-colors hover:text-text-primary"
    >
      Start a Project
    </button>
  );
}
