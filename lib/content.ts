// All page copy and data in one place. Items marked "placeholder" in the
// design handoff are flagged inline.

export const CONTACT_EMAIL = "hello@yoursiteguy.com";
// TODO: replace with the real application form / Calendly route when available.
export const APPLY_HREF = `mailto:${CONTACT_EMAIL}`;
// TODO: replace with the real Instagram handle.
export const INSTAGRAM_HREF = "https://instagram.com";

export const NAV_LINKS = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#pricing", label: "Pricing" },
  { href: "#blueprint", label: "Blueprint" },
  { href: "#faq", label: "FAQ" },
];

export type PortfolioItem = { name: string; url: string; img: string };

export const PORTFOLIO_COL_A: PortfolioItem[] = [
  { name: "Leil Official", url: "https://leilofficial.shop/", img: "leil.png" },
  { name: "Mesui Oghanem", url: "https://mesuioghanem.com/", img: "mesiuoghanem.png" },
  { name: "By Fusool", url: "https://byfusool.com/", img: "mock-05.png" }, // placeholder image
  { name: "Younji", url: "https://younji.com/", img: "younij.png" },
];

export const PORTFOLIO_COL_B: PortfolioItem[] = [
  { name: "Fermina Store", url: "https://www.ferminastore.com/en-eg", img: "fermina.png" },
  { name: "Dubai Cosmetics USA", url: "https://dubaicosmeticsusa.com/", img: "dubai.png" },
  { name: "Only Superior Standard", url: "https://onlysuperiorstandard.com/", img: "mock-02.png" }, // placeholder image
  { name: "Artist Store", url: "https://artiststore.net", img: "artiststore.png" },
  { name: "The Jewellry Lady", url: "https://thejewellrylady.com/", img: "mock-01.png" }, // placeholder image
];

// Placeholder client names.
export const TRUST_NAMES = ["Halden", "Norr", "Sable", "Meridian", "Lume"];

export type PricingPlan = {
  title: string;
  desc: string;
  price: string;
  suffix: string;
  addon: { label: string; price: string; aria: string };
  features: string[];
};

export const PRICING: PricingPlan[] = [
  {
    title: "Conversion site",
    desc: "A five-page build engineered around one action.",
    price: "$6,400",
    suffix: "/starting",
    addon: { label: "Custom product visuals", price: "+$2,000", aria: "Add custom product visuals" },
    features: [
      "Five pages, fully bespoke",
      "Copy structure and offer framing",
      "Analytics and event tracking",
      "12-day delivery or it's free",
    ],
  },
  {
    title: "Full commerce",
    desc: "Storefront, PDP system, and checkout flow.",
    price: "$14,000",
    suffix: "/fixed",
    addon: { label: "Motion & WebGL layer", price: "+$3,500", aria: "Add motion and WebGL layer" },
    features: [
      "Design system and component library",
      "Product page templates",
      "Checkout and cart optimisation",
      "Six weeks post-launch support",
    ],
  },
];

export type Testimonial = {
  images: [{ src: string; alt: string }, { src: string; alt: string }];
  quote: string;
  name: string;
  role: string;
  metric: { label: string; value: string; delta: string; points: string };
};

// Placeholder testimonials.
export const TESTIMONIALS: Testimonial[] = [
  {
    images: [
      { src: "mock-01.png", alt: "Halden Type site, desktop view" },
      { src: "mock-03.png", alt: "Halden Type site, second view" },
    ],
    quote: '"We stopped explaining ourselves. The site does it, and the checkout numbers moved in a week."',
    name: "Ida Halden",
    role: "Founder, Halden",
    metric: { label: "Add to cart rate", value: "4.8%", delta: "↗ 146%", points: "0,26 18,20 34,23 52,14 70,16 88,8 106,10 120,3" },
  },
  {
    images: [
      { src: "mock-04.png", alt: "Norr Atelier site, desktop view" },
      { src: "mock-05.png", alt: "Norr Atelier site, second view" },
    ],
    quote: '"Twelve days, start to launch, and it looks nothing like our competitors. That was the whole brief."',
    name: "Petter Nord",
    role: "CMO, Norr",
    metric: { label: "Revenue per session", value: "$3.42", delta: "↗ 88%", points: "0,24 18,25 34,18 52,19 70,11 88,13 106,6 120,5" },
  },
  {
    images: [
      { src: "mock-06.png", alt: "Sable Roasters site, desktop view" },
      { src: "mock-02.png", alt: "Sable Roasters site, second view" },
    ],
    quote: '"He found the leak in our funnel before he opened a design file. Then he fixed both."',
    name: "Mara Sable",
    role: "Owner, Sable",
    metric: { label: "Subscription signups", value: "1,204", delta: "↗ 212%", points: "0,27 18,22 34,24 52,16 70,12 88,12 106,7 120,2" },
  },
  {
    images: [
      { src: "mock-02.png", alt: "Lume Skincare site, desktop view" },
      { src: "mock-01.png", alt: "Lume Skincare site, second view" },
    ],
    quote: '"Our ad spend finally lands somewhere that sells. Same traffic, very different month."',
    name: "Joss Lume",
    role: "Founder, Lume",
    metric: { label: "Blended ROAS", value: "3.9×", delta: "↗ 61%", points: "0,22 18,24 34,17 52,18 70,13 88,9 106,11 120,4" },
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "How can you launch in twelve days?",
    a: "Because the scope is fixed before we start and there's no handoff layer — one person designs and builds, so nothing waits in a queue.",
  },
  {
    q: "What happens if you miss the deadline?",
    a: "You don't pay. The only exception is a delay on your side — missing content or approvals pauses the clock, and I'll tell you the moment it happens.",
  },
  {
    q: "Do you write the copy?",
    a: "I write the structure, headlines, and offer framing. If you have a copywriter, they work inside that skeleton — it's what makes the page convert.",
  },
  {
    q: "Which platform do you build on?",
    a: "Shopify for commerce, Webflow for marketing sites, hand-coded when the interaction demands it. The platform follows the goal, never the reverse.",
  },
  {
    q: "Can you work with our in-house team?",
    a: "Yes — I hand over a documented component library and a Loom walkthrough, so your developers can extend the system without guessing.",
  },
  {
    q: "What do you need from me to start?",
    a: "Brand assets, product photography, and one decision-maker on the call. That's genuinely it.",
  },
];

export const MARQUEE = [
  "Design that converts",
  "Tech solutions end to end",
  "More sales for ecommerce brands",
  "Stop burning ad spend",
  "Integrations & automations",
  "We build revenue machines",
];

// Cube / motion tunables (ranges from the handoff in comments).
export const MOTION_CONFIG = {
  cubeSize: 1.15, // 0.6–2
  damping: 0.07, // 0.02–0.2
  spinPerPixel: 0.0022, // 0.0005–0.008
  driftX: 2.4, // 0.5–4
  scrollLerp: 0.08, // 0.03–0.2
};
