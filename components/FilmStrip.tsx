"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, prefersReducedMotion } from "@/lib/motion";
import type { FilmGL } from "@/lib/film";

export type FilmItem = { name: string; url: string; src: string; alt: string; tags: string[] };
export type FilmText = {
  title: string;
  filterLabel: string;
  filters: { key: string; label: string }[]; // first one ("all") matches everything
  tagLabels: Record<string, string>;
  arrow: string;
};

/** Spacing between neighbouring cards on the path, and how far past the last card the scroll runs. */
const SPACING = 0.5;
const TAIL = 0.35;
/** Viewport heights of scroll per unit of path travel (≈460vh for 7 cards). */
const VH_PER_UNIT = 107;

/** Section height for n cards; also used to place a card on focus. */
const travelFor = (n: number) => Math.max(0, n - 1) * SPACING + TAIL;

// Path keyframes at u = -0.5, 0, 0.5, 1, 1.5, 2: [x, y] as stage fractions (card centre), s = scale.
// u = 0 back (top-right, small), 0.5 middle (under the heading), 1 front (lower-left), then off-screen.
const PATH_DESKTOP = [
  [1.1, 0.02, 0.44],
  [0.875, 0.2, 0.58],
  [0.53, 0.43, 0.95],
  [0.17, 0.63, 1.0],
  [-0.22, 0.85, 1.05],
  [-0.62, 1.06, 1.1],
];
const PATH_MOBILE = [
  [1.0, -0.02, 0.45],
  [0.88, 0.285, 0.6],
  [0.5, 0.5, 0.95],
  [0.42, 0.86, 1.0],
  [0.32, 1.25, 1.05],
  [0.2, 1.6, 1.1],
];

/** Catmull-Rom through the keyframes (knots every 0.5 from u = -0.5). */
function pathAt(u: number, keys: number[][]) {
  const f = Math.min(keys.length - 1, Math.max(0, (u + 0.5) / 0.5));
  const i = Math.min(keys.length - 2, Math.floor(f));
  const t = f - i;
  const p0 = keys[Math.max(0, i - 1)];
  const p1 = keys[i];
  const p2 = keys[i + 1];
  const p3 = keys[Math.min(keys.length - 1, i + 2)];
  const t2 = t * t;
  const t3 = t2 * t;
  return p1.map(
    (_, k) =>
      0.5 *
      (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3),
  );
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const matches = (item: FilmItem, filter: string, allKey: string) => filter === allKey || item.tags.includes(filter);

export default function FilmStrip({ items, t, id }: { items: FilmItem[]; t: FilmText; id?: string }) {
  const allKey = t.filters[0]?.key ?? "all";
  const [filter, setFilter] = useState(allKey);
  const filterRef = useRef(filter);
  filterRef.current = filter;

  const secRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const hoverRef = useRef<number[]>(items.map(() => 1));

  const counts = useMemo(
    () => Object.fromEntries(t.filters.map((f) => [f.key, items.filter((it) => matches(it, f.key, allKey)).length])),
    [items, t.filters, allKey],
  );

  useEffect(() => {
    if (prefersReducedMotion()) return; // CSS shows the static grid
    const sec = secRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!sec || !stage || !canvas) return;
    const cards = cardRefs.current;
    const imgs = imgRefs.current;

    let dead = false;
    let raf = 0;
    let inView = true;
    let gl: FilmGL | null = null;
    let W = stage.clientWidth;
    let H = stage.clientHeight;
    let cw = 0;
    let pS = -1;
    let last = 0;
    let vel = 0;
    const st = items.map((_, i) => ({ slot: i, fa: 1, hover: 1 }));
    const t0 = performance.now();
    let prevT = t0;

    const ro = new ResizeObserver(() => {
      W = stage.clientWidth;
      H = stage.clientHeight;
      gl?.resize(W, H);
    });
    ro.observe(stage);

    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), { rootMargin: "100px 0px" });
    io.observe(sec);

    import("@/lib/film")
      .then(({ createFilmGL }) => {
        if (dead) return;
        gl = createFilmGL(
          canvas,
          items.map((it) => it.src),
          (i) => cards[i]?.classList.add("is-gl"),
        );
        gl?.resize(W, H);
      })
      .catch(() => {}); // no WebGL: DOM images stay visible and still follow the path

    const tick = () => {
      if (dead) return;
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      const fr = Math.min(6, Math.max(0.25, ((now - prevT) / 1000) * 60)); // frames at 60fps
      prevT = now;
      const ease = (k: number) => 1 - Math.pow(1 - k, fr);
      if (!inView) return;

      const r = sec.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - H)));
      if (pS < 0) pS = last = p; // first frame: no fly-in from 0 on restored scroll
      pS += (p - pS) * ease(0.09);

      const filt = filterRef.current;
      const vis: number[] = [];
      items.forEach((it, i) => matches(it, filt, allKey) && vis.push(i));
      const travel = travelFor(vis.length);
      const tt = 0.5 + pS * travel;
      const dv = (pS - last) * travel;
      last = pS;
      vel += (Math.max(-1, Math.min(1, (dv * 22) / fr)) - vel) * ease(0.12);

      const mobile = W < 768;
      const keys = mobile ? PATH_MOBILE : PATH_DESKTOP;
      const nextCw = Math.round(mobile ? W * 0.8 : Math.min(W * 0.37, 396 * Math.max(1, W / 1440)));
      if (nextCw !== cw) {
        cw = nextCw;
        stage.style.setProperty("--cw", `${cw}px`);
      }
      const ch = cw * (285 / 396);

      const us: number[] = [];
      const alphas: number[] = [];
      cards.forEach((el, i) => {
        if (!el) return;
        const s = st[i];
        const k = vis.indexOf(i);
        if (k >= 0) s.slot += (k - s.slot) * ease(0.08);
        s.fa += ((k >= 0 ? 1 : 0) - s.fa) * ease(0.1);
        s.hover += (hoverRef.current[i] - s.hover) * ease(0.15);

        const u = tt - s.slot * SPACING;
        const [x, y, sc0] = pathAt(u, keys);
        const sc = sc0 * s.hover;
        const alpha = s.fa * smoothstep(-0.5, -0.22, u) * (1 - smoothstep(1.6, 1.95, u));
        us[i] = u;
        alphas[i] = alpha;

        el.style.transform = `translate3d(${(x * W - (cw * sc) / 2).toFixed(2)}px,${(y * H - (ch * sc) / 2).toFixed(2)}px,0) scale(${sc.toFixed(4)})`;
        el.style.opacity = alpha.toFixed(3);
        el.style.zIndex = String(500 + Math.round(u * 100));
        // Filtered-out cards leave the tab order; off-path cards stay focusable (focus scrolls them in).
        el.style.visibility = s.fa < 0.02 ? "hidden" : "";
        el.style.pointerEvents = alpha < 0.3 ? "none" : "";
        el.classList.toggle("is-center", alpha > 0.5 && Math.abs(u - 0.5) < 0.17);
      });

      if (gl) {
        const sr = stage.getBoundingClientRect();
        const frames = imgs.map((img, i) => {
          const b = img ? img.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 };
          return { x: b.left - sr.left, y: b.top - sr.top, w: b.width, h: b.height, u: us[i] ?? -9, alpha: alphas[i] ?? 0 };
        });
        gl.frame({ cards: frames, vel, progress: pS, time: (now - t0) / 1000 });
      }
    };
    raf = requestAnimationFrame(tick);

    // Keyboard focus on a card that is off the path: scroll until it sits in the middle slot.
    const onFocus = (e: FocusEvent) => {
      const i = cards.indexOf(e.target as HTMLAnchorElement);
      if (i < 0) return;
      const vis = items.map((it, j) => (matches(it, filterRef.current, allKey) ? j : -1)).filter((j) => j >= 0);
      const k = vis.indexOf(i);
      if (k < 0) return;
      const top = sec.getBoundingClientRect().top + window.scrollY;
      const y = top + ((k * SPACING) / travelFor(vis.length)) * (sec.offsetHeight - H);
      if (motion.lenis) motion.lenis.scrollTo(y, { duration: 0.9 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    };
    sec.addEventListener("focusin", onFocus);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      sec.removeEventListener("focusin", onFocus);
      gl?.dispose();
    };
  }, [items, allKey]);

  const hover = (i: number, on: boolean) => () => (hoverRef.current[i] = on ? 1.02 : 1);
  const style = { "--film-h": `calc(100vh + ${(travelFor(items.length) * VH_PER_UNIT).toFixed(1)}vh)` } as React.CSSProperties;

  return (
    <section ref={secRef} id={id} className="film" style={style}>
      <div ref={stageRef} className="film-stage">
        <canvas ref={canvasRef} className="film-canvas" aria-hidden="true" />
        <div className="film-head">
          <h2>{t.title}</h2>
          <div className="film-pills" role="group" aria-label={t.filterLabel}>
            {t.filters.map((f) => (
              <button
                key={f.key}
                type="button"
                className="film-pill"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
                <sup>{counts[f.key]}</sup>
              </button>
            ))}
          </div>
        </div>
        <div className="film-col">
          {items.map((it, i) => (
            <a
              key={it.url}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="film-card"
              data-out={matches(it, filter, allKey) ? undefined : ""}
              onPointerEnter={hover(i, true)}
              onPointerLeave={hover(i, false)}
              onFocus={hover(i, true)}
              onBlur={hover(i, false)}
            >
              <span className="film-media">
                <img
                  ref={(el) => {
                    imgRefs.current[i] = el;
                  }}
                  src={it.src}
                  alt={it.alt}
                  decoding="async"
                />
              </span>
              <span className="film-cap">
                <span>
                  <span className="film-cap-name" lang="en">
                    {it.name}
                  </span>
                  <span className="film-cap-tags">{it.tags.map((k) => t.tagLabels[k] ?? k).join(", ")}</span>
                </span>
                <span className="film-arrow" aria-hidden="true">
                  {t.arrow}
                </span>
              </span>
            </a>
          ))}
        </div>
        <div className="film-grain" aria-hidden="true" />
      </div>
    </section>
  );
}
