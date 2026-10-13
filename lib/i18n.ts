// All page copy for both languages. English lives at "/", Arabic at "/ar".
// Shared, language-independent data (links, prices, chart points) is in content.ts.

export type Locale = "en" | "ar";

/** A heading with an italic-serif accent word: `{line1}<br/>{before}<accent>{after}`. */
export type Heading = { line1?: string; before?: string; accent: string; after?: string };

type Testimonial = { quote: string; role: string; metric: string };
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
  hero: { eyebrow: string; title: Heading; tagline?: string; sub?: string; shopify?: { line: Heading; badgeAlt: string } };
  portfolio: { pill: string; title: Heading; intro: (count: number) => string; explore: string; cardAlt: (name: string) => string; arrow: string; exploreArrow: string };
  shopifyFeatures: { pill: string; title: Heading; sub: string; items: { title: string; body: string }[] };
  testimonials: { title: Heading; dotLabel: (i: number) => string; conversion: string; chart: { before: string; after: string }; items: Testimonial[] };
  problem: { eyebrow: string; title: Heading; body: { before: string; strong: string; after: string }; figureAlt: string };
  ready: { eyebrow: string; title: Heading; body: string };
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

const NAV_HREFS = ["#portfolio", "#shopify", "#faq"];
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
  nav: nav(["Portfolio", "Shopify", "FAQ"]),
  menu: { open: "Open menu", close: "Close menu", label: "Menu" },
  sound: { on: "Sound on", off: "Sound off", aria: "Toggle motion sound" },
  cta: {
    apply: "Message me on WhatsApp",
    steps: ["Quick message", "Quick call", "More sales"],
    scarcity: "Message now — only a few slots remaining",
  },
  hero: {
    eyebrow: "000 — Tech solutions for ecommerce growth",
    title: { line1: "Premium custom websites", before: "for ", accent: "consumer", after: " brands" },
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
  shopifyFeatures: {
    pill: "Why Shopify",
    title: { before: "Shopify ", accent: "features" },
    sub: "The world's leading platform for building a professional online store.",
    items: [
      {
        title: "Easy store management",
        body: "A simple, easy-to-use dashboard where you run every detail of your store — products, orders, customers and discounts — with no technical experience.",
      },
      {
        title: "Powerful, unlimited cloud hosting",
        body: "Fast, secure hosting that handles any number of visitors and keeps your store running smoothly even during ad campaigns, with unlimited products at no extra cost.",
      },
      {
        title: "Smart inventory management",
        body: "Automatic stock tracking with alerts when products are running low, and the option to set a separate quantity for each location.",
      },
      {
        title: "Mobile app for full control",
        body: "Run your store easily from your phone at any time, with instant notifications for new orders.",
      },
      {
        title: "Advanced security and protection",
        body: "Shopify gives your store complete protection: a free SSL certificate, an advanced fraud-protection system and PCI DSS compliance, plus two-factor authentication to keep your account and your customers' data safe from attacks.",
      },
      {
        title: "Search engine optimisation (SEO)",
        body: "Built-in tools to improve how your store shows up on Google, with custom titles, descriptions and URLs for every page of the site.",
      },
      {
        title: "AI support",
        body: "Shopify offers advanced AI tools for writing product descriptions, smart marketing and analysing customer behaviour — a strong competitive edge worldwide, because Shopify is a global platform that always keeps up with the latest technology.",
      },
      {
        title: "Comprehensive analytics and reports",
        body: "Detailed reports on sales, visitors and conversion rates, so you make decisions based on real numbers.",
      },
      {
        title: "A huge app library",
        body: "More than 12,000 apps to add any feature you need — marketing, shipping, payments, bundles, upsell, cross-sell and more — to grow sales and make your store easier to run.",
      },
      {
        title: "Smart customer management",
        body: "Shopify lets you build a strong customer database and segment it by buying behaviour, frequency or value, so you can target each segment with tailored offers and marketing, grow sales and build stronger relationships with your customers.",
      },
    ],
  },
  testimonials: {
    title: { before: "Receipts, not ", accent: "adjectives." },
    dotLabel: (i) => `Go to testimonial ${i}`,
    conversion: "Conversion rate",
    chart: { before: "Before", after: "After launch" },
    items: [
      {
        quote: '"We stopped explaining ourselves. The site does it, and the checkout numbers moved in a week."',
        role: "Founder, Halden",
        metric: "Add to cart rate",
      },
      {
        quote: '"Twelve days, start to launch, and it looks nothing like our competitors. That was the whole brief."',
        role: "CMO, Norr",
        metric: "Revenue per session",
      },
      {
        quote: '"He found the leak in our funnel before he opened a design file. Then he fixed both."',
        role: "Owner, Sable",
        metric: "Subscription signups",
      },
      {
        quote: '"Our ad spend finally lands somewhere that sells. Same traffic, very different month."',
        role: "Founder, Lume",
        metric: "Blended ROAS",
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
  ready: {
    eyebrow: "005 — Ready to scale",
    title: { before: "Your next site should pay for ", accent: "itself." },
    body: "Two build slots open each month. Message me on WhatsApp, we talk for twenty minutes, and you get a plan whether or not you hire me.",
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
  nav: nav(["شغلنا", "شوبيفاي", "أسئلة متكررة"]),
  menu: { open: "فتح القائمة", close: "قفل القائمة", label: "القائمة" },
  sound: { on: "الصوت شغّال", off: "الصوت مقفول", aria: "تشغيل أو قفل صوت الحركة" },
  cta: {
    apply: "كلّمني على واتساب",
    steps: ["رسالة سريعة", "مكالمة سريعة", "مبيعات أكتر"],
    scarcity: "كلّمني دلوقتي — الأماكن المتاحة قليلة",
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
  shopifyFeatures: {
    pill: "ليه شوبيفاي",
    title: { before: "مميزات ", accent: "شوبيفاي" },
    sub: "المنصة الأولى عالمياً لبناء متجرك الإلكتروني الاحترافي",
    items: [
      {
        title: "سهولة إدارة المتجر",
        body: "واجهة بسيطة وسهلة الاستخدام، تدير منها كل تفاصيل متجرك (منتجات، طلبات، عملاء، خصومات) بدون أي خبرة تقنية.",
      },
      {
        title: "استضافة سحابية قوية وغير محدودة",
        body: "استضافة سريعة وآمنة تتحمل أي عدد من الزوار، وتضمن بقاء متجرك يعمل بكفاءة حتى أثناء الحملات الإعلانية، مع إمكانية إضافة عدد غير محدود من المنتجات بدون أي تكلفة إضافية.",
      },
      {
        title: "إدارة مخزون ذكية",
        body: "تتبع تلقائي للمخزون مع تنبيهات عند قرب نفاد المنتجات، وإمكانية تحديد كمية خاصة لكل فرع.",
      },
      {
        title: "تطبيق موبايل للتحكم الكامل",
        body: "أدر متجرك بسهولة من الهاتف في أي وقت، مع إشعارات فورية بالطلبات الجديدة.",
      },
      {
        title: "الأمان والحماية المتقدمة",
        body: "شوبيفاي توفر لك حماية متكاملة لمتجرك من خلال شهادة SSL مجانية، ونظام متطور للحماية من الاحتيال، بالإضافة إلى التوافق مع معايير أمان PCI DSS، وإمكانية تفعيل المصادقة الثنائية لحماية حسابك وبيانات عملائك من الاختراق.",
      },
      {
        title: "تحسين محركات البحث SEO",
        body: "أدوات مدمجة لتحسين ظهور متجرك في جوجل، مع تخصيص العناوين والوصف والروابط لكل صفحة في الموقع.",
      },
      {
        title: "دعم الذكاء الاصطناعي",
        body: "توفر شوبيفاي أدوات AI متطورة لكتابة وصف المنتجات، التسويق الذكي، وتحليل سلوك العملاء، مما يمنحك مزايا تنافسية قوية على مستوى عالمي لأن شوبيفاي منصة عالمية دائماً مواكبة لأحدث التقنيات.",
      },
      {
        title: "إحصائيات وتقارير شاملة",
        body: "تقارير مفصلة عن المبيعات والزوار ومعدلات التحويل لاتخاذ قرارات مبنية على أرقام حقيقية.",
      },
      {
        title: "مكتبة تطبيقات ضخمة",
        body: "أكثر من 12,000 تطبيق لإضافة أي ميزة تحتاجها (تسويق، شحن، دفع، Bundles، Upsell، Cross-sell...) لزيادة المبيعات وتسهيل إدارتك للمتجر.",
      },
      {
        title: "إدارة العملاء بذكاء",
        body: "شوبيفاي تتيح لك بناء قاعدة بيانات قوية لعملائك، مع إمكانية تقسيمهم إلى شرائح حسب سلوك الشراء أو التكرار أو القيمة، مما يساعدك في استهداف كل شريحة بعروض وتسويق مخصص لزيادة المبيعات وبناء علاقات أقوى مع عملائك.",
      },
    ],
  },
  testimonials: {
    title: { before: "أرقام، مش ", accent: "كلام حلو." },
    dotLabel: (i) => `انتقل للرأي رقم ${i}`,
    conversion: "معدل التحويل",
    chart: { before: "قبل", after: "بعد الإطلاق" },
    items: [
      {
        quote: "«بطّلنا نشرح نفسنا. الموقع بقى بيعمل ده بدالنا، وأرقام الدفع اتحرّكت في أسبوع.»",
        role: "المؤسِّسة، Halden",
        metric: "نسبة الإضافة للسلة",
      },
      {
        quote: "«12 يوم من البداية للإطلاق، والموقع مش شبه أي حد من المنافسين. وده كان المطلوب بالظبط.»",
        role: "مدير التسويق، Norr",
        metric: "الإيراد لكل زيارة",
      },
      {
        quote: "«لقى المشكلة في رحلة البيع قبل ما يفتح أي ملف تصميم. وبعدين صلّح الاتنين.»",
        role: "صاحبة البراند، Sable",
        metric: "اشتراكات جديدة",
      },
      {
        quote: "«فلوس الإعلانات أخيرًا بقت بتروح لمكان بيبيع. نفس الزيارات، بس شهر مختلف خالص.»",
        role: "المؤسِّس، Lume",
        metric: "العائد على الإعلانات",
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
  ready: {
    eyebrow: "005 — جاهز تكبر",
    title: { before: "موقعك الجاي لازم ", accent: "يجيب تمنه." },
    body: "فيه مكانين بس متاحين كل شهر. ابعتلي على واتساب، نتكلم 20 دقيقة، وهتاخد خطة واضحة سواء اشتغلنا مع بعض أو لأ.",
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
