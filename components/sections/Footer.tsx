import { CONTACT_EMAIL, INSTAGRAM_HREF } from "@/lib/content";
import type { Dict } from "@/lib/i18n";
import { Clock } from "../Interactive";

export function Marquee({ t }: { t: Dict }) {
  const group = (
    <span className="marquee-group mono">
      {t.marquee.flatMap((m) => [<span key={m}>{m}</span>, <span key={m + "•"}>•</span>])}
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

export default function Footer({ t }: { t: Dict }) {
  const f = t.footer;
  return (
    <footer className="footer">
      <div className="footer-veil" aria-hidden="true" />
      <div className="wrap" style={{ position: "relative", maxWidth: 1300 }}>
        <div className="footer-top">
          <div className="clocks">
            <div>
              <p className="f-label mono">{f.ourTime}</p>
              <Clock timeZone="Europe/Lisbon" />
            </div>
            <div>
              <p className="f-label mono">{f.yourTime}</p>
              <Clock />
            </div>
          </div>
          <div className="contact">
            <div>
              <p className="f-label mono">{f.email}</p>
              <a href={`mailto:${CONTACT_EMAIL}`} lang="en">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <p className="f-label mono">{f.social}</p>
              <a href={INSTAGRAM_HREF} lang="en">
                Instagram
              </a>
            </div>
            <div>
              <p className="f-label mono">{f.location}</p>
              <span>{f.locationValue}</span>
            </div>
          </div>
        </div>
        <div className="footer-bar mono">
          <span>
            <bdi dir="ltr">© 2026 yoursiteguy.</bdi> {f.rights}
          </span>
          <a href="#top">{f.backToTop}</a>
        </div>
        <p className="watermark" aria-hidden="true" dir="ltr" lang="en">
          yoursiteguy<span>Creative</span>
        </p>
      </div>
    </footer>
  );
}
