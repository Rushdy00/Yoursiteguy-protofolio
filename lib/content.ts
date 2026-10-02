// Language-independent data. All wording (both languages) lives in lib/i18n.ts.
// Items marked "placeholder" in the design handoff are flagged inline.

export const CONTACT_EMAIL = "hello@yoursiteguy.com";
// TODO: replace with the real application form / Calendly route when available.
export const APPLY_HREF = `mailto:${CONTACT_EMAIL}`;
// TODO: replace with the real Instagram handle.
export const INSTAGRAM_HREF = "https://instagram.com";

// Placeholder client names.
export const TRUST_NAMES = ["Halden", "Norr", "Sable", "Meridian", "Lume"];

// Matches dict.pricing.plans by index.
export const PRICES = [
  { price: "$6,400", addon: "+$2,000" },
  { price: "$14,000", addon: "+$3,500" },
];

// Placeholder testimonials; matches dict.testimonials.items by index.
export const TESTIMONIAL_DATA = [
  { name: "Ida Halden", images: ["mock-01.png", "mock-03.png"], value: "4.8%", delta: "↗ 146%", points: "0,26 18,20 34,23 52,14 70,16 88,8 106,10 120,3" },
  { name: "Petter Nord", images: ["mock-04.png", "mock-05.png"], value: "$3.42", delta: "↗ 88%", points: "0,24 18,25 34,18 52,19 70,11 88,13 106,6 120,5" },
  { name: "Mara Sable", images: ["mock-06.png", "mock-02.png"], value: "1,204", delta: "↗ 212%", points: "0,27 18,22 34,24 52,16 70,12 88,12 106,7 120,2" },
  { name: "Joss Lume", images: ["mock-02.png", "mock-01.png"], value: "3.9×", delta: "↗ 61%", points: "0,22 18,24 34,17 52,18 70,13 88,9 106,11 120,4" },
];

// Cube / motion tunables (ranges from the handoff in comments).
export const MOTION_CONFIG = {
  cubeSize: 1.15, // 0.6–2
  damping: 0.07, // 0.02–0.2
  spinPerPixel: 0.0022, // 0.0005–0.008
  driftX: 2.4, // 0.5–4
  scrollLerp: 0.08, // 0.03–0.2
};
