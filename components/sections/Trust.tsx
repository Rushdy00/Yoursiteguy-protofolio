/* eslint-disable @next/next/no-img-element */
import { TRUST_NAMES } from "@/lib/content";
import { Accent } from "../ui";

export default function Trust() {
  return (
    <section id="trust" className="section trust">
      <div className="wrap" style={{ maxWidth: 1200 }}>
        <p data-rv="" className="label mono" style={{ marginBottom: 18 }}>
          We are certified
        </p>
        <p data-rv="" className="trust-statement">
          Shopify and Webflow partner builds, measured against <Accent>revenue, not applause.</Accent>
        </p>
        <figure data-rv="" className="figure-card">
          <img src="/img/mock-07.png" alt="Client revenue dashboard after launch" loading="lazy" />
        </figure>
        <div data-rv="" className="logo-grid">
          {TRUST_NAMES.map((n) => (
            <div key={n} className="logo-name mono">
              {n}
            </div>
          ))}
          <div className="logo-stat">
            <strong>100+</strong>
            <span className="mono">Projects delivered</span>
          </div>
        </div>
      </div>
    </section>
  );
}
