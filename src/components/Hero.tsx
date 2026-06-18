"use client";

import Image from "next/image";
import { waUrl, WA_MESSAGES } from "@/lib/constants";
import { trackWhatsAppClick } from "@/components/Analytics";
import { WhatsAppIcon, ArrowIcon, CheckIcon, ChartIcon, ReceiptIcon } from "@/components/Icons";

export default function Hero() {
  return (
    <header className="pt-[168px] pb-20 max-lg:pt-[130px] max-lg:pb-[50px]">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1 grid grid-cols-[1fr_1.08fr] gap-14 items-center max-lg:grid-cols-1 max-lg:gap-[50px]">
        {/* Text */}
        <div>
          <div className="reveal flex items-center gap-2.5 flex-wrap mb-[26px]">
            <div className="inline-flex items-center gap-[9px] py-2 px-4 bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.25)] rounded-full text-[13.5px] font-semibold text-primary-soft">
              <span className="w-[7px] h-[7px] rounded-full bg-green animate-[pulse-dot_2s_infinite]" />
              نظام نقاط بيع متكامل · صُمّم في الأردن
            </div>
            <div className="inline-flex items-center gap-2 py-2 px-4 bg-[rgba(52,211,153,0.10)] border border-[rgba(52,211,153,0.30)] rounded-full text-[13.5px] font-semibold text-[#d4d4d8]">
              <ReceiptIcon className="w-4 h-4 text-green" />
              <span className="text-green font-bold">جديد:</span> متكامل مع نظام الفوترة الوطني
            </div>
          </div>

          <h1 className="reveal d1 text-[clamp(38px,5.2vw,62px)] font-black leading-[1.13] tracking-[-0.5px] mb-[22px]">
            أدِر مقهاك ومطعمك
            <br />
            <span className="bg-gradient-to-l from-primary via-[#f0d97a] to-primary bg-clip-text text-transparent">
              بضغطة زر واحدة.
            </span>
          </h1>

          <p className="reveal d2 text-[clamp(16px,2vw,19px)] text-muted max-w-[520px] mb-[34px]">
            نظام <b className="text-text font-bold">Kairos Space POS</b> يجمع الكاشير، إدارة المخزون، والتقارير اللحظية في واجهة واحدة أنيقة وسريعة — وهذه لقطات حقيقية من داخل النظام، مش مجرد رسومات.
          </p>

          {/* Launch offer — honest social proof above the fold */}
          <div className="reveal d2 inline-flex items-center gap-2.5 py-[7px] px-[14px] rounded-[12px] bg-[rgba(52,211,153,0.10)] border border-[rgba(52,211,153,0.28)] mb-[22px] text-[13.5px] font-semibold text-[#d4d4d8]">
            <span className="text-base leading-none">🇯🇴</span>
            صُمّم في الأردن لأصحاب المقاهي والمطاعم — كن من أوائل من يعتمده
          </div>

          {/* Price — above the fold */}
          <div className="reveal d3 flex items-center gap-2.5 mb-4 text-[15px]">
            <span className="inline-flex items-center gap-1.5 py-[5px] px-3 rounded-full bg-[rgba(212,175,55,0.10)] border border-[rgba(212,175,55,0.25)] font-bold text-primary-soft">
              ابدأ من <span className="num">15</span> د.أ / شهر
            </span>
            <span className="text-muted">أو جرّبه مجاناً 7 أيام</span>
          </div>

          <div className="reveal d3 flex gap-3.5 flex-wrap mb-3">
            <a
              id="heroWa"
              className="inline-flex items-center gap-2.5 py-[15px] px-7 rounded-[13px] font-bold text-base no-underline bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.5)] hover:bg-[#20bd5a] hover:-translate-y-0.5 transition-all duration-250"
              href={waUrl(WA_MESSAGES.hero)}
              target="_blank"
              rel="noopener"
              onClick={() => trackWhatsAppClick("hero")}
            >
              <WhatsAppIcon className="w-5 h-5" />
              جرّب مجاناً 7 أيام
            </a>
            <a
              className="inline-flex items-center gap-2.5 py-[15px] px-7 rounded-[13px] font-bold text-base no-underline bg-white/4 text-text border border-secondary hover:border-[rgba(212,175,55,0.4)] hover:bg-white/7 transition-all duration-250"
              href="#gallery"
            >
              شاهد النظام الحقيقي
              <ArrowIcon className="w-[18px] h-[18px]" />
            </a>
          </div>

          {/* Risk reversal */}
          <div className="reveal d3 flex items-center gap-x-4 gap-y-1.5 flex-wrap mb-[34px] text-[13px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon className="w-[15px] h-[15px] text-green" /> بدون التزام
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon className="w-[15px] h-[15px] text-green" /> بدون بطاقة ائتمان
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon className="w-[15px] h-[15px] text-green" /> إلغاء في أي وقت
            </span>
          </div>

          <div className="reveal d4 flex gap-[34px] flex-wrap">
            <div>
              <div className="text-[30px] font-extrabold text-text font-[var(--font-en)]">
                &lt;<span className="text-primary">3</span> ثوانٍ
              </div>
              <div className="text-[13.5px] text-muted mt-0.5">زمن إتمام عملية البيع</div>
            </div>
            <div>
              <div className="text-[30px] font-extrabold text-text font-[var(--font-en)]">
                <span className="text-primary">100٪</span>
              </div>
              <div className="text-[13.5px] text-muted mt-0.5">يعمل بدون إنترنت</div>
            </div>
            <div>
              <div className="text-[30px] font-extrabold text-text font-[var(--font-en)]">
                <span className="text-primary">24/7</span>
              </div>
              <div className="text-[13.5px] text-muted mt-0.5">تقارير لحظية</div>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="reveal d2 max-lg:order-first" style={{ perspective: "1800px" }}>
          <div
            className="relative max-w-[720px] mx-auto animate-[floaty_6s_ease-in-out_infinite] hover:[transform:rotateX(2deg)_rotateY(-1deg)] transition-transform duration-600"
            style={{ transform: "rotateX(6deg) rotateY(-5deg)", transformStyle: "preserve-3d" }}
          >
            {/* Float tags */}
            <div className="absolute top-[-20px] left-[-22px] z-4 bg-[rgba(24,24,27,0.92)] backdrop-blur-[10px] border border-[rgba(212,175,55,0.25)] rounded-[14px] py-[11px] px-[15px] flex items-center gap-2.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.8)] animate-[floaty2_5s_ease-in-out_infinite] max-[560px]:hidden">
              <div className="w-[34px] h-[34px] rounded-[10px] bg-[rgba(212,175,55,0.14)] flex items-center justify-center text-primary">
                <CheckIcon className="w-[18px] h-[18px]" />
              </div>
              <div>
                <div className="text-xs font-bold">واجهة حقيقية</div>
                <div className="text-[10.5px] text-muted">لقطة فعلية من النظام</div>
              </div>
            </div>

            <div className="absolute bottom-2 left-[-34px] z-4 bg-[rgba(24,24,27,0.92)] backdrop-blur-[10px] border border-[rgba(212,175,55,0.25)] rounded-[14px] py-[11px] px-[15px] flex items-center gap-2.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.8)] animate-[floaty2_6s_ease-in-out_infinite_0.8s] max-[560px]:hidden">
              <div className="w-[34px] h-[34px] rounded-[10px] bg-[rgba(212,175,55,0.14)] flex items-center justify-center text-primary">
                <ChartIcon className="w-[18px] h-[18px]" />
              </div>
              <div>
                <div className="text-xs font-bold">+18٪ مبيعات</div>
                <div className="text-[10.5px] text-muted">هذا الأسبوع</div>
              </div>
            </div>

            {/* Laptop */}
            <div className="laptop-lid">
              <div className="laptop-cam" />
              <div className="laptop-screen">
                <Image
                  src="/images/shots/cashier.png"
                  alt="شاشة الكاشير في Kairos Space POS"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, 720px"
                />
              </div>
            </div>
            <div className="laptop-base" />
          </div>
        </div>
      </div>
    </header>
  );
}
