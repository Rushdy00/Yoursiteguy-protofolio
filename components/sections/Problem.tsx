/* eslint-disable @next/next/no-img-element */
import type { Dict } from "@/lib/i18n";
import { CtaBlock, Eyebrow, HeadingText } from "../ui";

export default function Problem({ t }: { t: Dict }) {
  const p = t.problem;
  return (
    <section id="problem" className="problem">
      <div
        className="blob"
        aria-hidden="true"
        style={{
          top: "-6vh",
          left: "-12vw",
          width: "55vw",
          height: "55vh",
          background: "radial-gradient(closest-side, rgba(110,122,117,0.26), rgba(110,122,117,0))",
        }}
      />
      <div
        className="blob"
        aria-hidden="true"
        style={{
          bottom: "-8vh",
          right: "-12vw",
          width: "50vw",
          height: "50vh",
          background: "radial-gradient(closest-side, rgba(255,214,214,0.5), rgba(255,214,214,0))",
        }}
      />
      <div className="wrap" style={{ position: "relative", maxWidth: 1100 }}>
        <Eyebrow>{p.eyebrow}</Eyebrow>
        <h2 data-rv="" className="display">
          <HeadingText h={p.title} />
        </h2>
        <p data-rv="" className="problem-copy">
          {p.body.before}
          <strong>{p.body.strong}</strong>
          {p.body.after}
        </p>
        <figure data-rv="">
          <img src="/img/laptop.png" alt={p.figureAlt} loading="lazy" />
        </figure>
        <CtaBlock t={t.cta} style={{ marginTop: "8vh" }} />
      </div>
    </section>
  );
}
