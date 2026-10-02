import type { Metadata, Viewport } from "next";
import { DM_Sans, IBM_Plex_Mono, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700", "800"], variable: "--font-manrope" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-sans" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: "500", variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "yoursiteguy Creative — Premium custom websites for consumer brands",
  description:
    "Conversion-focused websites and end-to-end tech for ecommerce brands — storefronts, integrations, automations and analytics. Live in 12 days, or you don't pay.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

// Hide [data-rv] elements before first paint so reveals don't flash (skipped under reduced motion).
const revealBoot = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rv-on')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSans.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
