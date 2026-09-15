import type { Metadata } from "next";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import { StarMark } from "@/components/ui/StarMark";
import { CalEmbed } from "@/components/sections/CalEmbed";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Contact | Marcos Armenta",
  description: "Send a message, or find me on socials.",
};

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/djcosthekid", Icon: InstagramLogoIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/marcosarmenta", Icon: LinkedinLogoIcon },
] as const;

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();

  return (
    <div className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-content">
        <div className="flex flex-col gap-10 sm:flex-row sm:gap-11">
          <div className="flex w-full flex-col gap-3 sm:w-[280px] sm:shrink-0 sm:sticky sm:top-32 sm:self-start">
            <p className="flex items-center gap-2 font-mono text-small uppercase tracking-wide text-text-secondary">
              <StarMark />
              Get in Touch
            </p>
            <h1 className="text-h1 text-text-primary">Contact</h1>
            <p className="text-body text-text-secondary">
              I&apos;m always open to new opportunities, collaborations, and creative
              conversations.
            </p>

            {siteSettings?.email && (
              <a
                href={`mailto:${siteSettings.email}`}
                className="text-body text-text-primary underline hover:text-accent"
              >
                {siteSettings.email}
              </a>
            )}

            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle text-text-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col gap-6">
            <div className="rounded-lg border border-border-subtle bg-bg-surface p-6">
              <ContactForm />
            </div>

            <div className="rounded-lg border border-border-subtle bg-bg-surface p-6">
              <h2 className="mb-4 text-body-lg text-text-primary">
                Would you rather book some time to discuss your inquiry?
              </h2>
              <CalEmbed email={siteSettings?.email} namespace="contact-page" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
