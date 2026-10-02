// Captures a 4:3 screenshot of every site in lib/portfolio.json into public/shots/.
//
//   npm run shots              re-capture every site (keeps them current)
//   npm run shots -- --missing only capture sites that have no screenshot yet
//
// Uses an installed Chrome/Edge; set CHROME_PATH to point at a different browser.

import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "shots");
const list = JSON.parse(fs.readFileSync(path.join(root, "lib", "portfolio.json"), "utf8"));
const onlyMissing = process.argv.includes("--missing");

// Keep in sync with shotName() in lib/portfolio.ts.
function shotName(url) {
  const u = new URL(url);
  const slug = (u.hostname.replace(/^www\./, "") + u.pathname)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug}.jpg`;
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ];
  const found = candidates.find((p) => p && fs.existsSync(p));
  if (!found) throw new Error("No Chrome/Edge found. Set CHROME_PATH to your browser executable.");
  return found;
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function capture(browser, item, file) {
  const page = await browser.newPage();
  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    );
    await page.setViewport({ width: 1440, height: 1080 });
    await page.goto(item.url, { waitUntil: "networkidle2", timeout: 60000 }).catch(() => {});
    await wait(3000); // let hero animations / lazy images settle
    // Best effort at removing newsletter / cookie popups: hide any fixed overlay or
    // open modal that covers a large part of the viewport (headers are too small to match).
    await page.keyboard.press("Escape").catch(() => {});
    await page
      .evaluate(() => {
        const vw = innerWidth, vh = innerHeight;
        for (const el of document.querySelectorAll("body *")) {
          const cs = getComputedStyle(el);
          if (cs.position !== "fixed" || cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) continue;
          const r = el.getBoundingClientRect();
          const w = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
          const h = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
          if (w * h > vw * vh * 0.2 || (h > vh * 0.15 && r.bottom >= vh - 2 && w > vw * 0.8)) el.style.setProperty("display", "none", "important");
        }
        document.documentElement.style.setProperty("overflow", "auto", "important");
        document.body.style.setProperty("overflow", "auto", "important");
      })
      .catch(() => {});
    await wait(800);
    await page.screenshot({ path: file, type: "jpeg", quality: 80 });
    return true;
  } finally {
    await page.close();
  }
}

fs.mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: findChrome(), args: ["--no-sandbox", "--hide-scrollbars"] });
let failed = 0;
for (const item of list) {
  if (item.image) continue; // manual image override
  const file = path.join(outDir, shotName(item.url));
  if (onlyMissing && fs.existsSync(file)) continue;
  try {
    await capture(browser, item, file);
    console.log(`✓ ${item.name} → public/shots/${path.basename(file)}`);
  } catch (e) {
    failed++;
    console.warn(`✗ ${item.name} (${item.url}): ${e.message}`);
  }
}
await browser.close();

// Remove screenshots of sites no longer in the list.
const wanted = new Set(list.map((i) => shotName(i.url)));
for (const f of fs.readdirSync(outDir)) {
  if (f.endsWith(".jpg") && !wanted.has(f)) {
    fs.unlinkSync(path.join(outDir, f));
    console.log(`- removed ${f}`);
  }
}
if (failed) console.warn(`${failed} site(s) failed; their cards fall back to the live screenshot service.`);
