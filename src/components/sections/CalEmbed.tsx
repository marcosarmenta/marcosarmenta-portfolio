"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

// Set NEXT_PUBLIC_CAL_USERNAME to activate the real embed. Left unset here
// since no Cal.com account has been connected yet — falls back to a direct
// email CTA instead of pointing at a placeholder booking link.
const CAL_USERNAME = process.env.NEXT_PUBLIC_CAL_USERNAME;
const CAL_LINK = CAL_USERNAME ? `${CAL_USERNAME}/intro-call` : undefined;

export function CalEmbed({ email }: { email?: string }) {
  useEffect(() => {
    if (!CAL_LINK) return;
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#C10000" } },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  if (!CAL_LINK) {
    return (
      <div className="flex flex-col items-center gap-4 px-8 py-16 text-center">
        <p className="max-w-md text-body text-text-secondary">
          Booking is coming soon. In the meantime, reach out directly.
        </p>
        {email && (
          <a
            href={`mailto:${email}`}
            className="rounded-lg bg-text-primary px-8 py-4 text-small font-medium text-bg-canvas transition-colors hover:bg-accent"
          >
            {email}
          </a>
        )}
      </div>
    );
  }

  return (
    <Cal
      calLink={CAL_LINK}
      style={{ width: "100%", height: "100%", minHeight: "600px" }}
      config={{ layout: "month_view" }}
    />
  );
}
