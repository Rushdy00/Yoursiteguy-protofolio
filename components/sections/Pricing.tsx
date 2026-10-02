import { APPLY_HREF, PRICES } from "@/lib/content";
import type { Dict } from "@/lib/i18n";
import { AddonSwitch } from "../Interactive";
import { CtaBlock, HeadingText, PillLabel } from "../ui";

export default function Pricing({ t }: { t: Dict }) {
  const p = t.pricing;
  return (
    <section id="pricing" className="section">
      <div className="wrap" style={{ maxWidth: 1200 }}>
        <PillLabel style={{ marginBottom: 22 }}>{p.pill}</PillLabel>
        <h2 data-rv="" className="display h2" style={{ marginBottom: "8vh" }}>
          <HeadingText h={p.title} />
        </h2>
        <div className="pricing-grid">
          {p.plans.map((plan, i) => (
            <div key={plan.title} data-rv="" className="price-card">
              <div className="price-top">
                <h3>{plan.title}</h3>
                <p className="price-desc">{plan.desc}</p>
                <p className="price-row">
                  <span className="price">{PRICES[i].price}</span>
                  <span className="price-suffix">{plan.suffix}</span>
                </p>
                <div className="addon">
                  <span className="addon-label">
                    {plan.addon} <span dir="ltr">{PRICES[i].addon}</span>
                  </span>
                  <AddonSwitch label={plan.addonAria} />
                </div>
                <a href={APPLY_HREF} className="btn-call mono">
                  <span aria-hidden="true">▤</span>
                  {p.book}
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
        <CtaBlock t={t.cta} style={{ marginTop: "10vh" }} />
      </div>
    </section>
  );
}
