"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * One-shot scroll reveals for every `[data-rv]` element. Initial hidden state
 * comes from CSS (`.rv-on`, set in <head>), so there is no flash before hydration.
 */
export default function Reveals() {
  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion()) {
      root.classList.remove("rv-on");
      return;
    }
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-rv]"));
    const inPortfolio = (el: HTMLElement) => !!el.closest("#portfolio") && !el.hasAttribute("data-pc");
    const done = new Set<HTMLElement>();

    const show = (el: HTMLElement) => {
      if (done.has(el)) return;
      done.add(el);
      io.unobserve(el);
      const i = els.indexOf(el);
      if (inPortfolio(el)) {
        const d = (i % 5) * 100;
        const e = `900ms var(--ease-portfolio) ${d}ms`;
        el.style.transition = `transform ${e}, opacity ${e}, filter ${e}`;
        el.style.filter = "blur(0px)";
      } else {
        const d = (i % 4) * 60;
        const e = `800ms var(--ease-out-expo) ${d}ms`;
        el.style.transition = `transform ${e}, opacity ${e}`;
      }
      el.style.opacity = "1";
      el.style.transform = "translate3d(0,0,0)";
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // reveal when entering OR when already scrolled past (hash jumps, restored scroll)
          if (e.isIntersecting || e.boundingClientRect.bottom <= 0) show(e.target as HTMLElement);
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));

    const sweep = () =>
      els.forEach((el) => {
        if (!done.has(el) && el.getBoundingClientRect().top < window.innerHeight * 0.9) show(el);
      });
    const onHash = () => setTimeout(sweep, 60);
    const t = setTimeout(sweep, 0);
    window.addEventListener("load", sweep, { once: true });
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("hashchange", onHash);

    return () => {
      clearTimeout(t);
      io.disconnect();
      window.removeEventListener("load", sweep);
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return null;
}
