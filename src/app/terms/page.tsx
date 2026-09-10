import type { Metadata } from "next";
import { StarMark } from "@/components/ui/StarMark";

export const metadata: Metadata = {
  title: "Terms of Use | Marcos Armenta",
  description: "The terms that govern your use of this site.",
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

export default function TermsOfUsePage() {
  return (
    <div className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-content">
        <div className="mb-12 flex flex-col gap-3">
          <p className="flex items-center gap-2 font-mono text-small uppercase tracking-wide text-text-secondary">
            <StarMark />
            Legal
          </p>
          <h1 className="text-h1 text-text-primary">Terms of Use</h1>
          <p className="text-small text-text-secondary">Last updated {LAST_UPDATED}</p>
        </div>

        <div className="flex flex-col gap-10">
          <Section heading="Overview">
            <p>
              This site is my personal portfolio and business site. By using it, you agree to
              these terms. If you don&apos;t agree, please don&apos;t use the site.
            </p>
          </Section>

          <Section heading="Use of This Site">
            <p>
              This site is for informational purposes. It shows my work, my services, and how to
              get in touch with me. There&apos;s no e-commerce, no checkout, and no user accounts here.
            </p>
          </Section>

          <Section heading="Booking a Call">
            <p>
              You can book a call with me through the Cal.com widget on this site. Booking a call
              is a request for a conversation, not a binding contract for services. Any actual
              project work is agreed to separately, directly between you and me.
            </p>
          </Section>

          <Section heading="Project Work Shown on This Site">
            <p>
              The case studies on this site show work I did for past clients. That work belongs to
              those clients. Nothing on this site transfers ownership or grants you a license to
              use it.
            </p>
          </Section>

          <Section heading="Intellectual Property">
            <p>
              The design, layout, and written content of this site belong to me. Please don&apos;t
              copy or reuse them without asking first.
            </p>
          </Section>

          <Section heading="Third-Party Links">
            <p>
              Some case studies link to live client websites. I don&apos;t control those sites and
              I&apos;m not responsible for their content.
            </p>
          </Section>

          <Section heading="No Warranty">
            <p>
              This site is provided as is. I don&apos;t guarantee it will always be available or free
              of errors.
            </p>
          </Section>

          <Section heading="Changes to These Terms">
            <p>
              I may update these terms as this site changes. The date at the top shows when they
              were last updated.
            </p>
          </Section>

          <Section heading="Contact">
            <p>
              Questions about these terms? Email me at{" "}
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
