"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT_EMAIL, NAV_LINKS } from "@/lib/content";
import { motion } from "@/lib/motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevOpen = useRef(open);

  // Lock scroll + manage focus whenever the menu opens/closes.
  useEffect(() => {
    if (prevOpen.current === open) return;
    prevOpen.current = open;
    if (open) motion.lenis?.stop();
    else motion.lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      const first = panelRef.current?.querySelector<HTMLAnchorElement>("a[href]");
      const t = setTimeout(() => first?.focus({ preventScroll: true }), 0);
      return () => clearTimeout(t);
    }
    btnRef.current?.focus({ preventScroll: true });
  }, [open]);

  // Esc closes; Tab is trapped between the toggle and the menu links.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const all: HTMLElement[] = [btnRef.current!, ...Array.from(panelRef.current!.querySelectorAll<HTMLElement>("a[href]"))];
      const i = all.indexOf(document.activeElement as HTMLElement);
      e.preventDefault();
      all[e.shiftKey ? (i - 1 + all.length) % all.length : (i + 1) % all.length].focus({ preventScroll: true });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="site-header">
        <a href="#top" className="logo">
          yoursiteguy<span className="logo-serif">Creative</span>
          <span className="dot" />
        </a>
        <button
          ref={btnRef}
          type="button"
          className="m-toggle"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="m-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`m-icon${open ? " is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </header>

      <div
        ref={panelRef}
        id="m-panel"
        className={`m-panel${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a[href]")) setOpen(false);
        }}
      >
        {NAV_LINKS.map((l, i) => (
          <a key={l.href} href={l.href} className="m-item" style={{ "--i": i } as React.CSSProperties}>
            {l.label}
          </a>
        ))}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="m-item m-mail mono"
          style={{ "--i": NAV_LINKS.length } as React.CSSProperties}
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </>
  );
}
