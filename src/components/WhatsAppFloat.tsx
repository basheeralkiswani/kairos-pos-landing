"use client";

import { useEffect, useState } from "react";
import { goUrl } from "@/lib/constants";
import { trackWhatsAppClick } from "@/components/Analytics";
import { WhatsAppIcon } from "@/components/Icons";

// واتساب مسار ثانوي بعد إعادة ترتيب المسارات — الزر العائم يبقى لأنه دعم
// حقيقي مفيد، لكن بوزن أخف: لا يتمدّد من تلقاء نفسه بعد ثانيتين ونصف ليسحب
// الانتباه من زر التجربة المجانية، بل عند المرور أو التركيز فقط. وحلقة النبض
// تتوقف لمن يفضّل تقليل الحركة.
export default function WhatsAppFloat() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <a
      id="waFloat"
      className="fixed bottom-[26px] left-[26px] z-200 flex items-center no-underline group max-[560px]:bottom-[18px] max-[560px]:left-[18px]"
      href={goUrl("float")}
      target="_blank"
      rel="noopener"
      onClick={() => trackWhatsAppClick("float")}
      aria-label="تواصل معنا على واتساب"
    >
      <span className="bg-white text-[#0a0a0c] font-bold text-[14px] py-[11px] px-[17px] rounded-full whitespace-nowrap shadow-[0_8px_24px_-6px_rgba(0,0,0,0.4)] transition-all duration-350 order-first overflow-hidden max-w-0 opacity-0 -mr-2 pr-6 group-hover:max-w-[240px] group-hover:opacity-100 group-hover:-mr-6 group-hover:pr-[30px] group-focus-visible:max-w-[240px] group-focus-visible:opacity-100 group-focus-visible:-mr-6 group-focus-visible:pr-[30px]">
        تواصل معنا على واتساب
      </span>
      <span className="w-14 h-14 rounded-full bg-[#1faa55] flex items-center justify-center shrink-0 shadow-[0_10px_30px_-8px_rgba(31,170,85,0.5)] relative group-hover:scale-108 transition-transform duration-250">
        <WhatsAppIcon className="w-[30px] h-[30px] text-white" />
        {!reduced && (
          <span className="absolute inset-0 rounded-full bg-[#1faa55] -z-1 animate-[wa-ring_2s_cubic-bezier(0.215,0.61,0.355,1)_infinite]" />
        )}
      </span>
    </a>
  );
}
