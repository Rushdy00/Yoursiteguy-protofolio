/* eslint-disable @next/next/no-img-element */
import { imageFor, PORTFOLIO, type PortfolioItem } from "@/lib/portfolio";
import { Accent, PillLabel } from "../ui";

function Card({ item }: { item: PortfolioItem }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" data-rv="" data-pc="" className="pcard">
      <img src={imageFor(item)} alt={`${item.name} website`} loading="lazy" decoding="async" />
      <span className="pcard-shade" aria-hidden="true" />
      <span className="pcard-name mono" lang="en">
        {item.name}
      </span>
      <span className="pcard-arrow" aria-hidden="true">
        ↖
      </span>
    </a>
  );
}

// Arabic plural agreement: 3–10 → مشاريع, 11+ → مشروعًا.
const countLabel = (n: number) => (n <= 10 ? `${n} مشاريع` : `${n} مشروعًا`);

export default function Portfolio() {
  // Alternate items between the two parallax columns.
  const colA = PORTFOLIO.filter((_, i) => i % 2 === 0);
  const colB = PORTFOLIO.filter((_, i) => i % 2 === 1);
  const count = countLabel(PORTFOLIO.length);
  return (
    <section id="portfolio" className="section">
      <div className="wrap" style={{ maxWidth: 1400 }}>
        <PillLabel>002 — أعمالنا</PillLabel>
        <div className="head-row" style={{ marginBottom: "9vh" }}>
          <h2 data-rv="" className="display h2" style={{ maxWidth: "20ch" }}>
            مصمَّمة لرفع <Accent>التحويلات</Accent>
          </h2>
          <div data-rv="" style={{ maxWidth: "46ch" }}>
            <p className="lede" style={{ margin: "0 0 22px" }}>
              {count}، ونهج واحد: أزِل العوائق، وقوِّ العرض، ودَع التصميم يُقنع العميل. كل موقع هنا أُطلق في أقل من
              أسبوعين.
            </p>
            <a href="#portfolio" className="explore mono">
              استكشف كل الأعمال
              <span className="explore-arrow" aria-hidden="true">
                ←
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
