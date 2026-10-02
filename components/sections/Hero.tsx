import { Accent, CtaBlock, Eyebrow } from "../ui";

export default function Hero() {
  return (
    <section className="hero">
      <div
        className="blob"
        aria-hidden="true"
        style={{
          top: "-18vh",
          left: "-10vw",
          width: "70vw",
          height: "70vh",
          background: "radial-gradient(closest-side, rgba(110,122,117,0.30), rgba(110,122,117,0))",
        }}
      />
      <div
        className="blob"
        aria-hidden="true"
        style={{
          top: "8vh",
          right: "-14vw",
          width: "60vw",
          height: "60vh",
          background: "radial-gradient(closest-side, rgba(226,229,228,0.9), rgba(226,229,228,0))",
        }}
      />
      <div className="wrap" style={{ position: "relative", maxWidth: 1180 }}>
        <Eyebrow className="hero-eyebrow">000 — حلول تقنية لنمو التجارة الإلكترونية</Eyebrow>
        <h1 data-rv="" className="display">
          مواقع مخصّصة فاخرة
          <br />
          للعلامات <Accent>الاستهلاكية</Accent>
        </h1>
        <p data-rv="" className="hero-tagline">
          جاهز خلال 12 يومًا، أو لا تدفع شيئًا.
        </p>
        <p data-rv="" className="hero-sub lede">
          إلى جانب المواقع، نتولّى التقنية من البداية إلى النهاية — المتاجر، والتكاملات، والأتمتة، والتحليلات — لتبيع
          علامات التجارة الإلكترونية أكثر وبجهد أقل.
        </p>
        <CtaBlock style={{ marginTop: 64 }} />
      </div>
    </section>
  );
}
