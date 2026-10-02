/* eslint-disable @next/next/no-img-element */
import { PORTFOLIO_COL_A, PORTFOLIO_COL_B, type PortfolioItem } from "@/lib/content";
import { Accent, PillLabel } from "../ui";

function Card({ item }: { item: PortfolioItem }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" data-rv="" data-pc="" className="pcard">
      <img src={`/img/${item.img}`} alt={`${item.name} website`} loading="lazy" decoding="async" />
      <span className="pcard-shade" aria-hidden="true" />
      <span className="pcard-name mono">{item.name}</span>
      <span className="pcard-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="section">
      <div className="wrap" style={{ maxWidth: 1400 }}>
        <PillLabel>002 — Portfolio</PillLabel>
        <div className="head-row" style={{ marginBottom: "9vh" }}>
          <h2 data-rv="" className="display h2" style={{ maxWidth: "20ch" }}>
            Engineered for <Accent>conversions</Accent>
          </h2>
          <div data-rv="" style={{ maxWidth: "46ch" }}>
            <p className="lede" style={{ margin: "0 0 22px" }}>
              Nine builds, one pattern: strip the friction, sharpen the offer, let the design carry the argument. Every
              site below shipped inside two weeks.
            </p>
            <a href="#portfolio" className="explore mono">
              Explore full portfolio
              <span className="explore-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
        <div className="pgrid">
          <div id="pcol-a" className="pcol">
            {PORTFOLIO_COL_A.map((p) => (
              <Card key={p.url} item={p} />
            ))}
          </div>
          <div id="pcol-b" className="pcol pcol-b">
            {PORTFOLIO_COL_B.map((p) => (
              <Card key={p.url} item={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
