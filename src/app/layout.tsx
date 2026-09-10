import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { publicSans, jetbrainsMono } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { StickyNav } from "@/components/nav/StickyNav";
import { Footer } from "@/components/layout/Footer";
import { SectionFadeMask } from "@/components/layout/SectionFadeMask";
import { BookingModalProvider } from "@/components/booking/BookingModalProvider";
import { BookingModal } from "@/components/booking/BookingModal";
import { getSiteSettings } from "@/lib/sanity";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marcos Armenta",
  description: "Designer-who-codes portfolio.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple_touch_icon.png",
  },
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
          <BookingModalProvider>
            <SmoothScrollProvider>
              <StickyNav />
              <main className="flex flex-col gap-4 px-6 pt-6 md:px-8">{children}</main>
              <Footer siteSettings={siteSettings} />
              <SectionFadeMask />
            </SmoothScrollProvider>
            <BookingModal email={siteSettings?.email} />
          </BookingModalProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
