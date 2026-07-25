"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// روابط التنقّل — مصدر واحد يغذّي سطح المكتب والموبايل معاً حتى لا تنحرف
// القائمتان عن بعضهما.
//
// وسوم <a> عادية لا <Link> عمداً للروابط المُرسّاة (#): الـ Link يُسقط الـ hash
// عند الانتقال بين الصفحات فتهبط على أعلى الرئيسية بدل القسم المقصود. الوسم
// العادي يحافظ عليه، ومن الرئيسية نفسها يتعامل معه المتصفح كتمرير داخلي سلس.
const NAV_LINKS: { href: string; label: string; hash: boolean }[] = [
  { href: "/#features", label: "المميزات", hash: true },
  { href: "/#gallery", label: "واجهات النظام", hash: true },
  { href: "/#pricing", label: "الأسعار", hash: true },
  { href: "/jofotara", label: "جوفوترة", hash: false },
  { href: "/download", label: "تحميل", hash: false },
  { href: "/support", label: "الدعم", hash: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape يغلق القائمة ويعيد التركيز إلى الزر — مخرج واضح لمستخدم الكيبورد.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // منع تمرير الخلفية أثناء فتح القائمة على الموبايل
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      id="nav"
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-350 ease-out ${
        scrolled || open
          ? "bg-[rgba(247,242,231,0.92)] backdrop-blur-[18px] backdrop-saturate-[140%] border-b border-[rgba(133,101,18,0.15)] py-3 shadow-[0_10px_30px_-18px_rgba(60,45,12,0.35)]"
          : "py-[18px]"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-7 max-sm:px-5 relative z-1 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 max-sm:gap-2 no-underline shrink-0 min-h-[44px]"
          aria-label="Kairos Space — الصفحة الرئيسية"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={46}
            height={46}
            className={`transition-[height] duration-350 ease-out w-auto ${
              scrolled ? "h-10" : "h-[46px]"
            } max-sm:h-9`}
            priority
          />
          {/* على الشاشات الضيقة جداً يختفي النص ويبقى الشعار — الناف بار كان
              يترك 47px فقط من أصل 375px، وهي لا تكفي لزر قائمة بحجم 44px. */}
          <span className="font-extrabold text-[19px] max-sm:text-[16px] tracking-[0.5px] text-text max-[380px]:hidden">
            Kairos <b className="text-primary">Space</b>
          </span>
        </Link>

        {/* روابط سطح المكتب */}
        <div className="hidden lg:flex items-center gap-[30px]">
          {NAV_LINKS.map((l) =>
            l.hash ? (
              <a
                key={l.href}
                href={l.href}
                className="text-muted no-underline text-[15px] font-medium hover:text-text transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="text-muted no-underline text-[15px] font-medium hover:text-text transition-colors"
              >
                {l.label}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/signup"
            className="btn-gold !py-[11px] !px-[22px] !text-[15px] max-sm:!px-4 max-sm:!text-[14px] whitespace-nowrap"
            onClick={() => setOpen(false)}
          >
            ابدأ مجاناً
          </Link>

          {/* زر القائمة — 44×44 كاملة */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            className="lg:hidden w-11 h-11 shrink-0 flex flex-col items-center justify-center gap-[5px] rounded-xl border border-secondary bg-surface hover:border-[rgba(133,101,18,0.45)] transition-colors"
          >
            <span
              className={`block w-[19px] h-[2px] bg-text rounded-full transition-transform duration-250 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-[19px] h-[2px] bg-text rounded-full transition-opacity duration-250 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-[19px] h-[2px] bg-text rounded-full transition-transform duration-250 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* لوحة الموبايل */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="lg:hidden border-t border-secondary bg-[rgba(247,242,231,0.98)] backdrop-blur-[18px] mt-3"
      >
        <ul className="max-w-[1240px] mx-auto px-5 py-2 list-none">
          {NAV_LINKS.map((l) => (
            <li key={l.href} className="border-b border-secondary/50 last:border-0">
              {l.hash ? (
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-[52px] text-[16px] font-semibold text-text no-underline hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-[52px] text-[16px] font-semibold text-text no-underline hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
