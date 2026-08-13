"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

export function LiveClock() {
  // Starts null so server and first client render match; fills in after mount.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatter.format(new Date()));
    const id = setInterval(() => {
      setTime(formatter.format(new Date()));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-small text-text-secondary">
      <span className="relative flex h-1.5 w-1.5" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span>San Diego</span>
      <span className="tabular-nums" suppressHydrationWarning>
        {time ?? "--:--:--"}
      </span>
    </div>
  );
}
