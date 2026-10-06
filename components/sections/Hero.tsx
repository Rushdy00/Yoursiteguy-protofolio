import type { Dict } from "@/lib/i18n";
import { CtaBlock, Eyebrow, HeadingText } from "../ui";

export default function Hero({ t }: { t: Dict }) {
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
        <Eyebrow className="hero-eyebrow">{t.hero.eyebrow}</Eyebrow>
        <h1 data-rv="" className="display">
          <HeadingText h={t.hero.title} />
        </h1>
        <p data-rv="" className="hero-tagline">
          {t.hero.tagline}
        </p>
        <p data-rv="" className="hero-sub lede">
          {t.hero.sub}
        </p>
        {t.hero.shopify && (
          <div data-rv="" className="hero-shopify">
            <p className="hero-shopify-line">
              <HeadingText h={t.hero.shopify.line} />
            </p>
            <img
              className="hero-shopify-img"
              src="/img/shopify-partners-experts.webp"
              alt={t.hero.shopify.badgeAlt}
              width={1062}
              height={110}
            />
          </div>
        )}
        <CtaBlock t={t.cta} style={{ marginTop: 64 }} />
      </div>
    </section>
  );
}
