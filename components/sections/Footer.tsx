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
              <p className="f-label mono">Our time — Lisbon</p>
              <Clock timeZone="Europe/Lisbon" />
            </div>
            <div>
              <p className="f-label mono">Your time</p>
              <Clock />
            </div>
          </div>
          <div className="contact">
            <div>
              <p className="f-label mono">Email</p>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
            <div>
              <p className="f-label mono">Social</p>
              <a href={INSTAGRAM_HREF}>Instagram</a>
            </div>
            <div>
              <p className="f-label mono">Location</p>
              <span>Lisbon, remote worldwide</span>
            </div>
          </div>
        </div>
        <div className="footer-bar mono">
          <span>© 2026 yoursiteguy. All rights reserved.</span>
          <a href="#top">Back to top ↑</a>
        </div>
        <p className="watermark" aria-hidden="true">
          yoursiteguy<span>Creative</span>
        </p>
      </div>
    </footer>
  );
}
