// Full-viewport-width blur pinned to the bottom of the screen at all times
// (not scroll-tied to any particular section), fading whatever's beneath it
// into the page background instead of cutting off hard.
export function SectionFadeMask() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-20 bg-gradient-to-b from-transparent to-white backdrop-blur-sm"
    />
  );
}
