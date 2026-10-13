import { TESTIMONIAL_DATA } from "@/lib/content";
import type { Dict } from "@/lib/i18n";
import { conversionSeries, imageFor, PORTFOLIO, type PortfolioItem } from "@/lib/portfolio";
import { Carousel, type Slide } from "../Interactive";
import { HeadingText } from "../ui";

export default function Testimonials({ t }: { t: Dict }) {
  const conversion = (p: PortfolioItem) => {
    const s = conversionSeries(p);
    return { label: t.testimonials.conversion, value: p.conversion!, delta: p.lift, chart: s && { ...s, ...t.testimonials.chart } };
  };
  const withQuote: Slide[] = TESTIMONIAL_DATA.map((d, i) => {
    const text = t.testimonials.items[i];
    const site = PORTFOLIO.find((p) => p.url === d.site)!;
    return {
      name: d.name,
      role: text.role,
      quote: text.quote,
      images: [{ src: imageFor(site), alt: t.portfolio.cardAlt(site.name) }],
      // The site's conversion rate (lib/portfolio.json) replaces the placeholder metric when set.
      metric: site.conversion ? conversion(site) : { label: text.metric, value: d.value, delta: d.delta, points: d.points },
    };
  });
  // The rest of the portfolio follows as site-only slides (screenshot + link).
  const rest: Slide[] = PORTFOLIO.filter((p) => !TESTIMONIAL_DATA.some((d) => d.site === p.url)).map((p) => ({
    name: p.name,
    images: [{ src: imageFor(p), alt: t.portfolio.cardAlt(p.name) }],
    link: { href: p.url, label: new URL(p.url).hostname.replace(/^www\./, "") },
    metric: p.conversion ? conversion(p) : undefined,
  }));
  const slides = [...withQuote, ...rest];
  const dotLabels = slides.map((_, i) => t.testimonials.dotLabel(i + 1));

  return (
    <div id="testimonials" className="testimonials">
      <div className="wrap" style={{ maxWidth: 1400, padding: "0 var(--px)" }}>
        <h2 data-rv="" className="display">
          <HeadingText h={t.testimonials.title} />
        </h2>
      </div>
      <Carousel slides={slides} dotLabels={dotLabels} />
    </div>
  );
}
