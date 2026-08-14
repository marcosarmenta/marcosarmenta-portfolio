import type { ElementType, ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: ElementType;
}

// Canvas-colored outer wrapper (22px radius) that every section nests its
// white content cards inside.
export function SectionShell({
  children,
  id,
  className = "",
  as: Component = "section",
}: SectionShellProps) {
  return (
    <Component id={id} className={`rounded-xl bg-bg-canvas ${className}`}>
      {children}
    </Component>
  );
}
