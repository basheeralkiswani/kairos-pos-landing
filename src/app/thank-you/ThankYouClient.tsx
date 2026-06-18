"use client";

import { useEffect, useState } from "react";
import { waUrl, WA_MESSAGES } from "@/lib/constants";

const REDIRECT_DELAY = 1600;

export default function ThankYouClient() {
  const [href, setHref] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const src = params.get("src");
    const raw = params.get("msg");
    const msg =
      raw || WA_MESSAGES[src as keyof typeof WA_MESSAGES] || WA_MESSAGES.hero;
    const url = waUrl(msg);
    setHref(url);

    // إشارة تحويل لـ Google Analytics / Google Ads
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    if (w.gtag) {
      w.gtag("event", "generate_lead", {
        event_category: "conversion",
        event_label: src || "form",
        value: 1,
      });
    }

    const t = setTimeout(() => {
      window.location.href = url;
    }, REDIRECT_DELAY);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-7 text-center relative z-1">
      <div className="max-w-[480px]">
        <div className="w-[72px] h-[72px] mx-auto mb-7 rounded-full bg-[rgba(37,211,102,0.12)] border border-[rgba(37,211,102,0.4)] flex items-center justify-center animate-[pulse-dot_2s_infinite]">
          <svg
            viewBox="0 0 24 24"
            className="w-9 h-9 text-[#25D366]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="text-[clamp(24px,4vw,30px)] font-black mb-3">
          تم استلام طلبك ✅
        </h1>
        <p className="text-muted text-[16px] mb-8 leading-[1.75]">
          جارٍ تحويلك إلى واتساب لإكمال المحادثة…
          <br />
          إذا لم يتم التحويل تلقائياً خلال ثوانٍ، اضغط الزر بالأسفل.
        </p>

        <a
          href={href || "#"}
          className="inline-flex items-center gap-2.5 py-[15px] px-8 rounded-[13px] font-bold text-base no-underline bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.5)] hover:bg-[#20bd5a] hover:-translate-y-0.5 transition-all duration-250"
        >
          متابعة إلى واتساب
        </a>

        <div className="mt-7">
          <a href="/" className="text-[14px] text-muted hover:text-text transition-colors no-underline">
            ← العودة إلى الصفحة الرئيسية
          </a>
        </div>
      </div>
    </main>
  );
}
