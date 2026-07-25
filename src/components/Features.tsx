import { LightningIcon, BarChartIcon, BoxIcon, ClockIcon, ChatIcon, UsersIcon, ReceiptIcon } from "@/components/Icons";
import { type ReactNode } from "react";

const FEATURES: { icon: ReactNode; title: string; desc: string; delay: string; badge?: string }[] = [
  { icon: <ReceiptIcon />, title: "متكامل مع الفوترة الوطنية", desc: "أرسل فواتيرك مباشرةً إلى نظام الفوترة الوطني (JoFotara) التابع لدائرة ضريبة الدخل والمبيعات — التزام ضريبي كامل من داخل النظام بدون برامج منفصلة.", delay: "", badge: "جديد" },
  { icon: <LightningIcon />, title: "كاشير فائق السرعة", desc: "أضف المنتجات بنقرة، طبّق الخصومات، وأتمم الدفع نقداً أو بالبطاقة أو المحفظة خلال ثوانٍ مع طباعة فاتورة تلقائية.", delay: "" },
  { icon: <BarChartIcon />, title: "تقارير لحظية", desc: "لوحة تحكم تتحدّث تلقائياً كل 30 ثانية تُظهر الإيرادات، المصاريف، صافي الربح، والمنتجات الأكثر مبيعاً.", delay: "d1" },
  { icon: <BoxIcon />, title: "إدارة المخزون", desc: "سجّل فواتير الموردين، تتبّع الكميات لحظياً، واربط كل عملية بيع بخصم تلقائي من المخزون.", delay: "d2" },
  { icon: <ClockIcon />, title: "يعمل بدون إنترنت", desc: "النظام يعمل محلياً على جهازك دون انقطاع — لا توقف في وجه ضعف الشبكة، وبياناتك تبقى عندك.", delay: "" },
  { icon: <ChatIcon />, title: "سجل طلبات وتصدير Excel", desc: "تصفّح وأعد طباعة أي طلب سابق، وصدّر تقاريرك إلى Excel بضغطة واحدة.", delay: "d1" },
  { icon: <UsersIcon />, title: "صلاحيات وموظفون", desc: "حساب مدير محمي برمز سري وحسابات كاشير منفصلة — كل عملية مرتبطة باسم الموظف الذي نفّذها.", delay: "d2" },
];

export default function Features() {
  return (
    <section className="py-[90px] relative scroll-mt-[104px]" id="features">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1">
        <div className="text-center max-w-[680px] mx-auto mb-[50px] reveal">
          <span className="inline-block text-[13px] font-bold text-primary tracking-[1px] uppercase mb-3.5">
            لماذا Kairos Space
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-black tracking-[-0.5px] leading-[1.18] mb-4">
            كل ما يحتاجه عملك في نظام واحد
          </h2>
          <p className="text-[17px] text-muted">
            من أول طلب يدخله الكاشير حتى آخر تقرير أرباح في نهاية اليوم — كل شيء مترابط وفي مكان واحد.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`feat-card reveal ${f.delay} relative overflow-hidden bg-surface border rounded-[20px] p-[30px_26px] shadow-[0_18px_40px_-30px_rgba(60,45,12,0.3)] transition-all duration-350 hover:-translate-y-[5px] hover:shadow-[0_26px_50px_-28px_rgba(60,45,12,0.4)] ${
                f.badge ? "border-[rgba(168,128,26,0.4)]" : "border-secondary"
              }`}
            >
              {f.badge && (
                <span className="absolute top-[18px] left-[18px] bg-gradient-to-l from-[#e3c14f] to-[#c49b25] text-[#221b10] text-[12px] font-extrabold py-1 px-2.5 rounded-full">
                  {f.badge}
                </span>
              )}
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[rgba(168,128,26,0.1)] border border-[rgba(168,128,26,0.22)] flex items-center justify-center text-primary mb-5">
                {f.icon}
              </div>
              <h3 className="text-[19px] font-extrabold mb-[9px]">{f.title}</h3>
              <p className="text-[15px] text-muted leading-[1.65]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
