import { getSiteSettings } from "@/lib/sanity";
import { Reveal } from "@/components/motion/Reveal";
import { SectionFadeMask } from "@/components/layout/SectionFadeMask";
import { FAQAccordionList } from "./FAQAccordionList";

export async function FAQAccordion() {
  const siteSettings = await getSiteSettings();
  const faq = siteSettings?.faq ?? [];

  return (
    <section id="faq" className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-content">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-12 flex flex-col gap-3">
            <p className="font-mono text-small uppercase tracking-wide text-text-secondary">
              FAQ
            </p>
            <h2 className="text-h1 text-text-primary">Frequently Asked Questions</h2>
          </Reveal>

          {faq.length > 0 ? (
            <FAQAccordionList items={faq} />
          ) : (
            <p className="text-body text-text-secondary">FAQ coming soon.</p>
          )}
        </div>
      </div>
      <SectionFadeMask />
    </section>
  );
}
