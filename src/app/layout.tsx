import type { Metadata } from "next";
import { publicSans, jetbrainsMono } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marcos Armenta",
  description: "Designer-who-codes portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
