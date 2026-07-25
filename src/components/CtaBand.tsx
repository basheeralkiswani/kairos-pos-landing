"use client";

import Link from "next/link";
import { goUrl, TRIAL_DAYS } from "@/lib/constants";
import { trackWhatsAppClick } from "@/components/Analytics";
import { WhatsAppIcon } from "@/components/Icons";

// اللحظة الداكنة الوحيدة في الصفحة — تباين مقصود يجعل الدعوة الختامية محفورة
// في الذاكرة وسط الهوية العاجية.
export default function CtaBand() {
  return (
    <section className="pt-5 pb-[90px] relative scroll-mt-[104px]" id="contact">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1">
        <div className="on-dark cta-band-glow bg-gradient-to-br from-dark to-dark-2 border border-[rgba(212,175,55,0.35)] rounded-[28px] py-[60px] px-10 max-sm:px-6 text-center relative overflow-hidden reveal shadow-[0_40px_80px_-40px_rgba(34,27,16,0.7)]">
          <h2 className="text-[clamp(28px,4.2vw,46px)] font-black tracking-[-0.5px] mb-4 relative text-[#f7f2e7]">
            جاهز تنقل عملك للمستوى التالي؟
          </h2>
          <p className="text-[18px] text-[#cfc4a8] mx-auto mb-7 max-w-[540px] relative">
            ابدأ تجربتك المجانية لمدة <span className="num text-[#e3c14f] font-bold">{TRIAL_DAYS}</span> يوماً الآن — بدون التزام وبدون بطاقة ائتمان.
          </p>
          {/* زر أساسي واحد. النص موحّد مع بقية الصفحة («ابدأ التجربة المجانية»)
              بدل خمس صياغات مختلفة لنفس الوجهة. */}
          <div className="flex flex-col items-center gap-4 relative">
            <Link id="ctaSignup" href="/signup" className="btn-gold max-sm:w-full">
              ابدأ التجربة المجانية
            </Link>
            <div className="flex items-center gap-x-6 gap-y-2 flex-wrap justify-center text-[15px]">
              <a
                id="ctaWa"
                className="hit-44 inline-flex items-center gap-2 font-bold text-[#7fe3ab] no-underline hover:underline"
                href={goUrl("cta")}
                target="_blank"
                rel="noopener"
                onClick={() => trackWhatsAppClick("cta")}
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                أو كلّمنا على واتساب
              </a>
              <span className="text-[#a89d85]">
                تفضّل الهاتف؟{" "}
                <a
                  href="tel:0788606428"
                  className="hit-44 inline-block text-[#e3c14f] font-bold no-underline hover:underline num align-middle"
                >
                  0788 606 428
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
