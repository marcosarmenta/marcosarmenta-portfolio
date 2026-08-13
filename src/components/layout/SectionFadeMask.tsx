// Sits at the bottom of a section and stays pinned to that edge while the
// section scrolls, so the next section's content blurs and fades in as it
// passes underneath instead of cutting off hard.
export function SectionFadeMask() {
  return (
    <div
      aria-hidden
      className="pointer-events-none sticky bottom-0 left-0 right-0 -mb-px h-20 bg-gradient-to-b from-transparent to-bg-canvas backdrop-blur-sm md:h-28"
    />
  );
}
