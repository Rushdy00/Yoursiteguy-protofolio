/* eslint-disable @next/next/no-img-element */
import { Accent, CtaBlock, Eyebrow } from "../ui";

const COLLAGE = [
  { src: "mock-03.png", alt: "مجموعة مواقع العملاء، الأولى", width: "26vw", minWidth: 220, rotate: -4 },
  { src: "mock-06.png", alt: "مجموعة مواقع العملاء، الثانية", width: "30vw", minWidth: 240, rotate: 2 },
  { src: "mock-04.png", alt: "مجموعة مواقع العملاء، الثالثة", width: "26vw", minWidth: 220, rotate: 5 },
];

export default function Ready() {
  return (
    <section id="ready" className="ready">
      <div className="ready-glow" aria-hidden="true" />
      <div className="wrap" style={{ position: "relative", maxWidth: 1000 }}>
        <Eyebrow>005 — جاهز للنمو</Eyebrow>
        <h2 data-rv="" className="display">
          موقعك القادم يجب أن يدفع <Accent>ثمنه بنفسه.</Accent>
        </h2>
        <p data-rv="" className="ready-copy">
          مكانان فقط متاحان كل شهر. أرسل النموذج، نتحدّث لعشرين دقيقة، وتحصل على خطة واضحة سواء عملت معي أم
          لا.
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
