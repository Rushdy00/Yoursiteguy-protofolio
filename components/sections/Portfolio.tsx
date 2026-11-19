import FilmStrip, { type FilmItem } from "@/components/FilmStrip";
import type { Dict } from "@/lib/i18n";
import { imageFor, PORTFOLIO, tagsFor } from "@/lib/portfolio";
import Testimonials from "./Testimonials";

export default function Portfolio({ t }: { t: Dict }) {
  const p = t.portfolio;
  const items: FilmItem[] = PORTFOLIO.map((item) => ({
    name: item.name,
    url: item.url,
    src: imageFor(item),
    alt: p.cardAlt(item.name),
    tags: tagsFor(item),
  }));
  return (
    <>
      <FilmStrip
        id="portfolio"
        items={items}
        t={{ title: p.title, filterLabel: p.filterLabel, filters: p.filters, tagLabels: p.tagLabels, arrow: p.arrow }}
      />
      <section className="section film-after">
        <Testimonials t={t} />
      </section>
    </>
  );
}
