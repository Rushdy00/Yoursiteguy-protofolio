import type { Metadata, Viewport } from "next";
import SiteLayout from "@/components/SiteLayout";
import { dictionaries } from "@/lib/i18n";
import "@/app/globals.css";

const t = dictionaries.en;

export const metadata: Metadata = {
  ...t.meta,
  alternates: { languages: { ar: "/ar/" } },
  // Meta (Facebook) Business domain verification for yoursiteguy.live — keep this tag.
  verification: { other: { "facebook-domain-verification": "d9mdus5kk5bof84x10qu40kwq1x5kl" } },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
