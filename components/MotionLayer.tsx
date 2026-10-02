"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { MOTION_CONFIG } from "@/lib/content";
import { isMobile, motion, prefersReducedMotion, updateSound } from "@/lib/motion";
import type { CubeLayer } from "@/lib/cube";

/**
 * Owns the single rAF loop: Lenis smooth scroll, portfolio parallax and the
 * WebGL cube (desktop only, lazy-loaded). Renders the cube canvas + grain overlay.
 */
export default function MotionLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    let dead = false;
    let raf = 0;
    let cube: CubeLayer | null = null;

    const lenis = reduced ? null : new Lenis({ lerp: MOTION_CONFIG.scrollLerp });
    motion.lenis = lenis;

    const parallax = createParallax(reduced);

    const tick = (t: number) => {
      if (dead) return;
      raf = requestAnimationFrame(tick);
      lenis?.raf(t);
      parallax();
      cube?.frame(lenis ? lenis.scroll : window.scrollY);
    };
    raf = requestAnimationFrame(tick);

    const canvas = canvasRef.current;
    if (canvas && !isMobile()) {
      import("@/lib/cube")
        .then(({ createCube }) => createCube(canvas, { reduced, onMotion: updateSound }))
        .then((layer) => {
          if (dead) layer?.dispose();
          else cube = layer;
        })
        .catch(() => {}); // no cube; Lenis + parallax keep running
    }

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      cube?.dispose();
      lenis?.destroy();
      motion.lenis = null;
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="cube-canvas" className="cube-canvas" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}

/* Two portfolio columns moving in opposite directions with velocity-linked skew/squash. */
function createParallax(reduced: boolean) {
  const sec = document.getElementById("portfolio");
  const a = document.getElementById("pcol-a");
  const b = document.getElementById("pcol-b");
  const s = { y: 0, vy: 0, sk: 0, vsk: 0, last: 0 };
  const mq = window.matchMedia("(max-width: 767px)");

  return () => {
    if (!sec || !a || !b || reduced) return;
    if (mq.matches) {
      a.style.transform = "";
      b.style.transform = "";
      return;
    }
    const r = sec.getBoundingClientRect();
    // 0 when section top hits viewport bottom, 1 when section bottom leaves the top
    const p = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
    const target = 200 - 400 * p;

    s.vy += (target - s.y) * 0.22;
    s.vy *= 0.62;
    s.y += s.vy;

    const vel = Math.max(-1, Math.min(1, (p - s.last) * 26));
    s.last = p;
    s.vsk += (vel - s.sk) * 0.34;
    s.vsk *= 0.52;
    s.sk += s.vsk;
    const sk = Math.max(-1, Math.min(1, s.sk));
    const sx = (1 + Math.abs(sk) * 0.0005).toFixed(4);
    const sy = (1 - Math.abs(sk) * 0.001).toFixed(4);

    a.style.transform = `translate3d(0,${s.y.toFixed(2)}px,0) skewY(${(sk * 0.1).toFixed(3)}deg) scale(${sx},${sy})`;
    b.style.transform = `translate3d(0,${(-s.y).toFixed(2)}px,0) skewY(${(-sk * 0.1).toFixed(3)}deg) scale(${sx},${sy})`;
  };
}
