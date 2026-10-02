import type { Dict } from "@/lib/i18n";
import { FaqList } from "../Interactive";
import { Eyebrow, HeadingText } from "../ui";

export default function Faq({ t }: { t: Dict }) {
  return (
    <section id="faq" className="faq">
      <div className="wrap" style={{ maxWidth: 1200 }}>
        <Eyebrow>{t.faq.eyebrow}</Eyebrow>
        <div className="head-row" style={{ marginBottom: "7vh" }}>
          <h2 data-rv="" className="display h2">
            <HeadingText h={t.faq.title} />
          </h2>
          <p data-rv="" className="faq-intro">
            {t.faq.intro}
          </p>
        </div>
        <FaqList items={t.faq.items} />
      </div>
    </section>
  );
}
