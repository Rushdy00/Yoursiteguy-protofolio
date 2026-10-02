// All page copy and data in one place. Items marked "placeholder" in the
// design handoff are flagged inline.

export const CONTACT_EMAIL = "hello@yoursiteguy.com";
// TODO: replace with the real application form / Calendly route when available.
export const APPLY_HREF = `mailto:${CONTACT_EMAIL}`;
// TODO: replace with the real Instagram handle.
export const INSTAGRAM_HREF = "https://instagram.com";

export const NAV_LINKS = [
  { href: "#portfolio", label: "أعمالنا" },
  { href: "#pricing", label: "الأسعار" },
  { href: "#blueprint", label: "المنهجية" },
  { href: "#faq", label: "الأسئلة الشائعة" },
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
    title: "موقع التحويل",
    desc: "موقع من خمس صفحات مبنيّ حول هدف واحد.",
    price: "$6,400",
    suffix: "/ابتداءً من",
    addon: { label: "صور منتجات مخصّصة", price: "+$2,000", aria: "إضافة صور منتجات مخصّصة" },
    features: [
      "خمس صفحات بتصميم خاص بالكامل",
      "هيكلة المحتوى وصياغة العرض",
      "تحليلات وتتبّع للأحداث",
      "تسليم خلال 12 يومًا أو مجانًا",
    ],
  },
  {
    title: "متجر متكامل",
    desc: "واجهة المتجر، ونظام صفحات المنتجات، ومسار الدفع.",
    price: "$14,000",
    suffix: "/سعر ثابت",
    addon: { label: "طبقة الحركة و WebGL", price: "+$3,500", aria: "إضافة طبقة الحركة و WebGL" },
    features: [
      "نظام تصميم ومكتبة مكوّنات",
      "قوالب صفحات المنتجات",
      "تحسين السلة وصفحة الدفع",
      "ستة أسابيع دعم بعد الإطلاق",
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
      { src: "mock-01.png", alt: "موقع Halden، عرض سطح المكتب" },
      { src: "mock-03.png", alt: "موقع Halden، عرض ثانٍ" },
    ],
    quote: "«توقّفنا عن شرح أنفسنا. الموقع يقوم بذلك عنّا، وتحرّكت أرقام الدفع خلال أسبوع.»",
    name: "Ida Halden",
    role: "مؤسِّسة، Halden",
    metric: { label: "معدّل الإضافة للسلة", value: "4.8%", delta: "↗ 146%", points: "0,26 18,20 34,23 52,14 70,16 88,8 106,10 120,3" },
  },
  {
    images: [
      { src: "mock-04.png", alt: "موقع Norr، عرض سطح المكتب" },
      { src: "mock-05.png", alt: "موقع Norr، عرض ثانٍ" },
    ],
    quote: "«اثنا عشر يومًا من البداية حتى الإطلاق، ولا يشبه أيًّا من منافسينا. وهذا كان المطلوب بالضبط.»",
    name: "Petter Nord",
    role: "مدير التسويق، Norr",
    metric: { label: "الإيراد لكل جلسة", value: "$3.42", delta: "↗ 88%", points: "0,24 18,25 34,18 52,19 70,11 88,13 106,6 120,5" },
  },
  {
    images: [
      { src: "mock-06.png", alt: "موقع Sable، عرض سطح المكتب" },
      { src: "mock-02.png", alt: "موقع Sable، عرض ثانٍ" },
    ],
    quote: "«وجد الثغرة في مسار المبيعات قبل أن يفتح ملف تصميم واحد. ثم أصلح الاثنين.»",
    name: "Mara Sable",
    role: "المالكة، Sable",
    metric: { label: "اشتراكات جديدة", value: "1,204", delta: "↗ 212%", points: "0,27 18,22 34,24 52,16 70,12 88,12 106,7 120,2" },
  },
  {
    images: [
      { src: "mock-02.png", alt: "موقع Lume، عرض سطح المكتب" },
      { src: "mock-01.png", alt: "موقع Lume، عرض ثانٍ" },
    ],
    quote: "«إنفاقنا الإعلاني أصبح أخيرًا يصل إلى مكان يبيع. نفس الزيارات، وشهر مختلف تمامًا.»",
    name: "Joss Lume",
    role: "مؤسِّس، Lume",
    metric: { label: "العائد على الإعلانات", value: "3.9×", delta: "↗ 61%", points: "0,22 18,24 34,17 52,18 70,13 88,9 106,11 120,4" },
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "كيف يمكنك الإطلاق خلال اثني عشر يومًا؟",
    a: "لأن نطاق العمل يُحدَّد قبل أن نبدأ، ولا توجد طبقة تسليم بين الفرق — شخص واحد يصمّم ويبني، فلا شيء ينتظر في طابور.",
  },
  {
    q: "ماذا يحدث إن تأخّرت عن الموعد؟",
    a: "لا تدفع شيئًا. الاستثناء الوحيد هو التأخير من جهتك — نقص المحتوى أو الموافقات يوقف العدّاد، وسأخبرك فور حدوث ذلك.",
  },
  {
    q: "هل تكتب المحتوى؟",
    a: "أكتب الهيكل والعناوين وصياغة العرض. إن كان لديك كاتب محتوى، فسيعمل داخل هذا الهيكل — وهذا ما يجعل الصفحة تبيع.",
  },
  {
    q: "على أي منصّة تبني؟",
    a: "Shopify للتجارة، و Webflow لمواقع التسويق، وبرمجة يدوية عندما يتطلّب التفاعل ذلك. المنصّة تتبع الهدف، لا العكس.",
  },
  {
    q: "هل يمكنك العمل مع فريقنا الداخلي؟",
    a: "نعم — أسلّمكم مكتبة مكوّنات موثّقة وشرحًا مصوّرًا، ليتمكّن مطوّروكم من توسيع النظام دون تخمين.",
  },
  {
    q: "ماذا تحتاج منّي للبدء؟",
    a: "هوية العلامة التجارية، وصور المنتجات، وصاحب قرار واحد في المكالمة. هذا كل شيء فعلًا.",
  },
];

export const MARQUEE = [
  "تصميم يبيع",
  "حلول تقنية متكاملة",
  "مبيعات أكثر لمتاجر التجارة الإلكترونية",
  "أوقف هدر ميزانية الإعلانات",
  "تكاملات وأتمتة",
  "نبني آلات للإيرادات",
];

// Cube / motion tunables (ranges from the handoff in comments).
export const MOTION_CONFIG = {
  cubeSize: 1.15, // 0.6–2
  damping: 0.07, // 0.02–0.2
  spinPerPixel: 0.0022, // 0.0005–0.008
  driftX: 2.4, // 0.5–4
  scrollLerp: 0.08, // 0.03–0.2
};
