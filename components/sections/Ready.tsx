/* eslint-disable @next/next/no-img-element */
import type { Dict } from "@/lib/i18n";
import { CtaBlock, Eyebrow, HeadingText } from "../ui";

const COLLAGE = [
  { src: "mock-03.png", width: "26vw", minWidth: 220, rotate: -4 },
  { src: "mock-06.png", width: "30vw", minWidth: 240, rotate: 2 },
  { src: "mock-04.png", width: "26vw", minWidth: 220, rotate: 5 },
];

export default function Ready({ t }: { t: Dict }) {
  const r = t.ready;
  return (
    <section id="ready" className="ready">
      <div className="ready-glow" aria-hidden="true" />
      <div className="wrap" style={{ position: "relative", maxWidth: 1000 }}>
        <Eyebrow>{r.eyebrow}</Eyebrow>
        <h2 data-rv="" className="display">
          <HeadingText h={r.title} />
        </h2>
        <p data-rv="" className="ready-copy">
          {r.body}
        </p>
        <CtaBlock t={t.cta} style={{ marginTop: "7vh" }} />
      </div>
      <div data-rv="" className="collage">
        {COLLAGE.map((c, i) => (
          <img
            key={c.src}
            src={`/img/${c.src}`}
            alt={r.collageAlts[i]}
            loading="lazy"
            style={{ width: c.width, minWidth: c.minWidth, transform: `rotate(${c.rotate}deg)` }}
          />
        ))}
      </div>
    </section>
  );
}
