import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import { TRIAL_DAYS, waUrl } from "@/lib/constants";

// الهيكل المشترك لصفحات «بديل …» (إيصال، POSRocket، …). صفحة فودكس الأصلية
// (`/foodics-alternative`) سبقت هذا المكوّن وتُركت كما هي عمداً — هي المرجع الذي
// نُسخ منه الشكل. القاعدة التحريرية واحدة: نصف المنافس بحياد وبما هو منشور
// عنده (مع تاريخ الاطلاع)، ولا نذكر عن كايروس إلا ما يعمل اليوم فعلاً؛ ما على
// خارطة الطريق يُسمّى كذلك صراحةً.

export type CompareRow = { k: string; kairos: string; other: string };
export type FaqItem = { q: string; a: string };
export type ReadAlso = { href: string; label: string };

type Props = {
  /** اسم المنافس كما يظهر في العناوين (مثال: «إيصال (Esal)») */
  competitor: string;
  /** الكلمة الملوّنة في H1 (مثال: «إيصال») */
  competitorShort: string;
  /** سطر تحت الشريط الصغير فوق H1 */
  kicker?: string;
  /** فقرة الهيرو */
  intro: React.ReactNode;
  /** عنوان وفقرة «لماذا يبحث …» */
  whyTitle: string;
  why: React.ReactNode;
  /** عنوان عمود المنافس في الجدول */
  otherColumn: string;
  rows: CompareRow[];
  /** ملاحظة تحت الجدول: مصدر أسعار المنافس وتاريخ الاطلاع + إخلاء العلامة */
  tableNote: string;
  /** أربع بطاقات «المزايا التي تصنع الفرق» */
  edges: { t: string; d: string }[];
  faq: FaqItem[];
  ctaMsg: string;
  readAlso: ReadAlso[];
};

export default function CompareLayout(p: Props) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="glow w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_70%)] -top-[180px] -right-[120px] absolute" />
        <div className="glow w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(23,138,88,0.07),transparent_70%)] top-[55%] -left-[160px] absolute" />
      </div>

      <Navbar />

      <main className="max-w-[900px] mx-auto px-7 relative z-1 pt-[130px]">
        <header className="text-center reveal">
          <div className="text-primary text-[13px] font-bold tracking-wide">{p.kicker ?? "مقارنة عادلة"}</div>
          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-[1.22] mt-2">
            بديل <b className="text-primary">{p.competitorShort}</b> في الأردن
          </h1>
          <p className="text-muted text-[17px] mt-5 leading-[1.85] max-w-[720px] mx-auto">{p.intro}</p>
        </header>

        {/* ── لماذا تبحث عن بديل ─────────────────────────────────────── */}
        <section className="mt-14 reveal">
          <h2 className="text-[26px] font-extrabold">{p.whyTitle}</h2>
          <p className="text-muted text-[16px] mt-3 leading-[1.95]">{p.why}</p>
        </section>

        {/* ── جدول المقارنة ─────────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <h2 className="text-[26px] font-extrabold">كايروس سبيس مقابل {p.competitor}</h2>
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[560px] border border-secondary rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[1.1fr_1.4fr_1.2fr] bg-surface-2/60">
                <div className="px-5 py-4 font-extrabold text-[14px] text-text">ما يهمّك</div>
                <div className="px-5 py-4 font-extrabold text-[14px] text-primary border-r border-secondary">كايروس سبيس</div>
                <div className="px-5 py-4 font-extrabold text-[14px] text-muted border-r border-secondary">{p.otherColumn}</div>
              </div>
              {p.rows.map((row, i) => (
                <div
                  key={row.k}
                  className={`grid grid-cols-[1.1fr_1.4fr_1.2fr] ${i % 2 ? "bg-surface" : "bg-transparent"} border-t border-secondary`}
                >
                  <div className="px-5 py-4 font-bold text-[14px] text-text">{row.k}</div>
                  <div className="px-5 py-4 text-[14px] text-text leading-[1.7] border-r border-secondary flex gap-2">
                    <span className="text-green shrink-0">✓</span>
                    <span>{row.kairos}</span>
                  </div>
                  <div className="px-5 py-4 text-[14px] text-muted leading-[1.7] border-r border-secondary">{row.other}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[13px] text-muted mt-3 leading-[1.7]">{p.tableNote}</p>
        </section>

        {/* ── ما الذي يفرق ──────────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <h2 className="text-[26px] font-extrabold">المزايا التي تصنع الفرق</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {p.edges.map((c) => (
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
              ابدأ تجربة مجانية {TRIAL_DAYS} يوماً بلا التزام، أو راسلنا لنرتّب لك عرضاً تجريبياً على حالة محلك بالضبط.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={waUrl(p.ctaMsg)}
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
            {p.faq.map((item) => (
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

        {/* ── روابط داخلية (عنقود موضوعي) ───────────────────────────── */}
        <section className="mt-12 mb-4 reveal">
          <div className="bg-surface border border-secondary rounded-2xl p-7">
            <h2 className="text-[18px] font-extrabold">اقرأ أيضاً</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {p.readAlso.map((l) => (
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
