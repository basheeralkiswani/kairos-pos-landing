"use client";

import Image from "next/image";
import Link from "next/link";
import { goUrl, TRIAL_DAYS, PRICE_FROM } from "@/lib/constants";
import { trackWhatsAppClick } from "@/components/Analytics";
import { WhatsAppIcon, CheckIcon, ChartIcon, ReceiptIcon } from "@/components/Icons";

export default function Hero() {
  return (
    <header className="pt-[168px] pb-20 max-lg:pt-[130px] max-lg:pb-[50px]">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1 grid grid-cols-[1fr_1.08fr] gap-14 items-center max-lg:grid-cols-1 max-lg:gap-[50px]">
        {/* Text */}
        <div>
          <div className="reveal flex items-center gap-2.5 flex-wrap mb-[26px]">
            {/* الخلفية سطح فاتح لا ذهب شفاف: التظليل الذهبي بشفافية 0.08 كان
                يُعتِم العاجي فيهبط تباين النص إلى 4.41 — تحت AA بقليل.
                على السطح يصير 5.25، والحدّ الذهبي يحفظ الطابع نفسه. */}
            <div className="inline-flex items-center gap-[9px] py-2 px-4 bg-surface border border-[rgba(133,101,18,0.35)] rounded-full text-[14px] font-semibold text-primary">
              <span className="w-[7px] h-[7px] rounded-full bg-green animate-[pulse-dot_2s_infinite]" />
              نظام نقاط بيع متكامل · صُمّم في الأردن
            </div>
            <div className="inline-flex items-center gap-2 py-2 px-4 bg-surface border border-[rgba(19,116,74,0.35)] rounded-full text-[14px] font-semibold text-text">
              <ReceiptIcon className="w-4 h-4 text-green" />
              <span className="text-green font-bold">جديد:</span> متكامل مع نظام الفوترة الوطني
            </div>
          </div>

          {/* leading 1.13 كان يقصّ العربية المشكولة (الكسرة في «أدِر») — قياس
              scrollHeight أظهر تجاوزاً فعلياً. 1.25 هو الحد الآمن للعربية. */}
          <h1 className="reveal d1 text-[clamp(36px,5.2vw,62px)] font-black leading-[1.25] tracking-[-0.5px] mb-[22px]">
            أدِر مقهاك ومطعمك
            <br />
            <span className="bg-gradient-to-l from-[#8a6a14] via-[#c49b25] to-[#8a6a14] bg-clip-text text-transparent">
              بضغطة زر واحدة.
            </span>
          </h1>

          <p className="reveal d2 text-[clamp(16px,2vw,19px)] text-muted max-w-[520px] mb-[30px]">
            نظام <b className="text-text font-bold">Kairos Space POS</b> يجمع الكاشير، إدارة المخزون، والتقارير اللحظية في واجهة واحدة أنيقة وسريعة — وهذه لقطات حقيقية من داخل النظام، مش مجرد رسومات.
          </p>

          {/* السعر فوق الطية — وضوح كامل قبل أي زر */}
          <div className="reveal d2 flex items-center gap-2.5 mb-5 text-[15px] flex-wrap">
            <span className="inline-flex items-center gap-1.5 py-[6px] px-3.5 rounded-full bg-surface border border-[rgba(168,128,26,0.35)] font-bold text-primary shadow-[0_6px_16px_-10px_rgba(168,128,26,0.5)]">
              ابدأ من <span className="num">{PRICE_FROM}</span> د.أ / شهر
            </span>
            <span className="text-muted">
              وجرّبه قبلها مجاناً <span className="num font-bold text-text">{TRIAL_DAYS}</span> يوماً — بلا بطاقة ائتمان
            </span>
          </div>

          {/* CTA — زر أساسي واحد فقط.
              قبل التعديل كان في الصفحة 7 أزرار /signup مقابل 7 أزرار واتساب
              بنفس الوزن البصري (كلاهما زر ممتلئ) — انقسام كامل في نية الزائر.
              الآن: التسجيل الذاتي زر ذهبي، وواتساب رابط نصّي بأيقونة. المسار
              المدفوع (goUrl → /thank-you) لم يتغيّر، فقط وزنه البصري. */}
          <div className="reveal d3 flex items-center gap-x-6 gap-y-3 flex-wrap mb-3">
            <Link id="heroSignup" href="/signup" className="btn-gold max-sm:w-full">
              ابدأ التجربة المجانية
              <span className="num text-[13px] font-extrabold bg-[rgba(34,27,16,0.14)] rounded-full py-0.5 px-2">{TRIAL_DAYS} يوم</span>
            </Link>
            <a
              id="heroWa"
              className="hit-44 inline-flex items-center gap-2 text-[15px] font-bold text-wa no-underline hover:underline"
              href={goUrl("hero")}
              target="_blank"
              rel="noopener"
              onClick={() => trackWhatsAppClick("hero")}
            >
              <WhatsAppIcon className="w-[18px] h-[18px]" />
              أو كلّمنا على واتساب
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
              <div className="text-[14px] text-muted mt-0.5">زمن إتمام عملية البيع</div>
            </div>
            <div>
              <div className="text-[30px] font-extrabold text-text font-[var(--font-en)]">
                <span className="text-primary">100٪</span>
              </div>
              <div className="text-[14px] text-muted mt-0.5">يعمل بدون إنترنت</div>
            </div>
            <div>
              <div className="text-[30px] font-extrabold text-text font-[var(--font-en)]">
                <span className="text-primary">24/7</span>
              </div>
              <div className="text-[14px] text-muted mt-0.5">تقارير لحظية</div>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="reveal d2 max-lg:order-first" style={{ perspective: "1800px" }}>
          <div
            className="laptop-3d relative max-w-[720px] mx-auto animate-[floaty_6s_ease-in-out_infinite] hover:[transform:rotateX(2deg)_rotateY(-1deg)] transition-transform duration-600"
            style={{ transform: "rotateX(6deg) rotateY(-5deg)", transformStyle: "preserve-3d" }}
          >
            {/* Float tags */}
            <div className="absolute top-[-20px] left-[-22px] z-4 bg-[rgba(255,252,244,0.94)] backdrop-blur-[10px] border border-[rgba(168,128,26,0.3)] rounded-[14px] py-[11px] px-[15px] flex items-center gap-2.5 shadow-[0_18px_40px_-16px_rgba(60,45,12,0.4)] animate-[floaty2_5s_ease-in-out_infinite] max-[560px]:hidden">
              <div className="w-[34px] h-[34px] rounded-[10px] bg-[rgba(168,128,26,0.12)] flex items-center justify-center text-primary">
                <CheckIcon className="w-[18px] h-[18px]" />
              </div>
              <div>
                <div className="text-xs font-bold">واجهة حقيقية</div>
                <div className="text-[12px] text-muted">لقطة فعلية من النظام</div>
              </div>
            </div>

            <div className="absolute bottom-2 left-[-34px] z-4 bg-[rgba(255,252,244,0.94)] backdrop-blur-[10px] border border-[rgba(168,128,26,0.3)] rounded-[14px] py-[11px] px-[15px] flex items-center gap-2.5 shadow-[0_18px_40px_-16px_rgba(60,45,12,0.4)] animate-[floaty2_6s_ease-in-out_infinite_0.8s] max-[560px]:hidden">
              <div className="w-[34px] h-[34px] rounded-[10px] bg-[rgba(168,128,26,0.12)] flex items-center justify-center text-primary">
                <ChartIcon className="w-[18px] h-[18px]" />
              </div>
              <div>
                <div className="text-xs font-bold">+18٪ مبيعات</div>
                <div className="text-[12px] text-muted">هذا الأسبوع</div>
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
