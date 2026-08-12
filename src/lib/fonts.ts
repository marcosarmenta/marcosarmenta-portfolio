import { Public_Sans, JetBrains_Mono } from "next/font/google";

// Headings, buttons, nav/menu.
export const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

// Body copy and labels (meta, dates, tags, form fields).
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
