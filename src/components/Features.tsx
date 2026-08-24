import {
  LightningIcon,
  BarChartIcon,
  BoxIcon,
  ClockIcon,
  ChatIcon,
  UsersIcon,
  ReceiptIcon,
  KitchenScreenIcon,
  QrIcon,
} from "@/components/Icons";
import { type ReactNode } from "react";

// تسع بطاقات في شبكة 3×3 مكتملة — كانت سبعاً فيبقى صفٌّ ناقصٌ بفراغين.
//
// ⚠️ الوصف سطر واحد لكل ميزة (10–16 كلمة). كان فقرة من 25–30 كلمة × 7 بطاقات
// = جدار نصّ يقرأه الزائر مرة واحدة ثم يتوقّف. البطاقة هنا تقول ماذا تفعل
// الميزة، والتفاصيل مكانها صفحاتها المخصّصة (/jofotara · /sales-channels).
const FEATURES: { icon: ReactNode; title: string; desc: string; delay: string; badge?: string }[] = [
  { icon: <ReceiptIcon />, title: "متكامل مع الفوترة الوطنية", desc: "فواتيرك ترتفع مباشرةً إلى جوفوترة — التزام ضريبي كامل بلا برنامج منفصل.", delay: "", badge: "جديد" },
  { icon: <LightningIcon />, title: "كاشير فائق السرعة", desc: "أضف بنقرة، طبّق الخصم، وأتمم الدفع نقداً أو بطاقة أو محفظة في ثوانٍ.", delay: "d1" },
  { icon: <BarChartIcon />, title: "تقارير لحظية", desc: "الإيرادات والمصاريف وصافي الربح والأكثر مبيعاً — تتحدّث كل 30 ثانية.", delay: "d2" },
  { icon: <QrIcon />, title: "منيو رقمي QR", desc: "الزبون يمسح الكود ويتصفّح منيوك ويطلب من طاولته — بلا تطبيق يحمّله.", delay: "", badge: "جديد" },
  { icon: <KitchenScreenIcon />, title: "شاشة المطبخ KDS", desc: "الطلبات تصل شاشة المطبخ فوراً بحالتها ووقتها — بدل أكوام تذاكر الورق.", delay: "d1", badge: "جديد" },
  { icon: <BoxIcon />, title: "إدارة المخزون", desc: "فواتير الموردين وكميات لحظية، وكل بيعة تخصم من المخزون تلقائياً.", delay: "d2" },
  { icon: <ClockIcon />, title: "يعمل بدون إنترنت", desc: "البيع يكمل محلياً وقت انقطاع الشبكة، ويزامن وحده لمّا ترجع.", delay: "" },
  { icon: <ChatIcon />, title: "سجل الطلبات وتصدير Excel", desc: "تصفّح أي طلب سابق وأعد طباعته، وصدّر تقاريرك بضغطة.", delay: "d1" },
  { icon: <UsersIcon />, title: "صلاحيات وموظفون", desc: "حساب مدير محمي وحسابات كاشير منفصلة — كل عملية باسم منفّذها.", delay: "d2" },
];

export default function Features() {
  return (
    <section className="section scroll-mt-[104px]" id="features">
      <div className="shell">
        <div className="section-head reveal">
          <span className="eyebrow">لماذا Kairos Space</span>
          <h2>كل ما يحتاجه عملك في نظام واحد</h2>
          <p>من أول طلب على الكاشير حتى آخر تقرير أرباح — كل شيء مترابط ومكانه واحد.</p>
        </div>

        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`feat-card card reveal ${f.delay} relative overflow-hidden transition-all duration-350 hover:-translate-y-[5px] hover:shadow-[0_26px_50px_-28px_rgba(60,45,12,0.4)] ${
                f.badge ? "!border-[rgba(168,128,26,0.4)]" : ""
              }`}
            >
              {f.badge && (
                <span className="absolute top-5 left-5 bg-gradient-to-l from-[#e3c14f] to-[#c49b25] text-[#221b10] text-2xs font-extrabold py-1 px-2.5 rounded-full">
                  {f.badge}
                </span>
              )}
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[rgba(168,128,26,0.1)] border border-[rgba(168,128,26,0.22)] flex items-center justify-center text-primary mb-6">
                {f.icon}
              </div>
              <h3 className="text-lg font-extrabold mb-2.5">{f.title}</h3>
              <p className="text-[15px] text-muted leading-[1.7]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
