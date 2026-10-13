"use client";

import gsap from "gsap";
import { useEffect, useId, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export type ChartData = { series: number[]; launch: number; before: string; after: string };

const W = 300;
const H = 84;
const PAD = { t: 12, r: 8, b: 6, l: 6 };

// Smooth, monotone curve through the points (horizontal tangents).
const curve = (pts: [number, number][]) =>
  pts
    .map(([x, y], i) => {
      if (i === 0) return `M${x},${y}`;
      const mx = (pts[i - 1][0] + x) / 2;
      return `C${mx},${pts[i - 1][1]} ${mx},${y} ${x},${y}`;
    })
    .join(" ");

/** Metric box with a before/after-launch line chart; GSAP draws it when the slide scrolls into view. */
export function ConversionMetric({ label, value, delta, chart }: { label: string; value: string; delta?: string; chart: ChartData }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const gradId = useId();

  // "4.6%" → prefix "", number 4.6, suffix "%"
  const m = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  const target = m ? parseFloat(m[2]) : 0;
  const decimals = m ? (m[2].split(".")[1] ?? "").length : 0;
  const fmt = (v: number) => (m ? `${m[1]}${v.toFixed(decimals)}${m[3]}` : value);

  const { series, launch } = chart;
  const n = series.length;
  const lo = Math.min(...series);
  const hi = Math.max(...series);
  const span = hi - lo || 1;
  const pts: [number, number][] = series.map((v, i) => [
    +(PAD.l + (i / (n - 1)) * (W - PAD.l - PAD.r)).toFixed(1),
    +(PAD.t + (1 - (v - lo) / span) * (H - PAD.t - PAD.b)).toFixed(1),
  ]);
  const before = curve(pts.slice(0, launch + 1));
  const after = curve(pts.slice(launch));
  const [lx] = pts[launch];
  const [ex, ey] = pts[n - 1];
  const wash = `${after} L${ex},${H} L${lx},${H} Z`;

  useEffect(() => {
    const root = rootRef.current;
    const valueEl = valueRef.current;
    if (!root || !valueEl || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const num = { v: 0 };
      gsap.set(".cv-line", { strokeDashoffset: 1, opacity: 0 });
      gsap.set(".cv-wash, .cv-launch, .cv-delta", { opacity: 0 });
      gsap.set(".cv-dot", { scale: 0, opacity: 0, transformOrigin: "50% 50%" });
      valueEl.textContent = fmt(0);
      const tl = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .to(num, { v: target, duration: 1.5, onUpdate: () => (valueEl.textContent = fmt(num.v)), onComplete: () => (valueEl.textContent = value) }, 0)
        .set(".cv-before", { opacity: 1 }, 0)
        .to(".cv-before", { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" }, 0)
        .to(".cv-launch", { opacity: 1, duration: 0.3 }, 0.4)
        .set(".cv-after", { opacity: 1 }, 0.5)
        .to(".cv-after", { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.5)
        .to(".cv-wash", { opacity: 1, duration: 0.8 }, 1)
        .fromTo(".cv-delta", { y: 6 }, { opacity: 1, y: 0, duration: 0.5 }, 1.2)
        .to(".cv-dot", { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)" }, 1.5);
      const io = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          tl.play();
          io.disconnect();
        },
        { threshold: 0.6 },
      );
      io.observe(root);
      return () => io.disconnect();
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((x - PAD.l) / (W - PAD.l - PAD.r)) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };

  return (
    <div ref={rootRef} className="metric">
      <p className="metric-label mono">
        {label}
        <span aria-hidden="true">⚠</span>
      </p>
      <p className="metric-row">
        <span ref={valueRef} className="metric-value">
          {value}
        </span>
        {delta && <span className="metric-delta cv-delta">{delta}</span>}
      </p>
      <div className="cv" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${label}: ${fmt(series[0])} → ${fmt(series[n - 1])}`}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2C332F" stopOpacity="0.14" />
              <stop offset="1" stopColor="#2C332F" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="cv-wash" d={wash} fill={`url(#${gradId})`} />
          <line className="cv-launch" x1={lx} x2={lx} y1={4} y2={H} stroke="#B4BCB9" strokeWidth="1" strokeDasharray="2 3" />
          <path className="cv-line cv-before" d={before} pathLength={1} strokeDasharray={1} fill="none" stroke="#A9B2AE" strokeWidth="2" strokeLinecap="round" />
          <path className="cv-line cv-after" d={after} pathLength={1} strokeDasharray={1} fill="none" stroke="#2C332F" strokeWidth="2" strokeLinecap="round" />
          <circle className="cv-dot" cx={ex} cy={ey} r="4.5" fill="#2C332F" stroke="#F4F6F5" strokeWidth="2" />
          {hover !== null && (
            <g pointerEvents="none">
              <line x1={pts[hover][0]} x2={pts[hover][0]} y1={4} y2={H} stroke="#2C332F" strokeWidth="1" opacity="0.25" />
              <circle cx={pts[hover][0]} cy={pts[hover][1]} r="4.5" fill="#fff" stroke="#2C332F" strokeWidth="2" />
            </g>
          )}
        </svg>
        {hover !== null && (
          <span className="cv-tip mono" style={{ left: `${(pts[hover][0] / W) * 100}%`, top: `${(pts[hover][1] / H) * 100}%` }}>
            {fmt(series[hover])}
          </span>
        )}
      </div>
      <p className="cv-caps mono" aria-hidden="true">
        <span>{chart.before}</span>
        <span>{chart.after}</span>
      </p>
    </div>
  );
}
