import type { Config } from "tailwindcss";

// Spacing scale (locked): 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 — no arbitrary values.
// These already line up exactly with Tailwind's default numeric keys:
// 1=4px 2=8px 3=12px 4=16px 6=24px 8=32px 12=48px 16=64px 24=96px 32=128px

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-canvas": "#F4F5F6",
        "bg-surface": "#FFFFFF",
        "text-primary": "#161616",
        "text-secondary": "#6B7280",
        "border-subtle": "#E5E7EB",
        accent: "#C10000",
      },
      fontFamily: {
        sans: ["var(--font-public-sans)"],
        mono: ["var(--font-jetbrains-mono)"],
      },
      fontSize: {
        display: ["56px", { lineHeight: "1.05", fontWeight: "500" }],
        h1: ["40px", { lineHeight: "1.1", fontWeight: "500" }],
        h2: ["28px", { lineHeight: "1.2", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "1.5", fontWeight: "400" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["14px", { lineHeight: "1.4", fontWeight: "400" }],
        stat: ["40px", { lineHeight: "1", fontWeight: "500" }],
      },
      borderRadius: {
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "22px",
      },
      maxWidth: {
        content: "760px",
      },
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
