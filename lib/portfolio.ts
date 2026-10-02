import fs from "node:fs";
import path from "node:path";
import list from "./portfolio.json";

// Portfolio cards come from lib/portfolio.json — just add { "name", "url" }.
// Screenshots are captured automatically by scripts/screenshots.mjs
// (run locally with `npm run shots`, or by the GitHub Action on push / weekly).
// Optional "image": "file.png" (in public/img) overrides the screenshot.

export type PortfolioItem = { name: string; url: string; image?: string };

export const PORTFOLIO: PortfolioItem[] = list;

/** File name for a site's screenshot. Keep in sync with scripts/screenshots.mjs. */
export function shotName(url: string) {
  const u = new URL(url);
  const slug = (u.hostname.replace(/^www\./, "") + u.pathname)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug}.jpg`;
}

/** Resolved at build time: manual image → captured screenshot → live screenshot service. */
export function imageFor(item: PortfolioItem) {
  if (item.image) return `/img/${item.image}`;
  const file = shotName(item.url);
  if (fs.existsSync(path.join(process.cwd(), "public", "shots", file))) return `/shots/${file}`;
  return (
    "https://api.microlink.io/?screenshot=true&meta=false&embed=screenshot.url" +
    "&viewport.width=1440&viewport.height=1080&url=" +
    encodeURIComponent(item.url)
  );
}
