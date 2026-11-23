"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { MOTION_CONFIG } from "@/lib/content";
import { isMobile, motion, prefersReducedMotion, updateSound } from "@/lib/motion";
import type { CubeLayer } from "@/lib/cube";

/**
 * Owns the main rAF loop: Lenis smooth scroll and the
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

    const tick = (t: number) => {
      if (dead) return;
      raf = requestAnimationFrame(tick);
      lenis?.raf(t);
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
        .catch(() => {}); // no cube; Lenis keeps running
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
