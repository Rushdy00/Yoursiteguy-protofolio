import type { Locale } from "@/lib/i18n";
import { fontClasses } from "@/app/fonts";

// Hide [data-rv] elements before first paint so reveals don't flash (skipped under reduced motion).
const revealBoot = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rv-on')`;

/** Root <html> for one language. Each language is its own root layout (route groups). */
export default function SiteLayout({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={fontClasses[locale]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
