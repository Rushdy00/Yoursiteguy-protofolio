import type { Dict } from "@/lib/i18n";
import { CtaBlock, Eyebrow, HeadingText } from "../ui";

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
    </section>
  );
}
