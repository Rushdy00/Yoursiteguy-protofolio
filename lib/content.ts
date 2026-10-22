// Language-independent data. All wording (both languages) lives in lib/i18n.ts.
// Items marked "placeholder" in the design handoff are flagged inline.

export const CONTACT_EMAIL = "elsamamr167@gmail.com";
// Every CTA button opens a WhatsApp chat. Digits only, with country code (no "+", spaces or leading zeros).
export const WHATSAPP_NUMBER = "201151168110";
export const APPLY_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;
// TODO: replace with the real Instagram handle.
export const INSTAGRAM_HREF = "https://www.instagram.com/yoursiteguy/";

// Matches dict.testimonials.items by index. `site` is a lib/portfolio.json url (its screenshot is shown).
// Names, quotes and metrics are still placeholders.
export const TESTIMONIAL_DATA = [
  { name: "Ida Halden", site: "https://leilofficial.shop/", value: "4.8%", delta: "↗ 146%", points: "0,26 18,20 34,23 52,14 70,16 88,8 106,10 120,3" },
  { name: "Petter Nord", site: "https://www.ferminastore.com/en-eg", value: "$3.42", delta: "↗ 88%", points: "0,24 18,25 34,18 52,19 70,11 88,13 106,6 120,5" },
  { name: "Joss Lume", site: "https://dubaicosmeticsusa.com/", value: "3.9×", delta: "↗ 61%", points: "0,22 18,24 34,17 52,18 70,13 88,9 106,11 120,4" },
];

// Cube / motion tunables (ranges from the handoff in comments).
export const MOTION_CONFIG = {
  cubeSize: 1.15, // 0.6–2
  damping: 0.07, // 0.02–0.2
  spinPerPixel: 0.0022, // 0.0005–0.008
  driftX: 2.4, // 0.5–4
  scrollLerp: 0.08, // 0.03–0.2
};
