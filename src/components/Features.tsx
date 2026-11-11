import {
  LightningIcon,
  BarChartIcon,
  BoxIcon,
  ClockIcon,
  ReceiptIcon,
  QrIcon,
  BellIcon,
  ShieldCheckIcon,
  SparkleIcon,
} from "@/components/Icons";
import { type ReactNode } from "react";

// 2026-11-12 — من 12 بطاقة إلى 9 (شبكة 3×3، تقبل القسمة على 3). الصفحة صارت 13
// قسماً وثلاثة منها متتالية تسرد ما نملك (هنا، WhatsNew، المعرض). ما دُمج:
// المنيو QR + شاشة المطبخ في بطاقة «الصالة»، والصلاحيات + سجل التدقيق في بطاقة
// الرقابة. وما خرج: «سجل الطلبات وتصدير Excel» — موجود في المعرض وفي الباقات.
// شارة «جديد» على المساعد وحده؛ للجديد قسمه (WhatsNew).
//
// ⚠️ الوصف سطر واحد لكل ميزة (10–16 كلمة). البطاقة تقول ماذا تفعل الميزة،
// والتفاصيل مكانها صفحاتها المخصّصة (/jofotara · /sales-channels · /ai-assistant).
// بطاقة عاشرة تكسر الصف — أضِف ثلاثاً أو استبدل واحدة.
const FEATURES: { icon: ReactNode; title: string; desc: string; delay: string; badge?: string }[] = [
  { icon: <ReceiptIcon />, title: "متكامل مع الفوترة الوطنية", desc: "فواتيرك ترتفع مباشرةً إلى جوفوترة — التزام ضريبي كامل بلا برنامج منفصل.", delay: "" },
  { icon: <ClockIcon />, title: "يعمل بدون إنترنت", desc: "البيع يكمل محلياً وقت انقطاع الشبكة، ويزامن وحده لمّا ترجع.", delay: "d1" },
  { icon: <LightningIcon />, title: "كاشير فائق السرعة", desc: "أضف بنقرة، طبّق الخصم، وأتمم الدفع نقداً أو بطاقة أو محفظة في ثوانٍ.", delay: "d2" },
  { icon: <BarChartIcon />, title: "تقارير لحظية", desc: "الإيرادات والمصاريف وصافي الربح والأكثر مبيعاً — تتحدّث كل 30 ثانية.", delay: "" },
  { icon: <BoxIcon />, title: "إدارة المخزون", desc: "فواتير الموردين وكميات لحظية، وكل بيعة تخصم من المخزون تلقائياً.", delay: "d1" },
  { icon: <QrIcon />, title: "منيو QR وشاشة مطبخ", desc: "الزبون يطلب من جواله على الطاولة، والطلب يظهر على شاشة المطبخ فوراً — بلا تذاكر ورق.", delay: "d2" },
  // 2026-09-05 — ما يبرّر باقة البزنس أمام صاحب المحل الغائب.
  { icon: <BellIcon />, title: "تنبيهات على تلغرام", desc: "ملخص اليوم كل مساء، وتنبيه فوري لعجز الوردية والمخزون المنخفض وقفزات الإلغاء.", delay: "" },
  // مصفوفة الصلاحيات (pos.* + سقف خصم شخصي، 2.36.0) + سجل التدقيق (audit_log، البزنس).
  { icon: <ShieldCheckIcon />, title: "صلاحيات وسجل تدقيق", desc: "لكل كاشير صلاحياته وسقف خصمه، وكل إلغاء وخصم وتغيير سعر مكتوب باسم صاحبه ووقته.", delay: "d1" },
  { icon: <SparkleIcon />, title: "مساعد ذكاء اصطناعي", desc: "اسأل Claude أو ChatGPT عن أرقامك بالعربي، وصوّر فاتورة المورد ليسجّلها بعد موافقتك.", delay: "d2", badge: "جديد" },
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
