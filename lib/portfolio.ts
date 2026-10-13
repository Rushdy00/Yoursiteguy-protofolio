import fs from "node:fs";
import path from "node:path";
import list from "./portfolio.json";

// Portfolio cards come from lib/portfolio.json — just add { "name", "url" }.
// Screenshots are captured automatically by scripts/screenshots.mjs
// (run locally with `npm run shots`, or by the GitHub Action on push / weekly).
// Optional "image": "file.png" (in public/img) overrides the screenshot.
// Optional "conversion": "3.4%" shows the site's conversion rate on its Receipts slide
// ("lift": "↗ 40%" adds the green change next to it). TODO: the current values are PLACEHOLDERS, not measured —
// replace them with each store's real figure.

export type PortfolioItem = { name: string; url: string; image?: string; conversion?: string; lift?: string };

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

/**
 * Before/after-launch trend for the Receipts chart, ending on the site's conversion rate.
 * Illustrative: shaped from "conversion" and "lift" (no per-week data yet) with a fixed per-site wobble.
 */
export function conversionSeries(item: PortfolioItem, n = 12, launch = 3) {
  const after = parseFloat(item.conversion ?? "");
  if (!Number.isFinite(after)) return undefined;
  const lift = parseFloat((item.lift ?? "").replace(/[^\d.]/g, "")) || 0;
  const before = after / (1 + lift / 100);
  let seed = [...item.url].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32 - 0.5;
  const series = Array.from({ length: n }, (_, i) => {
    if (i === n - 1) return after;
    if (i <= launch) return before * (1 + rnd() * 0.06);
    const p = (i - launch) / (n - 1 - launch);
    return (before + (after - before) * (1 - (1 - p) ** 2)) * (1 + rnd() * 0.05);
  });
  return { series: series.map((v) => Math.round(v * 100) / 100), launch };
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
