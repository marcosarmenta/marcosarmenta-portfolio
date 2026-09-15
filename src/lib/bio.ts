import type { PortableTextBlock } from "next-sanity";

export interface TextRun {
  text: string;
  bold?: boolean;
}

interface BioSpan {
  _type: "span";
  text: string;
  marks?: string[];
}

// Flattens portable text into plain runs (text + bold flag) for the
// letter-by-letter scroll animation, which needs raw characters rather than
// a React tree.
export function bioToRuns(blocks: PortableTextBlock[]): TextRun[] {
  const runs: TextRun[] = [];
  blocks.forEach((block, blockIndex) => {
    if (blockIndex > 0) runs.push({ text: " " });
    const spans = (block as unknown as { children?: BioSpan[] }).children ?? [];
    spans.forEach((span) => {
      runs.push({ text: span.text, bold: span.marks?.includes("strong") });
    });
  });
  return runs;
}
