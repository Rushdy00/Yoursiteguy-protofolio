import { APPLY_HREF, PRICING } from "@/lib/content";
import { AddonSwitch } from "../Interactive";
import { Accent, CtaBlock, PillLabel } from "../ui";

export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="wrap" style={{ maxWidth: 1200 }}>
        <PillLabel style={{ marginBottom: 22 }}>001 — Pricing</PillLabel>
        <h2 data-rv="" className="display h2" style={{ marginBottom: "8vh" }}>
          Built to <Accent>convert.</Accent>
        </h2>
        <div className="pricing-grid">
          {PRICING.map((plan) => (
            <div key={plan.title} data-rv="" className="price-card">
              <div className="price-top">
                <h3>{plan.title}</h3>
                <p className="price-desc">{plan.desc}</p>
                <p className="price-row">
                  <span className="price">{plan.price}</span>
                  <span className="price-suffix">{plan.suffix}</span>
                </p>
                <div className="addon">
                  <span className="addon-label">
                    {plan.addon.label} <span>{plan.addon.price}</span>
                  </span>
                  <AddonSwitch label={plan.addon.aria} />
                </div>
                <a href={APPLY_HREF} className="btn-call mono">
                  <span aria-hidden="true">▤</span>Book a call
                </a>
              </div>
              <div className="price-features">
                {plan.features.map((f) => (
                  <span key={f}>
                    <span className="check" aria-hidden="true">
                      ✓
                    </span>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <CtaBlock style={{ marginTop: "10vh" }} />
      </div>
    </section>
  );
}
