import type { ElementType, ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: ElementType;
}

// Canvas-colored outer wrapper (22px radius) that every section nests its
// white content cards inside. Owns the 760px content-width cap and
// centering itself so no call site can forget it.
export function SectionShell({
  children,
  id,
  className = "",
  as: Component = "section",
}: SectionShellProps) {
  return (
    <Component
      id={id}
      className={`mx-auto w-full max-w-content rounded-xl bg-bg-canvas ${className}`}
    >
      {children}
    </Component>
  );
}
