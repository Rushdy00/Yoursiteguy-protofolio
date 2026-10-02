/* eslint-disable @next/next/no-img-element */
import { TRUST_NAMES } from "@/lib/content";
import type { Dict } from "@/lib/i18n";
import { HeadingText } from "../ui";

export default function Trust({ t }: { t: Dict }) {
  return (
    <section id="trust" className="section trust">
      <div className="wrap" style={{ maxWidth: 1200 }}>
        <p data-rv="" className="label mono" style={{ marginBottom: 18 }}>
          {t.trust.label}
        </p>
        <p data-rv="" className="trust-statement">
          <HeadingText h={t.trust.statement} />
        </p>
        <figure data-rv="" className="figure-card">
          <img src="/img/mock-07.png" alt={t.trust.figureAlt} loading="lazy" />
        </figure>
        <div data-rv="" className="logo-grid">
          {TRUST_NAMES.map((n) => (
            <div key={n} className="logo-name mono" lang="en">
              {n}
            </div>
          ))}
          <div className="logo-stat">
            <strong>100+</strong>
            <span className="mono">{t.trust.projects}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
