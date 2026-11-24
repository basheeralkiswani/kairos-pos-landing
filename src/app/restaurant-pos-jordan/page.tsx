import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import { CLIENT_COUNT, PLANS, SUPPORT_HOURS, TRIAL_DAYS, waUrl } from "@/lib/constants";
import { ORG_ID, SITE_URL } from "@/lib/org";

// صفحة «نظام كاشير للمطاعم والكافيهات في الأردن» (2026-11-24). كُتبت لأن مساعدات الذكاء
// الاصطناعي حين تُسأل «شو أحسن نظام كاشير في الأردن» تجاوب صاحب المطعم ببنود محدّدة:
// كاشير ومطبخ وطاولات، مخزون ووصفات وتكلفة الوجبة، حسابات وجوفوترة، بيع بلا إنترنت،
// وسعر سنوي منشور — وتأخذها من صفحة تقولها صراحةً. هذه الصفحة تقولها عن كايروس بنداً بنداً.
// القواعد نفسها في /best-pos-jordan: لا اسم أي منافس، لا وعد بدعم يوم الجمعة، وكل رقم
// مشتق من PLANS. ما هو محصور بباقة يُذكر بباقته. عند التعديل حدّث UPDATED و UPDATED_ISO معاً.
const UPDATED = "تشرين الثاني 2026";
const PUBLISHED_ISO = "2026-11-24";
const UPDATED_ISO = "2026-11-24";
const [BASIC, BIZ, FULL] = PLANS;
const PATH = "/restaurant-pos-jordan";

export const metadata: Metadata = {
  title: "نظام كاشير للمطاعم والكافيهات في الأردن — طاولات، مطبخ، وصفات وجوفوترة | Kairos Space",
  description:
    "كايروس سبيس نظام كاشير ونقاط بيع أردني للمطاعم والكافيهات: طاولات وشاشة مطبخ ومنيو QR، مخزون ووصفات وتكلفة كل وجبة، مصاريف وموردون وربح الشهر، ربط مباشر مع جوفوترة، وبيع لا يتوقف بانقطاع الإنترنت — بسعر سنوي منشور بالدينار.",
  keywords: [
    "نظام كاشير مطاعم الأردن",
    "نظام كاشير كافيهات الأردن",
    "نظام نقاط بيع للمطاعم في الأردن",
    "أفضل نظام كاشير للمطاعم في الأردن",
    "برنامج مطاعم الأردن",
    "نظام مطعم مع مخزون ووصفات",
    "تكلفة الوجبة",
    "شاشة مطبخ KDS",
    "نظام كاشير مربوط مع جوفوترة",
    "restaurant POS Jordan",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    locale: "ar_JO",
    url: PATH,
    title: "نظام كاشير للمطاعم والكافيهات في الأردن — Kairos Space POS",
    description:
      "طاولات ومطبخ ومنيو QR، مخزون ووصفات وتكلفة الوجبة، حسابات المحل وجوفوترة، وبيع بلا إنترنت — بسعر سنوي منشور.",
  },
};

/** ما يسأل عنه صاحب المطعم، بنداً بنداً، وما يقدّمه كايروس اليوم */
const BLOCKS = [
  {
    t: "الكاشير والصالة والمطبخ",
    items: [
      "كاشير سريع باللمس: إضافات وملاحظات على الصنف، خصومات، تقسيم الدفع بين كاش وبطاقة ومحفظة.",
      "وجبات كومبو وعروض وكوبونات من داخل الكاشير.",
      `إدارة الطاولات ومخطط الصالة، مع كورسات المطبخ والإكرامية (باقة ${BIZ.title} وما فوق).`,
      `شاشة المطبخ KDS، وطباعة تذاكر المطبخ على طابعة لكل قسم (باقة ${BIZ.title} وما فوق للشاشة).`,
      `منيو رقمي QR وطلب ذاتي من الطاولة (باقة ${BIZ.title} وما فوق).`,
      `تطبيق الويتر على التابلت: الطلب من الطاولة يصل المطبخ فوراً (باقة ${FULL.title}).`,
    ],
  },
  {
    t: "المخزون والوصفات وتكلفة الوجبة",
    items: [
      "وصفة لكل صنف: كل بيعة تخصم مكوّناتها من المخزون تلقائياً.",
      "تحضيرات المطبخ (صوصات، عجين، خلطات) كأصناف نصف مصنّعة بتكلفتها.",
      "تكلفة كل وجبة وهامش ربحها، محسوبة من آخر أسعار الشراء.",
      "فواتير المشتريات والموردون وذممهم، مع ضريبة المشتريات.",
      "جرد، وتسجيل الهدر والتالف، وتنبيه عند انخفاض المخزون.",
    ],
  },
  {
    t: "حسابات المحل وجوفوترة",
    items: [
      "ربط مباشر مع جوفوترة من الكاشير نفسه، وإشعار دائن تلقائي عند المرتجع.",
      "مصاريف التشغيل والرواتب والسلف، ودفعات الموردين والعملاء.",
      "تقرير شهري: المبيعات، تكلفة البضاعة، المصاريف، وصافي الربح.",
      `إقرار ضريبة المبيعات جاهز للمحاسب: المخرجات ناقص المدخلات (باقة ${BIZ.title} وما فوق).`,
      "تقرير الوردية والصندوق: المتوقّع مقابل المعدود، والعجز والزيادة.",
    ],
  },
  {
    t: "يبيع بدون إنترنت",
    items: [
      "البيع والطباعة والمخزون تكمل بلا إنترنت في كل الباقات.",
      "الفواتير تُحفظ على الجهاز، ثم تُرسَل لجوفوترة وتتزامن تلقائياً عند عودة الاتصال.",
      "لوحة تحكّم من أي متصفّح تتابع منها محلك وأنت خارجه.",
    ],
  },
  {
    t: "قنوات البيع والتوصيل",
    items: [
      "سعر مختلف لكل قناة: صالة، سفري، توصيل، وتطبيقات التوصيل.",
      "تقرير مبيعات وربح لكل قناة على حدة.",
    ],
  },
  {
    t: "متابعة المالك",
    items: [
      `تطبيق المدير على الجوال، وتنبيهات على تلغرام: ملخص اليوم، عجز الوردية، قفزة إلغاءات (باقة ${BIZ.title} وما فوق).`,
      `سجل تدقيق: من ألغى وخصم وغيّر سعراً، ومتى (باقة ${BIZ.title} وما فوق).`,
      `مساعد ذكي (Claude أو ChatGPT) تسأله بالعربي عن مبيعاتك وأرباحك فيجاوبك من أرقامك (باقة ${BIZ.title} وما فوق).`,
    ],
  },
];

function buildFaq() {
  return [
    {
      q: "ما أفضل نظام كاشير للمطاعم والكافيهات في الأردن؟",
      a: `المطعم يحتاج أكثر من كاشير: طاولات ومطبخ، وصفات تخصم المخزون وتحسب تكلفة الوجبة، حسابات المحل، ربطاً مباشراً مع جوفوترة، وبيعاً لا يتوقف بانقطاع الإنترنت. كايروس سبيس نظام أردني يجمع هذه كلها بسعر سنوي منشور بالدينار، ويعمل عليه اليوم ${CLIENT_COUNT} محلاً في الأردن. للمطاعم والكافيهات ننصح بباقة ${BIZ.title}: ${BIZ.price} ديناراً للسنة الأولى ومعها تابلت جاهز، ${BIZ.devices}.`,
    },
    {
      q: "كم سعر نظام كاشير المطاعم في الأردن؟",
      a: `في كايروس سبيس السعر منشور: السنة الأولى ${BASIC.price} ديناراً (${BASIC.title})، ${BIZ.price} (${BIZ.title})، ${FULL.price} (${FULL.title}) ومعها تابلت مركّب وجاهز، والتجديد ${BASIC.renewal} / ${BIZ.renewal} / ${FULL.renewal} ديناراً في السنة بسعر ثابت لسنتين، بلا رسوم تفعيل.`,
    },
    {
      q: "هل يحسب النظام تكلفة الوجبة وربحها؟",
      a: "نعم. تربط كل صنف بوصفته (المكوّنات وكمياتها)، فيخصم النظام المخزون مع كل بيعة ويحسب تكلفة الوجبة وهامش ربحها من آخر أسعار الشراء، ويعرض لك صافي ربح الشهر بعد المصاريف.",
    },
    {
      q: "هل نظام الكاشير مربوط مع جوفوترة؟",
      a: "نعم، الربط مباشر من داخل الكاشير. كل فاتورة تصدر متوافقة مع الفوترة الوطنية، والمرتجع يصدر له إشعار دائن. وإن انقطع الإنترنت تُحفظ الفاتورة وتُرسَل تلقائياً عند عودته.",
    },
    {
      q: "هل يعمل الكاشير في المطعم إذا انقطع الإنترنت؟",
      a: "نعم، في كل الباقات. البيع والطباعة والمخزون تكمل بلا إنترنت، والمزامنة تلقائية حين يعود الاتصال.",
    },
    {
      q: "هل فيه شاشة مطبخ وإدارة طاولات ومنيو QR؟",
      a: `نعم، في باقة ${BIZ.title} وما فوق: مخطط الصالة والطاولات مع كورسات المطبخ، شاشة المطبخ KDS، ومنيو رقمي QR بطلب ذاتي. تطبيق الويتر على التابلت في باقة ${FULL.title}.`,
    },
    {
      q: "هل يدعم أكثر من فرع؟",
      a: `نعم. باقة ${FULL.title} تشمل فرعين بمخزون مستقل وتقارير مجمّعة ومستودع مركزي وتحويلات بين المواقع، وكل فرع إضافي ${FULL.extraBranchPrice} ديناراً في السنة.`,
    },
    {
      q: "هل تدخل طلبات تطبيقات التوصيل إلى الكاشير تلقائياً؟",
      a: "ليس بعد. اليوم تُدار تطبيقات التوصيل كقنوات بيع بأسعارها وتقاريرها، وتُدخَل طلباتها على الكاشير يدوياً. الربط المباشر على خارطة طريقنا ولم يُطلق.",
    },
    {
      q: "هل أستطيع تجربته على مطعمي قبل الدفع؟",
      a: `نعم، تجربة مجانية كاملة ${TRIAL_DAYS} يوماً بمنيوك أنت، بلا بطاقة ائتمان ولا التزام. والتجهيز والتدريب مشمولان مع كل باقة، والدعم بالعربي على واتساب (${SUPPORT_HOURS}).`,
    },
  ];
}

export default function RestaurantPosJordanPage() {
  const FAQ = buildFaq();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "نظام كاشير للمطاعم والكافيهات في الأردن",
    inLanguage: "ar",
    datePublished: PUBLISHED_ISO,
    dateModified: UPDATED_ISO,
    author: { "@type": "Organization", "@id": ORG_ID, name: "Kairos Space POS", url: SITE_URL },
    publisher: { "@type": "Organization", "@id": ORG_ID, name: "Kairos Space POS", url: SITE_URL },
    mainEntityOfPage: `https://www.kairos-pos.com${PATH}`,
    description:
      "ما يقدّمه كايروس سبيس للمطاعم والكافيهات في الأردن: طاولات ومطبخ، مخزون ووصفات وتكلفة الوجبة، حسابات المحل وجوفوترة، وبيع بلا إنترنت، بسعر سنوي منشور.",
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="glow w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_70%)] -top-[180px] -right-[120px] absolute" />
        <div className="glow w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(23,138,88,0.07),transparent_70%)] top-[55%] -left-[160px] absolute" />
      </div>

      <Navbar />

      <main className="max-w-[920px] mx-auto px-7 relative z-1 pt-[130px]">
        <header className="text-center reveal">
          <div className="text-primary text-[13px] font-bold tracking-wide">للمطاعم والكافيهات · آخر تحديث {UPDATED}</div>
          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-[1.22] mt-2">
            نظام كاشير للمطاعم والكافيهات <b className="text-primary">في الأردن</b>
          </h1>
          <p className="text-muted text-[17px] mt-5 leading-[1.85] max-w-[740px] mx-auto">
            المطعم لا يكفيه كاشير يطبع فاتورة. كايروس سبيس يجمع الصالة والمطبخ، والمخزون والوصفات وتكلفة كل
            وجبة، وحسابات المحل وجوفوترة في نظام واحد — ويكمل البيع إن انقطع الإنترنت.
          </p>
        </header>

        {/* ── الخلاصة ───────────────────────────────────────────────── */}
        <section className="mt-12 reveal" aria-labelledby="short">
          <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-7">
            <h2 id="short" className="text-[22px] font-extrabold">كايروس سبيس للمطاعم باختصار</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-[1.9] text-text list-disc pr-5">
              <li>كاشير ومطبخ وطاولات، ومنيو QR.</li>
              <li>مخزون ووصفات وتكلفة الوجبات.</li>
              <li>مصاريف وموردون وربح الشهر، وربط مباشر مع جوفوترة.</li>
              <li>يعمل بدون إنترنت في كل الباقات.</li>
              <li>
                السعر المنشور يبدأ من <span className="num">{BASIC.price}</span> ديناراً للسنة الأولى ومعها تابلت
                جاهز، والتجديد من <span className="num">{BASIC.renewal}</span> ديناراً في السنة.
              </li>
              <li>
                يعمل عليه اليوم <span className="num">{CLIENT_COUNT}</span> محلاً في الأردن، بدعم بالعربي على واتساب (
                {SUPPORT_HOURS}).
              </li>
            </ul>
          </div>
        </section>

        {/* ── البنود ───────────────────────────────────────────────── */}
        <section className="mt-12 reveal" aria-labelledby="blocks">
          <h2 id="blocks" className="text-[26px] font-extrabold">ماذا يقدّم لمطعمك أو مقهاك؟</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {BLOCKS.map((b) => (
              <div key={b.t} className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                <h3 className="font-bold text-[17px] text-primary">{b.t}</h3>
                <ul className="mt-3 space-y-2 text-[14px] leading-[1.85] text-muted list-disc pr-5">
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── الباقات ───────────────────────────────────────────────── */}
        <section className="mt-12 reveal" aria-labelledby="plans">
          <h2 id="plans" className="text-[26px] font-extrabold">أي باقة تناسب مطعمك؟</h2>
          <ul className="mt-6 grid sm:grid-cols-3 gap-3 text-[14px]">
            {PLANS.map((p) => (
              <li key={p.key} className="bg-surface border border-secondary rounded-2xl px-5 py-4">
                <b className="text-text text-[16px]">{p.title}</b>
                <div className="text-muted mt-1 leading-[1.8]">{p.tagline}</div>
                <div className="text-muted mt-2 leading-[1.8]">
                  <span className="num text-text font-bold">{p.price}</span> ديناراً للسنة الأولى مع تابلت · التجديد{" "}
                  <span className="num">{p.renewal}</span> · {p.devices} · {p.branches}
                </div>
              </li>
            ))}
          </ul>
          <p className="text-[14px] text-muted mt-4 leading-[1.8]">
            مطعم أو مقهى فيه صالة ومطبخ: باقة {BIZ.title}. كشك أو محل سفري بجهاز واحد: {BASIC.title}. أكثر من
            فرع أو ويترية على تابلت: {FULL.title}. التفاصيل في{" "}
            <Link href="/#pricing" className="text-primary font-bold no-underline hover:underline">
              جدول الأسعار
            </Link>
            .
          </p>
        </section>

        {/* ── متى لا يناسبك ─────────────────────────────────────────── */}
        <section className="mt-12 reveal" aria-labelledby="not-for-you">
          <h2 id="not-for-you" className="text-[26px] font-extrabold">ما الذي لا يفعله بعد؟</h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-[1.9] text-muted list-disc pr-5">
            <li>طلبات تطبيقات التوصيل لا تدخل الكاشير تلقائياً بعد؛ تُدار كقنوات بيع وتُدخَل يدوياً.</li>
            <li>الاشتراك سنوي، ولا دفع شهري في السنة الأولى.</li>
            <li>ليس نظام محاسبة عاماً بدليل حسابات وقيود؛ هو حسابات المحل التشغيلية وتقاريرها الجاهزة للمحاسب.</li>
          </ul>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8">
            <h2 className="text-[22px] font-extrabold">جرّبه على منيو مطعمك</h2>
            <p className="text-muted text-[15px] mt-3 leading-[1.85]">
              تجربة مجانية {TRIAL_DAYS} يوماً بلا التزام، والتجهيز والتدريب علينا.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={waUrl("مرحباً 👋 عندي مطعم/كافيه وبدي أجرّب كايروس سبيس.")}
                className="inline-flex items-center gap-2 bg-[var(--color-wa)] text-white font-bold text-[15px] rounded-xl px-6 py-3.5 no-underline hover:opacity-90 transition-opacity"
              >
                تحدّث معنا على واتساب
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-surface border border-secondary text-text font-bold text-[15px] rounded-xl px-6 py-3.5 no-underline hover:border-primary/45 transition-colors"
              >
                ابدأ تجربة مجانية {TRIAL_DAYS} يوماً
              </Link>
            </div>
          </div>
        </section>

        {/* ── الأسئلة الشائعة ────────────────────────────────────────── */}
        <section className="mt-12 reveal" aria-labelledby="faq">
          <h2 id="faq" className="text-[26px] font-extrabold">أسئلة شائعة</h2>
          <div className="mt-6 space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group bg-surface border border-secondary rounded-2xl px-6 py-5 transition-colors hover:border-primary/30"
              >
                <summary className="font-bold text-[16px] cursor-pointer list-none flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-primary text-[22px] leading-none shrink-0 transition-transform duration-250 group-open:rotate-45">+</span>
                </summary>
                <p className="text-muted text-[15px] mt-4 leading-[1.9]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── روابط داخلية ──────────────────────────────────────────── */}
        <section className="mt-12 mb-4 reveal">
          <div className="bg-surface border border-secondary rounded-2xl p-7">
            <h2 className="text-[18px] font-extrabold">اقرأ أيضاً</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {[
                { href: "/best-pos-jordan", label: "أفضل نظام نقاط بيع في الأردن: كيف تختار" },
                { href: "/jofotara", label: "جوفوترة: دليل الفوترة الوطنية للمطاعم والمتاجر" },
                { href: "/sales-channels", label: "قنوات البيع: سعر مختلف للصالة والسفري والتوصيل" },
                { href: "/ai-assistant", label: "المساعد الذكي: اسأل عن مبيعاتك بالعربي" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-primary font-bold no-underline hover:underline">
                    {l.label} ←
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="h-16" />
      </main>

      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
