import { FaqList } from "../Interactive";
import { Accent, Eyebrow } from "../ui";

export default function Faq() {
  return (
    <section id="faq" className="faq">
      <div className="wrap" style={{ maxWidth: 1200 }}>
        <Eyebrow>006 — FAQ</Eyebrow>
        <div className="head-row" style={{ marginBottom: "7vh" }}>
          <h2 data-rv="" className="display h2">
            Common <Accent>questions</Accent>
          </h2>
          <p data-rv="" className="faq-intro">
            If yours isn&apos;t here, email me — you&apos;ll get an answer from me, not a form response.
          </p>
        </div>
        <FaqList />
      </div>
    </section>
  );
}
