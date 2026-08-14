import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { getSiteSettings, fileUrl } from "@/lib/sanity";
import { Reveal } from "@/components/motion/Reveal";

const bioComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="max-w-xl text-[18px] leading-[27px] tracking-[-0.54px] text-text-secondary">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
  },
};

export async function AboutSection() {
  const siteSettings = await getSiteSettings();

  return (
    <div id="about" className="rounded-xl bg-bg-surface pb-6 pl-6 pr-6 sm:pl-12">
      <Reveal className="flex flex-col items-start gap-7 py-11">
        <p className="text-body text-text-secondary">About Myself</p>

        {siteSettings?.bio && siteSettings.bio.length > 0 ? (
          <PortableText value={siteSettings.bio} components={bioComponents} />
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
                <Image src="/images/icons/email.svg" alt="" width={16} height={12} />
                {siteSettings.email}
              </a>
            )}

            {siteSettings.email && siteSettings.resumeFile && (
              <Image
                src="/images/icons/dot-separator.svg"
                alt=""
                width={6}
                height={6}
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
                <Image src="/images/icons/download.svg" alt="" width={16} height={16} />
                Download Resume
              </a>
            )}
          </div>
        )}
      </Reveal>
    </div>
  );
}
