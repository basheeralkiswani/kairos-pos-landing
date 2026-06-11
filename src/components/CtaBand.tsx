"use client";

import { waUrl, WA_MESSAGES } from "@/lib/constants";
import { trackWhatsAppClick } from "@/components/Analytics";
import { WhatsAppIcon } from "@/components/Icons";

export default function CtaBand() {
  return (
    <section className="pt-5 pb-[90px] relative" id="contact">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1">
        <div className="cta-band-glow bg-gradient-to-br from-[rgba(212,175,55,0.12)] to-[rgba(24,24,27,0.5)] border border-[rgba(212,175,55,0.25)] rounded-[28px] py-[60px] px-10 text-center relative overflow-hidden reveal">
          <h2 className="text-[clamp(28px,4.2vw,46px)] font-black tracking-[-0.5px] mb-4 relative">
            جاهز تنقل عملك للمستوى التالي؟
          </h2>
          <p className="text-[18px] text-muted mx-auto mb-7 max-w-[540px] relative">
            تواصل معنا الآن على واتساب وابدأ مع Kairos Space POS في نفس اليوم.
          </p>
          <div className="flex gap-3.5 flex-wrap justify-center relative">
            <a
              id="ctaWa"
              className="inline-flex items-center gap-2.5 py-[15px] px-7 rounded-[13px] font-bold text-base no-underline bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.5)] hover:bg-[#20bd5a] hover:-translate-y-0.5 transition-all duration-250"
              href={waUrl(WA_MESSAGES.cta)}
              target="_blank"
              rel="noopener"
              onClick={() => trackWhatsAppClick("cta")}
            >
              <WhatsAppIcon className="w-5 h-5" />
              تواصل عبر واتساب الآن
            </a>
            <a
              className="inline-flex items-center gap-2.5 py-[15px] px-7 rounded-[13px] font-bold text-base no-underline bg-primary text-[#0a0a0c] shadow-[0_10px_30px_-8px_rgba(212,175,55,0.55)] hover:bg-primary-soft hover:-translate-y-0.5 transition-all duration-250"
              href="tel:0788606428"
            >
              اتصل بنا: <span className="num">0788 606 428</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
