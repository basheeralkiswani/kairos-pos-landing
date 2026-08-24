import Link from "next/link";
import { goUrl, TRIAL_DAYS, PLANS } from "@/lib/constants";
import { CheckBoldIcon, ClockIcon } from "@/components/Icons";
import PlanWaLink from "@/components/PlanWaLink";

// ثلاث باقات متدرّجة (نظام الباقات 2026-08-24): الأساسية 180 · البزنس 250 ·
// الشاملة 340 ديناراً في السنة — بلا رسوم تفعيل.
//
// ⚠️ مفتاح «شهري/سنوي» أُزيل مع هذه النسخة. كان يعرض رقمين لكل باقة (ستة
// أسعار على الشاشة) ويطلب من الزائر قراراً ثانياً — أي دورة — قبل القرار
// الحقيقي: أي باقة. الاشتراك سنوي فقط، فالسعر واحد والقرار واحد. السعر
// الشهري التقريبي يبقى مذكوراً تحته بعلامة «≈» لأنه حسابٌ لا خيار شراء:
// الفاتورة سنوية، ولو عُرض بلا «≈» لصار وعداً بدورة شهرية لا نبيعها.
//
// وبزوال الحالة (useState) صار المكوّن يعمل على الخادم — لم يبقَ فيه تفاعل
// سوى تتبّع نقرة واتساب، وهو معزول وحده في PlanWaLink.

// صفوف المقارنة: قيمة نصية أو true/false. مختصرة (لا تسرد كل شيء).
const COMPARE: { label: string; values: [string | boolean, string | boolean, string | boolean] }[] = [
  { label: "عدد الأجهزة", values: ["1", "3", "10"] },
  { label: "عدد الفروع", values: ["1", "1", "حتى 10"] },
  { label: "الكاشير والمخزون والتقارير الأساسية", values: [true, true, true] },
  { label: "ربط جوفوترة والعمل بدون إنترنت", values: [true, true, true] },
  { label: "شاشة العميل", values: [true, true, true] },
  { label: "المنيو الرقمي QR والطلب الذاتي", values: [false, true, true] },
  { label: "شاشة المطبخ KDS", values: [false, true, true] },
  { label: "المزامنة السحابية ولوحة التحكّم", values: [false, true, true] },
  { label: "تطبيق المدير والصلاحيات", values: [false, true, true] },
  { label: "إدارة الطاولات", values: [false, true, true] },
  { label: "تصدير Excel و PDF", values: [false, true, true] },
  { label: "تعدد الفروع", values: [false, false, true] },
  { label: "تطبيق الويتر", values: [false, false, true] },
  { label: "التقارير المتقدمة", values: [false, false, true] },
  { label: "الدعم الفني", values: ["عادي", "بالأولوية", "بالأولوية"] },
];

function Cell({ v }: { v: string | boolean }) {
  if (v === true)
    return (
      <span className="inline-flex w-[22px] h-[22px] rounded-full bg-[rgba(23,138,88,0.12)] text-green items-center justify-center">
        <CheckBoldIcon />
      </span>
    );
  if (v === false) return <span className="text-muted/45 text-[17px] leading-none">—</span>;
  return <span className="text-sm font-bold text-text num">{v}</span>;
}

// طمأنات ما قبل السعر — الاعتراضات الثلاثة الأشيع (بدفع قبل ما أجرّب؟ في رسوم
// مخفية؟ بنحبس بعقد؟) يُردّ عليها بكلمات بدل فقرة.
const REASSURANCE = [
  `جرّب ${TRIAL_DAYS} يوماً مجاناً`,
  "بلا بطاقة ائتمان",
  "بلا رسوم تفعيل",
  "ألغِ في أي وقت",
];

export default function Pricing() {
  return (
    <section className="section scroll-mt-[104px]" id="pricing">
      <div className="shell">
        <div className="section-head reveal">
          <span className="eyebrow">الأسعار</span>
          <h2>اختر الباقة المناسبة لمحلّك</h2>
          <p>سعر واحد لكل باقة، سنوي، بلا رسوم تفعيل ولا رسوم خفية.</p>
        </div>

        {/* على الموبايل تنزل الشارات الأربع سطراً لكل واحدة (أربعة أسطر
            لأربع كلمات) — فتصير هي نفسها الازدحام الذي جاءت لتزيله.
            حشوة وخط أصغر تحت 640px يُدخلان اثنتين في السطر. */}
        <div className="flex items-center justify-center gap-x-2.5 gap-y-2.5 flex-wrap mb-[46px] reveal">
          {REASSURANCE.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-surface border border-secondary py-1.5 px-3 text-xs sm:py-2 sm:px-4 sm:text-sm font-semibold text-muted"
            >
              <span className="w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full bg-[rgba(23,138,88,0.12)] text-green flex items-center justify-center shrink-0">
                <CheckBoldIcon />
              </span>
              {t}
            </span>
          ))}
        </div>

        {/* البطاقات — الفجوة 28px والحشوة من .card: كانت البطاقات تتلاصق
            بـ24px وحشوتها 28px، فالحدّ بين بطاقة وأخرى أضيق من الحدّ بين
            النص وحافة بطاقته. */}
        <div className="grid grid-cols-3 gap-7 max-w-[1100px] mx-auto items-stretch max-[980px]:grid-cols-1 max-[980px]:max-w-[460px]">
          {PLANS.map((p, i) => {
            const featured = "popular" in p && p.popular;
            const perMonth = Math.round(p.price / 12);
            return (
              <div
                key={p.key}
                className={`reveal ${i === 1 ? "d1" : i === 2 ? "d2" : ""} card relative flex flex-col ${
                  featured
                    ? "price-card-featured !border-transparent bg-gradient-to-b from-[rgba(212,175,55,0.14)] to-surface shadow-[0_30px_60px_-30px_rgba(168,128,26,0.45)] max-[980px]:mt-2"
                    : ""
                }`}
              >
                {featured && (
                  <span className="absolute top-[-14px] right-8 bg-gradient-to-l from-[#e3c14f] to-[#c49b25] text-[#221b10] text-xs font-extrabold py-1.5 px-4 rounded-full shadow-[0_8px_20px_-6px_rgba(168,128,26,0.6)]">
                    الأكثر طلباً
                  </span>
                )}

                <div className="text-lg font-extrabold text-text mb-1.5">{p.title}</div>
                <div className="text-sm text-muted mb-7 min-h-[42px] leading-[1.6]">{p.tagline}</div>

                <div className="flex items-end gap-2">
                  <span className="text-[54px] font-extrabold font-[var(--font-en)] leading-[0.95] text-text num">
                    {p.price}
                  </span>
                  <span className="text-lg font-bold text-muted mb-1">دينار</span>
                  <span className="text-sm text-muted mb-1.5">/ السنة</span>
                </div>
                <div className="text-sm text-muted mt-2.5">
                  أي ما يعادل <span className="num font-bold text-text">≈{perMonth}</span> ديناراً في الشهر
                </div>

                <div className="flex gap-2 flex-wrap mt-6 mb-6 text-xs text-muted">
                  <span className="rounded-lg border border-secondary bg-surface-2 py-1.5 px-3">{p.devices}</span>
                  <span className="rounded-lg border border-secondary bg-surface-2 py-1.5 px-3">{p.branches}</span>
                </div>

                <ul className="list-none flex flex-col gap-3.5 mb-8 flex-1">
                  {p.features.map((f, k) => (
                    <li key={k} className="flex items-start gap-3 text-[15px] text-text leading-[1.55]">
                      <span className="shrink-0 w-[21px] h-[21px] rounded-full bg-[rgba(168,128,26,0.12)] text-primary flex items-center justify-center mt-0.5">
                        <CheckBoldIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                  {p.soon.map((f, k) => (
                    <li key={`s${k}`} className="flex items-start gap-3 text-sm text-muted leading-[1.55]">
                      {/* كان ⏳ — إيموجي كأيقونة بنيوية: شكله يتغيّر بين
                          ويندوز وأندرويد وiOS ولا يرث لون التوكن. */}
                      <span className="shrink-0 w-[21px] h-[21px] rounded-full bg-surface-2 border border-secondary text-muted flex items-center justify-center mt-0.5">
                        <ClockIcon className="w-3 h-3" />
                      </span>
                      <span>
                        {f} <span className="text-2xs font-bold text-primary/80">— قريباً</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup" className={`${featured ? "btn-gold" : "btn-outline"} w-full`}>
                  ابدأ التجربة المجانية
                </Link>
                <PlanWaLink planKey={p.key} href={goUrl(p.key)} />
              </div>
            );
          })}
        </div>

        {/* جدول المقارنة — مطويّ افتراضياً.
            كان مفتوحاً دائماً: 15 صفاً × 4 أعمدة تحت البطاقات مباشرة، أي
            ثالث عرضٍ لنفس المعلومة بعد قائمة كل بطاقة. من يقارن يفتحه، ومن
            حسم أمره من البطاقات لا يمرّ به أصلاً. <details> عنصر أصيل:
            يعمل بلا JS، ويُعلن حالته لقارئ الشاشة بلا aria يدوي. */}
        <details className="max-w-[1100px] mx-auto mt-[54px] reveal group">
          <summary className="list-none cursor-pointer flex items-center justify-center gap-2.5 min-h-[48px] text-[15px] font-bold text-primary hover:underline">
            <span className="group-open:hidden">شوف المقارنة الكاملة بين الباقات</span>
            <span className="hidden group-open:inline">إخفاء المقارنة</span>
            <svg
              className="w-4 h-4 transition-transform duration-250 group-open:rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>

          <div className="mt-6">
            {/* الجدول أعرض من شاشة الموبايل (560px مقابل 375px) ويتمرّر أفقياً،
                لكن لم تكن هناك أي إشارة لذلك — عمودان يختفيان بلا علم الزائر. */}
            <p className="lg:hidden text-center text-xs text-muted mb-4">
              ← اسحب الجدول يميناً ويساراً لرؤية كل الباقات
            </p>
            <div
              className="rounded-[18px] border border-secondary bg-surface overflow-x-auto"
              tabIndex={0}
              role="region"
              aria-label="جدول مقارنة الباقات"
            >
              <table className="w-full text-sm min-w-[560px] border-collapse">
                <thead>
                  <tr className="border-b border-secondary">
                    <th className="p-4 text-right font-bold text-muted text-xs">الميزة</th>
                    {PLANS.map((p) => (
                      <th key={p.key} className="p-4 text-center font-extrabold text-text whitespace-nowrap">
                        {p.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row) => (
                    <tr key={row.label} className="border-b border-secondary/40 last:border-0">
                      <td className="p-4 text-right text-text">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="p-4 text-center">
                          <Cell v={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </details>

        <p className="text-center text-sm text-muted mt-8 reveal">
          تقدر ترقّي باقتك في أي وقت — المزايا الجديدة تنزل على جهازك تلقائياً بلا إعادة تثبيت.
        </p>
      </div>
    </section>
  );
}
