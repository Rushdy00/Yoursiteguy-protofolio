// All page copy for both languages. English lives at "/", Arabic at "/ar".
// Shared, language-independent data (links, prices, chart points) is in content.ts.

export type Locale = "en" | "ar";

/** A heading with an italic-serif accent word: `{line1}<br/>{before}<accent>{after}`. */
export type Heading = { line1?: string; before?: string; accent: string; after?: string };

type Testimonial = { quote: string; role: string; metric: string; alts: [string, string] };
type Plan = {
  title: string;
  desc: string;
  suffix: string;
  addon: string;
  addonAria: string;
  features: string[];
};
type Step = { title: string; body: string; alt: string };

export type Dict = {
  locale: Locale;
  dir: "ltr" | "rtl";
  meta: { title: string; description: string };
  langSwitch: { label: string; href: string; aria: string };
  nav: { href: string; label: string }[];
  menu: { open: string; close: string; label: string };
  sound: { on: string; off: string; aria: string };
  cta: { apply: string; steps: [string, string, string]; scarcity: string };
  hero: { eyebrow: string; title: Heading; tagline: string; sub: string };
  portfolio: { pill: string; title: Heading; intro: (count: number) => string; explore: string; cardAlt: (name: string) => string; arrow: string; exploreArrow: string };
  trust: { label: string; statement: Heading; figureAlt: string; projects: string };
  pricing: { pill: string; title: Heading; book: string; plans: [Plan, Plan] };
  testimonials: { title: Heading; dotLabel: (i: number) => string; items: Testimonial[] };
  problem: { eyebrow: string; title: Heading; body: { before: string; strong: string; after: string }; figureAlt: string };
  blueprint: {
    eyebrow: string;
    title: Heading;
    steps: [Step, Step, Step];
    chips: [string, string, string];
    adPills: [string, string, string];
    funnel: [string, string, string, string];
    status: string;
    statusChip: string;
  };
  ready: { eyebrow: string; title: Heading; body: string; collageAlts: [string, string, string] };
  faq: { eyebrow: string; title: Heading; intro: string; items: { q: string; a: string }[] };
  marquee: string[];
  footer: {
    ourTime: string;
    yourTime: string;
    email: string;
    social: string;
    location: string;
    locationValue: string;
    rights: string;
    backToTop: string;
  };
};

const NAV_HREFS = ["#portfolio", "#pricing", "#blueprint", "#faq"];
const nav = (labels: string[]) => labels.map((label, i) => ({ href: NAV_HREFS[i], label }));

const en: Dict = {
  locale: "en",
  dir: "ltr",
  meta: {
    title: "yoursiteguy Creative — Premium custom websites for consumer brands",
    description:
      "Conversion-focused websites and end-to-end tech for ecommerce brands — storefronts, integrations, automations and analytics. Live in 12 days, or you don't pay.",
  },
  langSwitch: { label: "عربي", href: "/ar/", aria: "اقرأ الموقع بالعربية" },
  nav: nav(["Portfolio", "Pricing", "Blueprint", "FAQ"]),
  menu: { open: "Open menu", close: "Close menu", label: "Menu" },
  sound: { on: "Sound on", off: "Sound off", aria: "Toggle motion sound" },
  cta: {
    apply: "Apply for a build",
    steps: ["Short form", "Quick call", "More sales"],
    scarcity: "Apply now — only a few slots remaining",
  },
  hero: {
    eyebrow: "000 — Tech solutions for ecommerce growth",
    title: { line1: "Premium custom websites", before: "for ", accent: "consumer", after: " brands" },
    tagline: "Live in 12 days, or you don't pay.",
    sub: "Beyond websites, we handle tech end to end — storefronts, integrations, automations and analytics — so ecommerce brands sell more with less friction.",
  },
  portfolio: {
    pill: "002 — Portfolio",
    title: { before: "Engineered for ", accent: "conversions" },
    intro: (n) => {
      const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
      return `${words[n] ?? n} builds, one pattern: strip the friction, sharpen the offer, let the design carry the argument. Every site below shipped inside two weeks.`;
    },
    explore: "Explore full portfolio",
    cardAlt: (name) => `${name} website`,
    arrow: "↗",
    exploreArrow: "→",
  },
  trust: {
    label: "We are certified",
    statement: { before: "Shopify and Webflow partner builds, measured against ", accent: "revenue, not applause." },
    figureAlt: "Client revenue dashboard after launch",
    projects: "Projects delivered",
  },
  pricing: {
    pill: "001 — Pricing",
    title: { before: "Built to ", accent: "convert." },
    book: "Book a call",
    plans: [
      {
        title: "Conversion site",
        desc: "A five-page build engineered around one action.",
        suffix: "/starting",
        addon: "Custom product visuals",
        addonAria: "Add custom product visuals",
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
        suffix: "/fixed",
        addon: "Motion & WebGL layer",
        addonAria: "Add motion and WebGL layer",
        features: [
          "Design system and component library",
          "Product page templates",
          "Checkout and cart optimisation",
          "Six weeks post-launch support",
        ],
      },
    ],
  },
  testimonials: {
    title: { before: "Receipts, not ", accent: "adjectives." },
    dotLabel: (i) => `Go to testimonial ${i}`,
    items: [
      {
        quote: '"We stopped explaining ourselves. The site does it, and the checkout numbers moved in a week."',
        role: "Founder, Halden",
        metric: "Add to cart rate",
        alts: ["Halden Type site, desktop view", "Halden Type site, second view"],
      },
      {
        quote: '"Twelve days, start to launch, and it looks nothing like our competitors. That was the whole brief."',
        role: "CMO, Norr",
        metric: "Revenue per session",
        alts: ["Norr Atelier site, desktop view", "Norr Atelier site, second view"],
      },
      {
        quote: '"He found the leak in our funnel before he opened a design file. Then he fixed both."',
        role: "Owner, Sable",
        metric: "Subscription signups",
        alts: ["Sable Roasters site, desktop view", "Sable Roasters site, second view"],
      },
      {
        quote: '"Our ad spend finally lands somewhere that sells. Same traffic, very different month."',
        role: "Founder, Lume",
        metric: "Blended ROAS",
        alts: ["Lume Skincare site, desktop view", "Lume Skincare site, second view"],
      },
    ],
  },
  problem: {
    eyebrow: "003 — The problem",
    title: { line1: "Stunning aesthetics.", accent: "Ruthless conversions." },
    body: {
      before: "Most studios hand you a beautiful site that quietly loses money. ",
      strong: "Pretty is the baseline, not the product.",
      after: " The build starts with the funnel, then earns its looks.",
    },
    figureAlt: "Client site shown on a laptop",
  },
  blueprint: {
    eyebrow: "004 — The blueprint",
    title: { before: "Improve ad results in ", accent: "3 simple steps." },
    steps: [
      {
        title: "Direction, decided in one pass",
        body: "A single moodboard, three named directions, one chosen. No committee rounds, no drift.",
        alt: "Chosen direction applied to a product page",
      },
      {
        title: "Creative that stops the scroll",
        body: "The page and the ad are built as one system, so the promise in the feed survives the click.",
        alt: "Ad creative built from the site design",
      },
      {
        title: "One path, measured end to end",
        body: "Land, hook, trust, buy — every step instrumented, so the next change is evidence, not opinion.",
        alt: "Funnel analytics dashboard for a client build",
      },
    ],
    chips: ["Aesthetic Editorial", "Flow Frictionless", "Offer Magnetic"],
    adPills: ["Scroll-stop", "Convert", "Shop now"],
    funnel: ["Land", "Hook", "Trust", "Buy"],
    status: "Path optimized",
    statusChip: "Click → Checkout",
  },
  ready: {
    eyebrow: "005 — Ready to scale",
    title: { before: "Your next site should pay for ", accent: "itself." },
    body: "Two build slots open each month. Send the form, we talk for twenty minutes, and you get a plan whether or not you hire me.",
    collageAlts: ["Client site collage, one", "Client site collage, two", "Client site collage, three"],
  },
  faq: {
    eyebrow: "006 — FAQ",
    title: { before: "Common ", accent: "questions" },
    intro: "If yours isn't here, email me — you'll get an answer from me, not a form response.",
    items: [
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
    ],
  },
  marquee: [
    "Design that converts",
    "Tech solutions end to end",
    "More sales for ecommerce brands",
    "Stop burning ad spend",
    "Integrations & automations",
    "We build revenue machines",
  ],
  footer: {
    ourTime: "Our time — Lisbon",
    yourTime: "Your time",
    email: "Email",
    social: "Social",
    location: "Location",
    locationValue: "Lisbon, remote worldwide",
    rights: "All rights reserved.",
    backToTop: "Back to top ↑",
  },
};

const ar: Dict = {
  locale: "ar",
  dir: "rtl",
  meta: {
    title: "yoursiteguy Creative — مواقع مخصّصة فاخرة للعلامات الاستهلاكية",
    description:
      "مواقع مصمَّمة للتحويل وحلول تقنية متكاملة لمتاجر التجارة الإلكترونية — المتاجر، والتكاملات، والأتمتة، والتحليلات. جاهز خلال 12 يومًا، أو لا تدفع شيئًا.",
  },
  langSwitch: { label: "EN", href: "/", aria: "Read this site in English" },
  nav: nav(["أعمالنا", "الأسعار", "المنهجية", "الأسئلة الشائعة"]),
  menu: { open: "فتح القائمة", close: "إغلاق القائمة", label: "القائمة" },
  sound: { on: "الصوت مُفعّل", off: "الصوت مُطفأ", aria: "تشغيل أو إيقاف صوت الحركة" },
  cta: {
    apply: "قدّم طلبك الآن",
    steps: ["نموذج قصير", "مكالمة سريعة", "مبيعات أكثر"],
    scarcity: "قدّم الآن — بقيت أماكن قليلة فقط",
  },
  hero: {
    eyebrow: "000 — حلول تقنية لنمو التجارة الإلكترونية",
    title: { line1: "مواقع مخصّصة فاخرة", before: "للعلامات ", accent: "الاستهلاكية" },
    tagline: "جاهز خلال 12 يومًا، أو لا تدفع شيئًا.",
    sub: "إلى جانب المواقع، نتولّى التقنية من البداية إلى النهاية — المتاجر، والتكاملات، والأتمتة، والتحليلات — لتبيع علامات التجارة الإلكترونية أكثر وبجهد أقل.",
  },
  portfolio: {
    pill: "002 — أعمالنا",
    title: { before: "مصمَّمة لرفع ", accent: "التحويلات" },
    // Arabic plural agreement: 3–10 → مشاريع, 11+ → مشروعًا.
    intro: (n) =>
      `${n <= 10 ? `${n} مشاريع` : `${n} مشروعًا`}، ونهج واحد: أزِل العوائق، وقوِّ العرض، ودَع التصميم يُقنع العميل. كل موقع هنا أُطلق في أقل من أسبوعين.`,
    explore: "استكشف كل الأعمال",
    cardAlt: (name) => `موقع ${name}`,
    arrow: "↖",
    exploreArrow: "←",
  },
  trust: {
    label: "شركاء معتمدون",
    statement: { before: "مواقع مبنية بشراكة مع Shopify و Webflow، تُقاس ", accent: "بالإيرادات لا بالتصفيق." },
    figureAlt: "لوحة إيرادات أحد العملاء بعد الإطلاق",
    projects: "مشروع منجز",
  },
  pricing: {
    pill: "001 — الأسعار",
    title: { before: "مبنيّ ", accent: "ليبيع." },
    book: "احجز مكالمة",
    plans: [
      {
        title: "موقع التحويل",
        desc: "موقع من خمس صفحات مبنيّ حول هدف واحد.",
        suffix: "/ابتداءً من",
        addon: "صور منتجات مخصّصة",
        addonAria: "إضافة صور منتجات مخصّصة",
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
        suffix: "/سعر ثابت",
        addon: "طبقة الحركة و WebGL",
        addonAria: "إضافة طبقة الحركة و WebGL",
        features: [
          "نظام تصميم ومكتبة مكوّنات",
          "قوالب صفحات المنتجات",
          "تحسين السلة وصفحة الدفع",
          "ستة أسابيع دعم بعد الإطلاق",
        ],
      },
    ],
  },
  testimonials: {
    title: { before: "أرقام، لا ", accent: "مجاملات." },
    dotLabel: (i) => `انتقل إلى الشهادة ${i}`,
    items: [
      {
        quote: "«توقّفنا عن شرح أنفسنا. الموقع يقوم بذلك عنّا، وتحرّكت أرقام الدفع خلال أسبوع.»",
        role: "مؤسِّسة، Halden",
        metric: "معدّل الإضافة للسلة",
        alts: ["موقع Halden، عرض سطح المكتب", "موقع Halden، عرض ثانٍ"],
      },
      {
        quote: "«اثنا عشر يومًا من البداية حتى الإطلاق، ولا يشبه أيًّا من منافسينا. وهذا كان المطلوب بالضبط.»",
        role: "مدير التسويق، Norr",
        metric: "الإيراد لكل جلسة",
        alts: ["موقع Norr، عرض سطح المكتب", "موقع Norr، عرض ثانٍ"],
      },
      {
        quote: "«وجد الثغرة في مسار المبيعات قبل أن يفتح ملف تصميم واحد. ثم أصلح الاثنين.»",
        role: "المالكة، Sable",
        metric: "اشتراكات جديدة",
        alts: ["موقع Sable، عرض سطح المكتب", "موقع Sable، عرض ثانٍ"],
      },
      {
        quote: "«إنفاقنا الإعلاني أصبح أخيرًا يصل إلى مكان يبيع. نفس الزيارات، وشهر مختلف تمامًا.»",
        role: "مؤسِّس، Lume",
        metric: "العائد على الإعلانات",
        alts: ["موقع Lume، عرض سطح المكتب", "موقع Lume، عرض ثانٍ"],
      },
    ],
  },
  problem: {
    eyebrow: "003 — المشكلة",
    title: { line1: "تصميم مُبهر.", accent: "ومبيعات لا تُقاوَم." },
    body: {
      before: "معظم الاستوديوهات تسلّمك موقعًا جميلًا يخسر المال بصمت. ",
      strong: "الجمال هو الحد الأدنى، لا المنتج.",
      after: " نبدأ البناء من مسار المبيعات، ثم نمنحه جماله.",
    },
    figureAlt: "موقع أحد العملاء على شاشة حاسوب محمول",
  },
  blueprint: {
    eyebrow: "004 — المنهجية",
    title: { before: "حسِّن نتائج إعلاناتك في ", accent: "3 خطوات بسيطة." },
    steps: [
      {
        title: "اتجاه واضح من المحاولة الأولى",
        body: "لوحة إلهام واحدة، وثلاثة اتجاهات مسمّاة، واختيار واحد. بلا جولات مراجعة لا تنتهي، وبلا تشتّت.",
        alt: "الاتجاه المختار مطبّقًا على صفحة منتج",
      },
      {
        title: "محتوى يوقف التمرير",
        body: "الصفحة والإعلان يُبنيان كنظام واحد، فيبقى وعد الإعلان حاضرًا بعد النقرة.",
        alt: "إعلان مبنيّ من تصميم الموقع",
      },
      {
        title: "مسار واحد، مُقاس من البداية للنهاية",
        body: "الوصول، الجذب، الثقة، الشراء — كل خطوة مُتتبَّعة، فيصبح التغيير القادم مبنيًّا على دليل لا على رأي.",
        alt: "لوحة تحليلات مسار المبيعات لأحد العملاء",
      },
    ],
    chips: ["جمالية تحريرية", "تجربة سلسة", "عرض جذّاب"],
    adPills: ["يوقف التمرير", "يحوّل", "تسوّق الآن"],
    funnel: ["الوصول", "الجذب", "الثقة", "الشراء"],
    status: "المسار مُحسَّن",
    statusChip: "نقرة ← الدفع",
  },
  ready: {
    eyebrow: "005 — جاهز للنمو",
    title: { before: "موقعك القادم يجب أن يدفع ", accent: "ثمنه بنفسه." },
    body: "مكانان فقط متاحان كل شهر. أرسل النموذج، نتحدّث لعشرين دقيقة، وتحصل على خطة واضحة سواء عملت معي أم لا.",
    collageAlts: ["مجموعة مواقع العملاء، الأولى", "مجموعة مواقع العملاء، الثانية", "مجموعة مواقع العملاء، الثالثة"],
  },
  faq: {
    eyebrow: "006 — الأسئلة الشائعة",
    title: { before: "أسئلة ", accent: "شائعة" },
    intro: "إن لم تجد سؤالك هنا، راسلني — ستحصل على إجابة منّي شخصيًا، لا ردًّا آليًا.",
    items: [
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
    ],
  },
  marquee: [
    "تصميم يبيع",
    "حلول تقنية متكاملة",
    "مبيعات أكثر لمتاجر التجارة الإلكترونية",
    "أوقف هدر ميزانية الإعلانات",
    "تكاملات وأتمتة",
    "نبني آلات للإيرادات",
  ],
  footer: {
    ourTime: "توقيتنا — لشبونة",
    yourTime: "توقيتك",
    email: "البريد الإلكتروني",
    social: "التواصل الاجتماعي",
    location: "الموقع",
    locationValue: "لشبونة، ونعمل عن بُعد حول العالم",
    rights: "جميع الحقوق محفوظة.",
    backToTop: "العودة للأعلى ↑",
  },
};

export const dictionaries: Record<Locale, Dict> = { en, ar };
