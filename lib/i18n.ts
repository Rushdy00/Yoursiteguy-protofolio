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
  hero: { eyebrow: string; title: Heading; tagline: string; sub: string; shopify?: { line: Heading; badgeAlt: string } };
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
    shopify: {
      line: { line1: "Get your ecommerce website built by", accent: "a Shopify expert agency" },
      badgeAlt: "Shopify Partners and Shopify Experts",
    },
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

// Egyptian Arabic — professional register (colloquial phrasing, no slang).
const ar: Dict = {
  locale: "ar",
  dir: "rtl",
  meta: {
    title: "yoursiteguy Creative — مواقع فاخرة متفصّلة على مقاس البراند بتاعك",
    description:
      "مواقع معمولة عشان تبيع، وحلول تقنية كاملة للمتاجر الأونلاين — المتاجر، وربط الأنظمة، والأتمتة، والتحليلات. الموقع جاهز في 12 يوم، أو مش هتدفع حاجة.",
  },
  langSwitch: { label: "EN", href: "/", aria: "Read this site in English" },
  nav: nav(["شغلنا", "الأسعار", "خطة الشغل", "أسئلة متكررة"]),
  menu: { open: "فتح القائمة", close: "قفل القائمة", label: "القائمة" },
  sound: { on: "الصوت شغّال", off: "الصوت مقفول", aria: "تشغيل أو قفل صوت الحركة" },
  cta: {
    apply: "قدّم دلوقتي",
    steps: ["فورم قصير", "مكالمة سريعة", "مبيعات أكتر"],
    scarcity: "قدّم دلوقتي — الأماكن المتاحة قليلة",
  },
  hero: {
    eyebrow: "000 — حلول تقنية تكبّر تجارتك الأونلاين",
    title: { line1: "مواقع فاخرة متفصّلة", before: "على مقاس ", accent: "البراند", after: " بتاعك" },
    tagline: "الموقع جاهز في 12 يوم، أو مش هتدفع حاجة.",
    sub: "بنعمل مواقع بتبيع لعملائك. ومش بس مواقع — إحنا بنمسك الجانب التقني كله من الأول للآخر: المتاجر، وربط الأنظمة، والأتمتة، والتحليلات، عشان البراندات الأونلاين تبيع أكتر بمجهود أقل.",
    shopify: {
      line: { line1: "احصل على موقع التجارة الإلكترونية الخاص بك بواسطة", accent: "وكالة خبيرة في Shopify" },
      badgeAlt: "Shopify Partners و Shopify Experts",
    },
  },
  portfolio: {
    pill: "002 — شغلنا",
    title: { before: "معمولة عشان ", accent: "تبيع" },
    // 3–10 → مشاريع, 11+ → مشروع (Egyptian usage).
    intro: (n) =>
      `${n <= 10 ? `${n} مشاريع` : `${n} مشروع`}، والطريقة واحدة: نشيل أي حاجة بتعطّل العميل، نقوّي العرض، ونسيب التصميم هو اللي يقنع. كل موقع هنا اتسلّم في أقل من أسبوعين.`,
    explore: "شوف كل الشغل",
    cardAlt: (name) => `موقع ${name}`,
    arrow: "↖",
    exploreArrow: "←",
  },
  trust: {
    label: "شركاء معتمدين",
    statement: { before: "مواقع بنبنيها كشركاء معتمدين من Shopify و Webflow، ومقياسنا ", accent: "المبيعات مش التصفيق." },
    figureAlt: "داشبورد مبيعات عميل بعد الإطلاق",
    projects: "مشروع اتسلّم",
  },
  pricing: {
    pill: "001 — الأسعار",
    title: { before: "معمول ", accent: "عشان يبيع." },
    book: "احجز مكالمة",
    plans: [
      {
        title: "موقع بيحوّل",
        desc: "موقع من خمس صفحات متصمّم حوالين هدف واحد.",
        suffix: "/بداية من",
        addon: "صور منتجات مخصوصة",
        addonAria: "إضافة صور منتجات مخصوصة",
        features: [
          "خمس صفحات بتصميم خاص بالكامل",
          "ترتيب المحتوى وصياغة العرض",
          "تحليلات وتتبّع لكل خطوة",
          "تسليم في 12 يوم أو ببلاش",
        ],
      },
      {
        title: "متجر كامل",
        desc: "واجهة المتجر، وصفحات المنتجات، وخطوات الدفع.",
        suffix: "/سعر ثابت",
        addon: "طبقة الحركة و WebGL",
        addonAria: "إضافة طبقة الحركة و WebGL",
        features: [
          "نظام تصميم ومكتبة مكوّنات",
          "قوالب لصفحات المنتجات",
          "تحسين السلة وصفحة الدفع",
          "دعم لمدة 6 أسابيع بعد الإطلاق",
        ],
      },
    ],
  },
  testimonials: {
    title: { before: "أرقام، مش ", accent: "كلام حلو." },
    dotLabel: (i) => `انتقل للرأي رقم ${i}`,
    items: [
      {
        quote: "«بطّلنا نشرح نفسنا. الموقع بقى بيعمل ده بدالنا، وأرقام الدفع اتحرّكت في أسبوع.»",
        role: "المؤسِّسة، Halden",
        metric: "نسبة الإضافة للسلة",
        alts: ["موقع Halden، شكل الديسكتوب", "موقع Halden، لقطة تانية"],
      },
      {
        quote: "«12 يوم من البداية للإطلاق، والموقع مش شبه أي حد من المنافسين. وده كان المطلوب بالظبط.»",
        role: "مدير التسويق، Norr",
        metric: "الإيراد لكل زيارة",
        alts: ["موقع Norr، شكل الديسكتوب", "موقع Norr، لقطة تانية"],
      },
      {
        quote: "«لقى المشكلة في رحلة البيع قبل ما يفتح أي ملف تصميم. وبعدين صلّح الاتنين.»",
        role: "صاحبة البراند، Sable",
        metric: "اشتراكات جديدة",
        alts: ["موقع Sable، شكل الديسكتوب", "موقع Sable، لقطة تانية"],
      },
      {
        quote: "«فلوس الإعلانات أخيرًا بقت بتروح لمكان بيبيع. نفس الزيارات، بس شهر مختلف خالص.»",
        role: "المؤسِّس، Lume",
        metric: "العائد على الإعلانات",
        alts: ["موقع Lume، شكل الديسكتوب", "موقع Lume، لقطة تانية"],
      },
    ],
  },
  problem: {
    eyebrow: "003 — المشكلة",
    title: { line1: "تصميم يبهر.", accent: "ومبيعات بجد." },
    body: {
      before: "أغلب الاستوديوهات بتسلّمك موقع شكله حلو، بس بيخسّرك فلوس من غير ما تحس. ",
      strong: "الشكل الحلو ده الأساس، مش هو المنتج.",
      after: " إحنا بنبدأ من رحلة البيع، وبعدين نديله شكله الحلو.",
    },
    figureAlt: "موقع لعميل على شاشة لابتوب",
  },
  blueprint: {
    eyebrow: "004 — خطة الشغل",
    title: { before: "حسّن نتايج إعلاناتك في ", accent: "3 خطوات بسيطة." },
    steps: [
      {
        title: "اتجاه واضح من أول مرة",
        body: "مود بورد واحد، وتلات اتجاهات واضحة، واختيار واحد. من غير لفّ ودوران ولا تشتيت.",
        alt: "الاتجاه المختار متطبّق على صفحة منتج",
      },
      {
        title: "إعلان يوقّف السكرول",
        body: "الصفحة والإعلان بيتعملوا كنظام واحد، فاللي وعدت بيه في الإعلان بيفضل موجود بعد الضغطة.",
        alt: "إعلان معمول من تصميم الموقع",
      },
      {
        title: "رحلة واحدة، متقاسة من الأول للآخر",
        body: "الدخول، الاهتمام، الثقة، الشراء — كل خطوة متتبّعة، فأي تعديل جاي يبقى مبني على أرقام مش على رأي.",
        alt: "داشبورد تحليلات رحلة البيع لعميل",
      },
    ],
    chips: ["شكل تحريري", "تجربة سلسة", "عرض جذّاب"],
    adPills: ["يوقّف السكرول", "يحوّل", "اشتري دلوقتي"],
    funnel: ["الدخول", "الاهتمام", "الثقة", "الشراء"],
    status: "الرحلة متظبطة",
    statusChip: "ضغطة ← الدفع",
  },
  ready: {
    eyebrow: "005 — جاهز تكبر",
    title: { before: "موقعك الجاي لازم ", accent: "يجيب تمنه." },
    body: "فيه مكانين بس متاحين كل شهر. ابعت الفورم، نتكلم 20 دقيقة، وهتاخد خطة واضحة سواء اشتغلنا مع بعض أو لأ.",
    collageAlts: ["مجموعة من مواقع العملاء، الأولى", "مجموعة من مواقع العملاء، التانية", "مجموعة من مواقع العملاء، التالتة"],
  },
  faq: {
    eyebrow: "006 — أسئلة متكررة",
    title: { before: "أسئلة ", accent: "بتتكرر" },
    intro: "لو سؤالك مش موجود هنا، ابعتلي إيميل — الرد هيوصلك منّي أنا شخصيًا، مش رد أوتوماتيك.",
    items: [
      {
        q: "إزاي تقدر تطلّع الموقع في 12 يوم؟",
        a: "لأن نطاق الشغل بيتحدد قبل ما نبدأ، ومفيش تسليم من فريق لفريق — شخص واحد بيصمّم وبينفّذ، فمفيش حاجة بتستنى في طابور.",
      },
      {
        q: "لو اتأخرت عن الميعاد، إيه اللي هيحصل؟",
        a: "مش هتدفع. الاستثناء الوحيد لو التأخير من عندك — لو المحتوى أو الموافقات اتأخرت العدّاد بيقف، وهبلّغك أول ما ده يحصل.",
      },
      {
        q: "إنت اللي بتكتب المحتوى؟",
        a: "أنا بكتب الهيكل والعناوين وصياغة العرض. لو عندك كاتب محتوى، هيشتغل جوه الهيكل ده — وده اللي بيخلّي الصفحة تبيع.",
      },
      {
        q: "بتشتغل على أنهي منصة؟",
        a: "Shopify للمتاجر، و Webflow لمواقع التسويق، وكود من الصفر لما التفاعل يحتاج كده. المنصة بتمشي ورا الهدف، مش العكس.",
      },
      {
        q: "ينفع تشتغل مع الفريق الداخلي عندنا؟",
        a: "أكيد — هسلّمكم مكتبة مكوّنات موثّقة وفيديو شرح، عشان المطوّرين عندكم يقدروا يكمّلوا على النظام من غير تخمين.",
      },
      {
        q: "محتاج منّي إيه عشان نبدأ؟",
        a: "ملفات البراند، وصور المنتجات، وشخص واحد صاحب قرار في المكالمة. بس كده فعلًا.",
      },
    ],
  },
  marquee: [
    "تصميم بيبيع",
    "حلول تقنية من الأول للآخر",
    "مبيعات أكتر للمتاجر الأونلاين",
    "بطّل تهدر فلوس الإعلانات",
    "ربط أنظمة وأتمتة",
    "بنبني مواقع بتجيب فلوس",
  ],
  footer: {
    ourTime: "توقيتنا — لشبونة",
    yourTime: "توقيتك",
    email: "الإيميل",
    social: "السوشيال ميديا",
    location: "مكاننا",
    locationValue: "لشبونة، وبنشتغل أونلاين مع العالم كله",
    rights: "كل الحقوق محفوظة.",
    backToTop: "ارجع لفوق ↑",
  },
};

export const dictionaries: Record<Locale, Dict> = { en, ar };
