import type { Metadata, Viewport } from "next";
import SiteLayout from "@/components/SiteLayout";
import { siteMetadata } from "@/lib/metadata";
import "@/app/globals.css";

export const metadata: Metadata = { ...siteMetadata("ar"), alternates: { languages: { en: "/" } } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="ar">{children}</SiteLayout>;
}
