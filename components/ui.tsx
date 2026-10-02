import type { ReactNode } from "react";
import { APPLY_HREF } from "@/lib/content";
import type { Dict, Heading } from "@/lib/i18n";

/** Italic serif accent word with the soft ink glow. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="accent">{children}</span>;
}

/** Renders a dictionary heading: optional first line, then text with the accent word. */
export function HeadingText({ h }: { h: Heading }) {
  return (
    <>
      {h.line1 && (
        <>
          {h.line1}
          <br />
        </>
      )}
      {h.before}
      <Accent>{h.accent}</Accent>
      {h.after}
    </>
  );
}

/** "● 003 — The problem" style eyebrow. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p data-rv="" className={`label mono ${className}`}>
      ● {children}
    </p>
  );
}

/** White pill eyebrow with a sage dot ("002 — Portfolio"). */
export function PillLabel({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <p data-rv="" className="pill-label mono" style={style}>
      <span className="dot" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Apply button + 3 steps + scarcity line. Used in 4 sections. */
export function CtaBlock({ t, style }: { t: Dict["cta"]; style?: React.CSSProperties }) {
  return (
    <div data-rv="" className="cta" style={style}>
      <a href={APPLY_HREF} className="btn-primary mono">
        {t.apply}
      </a>
      <p className="cta-steps mono">
        {t.steps.map((s, i) => (
          <span key={s}>
            <span className={i === 2 ? "n-last" : "n"}>0{i + 1}</span> {s}
          </span>
        ))}
      </p>
      <p className="cta-scarcity mono">
        <span className="dot pulse" aria-hidden="true" />
        {t.scarcity}
      </p>
    </div>
  );
}
