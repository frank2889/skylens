import type { Metadata } from "next";
import { Space_Grotesk, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
