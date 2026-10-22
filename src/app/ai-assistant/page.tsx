import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import { AiChatDemo } from "@/components/AiAssistant";
import { APP_URL, PLANS, TRIAL_DAYS, waUrl } from "@/lib/constants";

// صفحة محتوى للبحث العضوي: «نظام كاشير بالذكاء الاصطناعي» وأخواتها.
// ⚠️ كل قدرة مذكورة هنا أداة تعمل اليوم في موصل Claude (apps/web/mcp في مستودع
// الـ POS، والمرجع docs/kairos-cloud/AI-ASSISTANT.md). قائمة «ما لا يفعله أبداً»
// منقولة من قسم «ما لا يستطيعه Claude أبداً» هناك — إن فُتحت صلاحية جديدة
// (scope) فحدّث القائمتين معاً، ولا تَعِد بشيء قبل أن يُشحن.

const MCP_URL = `${APP_URL}/mcp`;
const PLAN_NAMES = `${PLANS[1].title} و${PLANS[2].title}`;

export const metadata: Metadata = {
  title: "نظام كاشير بالذكاء الاصطناعي: اسأل محلّك بالعربي | Kairos Space",
  description:
    "مساعد ذكاء اصطناعي (Claude) مربوط بنظام نقاط البيع Kairos: اسأله عن المبيعات والأرباح والمخزون بالعربي، وصوّر فاتورة المورد ليسجّلها — ولا يكتب شيئاً قبل موافقتك.",
  keywords: [
    "نظام كاشير بالذكاء الاصطناعي",
    "نظام نقاط بيع ذكي",
    "ذكاء اصطناعي للمطاعم",
    "ذكاء اصطناعي للمقاهي",
    "مساعد ذكي لصاحب المحل",
    "تحليل المبيعات بالذكاء الاصطناعي",
    "إدخال فواتير الموردين من صورة",
    "Claude",
    "AI POS",
    "الأردن",
  ],
  alternates: { canonical: "/ai-assistant" },
  openGraph: {
    type: "article",
    locale: "ar_JO",
    url: "/ai-assistant",
    title: "اسأل محلّك بالعربي… ويجاوبك بالأرقام — مساعد Kairos الذكي",
    description:
      "مساعد ذكاء اصطناعي يقرأ مبيعاتك وأرباحك ومخزونك، ويسجّل فواتير الموردين من صورة — بعد موافقتك فقط.",
  },
};

const SECTIONS = [
  { id: "what", title: "ما هو مساعد Kairos الذكي؟" },
  { id: "ask", title: "أسئلة تسألها كل يوم" },
  { id: "invoices", title: "فاتورة المورد من صورة" },
  { id: "manage", title: "يرتّب معك المنيو والمخزون" },
  { id: "safety", title: "أمان بياناتك" },
  { id: "setup", title: "التشغيل في دقيقتين" },
  { id: "faq", title: "أسئلة شائعة" },
];

// أسئلة حقيقية يجيبها المساعد اليوم — كل واحد يقابل أداة قراءة.
const QUESTIONS = [
  { q: "كم ربحت هالشهر بعد الضريبة؟", hint: "صافي الربح من نفس محرّك تقارير النظام" },
  { q: "شو أكثر صنف بيخسرني؟", hint: "تكلفة كل منتج من وصفته مقابل سعره" },
  { q: "شو لازم أطلب من الموردين بكرة؟", hint: "توقّع النفاد وحدّ إعادة الطلب" },
  { q: "مين ألغى طلبات اليوم ومن أي جهاز؟", hint: "من سجل التدقيق مباشرة" },
  { q: "كيف كانت وردية امبارح؟ في عجز؟", hint: "تقرير الوردية والدرج" },
  { q: "مين من الزباين عليه ذمم؟", hint: "كشوف العملاء والموردين" },
  { q: "جهّزلي أرقام إقرار ضريبة المبيعات", hint: "المخرجات ناقص المدخلات بفواتيرها" },
  { q: "قارن مبيعات الفروع هالأسبوع", hint: "كل فرع وحده أو مجمّعة" },
];

const NEVER = [
  "يبيع أو يصدر فاتورة بيع",
  "يحذف منتجاً أو مادة أو عميلاً أو مورداً",
  "يبطل (void) طلباً أو مصروفاً",
  "يفتح أو يغلق الورديات أو يُقفل اليوم",
  "يغيّر إعدادات المحل أو الموظفين وصلاحياتهم",
];

const FAQ = [
  {
    q: "ما هو المساعد الذكي في كايروس سبيس؟",
    a: "هو ربط بين نظام نقاط البيع Kairos ومساعد الذكاء الاصطناعي Claude من شركة Anthropic. بعد الربط تسأل Claude بالعربي عن مبيعاتك وأرباحك ومخزونك فيجيبك من أرقام محلّك الفعلية، وتستطيع أن تطلب منه تسجيل فواتير الموردين والمصاريف وتعديل الأسعار — بعد موافقتك على كل تغيير.",
  },
  {
    q: "هل يستطيع الذكاء الاصطناعي أن يغيّر شيئاً في محلّي دون علمي؟",
    a: "لا. كل تغيير له أثر — استلام بضاعة، تعديل سعر، تصحيح مخزون — يُعرض عليك أولاً بالأرقام وينتظر موافقتك الصريحة. وصلاحياته تحدّدها أنت عند الربط، ولا تتجاوز صلاحيات دورك في المحل. ولا يستطيع أبداً أن يبيع أو يحذف أو يبطل أو يغيّر إعدادات المحل، وكل خطوة يقوم بها تُسجَّل باسمه في سجل التدقيق.",
  },
  {
    q: "هل أحتاج خبرة تقنية لاستخدامه؟",
    a: "لا. تكتب له كما تكتب لمحاسبك على واتساب، باللهجة التي تتكلّمها. الربط نفسه يتم مرة واحدة: تضيف رابط Kairos في تطبيق Claude، تسجّل دخولك بحساب Kairos، وتوافق على الصلاحيات.",
  },
  {
    q: "هل يعمل من الجوال؟",
    a: "نعم. يعمل من تطبيق Claude على الجوال ومن المتصفّح، فتسأل عن أرقام محلّك وأنت خارجه، وتصوّر فاتورة المورد لحظة استلامها.",
  },
  {
    q: "في أي باقة يتوفّر المساعد الذكي؟",
    a: `المساعد الذكي متاح في باقتَي ${PLAN_NAMES}. وتحتاج أيضاً حساباً على Claude لتتحدّث معه.`,
  },
  {
    q: "هل يمكن إيقاف المساعد بعد ربطه؟",
    a: "نعم، في أي لحظة. من لوحة تحكّم Kairos ترى كل اتصال قائم وتلغيه بضغطة، فيتوقّف وصوله فوراً. وإذا أُزيل موظف من المحل أو نزل دوره، تسقط صلاحيات اتصاله تلقائياً.",
  },
];

const CTA_MSG = "مرحباً 👋 بدي أعرف أكثر عن المساعد الذكي (Claude) في Kairos.";

export default function AiAssistantPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="glow w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_70%)] -top-[180px] -right-[120px] absolute" />
        <div className="glow w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(23,138,88,0.08),transparent_70%)] top-[55%] -left-[160px] absolute" />
      </div>

      <Navbar />

      <main className="max-w-[1240px] mx-auto px-7 max-sm:px-5 relative z-1 pt-[130px]">
        <header className="grid grid-cols-[1fr_1fr] gap-12 items-center max-lg:grid-cols-1">
          <div className="reveal">
            <div className="text-primary text-[13px] font-bold tracking-wide">
              مساعد ذكاء اصطناعي في كايروس سبيس
            </div>
            <h1 className="text-[clamp(30px,5vw,50px)] font-black leading-[1.25] mt-2">
              نظام كاشير <b className="text-primary">بالذكاء الاصطناعي</b>: اسأل محلّك بالعربي
            </h1>
            <p className="text-muted text-[17px] mt-5 leading-[1.9]">
              اربط Kairos بـ <b className="text-text">Claude</b>، مساعد الذكاء الاصطناعي من
              Anthropic، واسأله عن مبيعاتك وأرباحك ومخزونك كأنك تحكي مع محاسبك — من
              الجوال أو الكمبيوتر، وفي أي وقت. وحين تطلب منه أن يسجّل أو يعدّل، يعرض
              عليك ما سيفعله أولاً ولا يكتب شيئاً قبل موافقتك.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-gold max-sm:w-full">
                ابدأ تجربة مجانية {TRIAL_DAYS} يوماً
              </Link>
              <a
                href={waUrl(CTA_MSG)}
                className="hit-44 inline-flex items-center gap-2 text-[15px] font-bold text-wa no-underline hover:underline"
              >
                اطلب عرضاً على واتساب
              </a>
            </div>
          </div>
          <AiChatDemo />
        </header>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10 mt-20">
          {/* ── فهرس جانبي ─────────────────────────────────────────── */}
          <nav className="hidden lg:block" aria-label="محتويات الصفحة">
            <div className="sticky top-[110px] bg-surface border border-secondary rounded-2xl p-5">
              <div className="text-[13px] font-bold text-primary mb-3">المحتويات</div>
              <ul className="space-y-1.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-muted no-underline text-[14px] leading-[1.7] block py-1 hover:text-primary transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="space-y-14 min-w-0">
            <section id="what" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">ما هو مساعد Kairos الذكي؟</h2>
              <p className="text-muted text-[16px] mt-3 leading-[1.95]">
                أغلب أصحاب المحلات لا يفتحون التقارير لأنها تحتاج وقتاً وبحثاً بين الشاشات.
                المساعد الذكي يقلب الآية: أنت تسأل سؤالاً واحداً بكلامك العادي، وهو يذهب
                إلى أرقام محلّك في Kairos ويرجع لك بالجواب — مبيعات، ربح صافٍ بعد ضريبة
                المبيعات، تكلفة أصناف، مخزون، ورديات، ذمم. الأرقام نفسها التي تراها في
                لوحة التحكّم، من نفس المحرّك، لا تقديرات.
              </p>
            </section>

            <section id="ask" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">أسئلة تسألها كل يوم — وتأخذ جوابها بثوانٍ</h2>
              <p className="text-muted text-[16px] mt-3 leading-[1.95]">
                اكتب كما تتكلّم. هذه أمثلة من أسئلة أصحاب المحلات:
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {QUESTIONS.map((item) => (
                  <li key={item.q} className="bg-surface border border-secondary rounded-2xl px-5 py-4">
                    <div className="font-bold text-[16px] text-text">«{item.q}»</div>
                    <div className="text-muted text-[14px] mt-1">{item.hint}</div>
                  </li>
                ))}
              </ul>
            </section>

            <section id="invoices" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">صوّر فاتورة المورد… وخلّيه يسجّلها</h2>
              <p className="text-muted text-[16px] mt-3 leading-[1.95]">
                إدخال فواتير الموردين من أثقل شغل المحل. مع المساعد الذكي تصوّر الفاتورة
                الورقية وترسلها له، فيقوم بالخطوات التي كنت تقوم بها يدوياً:
              </p>
              <ol className="mt-6 space-y-3">
                {[
                  "يقرأ أسطر الفاتورة ويطابق كل صنف مع موادك ومنتجاتك في النظام.",
                  "يتأكد من المورد، ويحفظ الإجمالي كما هو مكتوب على الورقة — لا يعدّله ليطابق.",
                  "يعرض عليك جدول ما سيسجّله بالكميات والأسعار وينتظر موافقتك.",
                  "بعد «تأكيد» يُستلم المخزون وتُحدَّث التكلفة وحساب المورد تلقائياً.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4 bg-surface border border-secondary rounded-2xl px-5 py-4">
                    <span className="num w-8 h-8 shrink-0 rounded-full bg-primary/10 text-primary font-extrabold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-[15px] leading-[1.85] pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="text-muted text-[15px] mt-4 leading-[1.9]">
                وبنفس الطريقة: «سجّل مصروف كهرباء 45 ديناراً»، أو «سجّل دفعة 200 للمورد».
              </p>
            </section>

            <section id="manage" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">يرتّب معك المنيو والمخزون</h2>
              <p className="text-muted text-[16px] mt-3 leading-[1.95]">
                ليس للأسئلة فقط. اطلب منه ما يأخذ منك ساعة على الشاشات:
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  { t: "الأسعار والمنتجات", d: "«خلّي سعر اللاتيه الكبير 2.75» — يعرض السعر قبل وبعد، وينفّذ بموافقتك." },
                  { t: "الوصفات والتكلفة", d: "يبني وصفة المنتج من موادك، فيصير لكل صنف تكلفة وهامش ربح حقيقي." },
                  { t: "الخيارات والإضافات", d: "الأحجام والإضافات وربطها بالمخزون، فيُخصم ما يُختار فعلاً." },
                  { t: "الجرد والهدر", d: "يفتح جلسة جرد، يسجّل ما عددته، ويعرض الفروقات قبل تطبيقها." },
                ].map((c) => (
                  <div key={c.t} className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                    <h3 className="font-bold text-[16px] text-text">{c.t}</h3>
                    <p className="text-muted text-[14px] mt-2 leading-[1.85]">{c.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="safety" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">أمان بياناتك أولاً</h2>
              <p className="text-muted text-[16px] mt-3 leading-[1.95]">
                ذكاء اصطناعي يصل إلى حسابات محلّك يجب أن يكون محكوماً بقواعد صارمة.
                هذه قواعد المساعد في Kairos — يفرضها خادم النظام نفسه، لا مجرّد تعليمات للنموذج:
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                  <div className="text-green text-[13px] font-bold">يسأل قبل أن يكتب</div>
                  <p className="text-muted text-[14px] mt-2 leading-[1.85]">
                    كل تغيير له أثر يُعرض عليك بالأرقام أولاً، ولا يُنفَّذ إلا بموافقتك.
                    إن تغيّر شيء في الأثناء، يعيد العرض من جديد.
                  </p>
                </div>
                <div className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                  <div className="text-green text-[13px] font-bold">صلاحياتك أنت</div>
                  <p className="text-muted text-[14px] mt-2 leading-[1.85]">
                    تختار عند الربط ما يُسمح له به، ولا يتجاوز صلاحيات دورك في المحل —
                    المحاسب يمنحه المصاريف، ومسؤول المخزون يمنحه المشتريات.
                  </p>
                </div>
                <div className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                  <div className="text-green text-[13px] font-bold">مسجّل في سجل التدقيق</div>
                  <p className="text-muted text-[14px] mt-2 leading-[1.85]">
                    كل خطوة يقوم بها تُكتب باسمه ووقتها في سجل التدقيق، بجانب خطوات موظفيك.
                  </p>
                </div>
                <div className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                  <div className="text-green text-[13px] font-bold">تلغيه بضغطة</div>
                  <p className="text-muted text-[14px] mt-2 leading-[1.85]">
                    من لوحة التحكّم ترى كل اتصال قائم وتلغيه فوراً، وله سقف يومي للعمليات
                    يوقف أي خطأ متكرّر.
                  </p>
                </div>
              </div>
              <div className="bg-surface border border-[rgba(168,128,26,0.35)] rounded-2xl px-6 py-5 mt-4">
                <h3 className="font-bold text-[16px] text-text">ما لا يفعله أبداً</h3>
                <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-muted">
                  {NEVER.map((n) => (
                    <li key={n} className="flex items-start gap-2">
                      <span className="text-primary font-extrabold" aria-hidden="true">✕</span>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="setup" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">التشغيل في دقيقتين</h2>
              <ol className="mt-6 space-y-3">
                {[
                  <>افتح <b className="text-text">Claude</b> على الجوال أو المتصفّح، ومن الإعدادات أضف موصلاً مخصّصاً (Connector).</>,
                  <>
                    الصق رابط Kairos:{" "}
                    <code dir="ltr" className="num bg-surface-2 rounded-md px-2 py-0.5 text-[14px] text-text">
                      {MCP_URL}
                    </code>
                  </>,
                  <>سجّل دخولك بحساب Kairos نفسه، واختر الصلاحيات التي تمنحها — ثم اسأل.</>,
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 bg-surface border border-secondary rounded-2xl px-5 py-4">
                    <span className="num w-8 h-8 shrink-0 rounded-full bg-primary/10 text-primary font-extrabold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-[15px] leading-[1.85] pt-0.5 text-muted min-w-0 break-words">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="text-muted text-[15px] mt-4 leading-[1.9]">
                متاح في باقتَي <b className="text-text">{PLAN_NAMES}</b> —{" "}
                <Link href="/#pricing" className="text-primary font-bold no-underline hover:underline">
                  قارن الباقات
                </Link>
                .
              </p>
            </section>

            <section id="faq" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">أسئلة شائعة</h2>
              <div className="mt-6 space-y-3">
                {FAQ.map((item) => (
                  <details
                    key={item.q}
                    className="group bg-surface border border-secondary rounded-2xl px-6 py-5 transition-colors hover:border-primary/30"
                  >
                    <summary className="font-bold text-[16px] cursor-pointer list-none flex items-center justify-between gap-4">
                      {item.q}
                      <span className="text-primary text-[22px] leading-none shrink-0 transition-transform duration-250 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="text-muted text-[15px] mt-4 leading-[1.9]">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA + روابط داخلية */}
            <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8 max-sm:p-6 reveal">
              <h2 className="text-[22px] font-extrabold">محاسب يردّ عليك في أي ساعة — من جيبك</h2>
              <p className="text-muted text-[15px] mt-3 leading-[1.85]">
                ابدأ تجربة مجانية {TRIAL_DAYS} يوماً، أو راسلنا لنريك المساعد على أرقام محلّك.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={waUrl(CTA_MSG)}
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
              <ul className="mt-6 space-y-2 text-[15px] border-t border-primary/15 pt-5">
                <li>
                  <Link href="/sales-channels" className="text-primary font-bold no-underline hover:underline">
                    قنوات البيع: سعر مختلف لكل قناة ←
                  </Link>
                </li>
                <li>
                  <Link href="/jofotara" className="text-primary font-bold no-underline hover:underline">
                    جوفوترة: دليل نظام الفوترة الوطني ←
                  </Link>
                </li>
                <li>
                  <Link href="/foodics-alternative" className="text-primary font-bold no-underline hover:underline">
                    كايروس سبيس بديلاً لفودكس ←
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-16" />
      </main>

      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
