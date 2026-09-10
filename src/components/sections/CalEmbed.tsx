"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

// Falls back to a direct email CTA if NEXT_PUBLIC_CAL_USERNAME is unset
// (e.g. running the repo locally without env config).
const CAL_USERNAME = process.env.NEXT_PUBLIC_CAL_USERNAME;
const CAL_LINK = CAL_USERNAME ? `${CAL_USERNAME}/intro-meeting-call` : undefined;

// Fixed (not min-) height so Cal's auto-resize can't grow the iframe past
// this. Tall enough to fit the month calendar plus a few time slots without
// clipping; the wrapper scrolls if content still exceeds it.
const EMBED_HEIGHT = "h-[680px]";

export function CalEmbed({ email, namespace = "default" }: { email?: string; namespace?: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!CAL_LINK) return;
    setLoaded(false);
    (async () => {
      const cal = await getCalApi({ namespace });
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#C10000" } },
        hideEventTypeDetails: true,
        layout: "month_view",
      });
      cal("on", {
        action: "linkReady",
        callback: () => setLoaded(true),
      });
    })();

    // Safety net: if the iframe never fires linkReady (slow network, missed
    // event), reveal it anyway after a few seconds instead of leaving the
    // skeleton stuck forever.
    const fallback = setTimeout(() => setLoaded(true), 4000);
    return () => clearTimeout(fallback);
  }, [namespace]);

  if (!CAL_LINK) {
    return (
      <div
        className={`flex w-full ${EMBED_HEIGHT} flex-col items-center justify-center gap-4 overflow-hidden px-8 text-center`}
      >
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
    <div className={`relative w-full ${EMBED_HEIGHT} overflow-y-auto overflow-x-hidden`}>
      {!loaded && (
        <div aria-hidden className="absolute inset-0 animate-pulse rounded-md bg-bg-canvas" />
      )}
      <Cal
        namespace={namespace}
        calLink={CAL_LINK}
        style={{ width: "100%", height: "100%" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
