import type { Metadata, Viewport } from "next";
import { Amiri, Cairo, DM_Sans, IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700", "800"], variable: "--font-manrope", adjustFontFallback: false });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-sans", adjustFontFallback: false });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  adjustFontFallback: false,
});
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: "500", variable: "--font-plex-mono", adjustFontFallback: false });

// Arabic companions (used for Arabic glyphs only — the Latin faces come first in each stack).
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700", "800"], variable: "--font-cairo" });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-plex-arabic" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri" });

export const metadata: Metadata = {
  title: "yoursiteguy Creative — مواقع مخصّصة فاخرة للعلامات الاستهلاكية",
  description:
    "مواقع مصمَّمة للتحويل وحلول تقنية متكاملة لمتاجر التجارة الإلكترونية — المتاجر، والتكاملات، والأتمتة، والتحليلات. جاهز خلال 12 يومًا، أو لا تدفع شيئًا.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

// Hide [data-rv] elements before first paint so reveals don't flash (skipped under reduced motion).
const revealBoot = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rv-on')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${manrope.variable} ${dmSans.variable} ${instrumentSerif.variable} ${plexMono.variable} ${cairo.variable} ${plexArabic.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
