import { TESTIMONIAL_DATA } from "@/lib/content";
import type { Dict } from "@/lib/i18n";
import { Carousel, type Slide } from "../Interactive";
import { HeadingText } from "../ui";

export default function Testimonials({ t }: { t: Dict }) {
  const slides: Slide[] = TESTIMONIAL_DATA.map((d, i) => {
    const text = t.testimonials.items[i];
    return {
      name: d.name,
      role: text.role,
      quote: text.quote,
      images: d.images.map((src, k) => ({ src, alt: text.alts[k] })),
      metric: { label: text.metric, value: d.value, delta: d.delta, points: d.points },
    };
  });
  const dotLabels = slides.map((_, i) => t.testimonials.dotLabel(i + 1));

  return (
    <section id="testimonials" className="testimonials">
      <div className="wrap" style={{ maxWidth: 1400, padding: "0 var(--px)" }}>
        <h2 data-rv="" className="display">
          <HeadingText h={t.testimonials.title} />
        </h2>
      </div>
      <Carousel slides={slides} dotLabels={dotLabels} />
    </section>
  );
}
