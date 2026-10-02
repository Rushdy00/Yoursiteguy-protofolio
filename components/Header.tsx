"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/content";
import type { Dict } from "@/lib/i18n";
import { motion } from "@/lib/motion";

type Props = Pick<Dict, "nav" | "menu" | "langSwitch" | "locale">;

export default function Header({ nav, menu, langSwitch, locale }: Props) {
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
        <a href="#top" className="logo" dir="ltr" lang="en">
          yoursiteguy<span className="logo-serif">Creative</span>
          <span className="dot" />
        </a>
        <div className="header-actions">
          <a
            href={langSwitch.href}
            className="lang-switch mono"
            lang={locale === "en" ? "ar" : "en"}
            hrefLang={locale === "en" ? "ar" : "en"}
            aria-label={langSwitch.aria}
          >
            {langSwitch.label}
          </a>
          <button
          ref={btnRef}
          type="button"
          className="m-toggle"
          aria-expanded={open}
          aria-label={open ? menu.close : menu.open}
          aria-controls="m-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`m-icon${open ? " is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
          </button>
        </div>
      </header>

      <div
        ref={panelRef}
        id="m-panel"
        className={`m-panel${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={menu.label}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a[href]")) setOpen(false);
        }}
      >
        {nav.map((l, i) => (
          <a key={l.href} href={l.href} className="m-item" style={{ "--i": i } as React.CSSProperties}>
            {l.label}
          </a>
        ))}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="m-item m-mail mono"
          lang="en"
          style={{ "--i": nav.length } as React.CSSProperties}
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </>
  );
}
