"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
          ? "bg-[rgba(10,10,12,0.82)] backdrop-blur-[18px] backdrop-saturate-[140%] border-b border-white/6 py-3"
          : "py-[18px]"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-7 relative z-1 flex items-center justify-between gap-5">
        <a href="#" className="flex items-center gap-3 no-underline" aria-label="Kairos Space - الرئيسية">
          <Image
            src="/images/logo-light.png"
            alt="Kairos Space"
            width={46}
            height={46}
            className={`transition-[height] duration-350 ease-out w-auto ${scrolled ? "h-10" : "h-[46px]"}`}
            priority
          />
          <span className="font-extrabold text-[19px] tracking-[0.5px] text-text">
            Kairos <b className="text-primary">Space</b>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-[30px]">
          <a href="#features" className="text-muted no-underline text-[15px] font-medium hover:text-text transition-colors">
            المميزات
          </a>
          <a href="#gallery" className="text-muted no-underline text-[15px] font-medium hover:text-text transition-colors">
            واجهات النظام
          </a>
          <a href="#pricing" className="text-muted no-underline text-[15px] font-medium hover:text-text transition-colors">
            الأسعار
          </a>
          <a href="#contact" className="text-muted no-underline text-[15px] font-medium hover:text-text transition-colors">
            تواصل معنا
          </a>
        </div>

        <a
          href="#pricing"
          className="bg-primary text-[#0a0a0c] py-[11px] px-[22px] rounded-xl font-bold text-[15px] no-underline transition-all duration-250 shadow-[0_6px_20px_-6px_rgba(212,175,55,0.5)] hover:bg-primary-soft hover:-translate-y-0.5"
        >
          اشترك الآن
        </a>
      </div>
    </nav>
  );
}
