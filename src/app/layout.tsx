import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { publicSans, jetbrainsMono } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { StickyNav } from "@/components/nav/StickyNav";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/sanity";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marcos Armenta",
  description: "Designer-who-codes portfolio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <MotionConfig reducedMotion="user">
          <SmoothScrollProvider>
            <StickyNav socialLinks={siteSettings?.socialLinks} />
            <main className="pt-32">{children}</main>
            <Footer siteSettings={siteSettings} />
          </SmoothScrollProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
