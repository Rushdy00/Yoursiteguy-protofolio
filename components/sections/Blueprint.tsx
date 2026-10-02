/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { Accent, Eyebrow } from "../ui";

const SWATCHES = ["#6E7A75", "#DDE2E0", "#2C332F", "#E8ECEA", "#C3CAC7", "#CDD3D1"];
const FUNNEL = [
  { label: "الوصول", done: true },
  { label: "الجذب", done: true },
  { label: "الثقة", done: true },
  { label: "الشراء", done: false },
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
        <Eyebrow>004 — المنهجية</Eyebrow>
        <h2 id="bp-head" data-rv="" className="display bp-head">
          حسِّن نتائج إعلاناتك في <Accent>3 خطوات بسيطة.</Accent>
        </h2>
        <div className="bp-stack">
          <StepCard
            n="01"
            title="اتجاه واضح من المحاولة الأولى"
            body="لوحة إلهام واحدة، وثلاثة اتجاهات مسمّاة، واختيار واحد. بلا جولات مراجعة لا تنتهي، وبلا تشتّت."
          >
            <div className="bp-panel">
              <img src="/img/mock-08.png" alt="الاتجاه المختار مطبّقًا على صفحة منتج" className="bp-panel-img" loading="lazy" />
              <div className="swatches">
                {SWATCHES.map((c) => (
                  <span key={c} style={{ background: c }} />
                ))}
              </div>
              <div className="chips">
                {["جمالية تحريرية", "تجربة سلسة", "عرض جذّاب"].map((c) => (
                  <span key={c} className="chip mono">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </StepCard>

          <StepCard
            n="02"
            title="محتوى يوقف التمرير"
            body="الصفحة والإعلان يُبنيان كنظام واحد، فيبقى وعد الإعلان حاضرًا بعد النقرة."
          >
            <div className="bp-panel">
              <div className="ad-preview">
                <img src="/img/mock-06.png" alt="إعلان مبنيّ من تصميم الموقع" loading="lazy" />
                <span className="ad-pill mono" style={{ insetInlineStart: 18, top: 18 }}>
                  يوقف التمرير
                </span>
                <span className="ad-pill mono" style={{ insetInlineEnd: 18, top: 58 }}>
                  يحوّل
                </span>
                <span className="ad-pill ad-shop mono" style={{ insetInlineStart: 18, bottom: 18 }}>
                  تسوّق الآن
                </span>
              </div>
            </div>
          </StepCard>

          <StepCard
            id="bp-card-03"
            n="03"
            title="مسار واحد، مُقاس من البداية للنهاية"
            body="الوصول، الجذب، الثقة، الشراء — كل خطوة مُتتبَّعة، فيصبح التغيير القادم مبنيًّا على دليل لا على رأي."
          >
            <div className="bp-panel bp-panel-03">
              <img src="/img/mock-07.png" alt="لوحة تحليلات مسار المبيعات لأحد العملاء" className="bp-panel-img" loading="lazy" />
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
                <span>المسار مُحسَّن</span>
                <span className="status-chip">نقرة ← الدفع</span>
              </div>
            </div>
          </StepCard>
        </div>
      </div>
    </section>
  );
}
