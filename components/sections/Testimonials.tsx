import { Carousel } from "../Interactive";
import { Accent } from "../ui";

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="wrap" style={{ maxWidth: 1400, padding: "0 var(--px)" }}>
        <h2 data-rv="" className="display">
          أرقام، لا <Accent>مجاملات.</Accent>
        </h2>
      </div>
      <Carousel />
    </section>
  );
}
