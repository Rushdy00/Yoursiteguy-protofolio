/* eslint-disable @next/next/no-img-element */
import type { Dict } from "@/lib/i18n";
import { imageFor, PORTFOLIO, type PortfolioItem } from "@/lib/portfolio";
import { HeadingText, PillLabel } from "../ui";

function Card({ item, t }: { item: PortfolioItem; t: Dict["portfolio"] }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" data-rv="" data-pc="" className="pcard">
      <img src={imageFor(item)} alt={t.cardAlt(item.name)} loading="lazy" decoding="async" />
      <span className="pcard-shade" aria-hidden="true" />
      <span className="pcard-name mono" lang="en">
        {item.name}
      </span>
      <span className="pcard-arrow" aria-hidden="true">
        {t.arrow}
      </span>
    </a>
  );
}

export default function Portfolio({ t }: { t: Dict }) {
  const p = t.portfolio;
  // Alternate items between the two parallax columns.
  const colA = PORTFOLIO.filter((_, i) => i % 2 === 0);
  const colB = PORTFOLIO.filter((_, i) => i % 2 === 1);
  return (
    <section id="portfolio" className="section">
      <div className="wrap" style={{ maxWidth: 1400 }}>
        <PillLabel>{p.pill}</PillLabel>
        <div className="head-row" style={{ marginBottom: "9vh" }}>
          <h2 data-rv="" className="display h2" style={{ maxWidth: "20ch" }}>
            <HeadingText h={p.title} />
          </h2>
          <div data-rv="" style={{ maxWidth: "46ch" }}>
            <p className="lede" style={{ margin: "0 0 22px" }}>
              {p.intro(PORTFOLIO.length)}
            </p>
            <a href="#portfolio" className="explore mono">
              {p.explore}
              <span className="explore-arrow" aria-hidden="true">
                {p.exploreArrow}
              </span>
            </a>
          </div>
        </div>
      </div>
      {/* Outside .wrap: the grid runs edge to edge with a small gutter. */}
      <div className="pgrid">
        <div id="pcol-a" className="pcol">
          {colA.map((item) => (
            <Card key={item.url} item={item} t={p} />
          ))}
        </div>
        <div id="pcol-b" className="pcol pcol-b">
          {colB.map((item) => (
            <Card key={item.url} item={item} t={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
