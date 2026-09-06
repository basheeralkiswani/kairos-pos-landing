import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import { TRIAL_DAYS, WA_MESSAGES, waUrl } from "@/lib/constants";

// «التجهيز والتدريب» — يجيب عن سؤال ما قبل الشراء: «كم بيأخذ وقت؟ وشو لازم أجيب؟».
// كل خطوة هنا تُنفَّذ فعلاً اليوم: التركيب عن بُعد، الاستيراد من إكسل/CSV (أداة
// الاستيراد في لوحة التحكم)، ضبط الطابعة وجوفوترة، ساعة تدريب، ودليل الاستخدام.
// لا نَعِد بعتاد بسعر معيّن — نرشّح المتوافق فقط.

export const metadata: Metadata = {
  title: "التجهيز والتدريب — ماذا يحدث في اليوم الأول | Kairos Space POS",
  description:
    "من أول رسالة إلى أول فاتورة في يوم واحد: تركيب عن بُعد على جهازك، استيراد منتجاتك من إكسل، ضبط الطابعة وجوفوترة، وتدريب فريقك — مشمول مع كل باقة بلا مقابل.",
  alternates: { canonical: "/onboarding" },
};

const STEPS = [
  {
    n: "1",
    t: "مكالمة تعريفية قصيرة",
    when: "15 دقيقة",
    d: "نفهم نشاطك (كافيه، مطعم، سوبرماركت)، عدد نقاط البيع، وما عندك من أجهزة وطابعات. نحدّد الباقة المناسبة ونتّفق على موعد التركيب — غالباً في نفس اليوم.",
  },
  {
    n: "2",
    t: "التركيب عن بُعد على جهازك",
    when: "30 دقيقة",
    d: "تحمّل الكاشير من صفحة التحميل على كمبيوتر ويندوز أو تابلت أندرويد، ونفعّله معك ونربطه بلوحة تحكم محلك. لا حاجة لزيارة ولا لعتاد جديد إن كان جهازك يعمل.",
  },
  {
    n: "3",
    t: "منتجاتك دفعة واحدة",
    when: "حسب حجم القائمة",
    d: "أرسل لنا قائمة أصنافك وأسعارك بأي شكل (إكسل، CSV، أو حتى صورة من النظام القديم) ونستوردها دفعة واحدة مع التصنيفات والباركود. لا إدخال يدوي صنفاً صنفاً.",
  },
  {
    n: "4",
    t: "الطابعة والدرج وجوفوترة",
    when: "30 دقيقة",
    d: "نضبط الطابعة الحرارية (شبكة أو USB على ويندوز، بلوتوث على أندرويد)، ودرج النقد، وقارئ الباركود، ونربط حسابك في جوفوترة حتى تخرج أول فاتورة متوافقة من أول يوم.",
  },
  {
    n: "5",
    t: "تدريب المالك والكاشير",
    when: "ساعة أونلاين",
    d: "جلسة عملية على شاشتك: البيع والمرتجعات وإغلاق الوردية للكاشير، والمخزون والتقارير ولوحة التحكم للمالك. ومعها دليل الاستخدام الكامل بالعربية للرجوع إليه في أي وقت.",
  },
  {
    n: "6",
    t: "أسبوع المتابعة",
    when: "7 أيام",
    d: "نتابع أول أسبوع عن قرب: نراجع أول إغلاق يومية معك، ونضبط ما يظهر من تفاصيل (نص الفاتورة، الأصناف السريعة، الصلاحيات). بعدها الدعم المعتاد على واتساب.",
  },
];

const HARDWARE = [
  { t: "الكاشير", d: "كمبيوتر ويندوز 10 أو أحدث، أو تابلت أندرويد بشاشة 8 بوصات فأكثر. جهازك الحالي يكفي في الغالب." },
  { t: "الطابعة الحرارية", d: "80 مم للفواتير، شبكة أو USB على ويندوز، وبلوتوث أو شبكة على أندرويد. طابعة المطبخ نفس المواصفات في المطبخ." },
  { t: "درج النقد", d: "يُوصَل بالطابعة الحرارية (منفذ RJ11)، ويُضبط من إعدادات الطابعة ليُفتح مع البيع النقدي." },
  { t: "قارئ الباركود", d: "أي قارئ USB يعمل كلوحة مفاتيح. للسوبرماركت: ميزان يطبع باركود بالوزن، والنظام يقرأه مباشرة." },
  { t: "الشاشة الثانية للعميل", d: "أي شاشة ثانية موصولة بجهاز الكاشير، أو نافذة على متصفح الجهاز — تُضبط في دقيقة." },
  { t: "تابلتات الويتر والمطبخ", d: "تابلت أندرويد بسيط لكل ويتر وشاشة في المطبخ، على نفس شبكة المحل." },
];

const CHECKLIST = [
  "قائمة الأصناف والأسعار بأي شكل عندك.",
  "بيانات محلك كما تريدها على الفاتورة: الاسم، الرقم الضريبي، العنوان، الشعار.",
  "بيانات الدخول إلى جوفوترة إن كنت مسجّلاً، أو نساعدك بالتسجيل.",
  "أسماء الموظفين ودور كل واحد (كاشير، مدير، محاسب).",
  "الطابعة والدرج موصولان ومضاءان وقت التركيب.",
];

export default function OnboardingPage() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="glow w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_70%)] -top-[180px] -right-[120px] absolute" />
        <div className="glow w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(23,138,88,0.07),transparent_70%)] top-[55%] -left-[160px] absolute" />
      </div>

      <Navbar />

      <main className="max-w-[900px] mx-auto px-7 relative z-1 pt-[130px]">
        <header className="text-center reveal">
          <div className="text-primary text-[13px] font-bold tracking-wide">مشمول مع كل باقة</div>
          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-[1.22] mt-2">
            التجهيز <b className="text-primary">والتدريب</b>
          </h1>
          <p className="text-muted text-[17px] mt-5 leading-[1.85] max-w-[720px] mx-auto">
            من أول رسالة إلى أول فاتورة في يوم واحد. نركّب معك عن بُعد على جهازك، نستورد منتجاتك،
            نضبط الطابعة وجوفوترة، وندرّب فريقك — كل ذلك مشمول في الاشتراك بلا مقابل، ويبدأ حتى في
            فترة التجربة المجانية.
          </p>
        </header>

        {/* ── الخطوات ─────────────────────────────────────────────── */}
        <section className="mt-14 reveal">
          <h2 className="text-[26px] font-extrabold">ماذا يحدث في اليوم الأول</h2>
          <ol className="mt-6 space-y-4 list-none">
            {STEPS.map((s) => (
              <li key={s.n} className="bg-surface border border-secondary rounded-2xl px-6 py-5 flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/12 text-primary font-extrabold text-[17px] flex items-center justify-center num">
                  {s.n}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="font-bold text-[16px] text-text">{s.t}</h3>
                    <span className="text-[13px] text-muted num">{s.when}</span>
                  </div>
                  <p className="text-muted text-[14px] mt-2 leading-[1.85]">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── العتاد ───────────────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <h2 className="text-[26px] font-extrabold">العتاد: ما يعمل معنا</h2>
          <p className="text-muted text-[16px] mt-3 leading-[1.95]">
            لا نفرض عتاداً ولا نبيعه؛ نرشّح لك المتوافق ونساعدك بالاختيار إن احتجت شيئاً جديداً. في
            الغالب ما عندك يكفي.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {HARDWARE.map((c) => (
              <div key={c.t} className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                <h3 className="font-bold text-[16px] text-text">{c.t}</h3>
                <p className="text-muted text-[14px] mt-2 leading-[1.85]">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ما نحتاجه منك ───────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <h2 className="text-[26px] font-extrabold">جهّز هذه قبل موعد التركيب</h2>
          <ul className="mt-5 space-y-3">
            {CHECKLIST.map((s) => (
              <li key={s} className="flex gap-3 text-[15px] leading-[1.85] text-text">
                <span className="text-green shrink-0 mt-0.5">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8">
            <h2 className="text-[22px] font-extrabold">ابدأ اليوم، وبِع غداً</h2>
            <p className="text-muted text-[15px] mt-3 leading-[1.85]">
              راسلنا على واتساب لنحدّد موعد التركيب، أو ابدأ تجربة {TRIAL_DAYS} يوماً مجاناً الآن —
              التجهيز والتدريب مشمولان فيها أيضاً.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={waUrl(WA_MESSAGES.hero)}
                className="inline-flex items-center gap-2 bg-[var(--color-wa)] text-white font-bold text-[15px] rounded-xl px-6 py-3.5 no-underline hover:opacity-90 transition-opacity"
              >
                حدّد موعد التركيب على واتساب
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

        {/* ── روابط داخلية ────────────────────────────────────────── */}
        <section className="mt-12 mb-4 reveal">
          <div className="bg-surface border border-secondary rounded-2xl p-7">
            <h2 className="text-[18px] font-extrabold">اقرأ أيضاً</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li>
                <Link href="/sla" className="text-primary font-bold no-underline hover:underline">
                  التزامنا بالخدمة: أوقات الدعم وزمن الردّ وبياناتك ←
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-primary font-bold no-underline hover:underline">
                  تحميل الكاشير لويندوز وأندرويد ←
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-primary font-bold no-underline hover:underline">
                  دليل الاستخدام الكامل ←
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
