import Link from "next/link";
import { ClipboardIcon, DownloadIcon, MailIcon } from "@/components/Icons";
import { type ReactNode } from "react";

// شريط «كيف تبدأ» — ثلاث خطوات فقط بين الزائر وأول عملية بيع. الغرض إزالة
// الغموض من مسار التسجيل الذاتي (Phase 6): سجّل → يصلك بريد التفعيل → حمّل وبِع.
const STEPS: { icon: ReactNode; n: string; t: string; d: string; delay: string }[] = [
  { icon: <ClipboardIcon className="w-[24px] h-[24px]" />, n: "1", t: "سجّل نشاطك", d: "نموذج واحد أقل من دقيقة — اسم النشاط وبريدك ورقمك.", delay: "" },
  { icon: <MailIcon />, n: "2", t: "يصلك بريد التفعيل", d: "نراجع الطلب ونرسل بيانات الدخول خلال ساعات العمل.", delay: "d1" },
  { icon: <DownloadIcon />, n: "3", t: "حمّل النظام وابدأ البيع", d: "ثبّت البرنامج، سجّل دخولك، ويشتغل المحل فوراً.", delay: "d2" },
];

export default function HowItWorks() {
  return (
    <section className="section-sm" id="how">
      <div className="shell">
        <div className="section-head reveal">
          <span className="eyebrow">كيف تبدأ</span>
          <h2>ثلاث خطوات وبتكون عم تبيع</h2>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-[1020px] mx-auto max-[760px]:grid-cols-1">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className={`reveal ${s.delay} card relative`}
            >
              <span className="num absolute top-5 left-5 text-[42px] font-extrabold text-[rgba(168,128,26,0.16)] leading-none select-none" aria-hidden="true">
                {s.n}
              </span>
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[rgba(168,128,26,0.1)] border border-[rgba(168,128,26,0.22)] flex items-center justify-center text-primary mb-4">
                {s.icon}
              </div>
              <h3 className="text-lg font-extrabold mb-2.5">{s.t}</h3>
              <p className="text-[15px] text-muted leading-[1.7]">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          {/* نص موحّد عبر الصفحة كلها — كانت خمس صياغات لنفس الوجهة */}
          <Link href="/signup" className="btn-gold max-sm:w-full">
            ابدأ التجربة المجانية
          </Link>
        </div>
      </div>
    </section>
  );
}
