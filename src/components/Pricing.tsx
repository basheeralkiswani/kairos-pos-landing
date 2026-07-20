"use client";

import Link from "next/link";
import { goUrl, TRIAL_DAYS, PRICES } from "@/lib/constants";
import { trackWhatsAppClick } from "@/components/Analytics";
import { CheckBoldIcon, WhatsAppIcon } from "@/components/Icons";

// ثلاث باقات (قرار المالك 2026-07-20): 15 شهري · 70 نصف سنوي · 140 سنوي —
// بلا رسوم تفعيل. كل بطاقة: زر أساسي واحد → /signup (التجربة المجانية أولاً)
// وزر واتساب ثانوي يحافظ على مسار إعلانات جوجل كما هو (goUrl → /thank-you،
// بنفس الـ ids القديمة annualWa/monthlyWa + الجديد semiannualWa).
const COMMON_FEATURES = [
  "جميع مميزات النظام بالكامل",
  "بدون رسوم تفعيل أو رسوم خفية",
  "تحديثات مجانية مستمرة",
  "دعم فني عبر واتساب والهاتف",
];

type Plan = {
  key: "monthly" | "semiannual" | "annual";
  waId: string;
  title: string;
  price: number;
  per: string;
  note: string;
  save?: string;
  featured?: boolean;
  delay: string;
};

const PLANS: Plan[] = [
  {
    key: "monthly",
    waId: "monthlyWa",
    title: "شهري",
    price: PRICES.monthly,
    per: "/ الشهر",
    note: "مرونة كاملة — إلغاء في أي وقت.",
    delay: "",
  },
  {
    key: "semiannual",
    waId: "semiannualWa",
    title: "6 أشهر",
    price: PRICES.semiannual,
    per: "/ 6 أشهر",
    note: "دفعة واحدة تغطي نصف سنة.",
    save: `وفّر ${PRICES.monthly * 6 - PRICES.semiannual} دنانير مقارنة بالشهري`,
    delay: "d1",
  },
  {
    key: "annual",
    waId: "annualWa",
    title: "سنوي",
    price: PRICES.annual,
    per: "/ السنة",
    note: "سنة كاملة من الاستخدام بلا انقطاع.",
    save: `وفّر ${PRICES.monthly * 12 - PRICES.annual} ديناراً — يعادل شهرين وأكثر مجاناً`,
    featured: true,
    delay: "d2",
  },
];

export default function Pricing() {
  return (
    <section className="py-[90px] relative" id="pricing">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1">
        <div className="text-center max-w-[680px] mx-auto mb-[50px] reveal">
          <span className="inline-block text-[13px] font-bold text-primary tracking-[1px] uppercase mb-3.5">
            الأسعار
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-black tracking-[-0.5px] leading-[1.18] mb-4">
            أسعار واضحة — كل المميزات في كل باقة
          </h2>
          <p className="text-[17px] text-muted">
            لا رسوم تفعيل ولا رسوم خفية. جرّب النظام مجاناً <span className="num">{TRIAL_DAYS}</span> يوماً — وبعدها اختر مدة الاشتراك فقط.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-[1080px] mx-auto items-stretch max-[980px]:grid-cols-1 max-[980px]:max-w-[480px]">
          {PLANS.map((p) => (
            <div
              key={p.key}
              className={`reveal ${p.delay} relative rounded-[22px] p-[34px_28px] flex flex-col ${
                p.featured
                  ? "price-card-featured bg-gradient-to-b from-[rgba(212,175,55,0.14)] to-surface shadow-[0_30px_60px_-30px_rgba(168,128,26,0.45)]"
                  : "bg-surface border border-secondary shadow-[0_18px_40px_-30px_rgba(60,45,12,0.35)]"
              }`}
            >
              {p.featured && (
                <span className="absolute top-[-14px] right-7 bg-gradient-to-l from-[#e3c14f] to-[#c49b25] text-[#221b10] text-[12.5px] font-extrabold py-1.5 px-4 rounded-full shadow-[0_8px_20px_-6px_rgba(168,128,26,0.6)]">
                  الأكثر توفيراً
                </span>
              )}

              <div className="text-[15px] font-bold text-primary tracking-[0.5px] mb-4">
                {p.title}
              </div>

              <div className="flex items-end gap-2 mb-1.5">
                <span className="text-[52px] font-extrabold font-[var(--font-en)] leading-none text-text num">{p.price}</span>
                <span className="text-[17px] font-bold text-muted mb-1.5">دينار</span>
                <span className="text-[14px] text-muted mb-[8px]">{p.per}</span>
              </div>

              <div className="text-[13.5px] text-muted mb-2.5 min-h-5">{p.note}</div>

              {p.save ? (
                <span className="inline-block text-[13px] font-bold text-green bg-[rgba(23,138,88,0.09)] border border-[rgba(23,138,88,0.28)] rounded-lg py-[5px] px-[11px] mb-[20px] w-fit">
                  {p.save}
                </span>
              ) : (
                <span className="inline-block text-[13px] font-bold text-muted bg-surface-2 border border-secondary rounded-lg py-[5px] px-[11px] mb-[20px] w-fit">
                  بدون التزام طويل
                </span>
              )}

              <ul className="list-none flex flex-col gap-[12px] mb-7 flex-1">
                {COMMON_FEATURES.map((f, i) => (
                  <li key={i} className="flex items-start gap-[11px] text-[14.5px] text-text">
                    <span className="shrink-0 w-[21px] h-[21px] rounded-full bg-[rgba(168,128,26,0.12)] text-primary flex items-center justify-center mt-0.5">
                      <CheckBoldIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/signup" className={`${p.featured ? "btn-gold" : "btn-outline"} w-full`}>
                ابدأ التجربة المجانية
              </Link>
              <a
                id={p.waId}
                className="inline-flex items-center justify-center gap-2 mt-3 text-[14px] font-bold text-wa no-underline hover:underline"
                href={goUrl(p.key)}
                target="_blank"
                rel="noopener"
                onClick={() => trackWhatsAppClick(p.key)}
              >
                <WhatsAppIcon className="w-[17px] h-[17px]" />
                أو اشترك مباشرة عبر واتساب
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-[13.5px] text-muted mt-8 reveal">
          كل الباقات تشمل نفس المميزات — الفرق فقط في مدة الاشتراك وقيمة التوفير.
        </p>
      </div>
    </section>
  );
}
