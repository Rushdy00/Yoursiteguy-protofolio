import { FaqList } from "../Interactive";
import { Accent, Eyebrow } from "../ui";

export default function Faq() {
  return (
    <section id="faq" className="faq">
      <div className="wrap" style={{ maxWidth: 1200 }}>
        <Eyebrow>006 — الأسئلة الشائعة</Eyebrow>
        <div className="head-row" style={{ marginBottom: "7vh" }}>
          <h2 data-rv="" className="display h2">
            أسئلة <Accent>شائعة</Accent>
          </h2>
          <p data-rv="" className="faq-intro">
            إن لم تجد سؤالك هنا، راسلني — ستحصل على إجابة منّي شخصيًا، لا ردًّا آليًا.
          </p>
        </div>
        <FaqList />
      </div>
    </section>
  );
}
