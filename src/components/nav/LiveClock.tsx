"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "2-digit",
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
    <div className="flex items-center gap-2 whitespace-nowrap text-[12px]">
      <span className="tabular-nums font-semibold text-text-primary" suppressHydrationWarning>
        {time ?? "--:--:--"}
      </span>
      <span className="text-text-secondary">San Diego, CA</span>
    </div>
  );
}
