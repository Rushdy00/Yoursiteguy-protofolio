/* eslint-disable @next/next/no-img-element */
import { Accent, CtaBlock, Eyebrow } from "../ui";

const COLLAGE = [
  { src: "mock-03.png", alt: "Client site collage, one", width: "26vw", minWidth: 220, rotate: -4 },
  { src: "mock-06.png", alt: "Client site collage, two", width: "30vw", minWidth: 240, rotate: 2 },
  { src: "mock-04.png", alt: "Client site collage, three", width: "26vw", minWidth: 220, rotate: 5 },
];

export default function Ready() {
  return (
    <section id="ready" className="ready">
      <div className="ready-glow" aria-hidden="true" />
      <div className="wrap" style={{ position: "relative", maxWidth: 1000 }}>
        <Eyebrow>005 — Ready to scale</Eyebrow>
        <h2 data-rv="" className="display">
          Your next site should pay for <Accent>itself.</Accent>
        </h2>
        <p data-rv="" className="ready-copy">
          Two build slots open each month. Send the form, we talk for twenty minutes, and you get a plan whether or not
          you hire me.
        </p>
        <CtaBlock style={{ marginTop: "7vh" }} />
      </div>
      <div data-rv="" className="collage">
        {COLLAGE.map((c) => (
          <img
            key={c.src}
            src={`/img/${c.src}`}
            alt={c.alt}
            loading="lazy"
            style={{ width: c.width, minWidth: c.minWidth, transform: `rotate(${c.rotate}deg)` }}
          />
        ))}
      </div>
    </section>
  );
}
