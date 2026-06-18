import Image from "next/image";

export default function FotaraBadge() {
  return (
    <section className="py-9 relative" id="fotara">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1 flex justify-center">
        <div className="reveal flex items-center gap-5 max-[560px]:flex-col max-[560px]:gap-4 max-[560px]:text-center bg-white rounded-[20px] py-5 px-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] border border-[rgba(212,175,55,0.3)] max-w-[680px]">
          <Image
            src="/images/fotara-logo.png"
            alt="نظام الفوترة الوطني الإلكتروني — فوترة"
            width={360}
            height={229}
            className="h-[64px] w-auto shrink-0"
          />
          <div className="h-12 w-px bg-[#e5e5e5] max-[560px]:hidden" />
          <div className="text-right max-[560px]:text-center">
            <div className="text-[16px] font-extrabold text-[#0a0a0c] mb-1">
              متكامل ومعتمد مع نظام الفوترة الوطني
            </div>
            <div className="text-[13.5px] text-[#52525b] leading-[1.6]">
              فواتيرك تُرفع مباشرةً إلى دائرة ضريبة الدخل والمبيعات — التزام ضريبي كامل من داخل النظام.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
