import type { ReactNode } from "react";
import { APPLY_HREF } from "@/lib/content";

/** Italic serif accent word with the soft ink glow. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="accent">{children}</span>;
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

/** "Apply for a build" + 3 steps + scarcity line. Used in 4 sections. */
export function CtaBlock({ style }: { style?: React.CSSProperties }) {
  return (
    <div data-rv="" className="cta" style={style}>
      <a href={APPLY_HREF} className="btn-primary mono">
        قدّم طلبك الآن
      </a>
      <p className="cta-steps mono">
        <span>
          <span className="n">01</span> نموذج قصير
        </span>
        <span>
          <span className="n">02</span> مكالمة سريعة
        </span>
        <span>
          <span className="n-last">03</span> مبيعات أكثر
        </span>
      </p>
      <p className="cta-scarcity mono">
        <span className="dot pulse" aria-hidden="true" />
        قدّم الآن — بقيت أماكن قليلة فقط
      </p>
    </div>
  );
}
