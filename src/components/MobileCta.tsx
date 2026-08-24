"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TRIAL_DAYS, PRICE_FROM_YEAR } from "@/lib/constants";

// شريط الدعوة اللاصق — على الموبايل فقط (القاعدة في globals.css).
//
// على الهاتف يختفي زر «ابدأ مجاناً» فور تمرير الهيرو، ولا يعود الزائر يراه إلا
// إن وصل قاع الصفحة. صاحب المحل الذي اقتنع عند قسم الأسعار كان عليه أن يمرّر
// لأعلى أو لأسفل ليجد الزر — وهذا بالضبط ما يُفقد التحويل.
//
// ⚠️ مرصود بـ IntersectionObserver لا بحدث scroll. النسخة الأولى كانت تقرأ
// getBoundingClientRect() مرّتين داخل مستمع scroll، أي إجبار المتصفّح على
// إعادة حساب التخطيط عشرات المرّات في الثانية أثناء التمرير — على هاتف متوسط
// هذا تحديداً ما يجعل الصفحة «تتقطّع». المراقب يعمل خارج الخيط الرئيسي ويطلق
// عند العبور فقط.
//
// شرطان معاً:
//   • خرج الهيرو من الشاشة — فوقه الزر الأصلي ظاهر، وتكراره ضجيج.
//   • قسم التسجيل غير ظاهر — لا نغطّي نموذجاً يملؤه الزائر فعلاً.
export default function MobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("main > header") ?? document.querySelector("header");
    const form = document.getElementById("lead-form");
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const io = new IntersectionObserver(
        ([e]) => setPastHero(!e.isIntersecting),
        // هامش سفلي سالب: الشريط يظهر قبل أن يختفي الهيرو تماماً بقليل
        { rootMargin: "-120px 0px 0px 0px" },
      );
      io.observe(hero);
      observers.push(io);
    }

    if (form) {
      const io = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting));
      io.observe(form);
      observers.push(io);
    }

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  if (!pastHero || atForm) return null;

  return (
    <div className="mobile-cta">
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold text-text leading-tight">
          جرّبه <span className="num">{TRIAL_DAYS}</span> يوماً مجاناً
        </div>
        <div className="text-[12px] text-muted leading-tight mt-0.5">
          من <span className="num">{PRICE_FROM_YEAR}</span> د.أ / السنة · بلا بطاقة
        </div>
      </div>
      <Link href="/signup" className="btn-gold !py-3 !px-6 !text-[15px] shrink-0">
        ابدأ الآن
      </Link>
    </div>
  );
}
