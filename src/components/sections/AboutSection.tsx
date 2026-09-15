import Image from "next/image";
import Link from "next/link";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { getSiteSettings, fileUrl } from "@/lib/sanity";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollColorText } from "@/components/sections/ScrollColorText";
import { bioToRuns } from "@/lib/bio";
import { StarMark } from "@/components/ui/StarMark";

export async function AboutSection() {
  const siteSettings = await getSiteSettings();

  return (
    <div id="about" className="w-full rounded-xl bg-bg-surface pb-6 pl-6 pr-6 sm:pl-12">
      <Reveal className="flex flex-col items-start gap-7 py-11">
        <div className="flex w-full items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-body text-text-secondary">
            <StarMark />
            About Myself
          </p>
          <Link
            href="/about"
            className="group flex shrink-0 items-center gap-1 font-mono text-[12px] uppercase tracking-wide text-text-secondary transition-colors hover:text-accent"
          >
            Learn More
            <ArrowUpRightIcon
              size={12}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

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

            {siteSettings.email && siteSettings.resumeFile && <StarMark size={10} />}

            {siteSettings.resumeFile && (
              <a
                href={fileUrl(siteSettings.resumeFile)}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2.5 text-[14px] text-text-primary"
              >
                <DownloadSimpleIcon size={16} />
                Download Resume
              </a>
            )}
          </div>
        )}
      </Reveal>
    </div>
  );
}
