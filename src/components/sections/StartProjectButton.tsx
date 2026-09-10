"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { useBookingModal } from "@/components/booking/BookingModalProvider";

export function StartProjectButton({ className = "" }: { className?: string }) {
  const { open } = useBookingModal();

  return (
    <MagneticButton variant="primary" onClick={open} className={className}>
      Start a Project
    </MagneticButton>
  );
}
