"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="nav"
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-350 ease-out ${
        scrolled
          ? "bg-[rgba(247,242,231,0.85)] backdrop-blur-[18px] backdrop-saturate-[140%] border-b border-[rgba(168,128,26,0.15)] py-3 shadow-[0_10px_30px_-18px_rgba(60,45,12,0.35)]"
          : "py-[18px]"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-7 relative z-1 flex items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3 no-underline" aria-label="Kairos Space - الرئيسية">
          <Image
            src="/images/logo.png"
            alt="Kairos Space"
            width={46}
            height={46}
            className={`transition-[height] duration-350 ease-out w-auto ${scrolled ? "h-10" : "h-[46px]"}`}
            priority
          />
          <span className="font-extrabold text-[19px] tracking-[0.5px] text-text">
            Kairos <b className="text-primary">Space</b>
          </span>
        </Link>

        {/* روابط الأقسام مُسبوقة بـ "/" فتعمل من الصفحات الفرعية أيضاً، لا من
            الصفحة الرئيسية وحدها. وهي وسوم <a> عادية لا <Link> عمداً: الـ Link
            يُسقط الـ hash عند الانتقال بين الصفحات فتهبط على أعلى الرئيسية بدل
            القسم المقصود. الوسم العادي يحافظ عليه، ومن الرئيسية نفسها يتعامل
            معه المتصفح كتمرير داخلي سلس بلا إعادة تحميل. */}
        <div className="hidden lg:flex items-center gap-[30px]">
          <a href="/#features" className="text-muted no-underline text-[15px] font-medium hover:text-text transition-colors">
            المميزات
          </a>
          <a href="/#gallery" className="text-muted no-underline text-[15px] font-medium hover:text-text transition-colors">
            واجهات النظام
          </a>
          <a href="/#pricing" className="text-muted no-underline text-[15px] font-medium hover:text-text transition-colors">
            الأسعار
          </a>
          <Link href="/download" className="text-muted no-underline text-[15px] font-medium hover:text-text transition-colors">
            تحميل
          </Link>
          <Link href="/support" className="text-muted no-underline text-[15px] font-medium hover:text-text transition-colors">
            الدعم
          </Link>
        </div>

        {/* قرار المالك (2026-07-20، إعادة التصميم): الزر الأساسي صار يقود إلى
            التسجيل الذاتي /signup مباشرة — «أسهل للتسجيل». مسار واتساب المدفوع
            بقي كاملاً كخيار ثانٍ في كل قسم (goUrl → /thank-you لم يتغير). */}
        <Link
          href="/signup"
          className="btn-gold !py-[11px] !px-[22px] !text-[15px]"
        >
          ابدأ مجاناً
        </Link>
      </div>
    </nav>
  );
}
