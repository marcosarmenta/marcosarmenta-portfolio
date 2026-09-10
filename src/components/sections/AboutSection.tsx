import Image from "next/image";
import type { PortableTextBlock } from "next-sanity";
import { getSiteSettings, fileUrl } from "@/lib/sanity";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollColorText, type TextRun } from "@/components/sections/ScrollColorText";
import { StarMark } from "@/components/ui/StarMark";

interface BioSpan {
  _type: "span";
  text: string;
  marks?: string[];
}

// Flattens the bio's portable text into plain runs (text + bold flag) for
// the letter-by-letter scroll animation, which needs raw characters rather
// than a React tree.
function bioToRuns(blocks: PortableTextBlock[]): TextRun[] {
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

export async function AboutSection() {
  const siteSettings = await getSiteSettings();

  return (
    <div id="about" className="w-full rounded-xl bg-bg-surface pb-6 pl-6 pr-6 sm:pl-12">
      <Reveal className="flex flex-col items-start gap-7 py-11">
        <p className="flex items-center gap-2 text-body text-text-secondary">
          <StarMark />
          About Myself
        </p>

        {siteSettings?.bio && siteSettings.bio.length > 0 ? (
          <ScrollColorText
            as="h2"
            runs={bioToRuns(siteSettings.bio)}
            className="w-full max-w-2xl break-words text-h2 text-text-primary"
          />
        ) : (
          <p className="max-w-xl text-body-lg text-text-secondary">Bio coming soon.</p>
        )}

        {(siteSettings?.email || siteSettings?.resumeFile) && (
          <div className="flex flex-wrap items-center gap-4">
            {siteSettings.email && (
              <a
                href={`mailto:${siteSettings.email}`}
                className="flex items-center gap-2.5 text-[14px] text-text-primary"
              >
                <Image src="/images/icons/email.svg" alt="" width={16} height={12} unoptimized />
                {siteSettings.email}
              </a>
            )}

            {siteSettings.email && siteSettings.resumeFile && (
              <Image
                src="/images/icons/dot-separator.svg"
                alt=""
                width={6}
                height={6}
                unoptimized
                aria-hidden
              />
            )}

            {siteSettings.resumeFile && (
              <a
                href={fileUrl(siteSettings.resumeFile)}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2.5 text-[14px] text-text-primary"
              >
                <Image src="/images/icons/download.svg" alt="" width={16} height={16} unoptimized />
                Download Resume
              </a>
            )}
          </div>
        )}
      </Reveal>
    </div>
  );
}
