/* eslint-disable @next/next/no-img-element */
import { imageFor, PORTFOLIO, type PortfolioItem } from "@/lib/portfolio";
import { Accent, PillLabel } from "../ui";

function Card({ item }: { item: PortfolioItem }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" data-rv="" data-pc="" className="pcard">
      <img src={imageFor(item)} alt={`${item.name} website`} loading="lazy" decoding="async" />
      <span className="pcard-shade" aria-hidden="true" />
      <span className="pcard-name mono">{item.name}</span>
      <span className="pcard-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

export default function Portfolio() {
  // Alternate items between the two parallax columns.
  const colA = PORTFOLIO.filter((_, i) => i % 2 === 0);
  const colB = PORTFOLIO.filter((_, i) => i % 2 === 1);
  const count = WORDS[PORTFOLIO.length] ?? String(PORTFOLIO.length);
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
              {count} builds, one pattern: strip the friction, sharpen the offer, let the design carry the argument. Every
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
            {colA.map((p) => (
              <Card key={p.url} item={p} />
            ))}
          </div>
          <div id="pcol-b" className="pcol pcol-b">
            {colB.map((p) => (
              <Card key={p.url} item={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
