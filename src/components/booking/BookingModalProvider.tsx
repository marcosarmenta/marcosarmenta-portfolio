"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface BookingModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <BookingModalContext.Provider value={value}>{children}</BookingModalContext.Provider>;
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}
