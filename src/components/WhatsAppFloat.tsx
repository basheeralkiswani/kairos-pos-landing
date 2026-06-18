"use client";

import { useEffect, useState } from "react";
import { goUrl } from "@/lib/constants";
import { trackWhatsAppClick } from "@/components/Analytics";
import { WhatsAppIcon } from "@/components/Icons";

export default function WhatsAppFloat() {
  const [poke, setPoke] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPoke(true);
      setTimeout(() => setPoke(false), 3200);
    }, 2400);
    return () => clearTimeout(timer);
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
      <span
        className={`bg-white text-[#0a0a0c] font-bold text-[14px] py-[11px] px-[17px] rounded-full whitespace-nowrap shadow-[0_8px_24px_-6px_rgba(0,0,0,0.4)] transition-all duration-350 order-first overflow-hidden ${
          poke
            ? "max-w-[240px] opacity-100 -mr-6 pr-[30px]"
            : "max-w-0 opacity-0 -mr-2 pr-6 group-hover:max-w-[240px] group-hover:opacity-100 group-hover:-mr-6 group-hover:pr-[30px]"
        }`}
      >
        تواصل معنا على واتساب
      </span>
      <span className="w-[62px] h-[62px] rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)] relative group-hover:scale-108 transition-transform duration-250 max-[560px]:w-14 max-[560px]:h-14">
        <WhatsAppIcon className="w-[34px] h-[34px] text-white" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] -z-1 animate-[wa-ring_2s_cubic-bezier(0.215,0.61,0.355,1)_infinite]" />
      </span>
    </a>
  );
}
