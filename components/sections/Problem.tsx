/* eslint-disable @next/next/no-img-element */
import { Accent, CtaBlock, Eyebrow } from "../ui";

export default function Problem() {
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
        <Eyebrow>003 — The problem</Eyebrow>
        <h2 data-rv="" className="display">
          Stunning aesthetics.
          <br />
          <Accent>Ruthless conversions.</Accent>
        </h2>
        <p data-rv="" className="problem-copy">
          Most studios hand you a beautiful site that quietly loses money.{" "}
          <strong>Pretty is the baseline, not the product.</strong> The build starts with the funnel, then earns its
          looks.
        </p>
        <figure data-rv="">
          <img src="/img/laptop.png" alt="Client site shown on a laptop" loading="lazy" />
        </figure>
        <CtaBlock style={{ marginTop: "8vh" }} />
      </div>
    </section>
  );
}
