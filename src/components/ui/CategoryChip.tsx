import type { ReactNode } from "react";

export function CategoryChip({
  children,
  size = "default",
}: {
  children: ReactNode;
  size?: "default" | "sm";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-lg bg-bg-canvas font-mono uppercase tracking-wide text-text-secondary ${
        size === "sm" ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs"
      }`}
    >
      {children}
    </span>
  );
}
