import type { Metadata } from "next";
import { dictionaries, type Locale } from "@/lib/i18n";

export function siteMetadata(locale: Locale): Metadata {
  const { title, description } = dictionaries[locale].meta;
  const url = locale === "ar" ? "/ar/" : "/";
  const image = {
    url: "/img/yoursiteguycreative-share.png",
    width: 1200,
    height: 630,
    alt: "yoursiteguy Creative",
  };

  return {
    metadataBase: new URL("https://yoursiteguy.live"),
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "yoursiteguy Creative",
      title,
      description,
      url,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
