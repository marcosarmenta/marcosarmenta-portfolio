import type { Metadata } from "next";
import { StarMark } from "@/components/ui/StarMark";

export const metadata: Metadata = {
  title: "Privacy Policy | Marcos Armenta",
  description: "How this site collects, uses, and protects your information.",
};

const LAST_UPDATED = "September 10, 2026";

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-h2 text-text-primary">{heading}</h2>
      <div className="flex max-w-2xl flex-col gap-3 text-body text-text-secondary">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-content">
        <div className="mb-12 flex flex-col gap-3">
          <p className="flex items-center gap-2 font-mono text-small uppercase tracking-wide text-text-secondary">
            <StarMark />
            Legal
          </p>
          <h1 className="text-h1 text-text-primary">Privacy Policy</h1>
          <p className="text-small text-text-secondary">Last updated {LAST_UPDATED}</p>
        </div>

        <div className="flex flex-col gap-10">
          <Section heading="Overview">
            <p>
              This site is my personal portfolio and business site. I use it to show my work and
              let potential clients book a call with me. This policy explains what information the
              site collects and how I use it.
            </p>
          </Section>

          <Section heading="Information I Collect">
            <p>
              This site does not have user accounts, forms, or checkout flows of its own. The only
              information collected happens when you book a call through the Cal.com scheduling
              widget on this site. That includes your name, email address, and any details you add
              about your project or meeting.
            </p>
          </Section>

          <Section heading="How I Use Your Information">
            <p>
              I use the information from a booking to schedule the call, prepare for it, and follow
              up with you about your project afterward. I don&apos;t sell your information or use it for
              advertising.
            </p>
          </Section>

          <Section heading="Third-Party Services">
            <p>This site relies on a few third-party services to run:</p>
            <ul className="flex flex-col gap-2 pl-5" style={{ listStyleType: "disc" }}>
              <li>
                <span className="font-medium text-text-primary">Vercel</span> hosts this site and
                serves its pages.
              </li>
              <li>
                <span className="font-medium text-text-primary">Sanity</span> stores the content
                shown on this site, like project case studies and site copy. It does not store
                visitor data.
              </li>
              <li>
                <span className="font-medium text-text-primary">Cal.com</span> powers the booking
                widget and processes the name, email, and meeting details you submit when you book
                a call. Cal.com has its own privacy policy that governs how it handles that data.
              </li>
            </ul>
          </Section>

          <Section heading="Cookies">
            <p>
              This site doesn&apos;t set its own cookies or use tracking or analytics scripts. The
              embedded Cal.com booking widget may set its own cookies to operate the scheduling
              interface. Those cookies are controlled by Cal.com, not by me.
            </p>
          </Section>

          <Section heading="Data Retention and Your Rights">
            <p>
              I keep booking information only as long as needed to schedule and follow up on your
              call. If you want me to access, correct, or delete information you&apos;ve shared with me,
              email me and I&apos;ll take care of it.
            </p>
          </Section>

          <Section heading="Changes to This Policy">
            <p>
              I may update this policy if what this site collects or how it works changes. The date
              at the top shows when it was last updated.
            </p>
          </Section>

          <Section heading="Contact">
            <p>
              Questions about this policy or your information? Email me at{" "}
              <a href="mailto:hi@marcosarmenta.com" className="text-text-primary underline transition-colors hover:text-accent">
                hi@marcosarmenta.com
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
