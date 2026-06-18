"use client";

import { useState } from "react";
import { WA_NUMBER } from "@/lib/constants";
import { trackFormSubmit } from "@/components/Analytics";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !business.trim() || !phone.trim()) return;

    trackFormSubmit({ name, business });

    const msg = `مرحباً 👋 أنا ${name} من ${business}.\nرقمي: ${phone}\nأرغب بمعرفة المزيد عن نظام Kairos Space POS والاشتراك.`;
    const url = `/thank-you?msg=${encodeURIComponent(msg)}`;

    setSubmitted(true);
    window.open(url, "_blank", "noopener");

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-[60px] relative" id="lead-form">
      <div className="max-w-[640px] mx-auto px-7 relative z-1">
        <div className="bg-gradient-to-b from-[rgba(212,175,55,0.08)] to-[rgba(18,18,20,0.6)] border border-[rgba(212,175,55,0.2)] rounded-[24px] p-10 max-sm:p-6 relative overflow-hidden">
          <div className="absolute w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] top-[-150px] right-[-80px] blur-[30px]" />

          <div className="text-center mb-8 relative">
            <span className="inline-block text-[13px] font-bold text-primary tracking-[1px] uppercase mb-3">
              احصل على عرض خاص
            </span>
            <h2 className="text-[clamp(22px,3.5vw,32px)] font-black tracking-[-0.5px] leading-[1.2] mb-3">
              سجّل اهتمامك الآن
            </h2>
            <p className="text-[15px] text-muted">
              اترك بياناتك وسنتواصل معك خلال ساعات
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
            <div>
              <label htmlFor="lead-name" className="block text-[14px] font-semibold mb-2 text-[#d4d4d8]">
                الاسم
              </label>
              <input
                id="lead-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                required
                className="w-full bg-[rgba(255,255,255,0.04)] border border-secondary rounded-xl py-3 px-4 text-text text-[15px] placeholder:text-[#52525b] outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="lead-business" className="block text-[14px] font-semibold mb-2 text-[#d4d4d8]">
                اسم المشروع
              </label>
              <input
                id="lead-business"
                type="text"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder="اسم المقهى أو المطعم أو المتجر"
                required
                className="w-full bg-[rgba(255,255,255,0.04)] border border-secondary rounded-xl py-3 px-4 text-text text-[15px] placeholder:text-[#52525b] outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="lead-phone" className="block text-[14px] font-semibold mb-2 text-[#d4d4d8]">
                رقم الهاتف
              </label>
              <input
                id="lead-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XXXXXXXX"
                required
                dir="ltr"
                className="w-full bg-[rgba(255,255,255,0.04)] border border-secondary rounded-xl py-3 px-4 text-text text-[15px] placeholder:text-[#52525b] outline-none focus:border-primary/50 transition-colors text-left"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="mt-2 w-full inline-flex items-center justify-center gap-2.5 py-4 px-7 rounded-[13px] font-bold text-base bg-primary text-[#0a0a0c] shadow-[0_10px_30px_-8px_rgba(212,175,55,0.55)] hover:bg-primary-soft hover:-translate-y-0.5 transition-all duration-250 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitted ? (
                "✓ تم الإرسال بنجاح!"
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-3-.3-.5.3-.4.8-1.4.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.3z"/>
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 15.1 3.6 13.6 3.6 12 3.6 7.4 7.4 3.6 12 3.6S20.4 7.4 20.4 12 16.6 20.3 12 20.3z"/>
                  </svg>
                  إرسال عبر واتساب
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[12px] text-[#52525b] mt-4 relative">
            سيتم فتح محادثة واتساب مباشرة على الرقم <span className="num">{WA_NUMBER}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
