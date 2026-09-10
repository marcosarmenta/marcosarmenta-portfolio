"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

const MotionLink = motion.create(Link);

const SPRING = { stiffness: 200, damping: 15, mass: 0.4 };
const STRENGTH = 0.35;

interface MagneticButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
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

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * STRENGTH);
    y.set((e.clientY - rect.top - rect.height / 2) * STRENGTH);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const shellBg = variant === "primary" ? "bg-accent" : "bg-border-subtle";
  const innerGradient =
    variant === "primary"
      ? "bg-gradient-to-b from-accent to-[#8A0000]"
      : "bg-gradient-to-b from-bg-canvas to-bg-surface";
  const textColor = variant === "primary" ? "text-white" : "text-text-secondary";

  const shellClassName = `inline-flex shrink-0 overflow-hidden rounded-sm p-px ${shellBg} ${className}`;
  const innerContent = (
    <span
      className={`relative flex w-full items-center justify-center whitespace-nowrap rounded-sm px-5 py-[14px] text-[14px] font-medium tracking-[-0.14px] ${innerGradient} ${textColor}`}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-4px_4px_0px_rgba(255,255,255,0.2),inset_0px_4px_4px_0px_rgba(255,255,255,0.2)]"
      />
    </span>
  );

  if (!href) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={shellClassName}
      >
        {innerContent}
      </motion.button>
    );
  }

  return (
    <MotionLink
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={shellClassName}
    >
      {innerContent}
    </MotionLink>
  );
}
