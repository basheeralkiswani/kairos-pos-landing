import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import { SUPPORT_HOURS, TRIAL_DAYS, WA_MESSAGES, waUrl } from "@/lib/constants";

// «التزامنا بالخدمة» — ما يحقّ للعميل أن يتوقّعه منّا مكتوباً، لا شفهياً على
// واتساب. كل سطر هنا إمّا سلوك مبنيّ في النظام (البيع أوفلاين، التحديث التلقائي،
// التصدير، العزل بين المحلات) أو التزام تشغيلي يقدر فريق صغير أن يفي به فعلاً.
// الأرقام الزمنية صيغت كـ«هدف» لا كغرامة، وتُعدَّل من هنا فقط.

export const metadata: Metadata = {
  title: "التزامنا بالخدمة (SLA) | Kairos Space POS",
  description:
    "ما تتوقّعه من كايروس سبيس مكتوباً: أوقات الدعم وزمن الردّ، ما يبقى شغّالاً بلا إنترنت، التحديثات، ملكية بياناتك وتصديرها، وماذا يحدث عند انتهاء الاشتراك.",
  alternates: { canonical: "/sla" },
};

const RESPONSE = [
  {
    level: "الكاشير لا يبيع",
    example: "البرنامج لا يفتح، الفاتورة لا تُحفَظ، الطابعة لا تطبع أي شيء",
    target: "الأولوية القصوى — نبدأ معك فوراً خلال أوقات الدعم، وخارجها نردّ في أقرب وقت ممكن حتى في العطل",
  },
  {
    level: "خلل يعطّل جزءاً من العمل",
    example: "تقرير لا يفتح، المزامنة متأخرة، جوفوترة ترفض فاتورة",
    target: "هدفنا الردّ خلال ساعة خلال أوقات الدعم، والحلّ أو مسار بديل في نفس يوم العمل",
  },
  {
    level: "سؤال أو طلب تعديل",
    example: "كيف أضيف موظفاً، غيّروا لي نص الفاتورة، أضيفوا جهازاً",
    target: "ردّ خلال يوم العمل نفسه، والتنفيذ حسب حجم الطلب ونتّفق معك على موعده",
  },
];

const PROMISES = [
  {
    t: "البيع لا يتوقف بانقطاع الإنترنت",
    d: "الكاشير يعمل بالكامل محلياً على جهازك: البيع والطباعة والمخزون والتقارير اليومية كلها بلا نت. الإنترنت للمزامنة ولجوفوترة فقط، وكلتاهما تُستأنف تلقائياً عند عودة الاتصال دون أن تفقد فاتورة.",
  },
  {
    t: "التحديثات مشمولة وتلقائية",
    d: "كل تحسين وإصلاح يصلك ضمن اشتراكك بلا رسوم إضافية. البرنامج يفحص التحديث وينزّله في الخلفية ويثبّته عند الإغلاق، فلا يقاطع بيعك ولا يطلب منك تحميل شيء.",
  },
  {
    t: "بياناتك ملكك",
    d: "منتجاتك ومبيعاتك وعملاؤك تصدَّر إلى Excel من لوحة التحكم في أي وقت وبلا طلب منّا. لا نبيع بياناتك ولا نشاركها مع أي طرف، ولا نستخدمها إلا لتشغيل خدمتك.",
  },
  {
    t: "نسختان من كل شيء",
    d: "نسخة احتياطية محلية تلقائية على جهاز الكاشير، ومزامنة مستمرة إلى السحابة. لو تعطّل الجهاز أو سُرق، نُنزل عملك على جهاز جديد ونكمل من حيث توقفت.",
  },
  {
    t: "كل محل معزول عن الآخر",
    d: "بيانات كل محل مفصولة على مستوى قاعدة البيانات نفسها، والاتصال بين جهازك ولوحة التحكم مشفّر. لا يرى محلٌ بيانات محل آخر بأي حال.",
  },
  {
    t: "لا صيانة في ساعات الذروة",
    d: "أي عمل مخطّط على الخوادم يُنفَّذ خارج أوقات العمل المعتادة للمحلات. وحتى أثناءه يبقى الكاشير يبيع محلياً؛ ما يتأثر هو لوحة التحكم مؤقتاً فقط.",
  },
];

const SUBSCRIPTION = [
  `اشتراك سنوي بسعر واحد لكل باقة، بلا رسوم تفعيل ولا رسوم خفية، وقبله تجربة مجانية ${TRIAL_DAYS} يوماً بلا بطاقة ائتمان.`,
  "التجهيز والتدريب مشمولان مع كل باقة في اليوم الأول، بلا مقابل.",
  "عند انتهاء الاشتراك تمنحك لوحة التحكم مهلة سماح قبل أن تتوقف الخدمة السحابية، والكاشير يستمر بالبيع محلياً خلالها.",
  "لا نحذف بياناتك عند انتهاء الاشتراك: تبقى محفوظة، وتستطيع تصديرها في أي وقت أو التجديد والعودة إلى حيث توقفت.",
  "إضافة جهاز أو فرع فوق المشمول في باقتك تُحسَب بالسعر المعلن على صفحة الأسعار، ولا تُفعَّل إلا بطلبك.",
];

const YOUR_PART = [
  "اتصال إنترنت على جهاز الكاشير معظم الوقت، حتى تصل مبيعاتك إلى لوحة التحكم وتُرسَل فواتيرك لجوفوترة.",
  "أجهزة تعمل: كمبيوتر ويندوز أو تابلت أندرويد بحالة جيدة، وطابعة موصولة ومغذّاة بالورق.",
  "حماية رمز الإدارة (PIN) وحسابات الموظفين — من يملك الرمز يملك صلاحياته.",
  "رقم واتساب واحد لصاحب المحل نتحقّق منه قبل أي تغيير حسّاس (إعادة ضبط رمز، إضافة مالك، حذف بيانات).",
];

export default function SlaPage() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="glow w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_70%)] -top-[180px] -right-[120px] absolute" />
        <div className="glow w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(23,138,88,0.07),transparent_70%)] top-[55%] -left-[160px] absolute" />
      </div>

      <Navbar />

      <main className="max-w-[900px] mx-auto px-7 relative z-1 pt-[130px]">
        <header className="text-center reveal">
          <div className="text-primary text-[13px] font-bold tracking-wide">مكتوب لا شفهي</div>
          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-[1.22] mt-2">
            التزامنا <b className="text-primary">بالخدمة</b>
          </h1>
          <p className="text-muted text-[17px] mt-5 leading-[1.85] max-w-[720px] mx-auto">
            حين تدفع اشتراكاً سنوياً مقدّماً، يحقّ لك أن تعرف بالضبط ماذا تتوقّع منّا: متى نردّ، ما
            الذي يبقى شغّالاً مهما حدث، ولمن تعود بياناتك. هذه الصفحة هي ذلك الاتفاق، وتنطبق على كل
            الباقات.
          </p>
        </header>

        {/* ── أوقات الدعم وزمن الردّ ────────────────────────────────── */}
        <section className="mt-14 reveal">
          <h2 className="text-[26px] font-extrabold">أوقات الدعم وزمن الردّ</h2>
          <p className="text-muted text-[16px] mt-3 leading-[1.95]">
            قناة الدعم الأساسية واتساب مباشر بالعربية، <b className="text-text">{SUPPORT_HOURS}</b>. نصنّف
            كل رسالة بحسب أثرها على بيعك، ونلتزم بما يلي:
          </p>
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[560px] border border-secondary rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[1fr_1.3fr_1.5fr] bg-surface-2/60">
                <div className="px-5 py-4 font-extrabold text-[14px] text-text">الحالة</div>
                <div className="px-5 py-4 font-extrabold text-[14px] text-muted border-r border-secondary">أمثلة</div>
                <div className="px-5 py-4 font-extrabold text-[14px] text-primary border-r border-secondary">التزامنا</div>
              </div>
              {RESPONSE.map((r, i) => (
                <div
                  key={r.level}
                  className={`grid grid-cols-[1fr_1.3fr_1.5fr] ${i % 2 ? "bg-surface" : "bg-transparent"} border-t border-secondary`}
                >
                  <div className="px-5 py-4 font-bold text-[14px] text-text">{r.level}</div>
                  <div className="px-5 py-4 text-[14px] text-muted leading-[1.7] border-r border-secondary">{r.example}</div>
                  <div className="px-5 py-4 text-[14px] text-text leading-[1.7] border-r border-secondary">{r.target}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[13px] text-muted mt-3 leading-[1.7]">
            الأزمنة أهداف نلتزم بها في التشغيل اليومي وليست تعويضاً تعاقدياً؛ لو تأخرنا عنها فأخبرنا،
            ونُخبرك نحن بالسبب.
          </p>
        </section>

        {/* ── ما نضمنه ────────────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <h2 className="text-[26px] font-extrabold">ما يبقى شغّالاً مهما حدث</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {PROMISES.map((c) => (
              <div key={c.t} className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                <h3 className="font-bold text-[16px] text-text">{c.t}</h3>
                <p className="text-muted text-[14px] mt-2 leading-[1.85]">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── الاشتراك ─────────────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <h2 className="text-[26px] font-extrabold">الاشتراك والتجديد والانتهاء</h2>
          <ul className="mt-5 space-y-3">
            {SUBSCRIPTION.map((s) => (
              <li key={s} className="flex gap-3 text-[15px] leading-[1.85] text-text">
                <span className="text-green shrink-0 mt-0.5">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── ما نحتاجه منك ───────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <h2 className="text-[26px] font-extrabold">ما نحتاجه منك ليتحقق كل ذلك</h2>
          <ul className="mt-5 space-y-3">
            {YOUR_PART.map((s) => (
              <li key={s} className="flex gap-3 text-[15px] leading-[1.85] text-muted">
                <span className="text-primary shrink-0 mt-0.5">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── التصعيد + CTA ───────────────────────────────────────── */}
        <section className="mt-12 reveal">
          <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8">
            <h2 className="text-[22px] font-extrabold">لم تُحلّ مشكلتك؟</h2>
            <p className="text-muted text-[15px] mt-3 leading-[1.85]">
              راسلنا على واتساب واكتب «تصعيد» في أول الرسالة مع اسم محلك؛ تصل مباشرة إلى المسؤول عن
              حسابك ونعود إليك بخطة واضحة وموعد. ولو كنت ما زلت تقارن، فابدأ بتجربة {TRIAL_DAYS} يوماً
              مجاناً وقِس ردّنا بنفسك.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={waUrl(WA_MESSAGES.support)}
                className="inline-flex items-center gap-2 bg-[var(--color-wa)] text-white font-bold text-[15px] rounded-xl px-6 py-3.5 no-underline hover:opacity-90 transition-opacity"
              >
                تواصل مع الدعم على واتساب
              </a>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 bg-surface border border-secondary text-text font-bold text-[15px] rounded-xl px-6 py-3.5 no-underline hover:border-primary/45 transition-colors"
              >
                حلول المشاكل الشائعة
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
                <Link href="/onboarding" className="text-primary font-bold no-underline hover:underline">
                  التجهيز والتدريب: ماذا يحدث في اليوم الأول ←
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-primary font-bold no-underline hover:underline">
                  الباقات والأسعار ←
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
