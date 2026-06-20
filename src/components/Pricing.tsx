"use client";

import { goUrl } from "@/lib/constants";
import { trackWhatsAppClick } from "@/components/Analytics";
import { CheckBoldIcon } from "@/components/Icons";

const FEATURES_LIST = [
  "جميع مميزات النظام بالكامل",
  "بدون رسوم تفعيل",
  "تحديثات مجانية طوال السنة",
  "دعم فني وأولوية في الخدمة",
];

const MONTHLY_FEATURES = [
  "جميع مميزات النظام بالكامل",
  "رسوم تفعيل 15 ديناراً لمرة واحدة",
  "تحديثات مجانية",
  "إلغاء في أي وقت",
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
            باقة واحدة بسيطة — كل المميزات
          </h2>
          <p className="text-[17px] text-muted">
            لا رسوم خفية. جرّب النظام مجاناً 7 أيام — وبعدها اختر ما يناسبك.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-[880px] mx-auto items-stretch max-[760px]:grid-cols-1">
          {/* Annual - Featured */}
          <div className="reveal relative bg-gradient-to-b from-[rgba(212,175,55,0.10)] to-[rgba(18,18,20,0.7)] border-transparent rounded-[22px] p-[38px_32px] flex flex-col price-card-featured">
            <span className="absolute top-[-14px] right-7 bg-primary text-[#0a0a0c] text-[12.5px] font-extrabold py-1.5 px-4 rounded-full shadow-[0_8px_20px_-6px_rgba(212,175,55,0.6)]">
              عرض خاص · الأكثر توفيراً
            </span>
            <div className="text-[15px] font-bold text-primary-soft tracking-[0.5px] mb-4">
              الاشتراك السنوي
            </div>
            <div className="flex items-end gap-2 mb-1.5">
              <span className="text-[54px] font-black font-[var(--font-en)] leading-none text-text num">120</span>
              <span className="text-[18px] font-bold text-muted mb-2">دينار</span>
              <span className="text-[15px] text-muted mb-[9px]">/ السنة</span>
            </div>
            <div className="text-[13.5px] text-muted mb-2 min-h-5">
              سنة كاملة من الاستخدام الكامل — بدون أي رسوم إضافية.
            </div>
            <span className="inline-block text-[13px] font-bold text-green bg-[rgba(52,211,153,0.12)] border border-[rgba(52,211,153,0.3)] rounded-lg py-[5px] px-[11px] mb-[22px] w-fit">
              وفّر 75 ديناراً في السنة الأولى مقارنة بالشهري
            </span>
            <ul className="list-none flex flex-col gap-[13px] mb-7 flex-1">
              {FEATURES_LIST.map((f, i) => (
                <li key={i} className="flex items-start gap-[11px] text-[14.5px] text-[#d4d4d8]">
                  <span className="shrink-0 w-[21px] h-[21px] rounded-full bg-[rgba(212,175,55,0.14)] text-primary flex items-center justify-center mt-0.5">
                    <CheckBoldIcon />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              id="annualWa"
              className="inline-flex items-center justify-center gap-2.5 py-[15px] px-7 rounded-[13px] font-bold text-base no-underline bg-primary text-[#0a0a0c] shadow-[0_10px_30px_-8px_rgba(212,175,55,0.55)] hover:bg-primary-soft hover:-translate-y-0.5 transition-all duration-250 w-full"
              href={goUrl("annual")}
              target="_blank"
              rel="noopener"
              onClick={() => trackWhatsAppClick("annual")}
            >
              اشترك سنوياً عبر واتساب
            </a>
          </div>

          {/* Monthly */}
          <div className="reveal d1 relative bg-gradient-to-b from-[rgba(24,24,27,0.8)] to-[rgba(18,18,20,0.6)] border border-secondary rounded-[22px] p-[38px_32px] flex flex-col">
            <div className="text-[15px] font-bold text-primary-soft tracking-[0.5px] mb-4">
              الاشتراك الشهري
            </div>
            <div className="flex items-end gap-2 mb-1.5">
              <span className="text-[54px] font-black font-[var(--font-en)] leading-none text-text num">15</span>
              <span className="text-[18px] font-bold text-muted mb-2">دينار</span>
              <span className="text-[15px] text-muted mb-[9px]">/ الشهر</span>
            </div>
            <div className="text-[13.5px] text-muted mb-2 min-h-5">
              + تفعيل لأول مرة <b className="text-text">15 دينار</b> (تُدفع مرة واحدة فقط).
            </div>
            <span className="inline-block text-[13px] font-bold text-muted bg-white/4 border border-secondary rounded-lg py-[5px] px-[11px] mb-[22px] w-fit">
              مرونة شهرية بدون التزام طويل
            </span>
            <ul className="list-none flex flex-col gap-[13px] mb-7 flex-1">
              {MONTHLY_FEATURES.map((f, i) => (
                <li key={i} className="flex items-start gap-[11px] text-[14.5px] text-[#d4d4d8]">
                  <span className="shrink-0 w-[21px] h-[21px] rounded-full bg-[rgba(212,175,55,0.14)] text-primary flex items-center justify-center mt-0.5">
                    <CheckBoldIcon />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              id="monthlyWa"
              className="inline-flex items-center justify-center gap-2.5 py-[15px] px-7 rounded-[13px] font-bold text-base no-underline bg-white/4 text-text border border-secondary hover:border-[rgba(212,175,55,0.4)] hover:bg-white/7 transition-all duration-250 w-full"
              href={goUrl("monthly")}
              target="_blank"
              rel="noopener"
              onClick={() => trackWhatsAppClick("monthly")}
            >
              اشترك شهرياً عبر واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
