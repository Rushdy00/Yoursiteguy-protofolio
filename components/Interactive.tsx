"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/* ------------------------------------------------ pricing add-on switch */

// Visual only for now — the price does not change when toggled.
export function AddonSwitch({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  return (
    <button type="button" className="switch" aria-pressed={on} aria-label={label} onClick={() => setOn((v) => !v)}>
      <span className="switch-knob" aria-hidden="true" />
    </button>
  );
}

/* ------------------------------------------------ footer clocks */

const fmt = (timeZone?: string) =>
  new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

export function Clock({ timeZone }: { timeZone?: string }) {
  const [text, setText] = useState("--:--:--");
  useEffect(() => {
    const f = fmt(timeZone);
    const tick = () => setText(f.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return (
    <p className="clock" dir="ltr" lang="en">
      {text}
    </p>
  );
}

/* ------------------------------------------------ FAQ accordion (single open) */

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const bodies = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sync = () =>
      bodies.current.forEach((el, i) => {
        if (!el) return;
        if (i === openIdx) {
          el.style.height = "auto";
          el.style.height = el.scrollHeight + "px";
        } else el.style.height = "0px";
      });
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [openIdx]);

  return (
    <div>
      {items.map((item, i) => {
        const open = i === openIdx;
        return (
          <div key={item.q} className={`faq-row${open ? " is-open" : ""}`}>
            <button
              type="button"
              className="faq-btn"
              aria-expanded={open}
              aria-controls={`faq-body-${i}`}
              onClick={() => setOpenIdx(open ? null : i)}
            >
              <span className="faq-q">
                <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="faq-text">{item.q}</span>
              </span>
              <span className="faq-icon" aria-hidden="true">
                {open ? "−" : "+"}
              </span>
            </button>
            <div
              id={`faq-body-${i}`}
              ref={(el) => {
                bodies.current[i] = el;
              }}
              className="faq-body"
              style={{ height: i === 0 ? "auto" : 0 }}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------ testimonial carousel */

export type Slide = {
  name: string;
  role: string;
  quote: string;
  images: { src: string; alt: string }[];
  metric: { label: string; value: string; delta: string; points: string };
};

export function Carousel({ slides, dotLabels }: { slides: Slide[]; dotLabels: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ startX: 0, startIdx: 0 });
  const n = slides.length;
  const active = ((index % n) + n) % n;

  const step = () => {
    const first = trackRef.current?.firstElementChild;
    return first ? first.getBoundingClientRect().width + 24 : 1;
  };

  // Position the track; the last page is always full.
  useEffect(() => {
    const apply = () => {
      const wrap = wrapRef.current, track = trackRef.current;
      if (!wrap || !track) return;
      const max = Math.max(0, n - Math.max(1, Math.floor(wrap.clientWidth / step())));
      const dir = getComputedStyle(wrap).direction === "rtl" ? 1 : -1;
      track.style.transform = `translate3d(${dir * Math.min(active, max) * step()}px,0,0)`;
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [active, n]);

  // Autoplay (restarts after manual navigation).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setIndex((i) => i + 1), 4200);
    return () => clearInterval(id);
  }, [active]);

  // Pointer drag: move by whole slides.
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      const rtl = wrapRef.current && getComputedStyle(wrapRef.current).direction === "rtl";
      const d = ((drag.current.startX - e.clientX) * (rtl ? -1 : 1)) / step();
      setIndex(drag.current.startIdx + Math.round(d));
    };
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging]);

  return (
    <>
      <div
        ref={wrapRef}
        className={`carousel${dragging ? " is-dragging" : ""}`}
        onPointerDown={(e) => {
          drag.current = { startX: e.clientX, startIdx: active };
          setIndex(active);
          setDragging(true);
        }}
      >
        <div ref={trackRef} className="carousel-track">
          {slides.map((t) => (
            <article key={t.name} className="slide">
              <div className="slide-imgs">
                {t.images.map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={img.alt} src={`/img/${img.src}`} alt={img.alt} draggable={false} loading="lazy" />
                ))}
              </div>
              <p className="slide-quote">{t.quote}</p>
              <p className="slide-who">
                <b>{t.name}</b> <span className="slide-role">| {t.role}</span>
              </p>
              <div className="metric">
                <p className="metric-label mono">
                  {t.metric.label}
                  <span aria-hidden="true">⚠</span>
                </p>
                <p className="metric-row">
                  <span className="metric-value">{t.metric.value}</span>
                  <span className="metric-delta">{t.metric.delta}</span>
                </p>
                <svg viewBox="0 0 120 30" width="100%" height="26" aria-hidden="true">
                  <polyline points={t.metric.points} fill="none" stroke="#2C332F" strokeWidth="2" />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="carousel-dots">
        {slides.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-label={dotLabels[i]}
            aria-current={i === active}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </>
  );
}
