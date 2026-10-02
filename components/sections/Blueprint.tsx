/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import type { Dict } from "@/lib/i18n";
import { Eyebrow, HeadingText } from "../ui";

const SWATCHES = ["#6E7A75", "#DDE2E0", "#2C332F", "#E8ECEA", "#C3CAC7", "#CDD3D1"];

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

export default function Blueprint({ t }: { t: Dict }) {
  const b = t.blueprint;
  const [s1, s2, s3] = b.steps;
  return (
    <section id="blueprint" className="section">
      <div className="wrap" style={{ maxWidth: 1300 }}>
        <Eyebrow>{b.eyebrow}</Eyebrow>
        <h2 id="bp-head" data-rv="" className="display bp-head">
          <HeadingText h={b.title} />
        </h2>
        <div className="bp-stack">
          <StepCard n="01" title={s1.title} body={s1.body}>
            <div className="bp-panel">
              <img src="/img/mock-08.png" alt={s1.alt} className="bp-panel-img" loading="lazy" />
              <div className="swatches">
                {SWATCHES.map((c) => (
                  <span key={c} style={{ background: c }} />
                ))}
              </div>
              <div className="chips">
                {b.chips.map((c) => (
                  <span key={c} className="chip mono">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </StepCard>

          <StepCard n="02" title={s2.title} body={s2.body}>
            <div className="bp-panel">
              <div className="ad-preview">
                <img src="/img/mock-06.png" alt={s2.alt} loading="lazy" />
                <span className="ad-pill mono" style={{ insetInlineStart: 18, top: 18 }}>
                  {b.adPills[0]}
                </span>
                <span className="ad-pill mono" style={{ insetInlineEnd: 18, top: 58 }}>
                  {b.adPills[1]}
                </span>
                <span className="ad-pill ad-shop mono" style={{ insetInlineStart: 18, bottom: 18 }}>
                  {b.adPills[2]}
                </span>
              </div>
            </div>
          </StepCard>

          <StepCard id="bp-card-03" n="03" title={s3.title} body={s3.body}>
            <div className="bp-panel bp-panel-03">
              <img src="/img/mock-07.png" alt={s3.alt} className="bp-panel-img" loading="lazy" />
              <div className="funnel">
                <span className="funnel-track" aria-hidden="true" />
                <span className="funnel-progress" aria-hidden="true" />
                {b.funnel.map((label, i) => (
                  <span key={label} className={`funnel-step mono${i < 3 ? "" : " is-todo"}`}>
                    <i />
                    {label}
                  </span>
                ))}
              </div>
              <div className="status-row mono">
                <span>{b.status}</span>
                <span className="status-chip">{b.statusChip}</span>
              </div>
            </div>
          </StepCard>
        </div>
      </div>
    </section>
  );
}
