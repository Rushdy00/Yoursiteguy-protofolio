/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { Accent, Eyebrow } from "../ui";

const SWATCHES = ["#6E7A75", "#DDE2E0", "#2C332F", "#E8ECEA", "#C3CAC7", "#CDD3D1"];
const FUNNEL = [
  { label: "Land", done: true },
  { label: "Hook", done: true },
  { label: "Trust", done: true },
  { label: "Buy", done: false },
];

function StepCard(props: { n: string; title: string; body: string; id?: string; children: ReactNode }) {
  return (
    <article id={props.id} data-rv="" className="bp-card">
      <span className="bp-num" aria-hidden="true">
        {props.n}
      </span>
      <div className="bp-text">
        <p className="bp-step mono">#{props.n}</p>
        <h3>{props.title}</h3>
        <p className="bp-body">{props.body}</p>
        <span className="bp-bar" aria-hidden="true" />
      </div>
      {props.children}
    </article>
  );
}

export default function Blueprint() {
  return (
    <section id="blueprint" className="section">
      <div className="wrap" style={{ maxWidth: 1300 }}>
        <Eyebrow>004 — The blueprint</Eyebrow>
        <h2 id="bp-head" data-rv="" className="display bp-head">
          Improve ad results in <Accent>3 simple steps.</Accent>
        </h2>
        <div className="bp-stack">
          <StepCard
            n="01"
            title="Direction, decided in one pass"
            body="A single moodboard, three named directions, one chosen. No committee rounds, no drift."
          >
            <div className="bp-panel">
              <img src="/img/mock-08.png" alt="Chosen direction applied to a product page" className="bp-panel-img" loading="lazy" />
              <div className="swatches">
                {SWATCHES.map((c) => (
                  <span key={c} style={{ background: c }} />
                ))}
              </div>
              <div className="chips">
                {["Aesthetic Editorial", "Flow Frictionless", "Offer Magnetic"].map((c) => (
                  <span key={c} className="chip mono">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </StepCard>

          <StepCard
            n="02"
            title="Creative that stops the scroll"
            body="The page and the ad are built as one system, so the promise in the feed survives the click."
          >
            <div className="bp-panel">
              <div className="ad-preview">
                <img src="/img/mock-06.png" alt="Ad creative built from the site design" loading="lazy" />
                <span className="ad-pill mono" style={{ left: 18, top: 18 }}>
                  Scroll-stop
                </span>
                <span className="ad-pill mono" style={{ right: 18, top: 58 }}>
                  Convert
                </span>
                <span className="ad-pill ad-shop mono" style={{ left: 18, bottom: 18 }}>
                  Shop now
                </span>
              </div>
            </div>
          </StepCard>

          <StepCard
            id="bp-card-03"
            n="03"
            title="One path, measured end to end"
            body="Land, hook, trust, buy — every step instrumented, so the next change is evidence, not opinion."
          >
            <div className="bp-panel bp-panel-03">
              <img src="/img/mock-07.png" alt="Funnel analytics dashboard for a client build" className="bp-panel-img" loading="lazy" />
              <div className="funnel">
                <span className="funnel-track" aria-hidden="true" />
                <span className="funnel-progress" aria-hidden="true" />
                {FUNNEL.map((s) => (
                  <span key={s.label} className={`funnel-step mono${s.done ? "" : " is-todo"}`}>
                    <i />
                    {s.label}
                  </span>
                ))}
              </div>
              <div className="status-row mono">
                <span>Path optimized</span>
                <span className="status-chip">Click → Checkout</span>
              </div>
            </div>
          </StepCard>
        </div>
      </div>
    </section>
  );
}
