"use client";
/* eslint-disable @next/next/no-img-element */

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export type Shot = { src: string; name: string; alt: string };

/**
 * Laptop frame with the portfolio screenshots wiping through its screen,
 * flanked by the before / after conversion badges.
 */
export function LaptopShowcase({ shots, badgeAlts }: { shots: Shot[]; badgeAlts: [string, string] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const imgs = gsap.utils.toArray<HTMLImageElement>(".lt-shot");
      const handle = root.querySelector<HTMLElement>(".lt-wipe")!;
      let cur = 0;
      let timer: ReturnType<typeof setTimeout> | undefined;
      let visible = false;

      // The next screenshot is revealed from the right edge, with the handle riding the seam.
      const next = () => {
        const to = (cur + 1) % imgs.length;
        const wipe = { p: 100 };
        gsap.set(imgs[to], { zIndex: 2, opacity: 1, clipPath: "inset(0 0 0 100%)" });
        gsap
          .timeline({
            onComplete: () => {
              gsap.set(imgs[cur], { opacity: 0, zIndex: 0 });
              gsap.set(imgs[to], { zIndex: 1, clipPath: "none" });
              cur = to;
              if (visible) timer = setTimeout(next, 2600);
            },
          })
          .to(handle, { opacity: 1, duration: 0.2 }, 0)
          .to(
            wipe,
            {
              p: 0,
              duration: 1.2,
              ease: "power3.inOut",
              onStart: () => setActive(to),
              onUpdate: () => {
                imgs[to].style.clipPath = `inset(0 0 0 ${wipe.p}%)`;
                handle.style.left = `${wipe.p}%`;
              },
            },
            0,
          )
          .to(handle, { opacity: 0, duration: 0.25 }, 1.05);
      };

      gsap.to(".lt-before", { y: -8, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".lt-after", { y: 8, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });

      const io = new IntersectionObserver(
        ([e]) => {
          visible = e.isIntersecting;
          clearTimeout(timer);
          if (visible && imgs.length > 1) timer = setTimeout(next, 2200);
        },
        { threshold: 0.35 },
      );
      io.observe(root);
      return () => {
        io.disconnect();
        clearTimeout(timer);
      };
    }, root);
    return () => ctx.revert();
  }, [shots.length]);

  return (
    <div ref={rootRef} className="lt">
      <div className="lt-badge lt-before">
        <img src="/img/conversion-before.avif" alt={badgeAlts[0]} width={400} height={132} loading="lazy" />
      </div>
      <div className="lt-laptop">
        <div className="lt-screen">
          {shots.map((s, i) => (
            <img
              key={s.src}
              className="lt-shot"
              src={s.src}
              alt={s.alt}
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
              style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 }}
            />
          ))}
          <span className="lt-wipe" aria-hidden="true">
            <span className="lt-knob" />
          </span>
          <span className="lt-name mono" lang="en" aria-hidden="true">
            {shots[active]?.name}
          </span>
        </div>
        <img className="lt-frame" src="/img/laptop-frame.png" alt="" width={1657} height={949} />
      </div>
      <div className="lt-badge lt-after">
        <img src="/img/conversion-after.avif" alt={badgeAlts[1]} width={400} height={143} loading="lazy" />
      </div>
    </div>
  );
}
