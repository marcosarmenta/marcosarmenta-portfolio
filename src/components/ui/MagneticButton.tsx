"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

const MotionLink = motion.create(Link);

const SPRING = { stiffness: 200, damping: 15, mass: 0.4 };
const STRENGTH = 0.35;

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export function MagneticButton({
  href,
  children,
  variant = "primary",
  onClick,
  className = "",
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * STRENGTH);
    y.set((e.clientY - rect.top - rect.height / 2) * STRENGTH);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "inline-flex items-center justify-center rounded-lg px-8 py-4 text-small font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-text-primary text-bg-canvas hover:bg-accent"
      : "border border-border-subtle text-text-primary hover:border-text-primary";

  return (
    <MotionLink
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </MotionLink>
  );
}
