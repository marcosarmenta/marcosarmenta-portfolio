"use client";

import { Fragment, useMemo, useRef, type Ref } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { TextRun } from "@/lib/bio";

export type { TextRun };

// Cubic ease-in-out — applied to each character's own slice of the scroll
// range so the gray-to-black fill feels smooth rather than linear.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const COLOR_START = "#9CA3AF";
const COLOR_END = "#161616";

interface CharToken {
  char: string;
  bold?: boolean;
}

function Character({
  char,
  bold,
  progress,
  range,
}: {
  char: string;
  bold?: boolean;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, [COLOR_START, COLOR_END], {
    ease: [easeInOutCubic],
  });

  return (
    <motion.span style={{ color }} className={bold ? "font-semibold" : undefined}>
      {char}
    </motion.span>
  );
}

// Splits runs into words (each an unbreakable run of letter spans) joined by
// real space text nodes, so line-wrapping only ever happens between words —
// never mid-word, and never silently blocked by per-letter markup.
function tokenizeIntoWords(runs: TextRun[]): CharToken[][] {
  const words: CharToken[][] = [];
  let current: CharToken[] = [];

  runs.forEach((run) => {
    run.text.split("").forEach((char) => {
      if (char === " ") {
        if (current.length > 0) {
          words.push(current);
          current = [];
        }
      } else {
        current.push({ char, bold: run.bold });
      }
    });
  });
  if (current.length > 0) words.push(current);

  return words;
}

// Reveals text letter-by-letter, gray to black, scrubbed by scroll position
// (and reversible on scroll-up) rather than played once — driven directly by
// scrollYProgress instead of a triggered animation.
export function ScrollColorText({
  runs,
  className,
  as: Component = "p",
}: {
  runs: TextRun[];
  className?: string;
  as?: "p" | "h2";
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  const words = useMemo(() => tokenizeIntoWords(runs), [runs]);
  const totalChars = words.reduce((sum, word) => sum + word.length, 0) || 1;

  let charIndex = 0;

  return (
    <Component ref={ref as Ref<HTMLParagraphElement>} className={className}>
      {words.map((word, wordIndex) => {
        const wordSpan = (
          <span className="inline-block whitespace-nowrap">
            {word.map((token, i) => {
              const start = charIndex / totalChars;
              charIndex += 1;
              const end = charIndex / totalChars;
              return (
                <Character
                  key={i}
                  char={token.char}
                  bold={token.bold}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );

        return (
          <Fragment key={wordIndex}>
            {wordSpan}
            {wordIndex < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </Component>
  );
}
