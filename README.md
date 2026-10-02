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

## Where things live

| Path | What |
|---|---|
| `lib/content.ts` | All copy, links, portfolio/pricing/testimonial/FAQ data, cube tunables (`MOTION_CONFIG`) |
| `app/globals.css` | Design tokens (`:root`) and all styles |
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
- Portfolio screenshots are 1–2 MB PNGs; convert to WebP/AVIF before launch.
