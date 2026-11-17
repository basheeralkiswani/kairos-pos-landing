import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import { CLIENT_COUNT, PLANS, SUPPORT_HOURS, TRIAL_DAYS, waUrl } from "@/lib/constants";

// دليل «أفضل نظام نقاط بيع في الأردن» (2026-11-18). كُتب لأن أدلة «أفضل POS في الأردن»
// التي ينشرها الآخرون صارت هي ما يتصدّر البحث ويقرأه ChatGPT، وأغلبها لا يذكر كايروس.
// قرار المالك (2026-11-18): **لا نذكر أي منافس بالاسم** في هذه الصفحة — لا مخاطرة
// قانونية ولا دعاية مجانية لهم. نتكلم عن «أنواع» الأنظمة بعبارات عامة متحفّظة («غالباً»،
// «بعضها»)، ونجاوب كل معيار بما يقدمه كايروس اليوم، ونذكر حدودنا صراحةً.
// أرقام كايروس مشتقّة من PLANS. عند تعديل الصفحة حدّث UPDATED و UPDATED_ISO معاً.
const UPDATED = "تشرين الثاني 2026";
const UPDATED_ISO = "2026-11-18";
const [BASIC, BIZ, FULL] = PLANS;

export const metadata: Metadata = {
  title: "أفضل نظام نقاط بيع في الأردن 2026 — كيف تختار نظام الكاشير المناسب | Kairos Space",
  description:
    "دليل عملي لاختيار نظام نقاط البيع (الكاشير) في الأردن 2026: الربط مع جوفوترة، البيع بدون إنترنت، كلفة السنة بالدينار، الأجهزة، ومتطلبات المطاعم والمقاهي والسوبرماركت — وكيف يجاوب كايروس سبيس عن كل سؤال.",
  keywords: [
    "أفضل نظام نقاط بيع في الأردن",
    "أفضل نظام كاشير في الأردن",
    "نظام نقاط بيع الأردن",
    "كيف أختار نظام كاشير",
    "نظام كاشير مطاعم الأردن",
    "نظام كاشير سوبرماركت الأردن",
    "سعر نظام كاشير في الأردن",
    "نظام كاشير مربوط مع جوفوترة",
    "نظام كاشير يعمل بدون إنترنت",
    "best POS system Jordan",
  ],
  alternates: { canonical: "/best-pos-jordan" },
  openGraph: {
    type: "article",
    locale: "ar_JO",
    url: "/best-pos-jordan",
    title: "أفضل نظام نقاط بيع في الأردن 2026 — كيف تختار نظام الكاشير المناسب",
    description:
      "ستة أسئلة تحسم اختيار نظام الكاشير في الأردن: جوفوترة، البيع بدون إنترنت، كلفة السنة بالدينار، الأجهزة، نوع النشاط، والدعم.",
  },
};

/** كل معيار: لماذا يهمّ، وكيف يجاوب عنه كايروس سبيس اليوم */
const CRITERIA = [
  {
    t: "هل هو مربوط مع جوفوترة؟",
    d: "الفوترة الوطنية صارت إلزامية على المنشآت في الأردن بشكل تدريجي. اسأل: هل الربط من داخل الكاشير نفسه، أم عبر برنامج أو اشتراك منفصل؟ وماذا يحدث للفاتورة إذا انقطع الإنترنت لحظة البيع؟",
    k: "مربوط مباشرة من الكاشير، وكل فاتورة تصدر متوافقة؛ وإن انقطع النت تُحفظ وتُرسَل تلقائياً عند عودته.",
  },
  {
    t: "هل يبيع بدون إنترنت؟",
    d: "انقطاع النت في ساعة الذروة يعني طابوراً واقفاً. بعض الأنظمة تتوقف تماماً، وبعضها يتيح البيع بلا إنترنت في باقات أعلى فقط.",
    k: "البيع والطباعة والمخزون تستمر بلا نت في كل الباقات، والمزامنة تلقائية حين يعود الاتصال.",
  },
  {
    t: "كم تدفع في السنة فعلاً؟",
    d: "اجمع الاشتراك الشهري × 12، ورسوم التفعيل، وكل إضافة تحتاجها فعلاً (المطبخ، الفروع، الأجهزة، المستخدمون). وانتبه: هل السعر بالدينار أم بالدولار؟ وهل هو منشور أصلاً أم «بعرض سعر»؟",
    k: `سعر سنوي منشور بالدينار: ${BASIC.price} / ${BIZ.price} / ${FULL.price} — بلا رسوم تفعيل، والفرع الإضافي ${FULL.extraBranchPrice} ديناراً في السنة.`,
  },
  {
    t: "على أي جهاز يعمل؟",
    d: "بعض الأنظمة تشترط iPad أو عتاداً تبيعه هي، وهذا يضيف مئات الدنانير قبل أن تبيع أول فاتورة.",
    k: "يعمل على لابتوب أو كمبيوتر ويندوز موجود عندك أو على تابلت أندرويد، مع طابعات الفواتير الحرارية الشائعة — ولا نبيع عتاداً ولا نفرضه.",
  },
  {
    t: "هل يناسب نوع نشاطك؟",
    d: "المطعم يحتاج طاولات وشاشة مطبخ ووصفات تخصم المخزون. السوبرماركت يحتاج باركود وأصنافاً بالوزن وآلاف المنتجات. اسأل عما تحتاجه أنت، لا عن طول قائمة المزايا.",
    k: "للمطاعم والمقاهي: طاولات وKDS ومنيو QR ووصفات. للسوبرماركت والمحلات: باركود، أصناف بالوزن، استيراد من إكسل، ونسبة ضريبة لكل صنف.",
  },
  {
    t: "من يدعمك، وبأي لغة؟",
    d: "دعم بالعربي من فريق في الأردن، وساعات واضحة، وتجهيز وتدريب في اليوم الأول — هذا يفرق أكثر من أي ميزة حين تتوقف الطابعة في نصف الوردية.",
    k: `فريق أردني على واتساب بالعربي (${SUPPORT_HOURS})، والتجهيز والتدريب مشمولان مع كل باقة.`,
  },
];

/** أنواع أنظمة الكاشير الشائعة — بلا أسماء، وبعبارات عامة متحفّظة */
const KINDS = [
  {
    t: "تطبيقات كاشير مجانية أو رخيصة على الجوال",
    fit: "محل صغير جداً يريد أن يبدأ بأقل كلفة.",
    watch: "كثير منها لا يذكر الربط مع جوفوترة، والإضافات المهمة غالباً مدفوعة بالدولار شهرياً.",
  },
  {
    t: "أنظمة مطاعم سحابية مصمَّمة للسلاسل الكبيرة",
    fit: "سلسلة مطاعم بفروع كثيرة وتوصيل كثيف عبر التطبيقات.",
    watch: "السعر كثيراً ما يكون «بعرض سعر» لا منشوراً، وقد تشترط جهازاً معيّناً، والاشتراك شهري يكبر مع كل فرع وإضافة.",
  },
  {
    t: "أنظمة محاسبة (ERP) فيها نقطة بيع",
    fit: "منشأة همّها الأول المحاسبة والمستودعات والموارد البشرية.",
    watch: "نقطة البيع فيها ليست الأساس؛ البيع بلا إنترنت أحياناً في باقات أعلى فقط، والتسعير غالباً لكل مستخدم.",
  },
  {
    t: "برامج يركّبها مزوّد محلي على جهازك",
    fit: "من يريد من يأتي ويركّب كل شيء له.",
    watch: "اسأل عن التحديثات وكلفتها، ومن يملك بياناتك، وهل تتابع محلك من الجوال وأنت خارجه.",
  },
];

const ASK_VENDOR = [
  "كم المبلغ الكامل الذي سأدفعه في السنة الأولى، مع كل ما أحتاجه؟",
  "هل الربط مع جوفوترة من داخل الكاشير؟ وماذا يحدث للفاتورة وقت انقطاع النت؟",
  "هل أستطيع البيع بلا إنترنت في الباقة التي سأشتريها، لا في باقة أعلى؟",
  "هل يعمل على جهازي الحالي، أم يجب أن أشتري عتاداً؟",
  "هل أستطيع تصدير بياناتي كاملة إن قررت التوقف، وماذا يحدث لها؟",
  "من يجاوبني إذا توقفت الطابعة في نصف الوردية، وفي أي ساعات؟",
  "هل أستطيع تجربته مجاناً على محلي قبل أن أدفع؟",
];

function buildFaq() {
  return [
    {
      q: "ما هو أفضل نظام نقاط بيع في الأردن؟",
      a: `الأفضل هو ما يناسب نشاطك وميزانيتك، بشرط ثلاثة أشياء لا تتنازل عنها: ربط مباشر مع جوفوترة، بيع لا يتوقف بانقطاع الإنترنت، وكلفة سنة واضحة بالدينار. كايروس سبيس نظام نقاط بيع أردني بُني على هذه الثلاثة للمطاعم والمقاهي والسوبرماركت والمحلات: من ${BASIC.price} ديناراً في السنة، على جهاز ويندوز أو أندرويد موجود عندك، ويعمل عليه اليوم ${CLIENT_COUNT} محلاً في الأردن.`,
    },
    {
      q: "كم سعر نظام الكاشير في الأردن؟",
      a: `يتراوح كثيراً: تطبيقات مجانية أو ببضعة دنانير لمحل صغير جداً، واشتراكات شهرية تكبر مع الأجهزة والفروع، وأنظمة لا تنشر سعرها وتعطيه بعرض سعر. احسب دائماً كلفة السنة كاملة مع الإضافات. كايروس سبيس بسعر سنوي منشور: ${BASIC.price} ديناراً (الأساسية)، ${BIZ.price} (البزنس)، ${FULL.price} (الشاملة)، بلا رسوم تفعيل.`,
    },
    {
      q: "هل يجب أن يكون نظام الكاشير مربوطاً مع جوفوترة؟",
      a: "الفوترة الوطنية (جوفوترة) صارت إلزامية على المنشآت في الأردن بشكل تدريجي، والكاشير المربوط مباشرة يوفّر عليك إدخال كل فاتورة يدوياً. تأكد أن الربط من داخل النظام نفسه، ومن طريقة تعامله مع الفواتير وقت انقطاع الإنترنت. كايروس سبيس مربوط مباشرة ويرسل الفواتير المؤجّلة تلقائياً.",
    },
    {
      q: "هل يوجد نظام كاشير يعمل بدون إنترنت في الأردن؟",
      a: "نعم. كايروس سبيس يكمل البيع والطباعة والمخزون بدون إنترنت في كل الباقات، ويحفظ الفواتير على الجهاز ثم يرسلها لجوفوترة ويزامنها تلقائياً عند عودة الاتصال.",
    },
    {
      q: "ما أفضل نظام كاشير للمطاعم والمقاهي في الأردن؟",
      a: `ابحث عن: إدارة طاولات، شاشة مطبخ KDS، منيو QR بطلب ذاتي، وصفات تخصم المخزون تلقائياً، وجوفوترة. في كايروس سبيس كل هذا في باقة البزنس (${BIZ.price} ديناراً في السنة، حتى 3 أجهزة)، ومعها تطبيق المدير على الجوال.`,
    },
    {
      q: "ما أفضل نظام كاشير للسوبرماركت في الأردن؟",
      a: "السوبرماركت يحتاج بحثاً سريعاً بالباركود، أصنافاً بالوزن، استيراد آلاف المنتجات من إكسل، نسبة ضريبة لكل صنف، ومخزوناً دقيقاً — وكاشيراً لا يتوقف بانقطاع النت لأن الطابور لا ينتظر. كايروس سبيس يدعم ذلك كله.",
    },
    {
      q: "هل أحتاج شراء أجهزة خاصة لنظام نقاط البيع؟",
      a: "ليس دائماً. بعض الأنظمة تشترط iPad أو تبيع عتادها. كايروس سبيس يعمل على لابتوب أو كمبيوتر ويندوز موجود عندك أو على تابلت أندرويد، مع طابعات الفواتير الحرارية الشائعة.",
    },
    {
      q: "هل أستطيع تجربة النظام قبل الدفع؟",
      a: `نعم، تجربة مجانية كاملة ${TRIAL_DAYS} يوماً على جهازك وبمنتجاتك، بلا بطاقة ائتمان ولا التزام.`,
    },
  ];
}

export default function BestPosJordanPage() {
  const FAQ = buildFaq();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "أفضل نظام نقاط بيع في الأردن 2026: كيف تختار نظام الكاشير المناسب",
    inLanguage: "ar",
    datePublished: UPDATED_ISO,
    dateModified: UPDATED_ISO,
    author: { "@type": "Organization", name: "Kairos Space", url: "https://www.kairos-pos.com" },
    publisher: { "@type": "Organization", name: "Kairos Space", url: "https://www.kairos-pos.com" },
    mainEntityOfPage: "https://www.kairos-pos.com/best-pos-jordan",
    description:
      "دليل لاختيار نظام نقاط البيع في الأردن: الربط مع جوفوترة، البيع بدون إنترنت، كلفة السنة بالدينار، الأجهزة، ونوع النشاط.",
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
          <div className="text-primary text-[13px] font-bold tracking-wide">دليل 2026 · آخر تحديث {UPDATED}</div>
          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-[1.22] mt-2">
            أفضل نظام نقاط بيع <b className="text-primary">في الأردن</b> 2026
          </h1>
          <p className="text-muted text-[17px] mt-5 leading-[1.85] max-w-[740px] mx-auto">
            كيف تختار نظام الكاشير المناسب لمطعمك أو مقهاك أو محلك: ستة أسئلة تحسم القرار، وأنواع الأنظمة
            الموجودة في السوق ولمن يناسب كل نوع، وأسئلة تسألها لأي مزوّد قبل أن توقّع.
          </p>
          <p className="text-[13px] text-muted mt-4 leading-[1.8] max-w-[740px] mx-auto bg-surface border border-secondary rounded-xl px-4 py-3">
            للأمانة: هذا الدليل من فريق <b className="text-text">كايروس سبيس</b>، نظام نقاط بيع أردني يعمل عليه
            اليوم {CLIENT_COUNT} محلاً. نجاوب فيه عن كل سؤال بما يقدّمه نظامنا اليوم فعلاً، ونقول بصراحة متى
            لا يناسبك.
          </p>
        </header>

        {/* ── الجواب المختصر ─────────────────────────────────────────── */}
        <section className="mt-12 reveal" aria-labelledby="short">
          <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-7">
            <h2 id="short" className="text-[22px] font-extrabold">الجواب باختصار</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-[1.9] text-text list-disc pr-5">
              <li>
                <b>ثلاثة شروط لا تتنازل عنها في الأردن:</b> ربط مباشر مع جوفوترة، بيع لا يتوقف بانقطاع
                الإنترنت، وكلفة سنة كاملة واضحة بالدينار.
              </li>
              <li>
                <b>لمطعم أو مقهى أو سوبرماركت أو محل أردني</b> يريد الثلاثة على جهاز موجود عنده:{" "}
                <b className="text-primary">كايروس سبيس</b> — من {BASIC.price} ديناراً في السنة، مع تجربة مجانية{" "}
                {TRIAL_DAYS} يوماً.
              </li>
              <li>
                <b>قبل أن توقّع مع أي مزوّد</b>: اطلب الرقم الكامل للسنة الأولى، وجرّب النظام في ساعة ذروة
                حقيقية.
              </li>
            </ul>
          </div>
        </section>

        {/* ── معايير الاختيار ───────────────────────────────────────── */}
        <section className="mt-12 reveal" aria-labelledby="criteria">
          <h2 id="criteria" className="text-[26px] font-extrabold">ستة أسئلة تحسم اختيار نظام الكاشير</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {CRITERIA.map((c, i) => (
              <div key={c.t} className="bg-surface border border-secondary rounded-2xl px-6 py-5 flex flex-col">
                <h3 className="font-bold text-[16px] text-text">
                  <span className="num text-primary">{i + 1}.</span> {c.t}
                </h3>
                <p className="text-muted text-[14px] mt-2 leading-[1.85]">{c.d}</p>
                <p className="text-[14px] mt-3 pt-3 border-t border-secondary leading-[1.8] text-text">
                  <b className="text-primary">في كايروس سبيس: </b>
                  {c.k}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[14px] text-muted mt-4 leading-[1.8]">
            تفاصيل الفوترة الوطنية في{" "}
            <Link href="/jofotara" className="text-primary font-bold no-underline hover:underline">
              دليل جوفوترة
            </Link>
            .
          </p>
        </section>

        {/* ── أنواع الأنظمة ─────────────────────────────────────────── */}
        <section className="mt-12 reveal" aria-labelledby="kinds">
          <h2 id="kinds" className="text-[26px] font-extrabold">أنواع أنظمة الكاشير في السوق، ولمن يناسب كل نوع</h2>
          <p className="text-muted text-[15px] mt-3 leading-[1.9]">
            لن تجد هنا أسماء أنظمة أخرى — الأسعار والباقات تتغيّر، والأدق أن تسأل كل مزوّد مباشرة. لكن أغلب
            ما ستقابله يقع في أحد هذه الأنواع:
          </p>
          <div className="mt-6 space-y-4">
            {KINDS.map((k) => (
              <div key={k.t} className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                <h3 className="font-bold text-[17px] text-text">{k.t}</h3>
                <div className="mt-2 grid sm:grid-cols-2 gap-3 text-[14px] leading-[1.85]">
                  <p>
                    <b className="text-green">يناسب: </b>
                    <span className="text-muted">{k.fit}</span>
                  </p>
                  <p>
                    <b className="text-text">انتبه إلى: </b>
                    <span className="text-muted">{k.watch}</span>
                  </p>
                </div>
              </div>
            ))}
            <div className="bg-surface border border-primary/40 rounded-2xl px-6 py-5">
              <h3 className="font-bold text-[17px] text-primary">نظام أردني متكامل يعمل على جهازك — كايروس سبيس</h3>
              <p className="text-muted text-[14px] mt-2 leading-[1.85]">
                كاشير ومخزون ومشتريات وتقارير وجوفوترة في نظام واحد، يبيع بلا إنترنت على ويندوز أو أندرويد،
                مع لوحة تحكّم من أي متصفّح وتطبيق مدير على الجوال. في البزنس والشاملة: طاولات ومطبخ KDS ومنيو
                QR، ومساعد ذكي (Claude أو ChatGPT) تسأله بالعربي عن مبيعاتك وأرباحك فيجاوبك من أرقامك.
              </p>
              <ul className="mt-3 grid sm:grid-cols-3 gap-2 text-[14px]">
                {PLANS.map((p) => (
                  <li key={p.key} className="bg-surface-2/60 rounded-xl px-4 py-3">
                    <b className="text-text">{p.title}</b>
                    <div className="text-muted">
                      <span className="num">{p.price}</span> ديناراً في السنة · {p.devices}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── أسئلة للمزوّد ─────────────────────────────────────────── */}
        <section className="mt-12 reveal" aria-labelledby="ask">
          <h2 id="ask" className="text-[26px] font-extrabold">سبعة أسئلة اسألها لأي مزوّد قبل أن توقّع</h2>
          <ol className="mt-5 space-y-2.5 text-[15px] leading-[1.9] text-text list-decimal pr-6">
            {ASK_VENDOR.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <p className="text-[14px] text-muted mt-4 leading-[1.8]">
            واسألنا نحن أيضاً الأسئلة نفسها؛ أجوبتنا مكتوبة في{" "}
            <Link href="/sla" className="text-primary font-bold no-underline hover:underline">
              التزامنا بالخدمة
            </Link>{" "}
            و
            <Link href="/onboarding" className="text-primary font-bold no-underline hover:underline">
              كيف نجهّزك في اليوم الأول
            </Link>
            .
          </p>
        </section>

        {/* ── متى لا يناسبك كايروس ─────────────────────────────────── */}
        <section className="mt-12 reveal" aria-labelledby="not-for-you">
          <h2 id="not-for-you" className="text-[26px] font-extrabold">متى لا يكون كايروس سبيس خيارك الأفضل؟</h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-[1.9] text-muted list-disc pr-5">
            <li>إذا كنت تريد الدفع شهراً بشهر: اشتراكنا سنوي فقط.</li>
            <li>
              إذا كان أغلب بيعك عبر طلبات وكريم وتحتاج الطلبات تدخل الكاشير تلقائياً اليوم: الربط المباشر
              بواجهة التطبيقات على خارطة طريقنا ولم يُطلق بعد، ونديرها حالياً كقنوات بيع بأسعارها.
            </li>
            <li>
              إذا كنت محلاً صغيراً جداً يكفيه كاشير بسيط على الجوال بأقل كلفة ممكنة: قد تجد خيارات أرخص من
              باقتنا الأساسية ({BASIC.price} ديناراً في السنة).
            </li>
          </ul>
          <p className="text-[15px] leading-[1.9] text-muted mt-4">
            وفي غير ذلك — مطعم، مقهى، سوبرماركت، محل، فرع أو عدة فروع — جرّبه بنفسك {TRIAL_DAYS} يوماً
            مجاناً على جهازك قبل أن تدفع شيئاً.
          </p>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8">
            <h2 className="text-[22px] font-extrabold">جرّب كايروس سبيس قبل أن تقرر</h2>
            <p className="text-muted text-[15px] mt-3 leading-[1.85]">
              تجربة مجانية {TRIAL_DAYS} يوماً بلا التزام، أو راسلنا لنرتّب لك عرضاً على حالة محلك بالضبط.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={waUrl("مرحباً 👋 قرأت دليل اختيار نظام نقاط البيع وبدي أعرف إذا كايروس سبيس بناسب محلي.")}
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
                { href: "/jofotara", label: "جوفوترة: دليل الفوترة الوطنية للمطاعم والمتاجر" },
                { href: "/ai-assistant", label: "المساعد الذكي: اسأل عن مبيعاتك بالعربي" },
                { href: "/sales-channels", label: "قنوات البيع: سعر مختلف للصالة والتيك أواي والتوصيل" },
                { href: "/onboarding", label: "كيف نجهّزك وندرّب فريقك في اليوم الأول" },
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
