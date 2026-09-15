import type { Metadata } from "next";
import { StarMark } from "@/components/ui/StarMark";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
  title: "Start a Project | Marcos Armenta",
  description: "Tell me about your project and I'll get back to you within a day or two.",
};

const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL;

export default function StartAProjectPage() {
  return (
    <div className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-content">
        <div className="flex flex-col gap-10 sm:flex-row sm:gap-11">
          <div className="flex w-full flex-col gap-3 sm:w-[280px] sm:shrink-0 sm:sticky sm:top-32 sm:self-start">
            <p className="flex items-center gap-2 font-mono text-small uppercase tracking-wide text-text-secondary">
              <StarMark />
              Let&apos;s work together
            </p>
            <h1 className="text-h1 text-text-primary">Start a Project</h1>
            <p className="text-body text-text-secondary">
              Tell me a bit about what you&apos;re building and I&apos;ll reply within a day or
              two with next steps.
            </p>
            {CAL_URL && (
              <p className="text-body text-text-secondary">
                Prefer to talk first?{" "}
                <a href={CAL_URL} className="text-text-primary underline hover:text-accent">
                  Book a time
                </a>
                .
              </p>
            )}
          </div>

          <div className="w-full flex-1 rounded-lg border border-border-subtle bg-bg-surface p-6">
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
