"use client";

import { useState } from "react";
import Link from "next/link";
import { goUrl, TRIAL_DAYS, PLANS } from "@/lib/constants";
import { trackWhatsAppClick } from "@/components/Analytics";
import { CheckBoldIcon, WhatsAppIcon, ClockIcon } from "@/components/Icons";

// ثلاث باقات متدرّجة (نظام الباقات 2026-07-25): ستارتر 9/80 · بزنس 14/120 ·
// إنتربرايز 18/160 — بلا رسوم تفعيل. مفتاح شهري/سنوي يبدّل الأسعار فوراً بلا
// إعادة تحميل. كل بطاقة: زر أساسي → /signup (التجربة أولاً) وزر واتساب ثانوي
// يحافظ على مسار إعلانات جوجل (goUrl → /thank-you) بمعرّفات لكل باقة.
//
// جدول المقارنة مختصر عمداً — الفروق التي تُقرّر الشراء فقط. الميزات غير
// المُطلقة بعد تُوسَم «قريباً» ولا تُعدّ ضمن المتاح.

type Cycle = "monthly" | "yearly";

// صفوف المقارنة: قيمة نصية أو true/false. مختصرة (لا تسرد كل شيء).
const COMPARE: { label: string; values: [string | boolean, string | boolean, string | boolean] }[] = [
  { label: "عدد الأجهزة", values: ["1", "3", "10"] },
  { label: "عدد الفروع", values: ["1", "1", "حتى 10"] },
  { label: "الكاشير والمخزون والتقارير الأساسية", values: [true, true, true] },
  { label: "ربط جوفوترة والعمل بدون إنترنت", values: [true, true, true] },
  { label: "شاشة العميل", values: [true, true, true] },
  { label: "المزامنة السحابية", values: [false, true, true] },
  { label: "لوحة المالك وتطبيق المدير", values: [false, true, true] },
  { label: "مستخدمون وصلاحيات", values: [false, true, true] },
  { label: "إدارة الطاولات", values: [false, true, true] },
  { label: "تصدير Excel و PDF", values: [false, true, true] },
  { label: "تعدد الفروع", values: [false, false, true] },
  { label: "تطبيق الويتر", values: [false, false, true] },
  { label: "التقارير المتقدمة", values: [false, false, true] },
  { label: "شاشة المطبخ KDS و QR Menu", values: [false, false, "قريباً"] },
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
  return <span className="text-[14px] font-bold text-text num">{v}</span>;
}

export default function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const yearly = cycle === "yearly";

  // أعلى نسبة توفير بين الباقات — رقم العنوان في وضع السنوي.
  const bestSave = Math.max(
    ...PLANS.map((p) => Math.round(((p.monthly * 12 - p.yearly) / (p.monthly * 12)) * 100)),
  );

  return (
    <section className="py-[90px] relative scroll-mt-[104px]" id="pricing">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1">
        <div className="text-center max-w-[680px] mx-auto mb-[38px] reveal">
          <span className="inline-block text-[13px] font-bold text-primary tracking-[1px] uppercase mb-3.5">
            الأسعار
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-black tracking-[-0.5px] leading-[1.18] mb-4">
            اختر الباقة المناسبة لمحلّك
          </h2>
          <p className="text-[17px] text-muted">
            لا رسوم تفعيل ولا رسوم خفية. جرّب النظام مجاناً <span className="num">{TRIAL_DAYS}</span> يوماً — وبعدها اختر باقتك.
          </p>
        </div>

        {/* مفتاح شهري / سنوي */}
        <div className="flex flex-col items-center gap-3 mb-[42px] reveal">
          <div
            className="inline-flex rounded-full border border-secondary bg-surface p-1"
            role="group"
            aria-label="دورة الاشتراك"
          >
            <button
              type="button"
              onClick={() => setCycle("monthly")}
              aria-pressed={!yearly}
              className={`px-7 min-h-[44px] text-[15px] font-bold rounded-full transition-all duration-200 ${
                !yearly ? "bg-gradient-to-l from-[#e3c14f] to-[#c49b25] text-[#221b10]" : "text-muted hover:text-text"
              }`}
            >
              شهري
            </button>
            <button
              type="button"
              onClick={() => setCycle("yearly")}
              aria-pressed={yearly}
              className={`px-7 min-h-[44px] text-[15px] font-bold rounded-full transition-all duration-200 ${
                yearly ? "bg-gradient-to-l from-[#e3c14f] to-[#c49b25] text-[#221b10]" : "text-muted hover:text-text"
              }`}
            >
              سنوي
            </button>
          </div>
          <p
            className={`text-[14px] font-bold text-green transition-opacity duration-200 ${
              yearly ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!yearly}
          >
            وفّر أكثر من <span className="num">{bestSave}</span>% مع الاشتراك السنوي
          </p>
        </div>

        {/* البطاقات */}
        <div className="grid grid-cols-3 gap-6 max-w-[1080px] mx-auto items-stretch max-[980px]:grid-cols-1 max-[980px]:max-w-[480px]">
          {PLANS.map((p, i) => {
            const price = yearly ? p.yearly : p.monthly;
            const featured = "popular" in p && p.popular;
            const saved = p.monthly * 12 - p.yearly;
            return (
              <div
                key={p.key}
                className={`reveal ${i === 1 ? "d1" : i === 2 ? "d2" : ""} relative rounded-[22px] p-[34px_28px] flex flex-col ${
                  featured
                    ? "price-card-featured bg-gradient-to-b from-[rgba(212,175,55,0.14)] to-surface shadow-[0_30px_60px_-30px_rgba(168,128,26,0.45)]"
                    : "bg-surface border border-secondary shadow-[0_18px_40px_-30px_rgba(60,45,12,0.35)]"
                }`}
              >
                {featured && (
                  <span className="absolute top-[-14px] right-7 bg-gradient-to-l from-[#e3c14f] to-[#c49b25] text-[#221b10] text-[13px] font-extrabold py-1.5 px-4 rounded-full shadow-[0_8px_20px_-6px_rgba(168,128,26,0.6)]">
                    الأكثر طلباً
                  </span>
                )}

                <div className="text-[15px] font-bold text-primary tracking-[0.5px] mb-1">{p.title}</div>
                <div className="text-[14px] text-muted mb-4 min-h-[38px]">{p.tagline}</div>

                <div className="flex items-end gap-2 mb-1.5">
                  <span className="text-[52px] font-extrabold font-[var(--font-en)] leading-none text-text num">
                    {price}
                  </span>
                  <span className="text-[17px] font-bold text-muted mb-1.5">دينار</span>
                  <span className="text-[14px] text-muted mb-[8px]">{yearly ? "/ السنة" : "/ الشهر"}</span>
                </div>

                {yearly ? (
                  <span className="inline-block text-[13px] font-bold text-green bg-[rgba(23,138,88,0.09)] border border-[rgba(23,138,88,0.28)] rounded-lg py-[5px] px-[11px] mt-2 mb-[18px] w-fit">
                    وفّر <span className="num">{saved}</span> ديناراً مقارنة بالشهري
                  </span>
                ) : (
                  <span className="inline-block text-[13px] font-bold text-muted bg-surface-2 border border-secondary rounded-lg py-[5px] px-[11px] mt-2 mb-[18px] w-fit">
                    بدون التزام طويل
                  </span>
                )}

                <div className="flex gap-2 flex-wrap mb-4 text-[13px] text-muted">
                  <span className="rounded-lg border border-secondary bg-surface-2 py-1 px-2.5">{p.devices}</span>
                  <span className="rounded-lg border border-secondary bg-surface-2 py-1 px-2.5">{p.branches}</span>
                </div>

                <ul className="list-none flex flex-col gap-[11px] mb-6 flex-1">
                  {p.features.map((f, k) => (
                    <li key={k} className="flex items-start gap-[11px] text-[15px] text-text">
                      <span className="shrink-0 w-[21px] h-[21px] rounded-full bg-[rgba(168,128,26,0.12)] text-primary flex items-center justify-center mt-0.5">
                        <CheckBoldIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                  {p.soon.map((f, k) => (
                    <li key={`s${k}`} className="flex items-start gap-[11px] text-[14px] text-muted">
                      {/* كان ⏳ — إيموجي كأيقونة بنيوية: شكله يتغيّر بين
                          ويندوز وأندرويد وiOS ولا يرث لون التوكن. */}
                      <span className="shrink-0 w-[21px] h-[21px] rounded-full bg-surface-2 border border-secondary text-muted flex items-center justify-center mt-0.5">
                        <ClockIcon className="w-3 h-3" />
                      </span>
                      <span>
                        {f} <span className="text-[12px] font-bold text-primary/80">— قريباً</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup" className={`${featured ? "btn-gold" : "btn-outline"} w-full`}>
                  ابدأ التجربة المجانية
                </Link>
                <a
                  id={`${p.key}Wa`}
                  className="inline-flex items-center justify-center gap-2 mt-3 min-h-[44px] text-[15px] font-bold text-wa no-underline hover:underline"
                  href={goUrl(p.key)}
                  target="_blank"
                  rel="noopener"
                  onClick={() => trackWhatsAppClick(`${p.key}_${cycle}`)}
                >
                  <WhatsAppIcon className="w-[17px] h-[17px]" />
                  أو اشترك مباشرة عبر واتساب
                </a>
              </div>
            );
          })}
        </div>

        {/* جدول المقارنة المختصر */}
        <div className="max-w-[1080px] mx-auto mt-[54px] reveal">
          <h3 className="text-center text-[19px] font-extrabold mb-2">مقارنة سريعة بين الباقات</h3>
          {/* الجدول أعرض من شاشة الموبايل (560px مقابل 375px) ويتمرّر أفقياً،
              لكن لم تكن هناك أي إشارة لذلك — عمودان يختفيان بلا علم الزائر. */}
          <p className="lg:hidden text-center text-[13px] text-muted mb-4">
            ← اسحب الجدول يميناً ويساراً لرؤية كل الباقات
          </p>
          <div
            className="rounded-[18px] border border-secondary bg-surface overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label="جدول مقارنة الباقات"
          >
            <table className="w-full text-[14px] min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-secondary">
                  <th className="p-3.5 text-right font-bold text-muted text-[13px]">الميزة</th>
                  {PLANS.map((p) => (
                    <th key={p.key} className="p-3.5 text-center font-extrabold text-text whitespace-nowrap">
                      {p.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.label} className="border-b border-secondary/40 last:border-0">
                    {/* وسم «قريباً» يظهر في خانة الباقة نفسها، فلا نكرّره هنا. */}
                    <td className="p-3.5 text-right text-text">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="p-3.5 text-center">
                        <Cell v={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-[14px] text-muted mt-7 reveal">
          تقدر ترقّي باقتك في أي وقت — المزايا الجديدة تنزل على جهازك تلقائياً بلا إعادة تثبيت.
        </p>
      </div>
    </section>
  );
}
