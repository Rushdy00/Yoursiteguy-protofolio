"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Curtain footer: the footer is pinned behind the page and uncovered as <main> scrolls
 * away, sharpening from a blur as more of it shows. Falls back to a normal footer when
 * it is taller than the viewport (it could never be fully seen while pinned).
 */
export default function FooterReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector<HTMLElement>("main");
    const footer = document.querySelector<HTMLElement>(".footer");
    if (!main || !footer) return;
    const reduced = prefersReducedMotion();
    let on = false;
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!on) return;
      const h = footer.offsetHeight;
      const p = Math.max(0, Math.min(1, (window.innerHeight - main.getBoundingClientRect().bottom) / h));
      if (reduced) return;
      footer.style.filter = p > 0.995 ? "none" : `blur(${((1 - p) * 16).toFixed(1)}px)`;
      footer.style.opacity = (0.35 + 0.65 * p).toFixed(3);
    };
    const measure = () => {
      const h = footer.offsetHeight;
      on = h <= window.innerHeight;
      root.classList.toggle("footer-reveal", on);
      root.style.setProperty("--footer-h", `${h}px`);
      if (!on) footer.style.filter = footer.style.opacity = "";
      update();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const ro = new ResizeObserver(measure);
    ro.observe(footer);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      root.classList.remove("footer-reveal");
      footer.style.filter = footer.style.opacity = "";
    };
  }, []);
  return null;
}
