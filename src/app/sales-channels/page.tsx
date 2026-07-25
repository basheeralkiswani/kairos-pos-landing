import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import { TRIAL_DAYS, waUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "قنوات البيع: سعر مختلف لكل قناة (صالة، تيك أواي، توصيل) | Kairos Space",
  description:
    "أدِر قنوات البيع في مطعمك أو كافيهك من نظام واحد: تسعير مستقل لكل قناة، تمييز البيع النقدي عن ذمم منصات التوصيل مثل طلبات وكريم، وإعدادات طباعة لكل قناة.",
  keywords: [
    "قنوات البيع",
    "تسعير حسب القناة",
    "أسعار مختلفة للتوصيل",
    "إدارة طلبات وكريم",
    "ذمم منصات التوصيل",
    "نظام نقاط بيع مطاعم",
    "تسعير التوصيل",
    "صالة تيك أواي توصيل",
  ],
  alternates: { canonical: "/sales-channels" },
  openGraph: {
    type: "article",
    locale: "ar_JO",
    url: "/sales-channels",
    title: "قنوات البيع: سعر مختلف لكل قناة (صالة، تيك أواي، توصيل)",
    description:
      "تسعير مستقل لكل قناة بيع، تمييز البيع الفوري عن ذمم منصات التوصيل، وإعدادات طباعة لكل قناة — من نظام واحد.",
  },
};

const SECTIONS = [
  { id: "what", title: "ما هي قنوات البيع؟" },
  { id: "pricing", title: "تسعير مستقل لكل قناة" },
  { id: "receivable", title: "قنوات فورية مقابل قنوات ذمم" },
  { id: "printing", title: "إعدادات طباعة لكل قناة" },
  { id: "reports", title: "الذمم حسب القناة" },
  { id: "faq", title: "أسئلة شائعة" },
];

const FAQ = [
  {
    q: "هل أستطيع وضع سعر مختلف للتوصيل عن سعر الصالة؟",
    a: "نعم. لكل قناة بيع أسعارها المستقلة، فتضع سعراً للصالة وآخر للتيك أواي وثالثاً لطلبات التوصيل يغطي عمولة المنصة. وتستطيع نسخ الأسعار بين القنوات ثم تعديل ما تحتاجه فقط.",
  },
  {
    q: "كيف أتابع مستحقاتي عند منصات مثل طلبات وكريم؟",
    a: "قنوات التوصيل تُعرَّف كقنوات ذمم: كل طلب عليها يُسجَّل كغير مدفوع ويُجمَّع في حساب المنصة، وتقرير «الذمم حسب القناة» يريك بالضبط كم لك عند كل منصة لتسوّيها عند التحصيل.",
  },
  {
    q: "هل يمكن إيقاف طباعة تذكرة المطبخ لقناة معينة؟",
    a: "نعم. لكل قناة إعدادات طباعة خاصة، فتفعّل أو توقف تذكرة المطبخ وفاتورة الزبون لكل قناة على حدة — مثلاً بلا تذكرة مطبخ لقناة التوصيل إن كانت تُحضَّر بشكل مختلف.",
  },
  {
    q: "هل الكاشير يبدّل بين القنوات بسهولة؟",
    a: "نعم. يختار الكاشير قناة الطلب بنقرة، فيُعاد تسعير العناصر تلقائياً وفق القناة المختارة ويُطبَّق سير العمل والطباعة الخاصان بها.",
  },
];

const CTA_MSG =
  "مرحباً 👋 بدي أعرف أكثر عن ميزة قنوات البيع (تسعير مختلف للصالة والتوصيل).";

export default function SalesChannelsPage() {
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

      <main className="max-w-[1240px] mx-auto px-7 relative z-1 pt-[130px]">
        <header className="text-center max-w-[760px] mx-auto reveal">
          <div className="text-primary text-[13px] font-bold tracking-wide">
            ميزة في كايروس سبيس
          </div>
          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-[1.22] mt-2">
            قنوات البيع: سعر مختلف <b className="text-primary">لكل قناة</b>
          </h1>
          <p className="text-muted text-[17px] mt-5 leading-[1.85]">
            الصالة والتيك أواي وطلبات التوصيل ليست بالسعر نفسه ولا بسير العمل نفسه.
            ميزة <b className="text-text">قنوات البيع</b> في كايروس سبيس تدير كل قناة
            بأسعارها وطباعتها وتحصيلها الخاص — من نظام واحد وشاشة كاشير واحدة.
          </p>
        </header>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10 mt-14">
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

          <div className="space-y-12 min-w-0">
            <section id="what" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">ما هي قنوات البيع؟</h2>
              <p className="text-muted text-[16px] mt-3 leading-[1.95]">
                قناة البيع هي الطريقة التي يصل بها الطلب إليك: بيع داخل الصالة،
                استلام من المحل (تيك أواي)، أو طلب عبر منصة توصيل مثل طلبات وكريم.
                كل قناة تختلف في سعرها، وطريقة تحصيل نقودها، وما يُطبع لها. كايروس
                سبيس يجعل كل قناة كياناً مستقلاً بإعداداته، فلا تخلط الحسابات ولا
                تخسر في تسعير التوصيل.
              </p>
            </section>

            <section id="pricing" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">تسعير مستقل لكل قناة</h2>
              <p className="text-muted text-[16px] mt-3 leading-[1.95]">
                لكل منتج سعر مستقل في كل قناة. تضع سعر الصالة، وسعراً أعلى قليلاً
                للتوصيل يغطّي عمولة المنصة، وسعراً للتيك أواي — وكلها لنفس المنتج.
                ولتوفير الوقت، تنسخ أسعار قناة كاملة إلى أخرى ثم تعدّل ما تحتاجه فقط.
              </p>
              <div className="bg-surface border border-secondary rounded-2xl px-6 py-5 mt-5">
                <h3 className="font-bold text-[16px] text-text">مثال عملي</h3>
                <p className="text-muted text-[15px] mt-2 leading-[1.9]">
                  قهوة تبيعها بـ1.50 دينار في الصالة، 1.75 عبر التوصيل لتغطية العمولة،
                  و1.50 تيك أواي. الكاشير يختار القناة، والنظام يطبّق السعر الصحيح
                  تلقائياً دون حساب يدوي.
                </p>
              </div>
            </section>

            <section id="receivable" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">قنوات فورية مقابل قنوات ذمم</h2>
              <p className="text-muted text-[16px] mt-3 leading-[1.95]">
                بعض القنوات تُحصّل نقدها فوراً (الصالة والتيك أواي)، وبعضها يُسوّى
                لاحقاً (منصات التوصيل التي تحوّل لك المبالغ كل فترة). في كايروس سبيس
                تحدّد لكل قناة نوعها:
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                  <div className="text-green text-[13px] font-bold">فورية</div>
                  <h3 className="font-bold text-[16px] text-text mt-1">نقد الآن</h3>
                  <p className="text-muted text-[14px] mt-2 leading-[1.85]">
                    الطلب يُدفع لحظة البيع ويدخل درج النقد مباشرة — الصالة، التيك أواي،
                    الاستلام.
                  </p>
                </div>
                <div className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                  <div className="text-primary text-[13px] font-bold">ذمم</div>
                  <h3 className="font-bold text-[16px] text-text mt-1">يُسوّى لاحقاً</h3>
                  <p className="text-muted text-[14px] mt-2 leading-[1.85]">
                    الطلب يُسجّل كغير مدفوع على حساب المنصة، وتحصّله عند التسوية عبر
                    حساب تسوية مخصص.
                  </p>
                </div>
              </div>
            </section>

            <section id="printing" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">إعدادات طباعة لكل قناة</h2>
              <p className="text-muted text-[16px] mt-3 leading-[1.95]">
                لكل قناة إعدادات طباعتها: تفعّل أو توقف تذكرة المطبخ وفاتورة الزبون
                لكل قناة على حدة. مثلاً، توصيل بلا فاتورة زبون مطبوعة، أو قناة سريعة
                بلا تذكرة مطبخ — كلٌّ حسب سير عملك، دون إعدادات متضاربة.
              </p>
            </section>

            <section id="reports" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">الذمم حسب القناة</h2>
              <p className="text-muted text-[16px] mt-3 leading-[1.95]">
                بدل أن تحسب مستحقاتك عند منصات التوصيل يدوياً، يريك تقرير «الذمم حسب
                القناة» كم لك عند كل منصة في أي فترة. تسجّل الدفعات لتسويتها، فتعرف
                بدقة ما حُصِّل وما بقي — وهذا يقفل ثغرة يخسر فيها كثير من المطاعم مبالغ
                دون أن ينتبهوا.
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
            <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8 reveal">
              <h2 className="text-[22px] font-extrabold">أدِر كل قنواتك من نظام واحد</h2>
              <p className="text-muted text-[15px] mt-3 leading-[1.85]">
                ابدأ تجربة مجانية {TRIAL_DAYS} يوماً، أو راسلنا لنريك الميزة على حالة محلك.
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
                  <Link href="/foodics-alternative" className="text-primary font-bold no-underline hover:underline">
                    كايروس سبيس بديلاً لفودكس ←
                  </Link>
                </li>
                <li>
                  <Link href="/jofotara" className="text-primary font-bold no-underline hover:underline">
                    جوفوترة: دليل نظام الفوترة الوطني ←
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
