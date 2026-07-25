import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import { PRICE_FROM, TRIAL_DAYS, waUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "بديل فودكس (Foodics) في الأردن — نظام نقاط بيع محلي بسعر أقل | Kairos Space",
  description:
    "تبحث عن بديل فودكس (Foodics) في الأردن؟ كايروس سبيس نظام نقاط بيع أردني بأسعار بالدينار، يعمل بدون إنترنت، مربوط مع جوفوترة، بدعم عربي مباشر — بتكلفة أقل بكثير.",
  keywords: [
    "بديل فودكس",
    "بديل Foodics",
    "Foodics الأردن",
    "بديل فودكس الأردن",
    "نظام نقاط بيع أردني",
    "مقارنة فودكس",
    "نظام كاشير مطاعم الأردن",
    "بديل نظام مطاعم",
  ],
  alternates: { canonical: "/foodics-alternative" },
  openGraph: {
    type: "article",
    locale: "ar_JO",
    url: "/foodics-alternative",
    title: "بديل فودكس (Foodics) في الأردن — نظام نقاط بيع محلي بسعر أقل",
    description:
      "كايروس سبيس بديل أردني لفودكس: أسعار بالدينار، يعمل بدون إنترنت، مربوط مع جوفوترة، ودعم عربي مباشر.",
  },
};

// صفوف المقارنة — تركّز على نقاط تموضع كايروس القابلة للإثبات، وتصف فودكس
// بحياد دون ادّعاءات غير موثّقة. المقارنة عامة وForodics علامة لأصحابها.
const COMPARE = [
  { k: "العملة والتسعير", kairos: "بالدينار الأردني — أسعار واضحة محلياً", other: "غالباً بالدولار وبعقود إقليمية" },
  { k: "الربط مع جوفوترة", kairos: "مربوط مباشرة — كل فاتورة متوافقة تلقائياً", other: "يعتمد على الباقة والإعداد" },
  { k: "العمل بدون إنترنت", kairos: "يعمل بالكامل أوفلاين ويزامن لاحقاً", other: "يعتمد بدرجة كبيرة على الاتصال" },
  { k: "الدعم والتدريب", kairos: "دعم عربي مباشر وتدريب وقت التركيب", other: "دعم عام غالباً بالإنجليزية" },
  { k: "الأنسب لـ", kairos: "الكافيهات والمطاعم والسوبرماركت في الأردن", other: "سلاسل وشركات إقليمية كبيرة" },
  { k: "التكلفة", kairos: `تبدأ من ${PRICE_FROM} دنانير شهرياً — بلا رسوم تفعيل`, other: "أعلى بشكل ملحوظ حسب الباقة" },
];

const FAQ = [
  {
    q: "هل كايروس سبيس بديل فعلي لفودكس؟",
    a: "نعم. يغطي كايروس سبيس المهام الأساسية نفسها — كاشير، فواتير، مخزون، قنوات بيع، وتقارير — لكنه مبنيّ للسوق الأردني ومربوط مع جوفوترة، بسعر أقل بكثير ودعم عربي مباشر.",
  },
  {
    q: "كم أوفّر مقارنة بالأنظمة العالمية؟",
    a: `بحسب حالتك، تكون تكلفة كايروس سبيس أقل بنحو 60–75٪ من الأنظمة العالمية، مع أسعار بالدينار الأردني بلا رسوم تفعيل واشتراك يبدأ من ${PRICE_FROM} دنانير شهرياً.`,
  },
  {
    q: "هل أستطيع نقل بياناتي من فودكس أو نظام آخر؟",
    a: "نعم، نساعدك في تجهيز منتجاتك وأصنافك واستيرادها دفعة واحدة من ملف إكسل أو CSV، فلا تبدأ من الصفر. راسلنا ونرتّب النقل معك.",
  },
  {
    q: "ماذا لو عندي أكثر من فرع؟",
    a: "كل فرع له جهازه، وتظهر كل الفروع مجمّعة في لوحة تحكم واحدة. عدد الأجهزة يتبع اشتراكك، ونضيف الفروع معك بسهولة.",
  },
];

const CTA_MSG =
  "مرحباً 👋 بفكّر أنتقل من فودكس (أو نظام آخر) إلى كايروس سبيس — بدي أعرف التفاصيل.";

export default function FoodicsAlternativePage() {
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
        <div className="glow w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_70%)] -top-[180px] -right-[120px] absolute" />
        <div className="glow w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(23,138,88,0.07),transparent_70%)] top-[55%] -left-[160px] absolute" />
      </div>

      <Navbar />

      <main className="max-w-[900px] mx-auto px-7 relative z-1 pt-[130px]">
        <header className="text-center reveal">
          <div className="text-primary text-[13px] font-bold tracking-wide">
            مقارنة عادلة
          </div>
          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-[1.22] mt-2">
            بديل <b className="text-primary">فودكس</b> (Foodics) في الأردن
          </h1>
          <p className="text-muted text-[17px] mt-5 leading-[1.85] max-w-[720px] mx-auto">
            إن كنت تبحث عن <b className="text-text">بديل فودكس</b> يناسب محلاً في الأردن،
            فكايروس سبيس نظام نقاط بيع محليّ يعطيك المزايا نفسها بأسعار بالدينار، يعمل
            بدون إنترنت، مربوط مباشرة مع جوفوترة، وبدعم عربي مباشر — بتكلفة أقل بكثير.
          </p>
        </header>

        {/* ── لماذا تبحث عن بديل ─────────────────────────────────────── */}
        <section className="mt-14 reveal">
          <h2 className="text-[26px] font-extrabold">لماذا يبحث أصحاب المحلات عن بديل لفودكس؟</h2>
          <p className="text-muted text-[16px] mt-3 leading-[1.95]">
            الأنظمة العالمية قوية، لكنها غالباً مصمّمة للسلاسل الكبيرة وبأسعار
            بالدولار وعقود إقليمية. صاحب الكافيه أو المطعم أو السوبرماركت في الأردن
            يحتاج شيئاً أبسط وأقرب: سعراً بالدينار يفهمه، نظاماً يشتغل حتى لو انقطع
            النت، توافقاً جاهزاً مع جوفوترة، ودعماً عربياً يردّ عليه بسرعة. هذا
            بالضبط ما بُني كايروس سبيس لأجله.
          </p>
        </section>

        {/* ── جدول المقارنة ─────────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <h2 className="text-[26px] font-extrabold">كايروس سبيس مقابل فودكس</h2>
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[560px] border border-secondary rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[1.1fr_1.4fr_1.2fr] bg-surface-2/60">
                <div className="px-5 py-4 font-extrabold text-[14px] text-text">ما يهمّك</div>
                <div className="px-5 py-4 font-extrabold text-[14px] text-primary border-r border-secondary">
                  كايروس سبيس
                </div>
                <div className="px-5 py-4 font-extrabold text-[14px] text-muted border-r border-secondary">
                  الأنظمة العالمية (مثل فودكس)
                </div>
              </div>
              {COMPARE.map((row, i) => (
                <div
                  key={row.k}
                  className={`grid grid-cols-[1.1fr_1.4fr_1.2fr] ${
                    i % 2 ? "bg-surface" : "bg-transparent"
                  } border-t border-secondary`}
                >
                  <div className="px-5 py-4 font-bold text-[14px] text-text">{row.k}</div>
                  <div className="px-5 py-4 text-[14px] text-text leading-[1.7] border-r border-secondary flex gap-2">
                    <span className="text-green shrink-0">✓</span>
                    <span>{row.kairos}</span>
                  </div>
                  <div className="px-5 py-4 text-[14px] text-muted leading-[1.7] border-r border-secondary">
                    {row.other}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[13px] text-muted mt-3 leading-[1.7]">
            المقارنة عامة بناءً على تموضع كل نظام وقد تختلف حسب الباقة. «Foodics /
            فودكس» علامة تجارية تعود لأصحابها، ولا يوجد ارتباط بيننا وبينهم.
          </p>
        </section>

        {/* ── ما الذي يفرق ──────────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <h2 className="text-[26px] font-extrabold">المزايا التي تصنع الفرق</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {[
              { t: "سعر بالدينار بلا مفاجآت", d: `اشتراك يبدأ من ${PRICE_FROM} دنانير شهرياً، بلا رسوم تفعيل وبلا فواتير بالدولار.` },
              { t: "يعمل بدون إنترنت", d: "البيع والفواتير والمخزون تستمر عادي حتى لو انقطع النت، وتتزامن تلقائياً عند العودة." },
              { t: "جوفوترة جاهزة", d: "كل فاتورة متوافقة قانونياً تلقائياً دون برنامج منفصل أو خطوات إضافية." },
              { t: "دعم عربي مباشر", d: "نردّ عليك عبر واتساب بسرعة، وندرّب فريقك وقت التركيب حتى يبدأ في نفس اليوم." },
            ].map((c) => (
              <div key={c.t} className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                <h3 className="font-bold text-[16px] text-text">{c.t}</h3>
                <p className="text-muted text-[14px] mt-2 leading-[1.85]">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8">
            <h2 className="text-[22px] font-extrabold">جرّب كايروس سبيس قبل أن تقرر</h2>
            <p className="text-muted text-[15px] mt-3 leading-[1.85]">
              ابدأ تجربة مجانية {TRIAL_DAYS} يوماً بلا التزام، أو راسلنا لنرتّب لك عرضاً
              تجريبياً على حالة محلك بالضبط.
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
          </div>
        </section>

        {/* ── الأسئلة الشائعة ────────────────────────────────────────── */}
        <section className="mt-12 reveal">
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

        {/* ── روابط داخلية (عنقود موضوعي) ───────────────────────────── */}
        <section className="mt-12 mb-4 reveal">
          <div className="bg-surface border border-secondary rounded-2xl p-7">
            <h2 className="text-[18px] font-extrabold">اقرأ أيضاً</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li>
                <Link href="/jofotara" className="text-primary font-bold no-underline hover:underline">
                  جوفوترة: دليل نظام الفوترة الوطني ←
                </Link>
              </li>
              <li>
                <Link href="/sales-channels" className="text-primary font-bold no-underline hover:underline">
                  قنوات البيع: سعر مختلف لكل قناة (صالة، تيك أواي، توصيل) ←
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-primary font-bold no-underline hover:underline">
                  كل مزايا كايروس سبيس ←
                </Link>
              </li>
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
