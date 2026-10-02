import { CONTACT_EMAIL, INSTAGRAM_HREF, MARQUEE } from "@/lib/content";
import { Clock } from "../Interactive";

export function Marquee() {
  const group = (
    <span className="marquee-group mono">
      {MARQUEE.flatMap((m) => [<span key={m}>{m}</span>, <span key={m + "•"}>•</span>])}
    </span>
  );
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {group}
        {group}
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-veil" aria-hidden="true" />
      <div className="wrap" style={{ position: "relative", maxWidth: 1300 }}>
        <div className="footer-top">
          <div className="clocks">
            <div>
              <p className="f-label mono">توقيتنا — لشبونة</p>
              <Clock timeZone="Europe/Lisbon" />
            </div>
            <div>
              <p className="f-label mono">توقيتك</p>
              <Clock />
            </div>
          </div>
          <div className="contact">
            <div>
              <p className="f-label mono">البريد الإلكتروني</p>
              <a href={`mailto:${CONTACT_EMAIL}`} lang="en">{CONTACT_EMAIL}</a>
            </div>
            <div>
              <p className="f-label mono">التواصل الاجتماعي</p>
              <a href={INSTAGRAM_HREF}>Instagram</a>
            </div>
            <div>
              <p className="f-label mono">الموقع</p>
              <span>لشبونة، ونعمل عن بُعد حول العالم</span>
            </div>
          </div>
        </div>
        <div className="footer-bar mono">
          <span>
            <bdi dir="ltr">© 2026 yoursiteguy</bdi> — جميع الحقوق محفوظة.
          </span>
          <a href="#top">العودة للأعلى ↑</a>
        </div>
        <p className="watermark" aria-hidden="true" dir="ltr" lang="en">
          yoursiteguy<span>Creative</span>
        </p>
      </div>
    </footer>
  );
}
