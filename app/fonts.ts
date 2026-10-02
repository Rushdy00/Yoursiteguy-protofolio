import { Amiri, Cairo, DM_Sans, IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Instrument_Serif, Manrope } from "next/font/google";

// Font stacks in globals.css name these families directly (Latin face first, Arabic second).

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700", "800"], variable: "--font-manrope" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-sans" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: "500", variable: "--font-plex-mono" });

const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700", "800"], variable: "--font-cairo" });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-plex-arabic" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri" });

const latin = [manrope, dmSans, instrumentSerif, plexMono];
const arabic = [cairo, plexArabic, amiri];

export const fontClasses = {
  en: latin.map((f) => f.variable).join(" "),
  ar: [...latin, ...arabic].map((f) => f.variable).join(" "),
};
