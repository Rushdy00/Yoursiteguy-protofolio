# Yoursiteguy-protofolio

Next.js (App Router) + TypeScript, `three` for the steel cube, `lenis` for smooth scroll.
Built from `../design_handoff_yoursiteguy_site` (README there is the full spec).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
npm start        # serve out/ locally
```

`out/` is plain static files — deploy to any static host (Vercel, Netlify, Cloudflare Pages, S3…).

## Languages

English is served at `/`, Arabic (right-to-left) at `/ar/`; the pill in the header switches between them.
All wording for both languages is in `lib/i18n.ts` — edit the `en` and `ar` objects side by side.
Layout CSS uses logical properties (`inset-inline-*`, `padding-inline-*`) so it mirrors automatically.

## Adding a portfolio site

Add one line to `lib/portfolio.json` and push — that's it:

```json
{ "name": "New Client", "url": "https://newclient.com/" }
```

The **Portfolio screenshots** GitHub Action captures the site and commits the image to
`public/shots/`. It also re-captures every site weekly (Mondays) so the images stay current,
and can be run any time from the repo's *Actions* tab. Until a screenshot exists, the card
loads a live one from microlink.io.

- Capture locally instead: `npm run shots` (all) or `npm run shots -- --missing` (new only).
- Use your own image: add `"image": "file.png"` (placed in `public/img/`) to the entry.

## Where things live

| Path | What |
|---|---|
| `lib/portfolio.json` | Portfolio sites (name + url) |
| `lib/i18n.ts` | All page wording, English + Arabic |
| `lib/content.ts` | Shared data: links, prices, testimonial numbers/testimonial/FAQ data, cube tunables (`MOTION_CONFIG`) |
| `app/globals.css` | Design tokens (`:root`) and all styles |
| `app/(en)`, `app/(ar)/ar` | The two pages; each sets `<html lang dir>` via `components/SiteLayout.tsx` |
| `components/sections/*` | One file per page section (server components) |
| `components/MotionLayer.tsx` | Single rAF loop: Lenis, portfolio parallax, cube canvas + grain |
| `lib/cube.ts` | Three.js cube (lazy-loaded, desktop ≥768px with WebGL only) |
| `lib/motion.ts` | Shared Lenis handle + scroll "whoosh" audio |
| `components/Reveals.tsx` | `[data-rv]` scroll reveals |
| `components/Header.tsx` | Header + full-screen menu (focus trap, Esc, scroll lock) |
| `components/Interactive.tsx` | Carousel, FAQ accordion, pricing switches, clocks |

## Still placeholder (per handoff)

- `APPLY_HREF` is a `mailto:` — swap for the real form / Calendly link in `lib/content.ts`.
- `INSTAGRAM_HREF` is generic.
- Images `mock-01…08.png`, `laptop.png`; trust-grid names; testimonials.
- Eyebrow numbering (Portfolio 002 before Pricing 001) and "we" vs "I" voice — confirm with client.
