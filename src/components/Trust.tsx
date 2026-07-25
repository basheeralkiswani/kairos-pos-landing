import { CoffeeIcon, NavigationIcon, ShoppingBagIcon, BookIcon, CheckIcon } from "@/components/Icons";
import { CLIENT_COUNT } from "@/lib/constants";

// شريط الثقة. كان يعرض **فئات** («المقاهي، المطاعم…») لا **دليلاً** — والزائر
// لا يستنتج من الفئة أن أحداً يستخدم النظام فعلاً.
//
// ليس عندنا شهادات عملاء بعد، ولن نخترعها. البديل الصادق: الأرقام والحقائق
// التي نملكها ونستطيع الدفاع عنها — عدد المحلات المشتركة، والربط الرسمي مع
// جوفوترة، وأن البرنامج أردني الصنع. الرقم الصغير المحدَّد أصدق من المبهم.
export default function Trust() {
  return (
    <div className="py-[18px] pb-1.5">
      <div className="max-w-[1240px] mx-auto px-7 relative z-1 reveal">
        <div className="flex items-center justify-center gap-x-8 gap-y-4 flex-wrap">
          {/* الدليل الرقمي */}
          <span className="inline-flex items-center gap-2.5 rounded-full bg-surface border border-[rgba(133,101,18,0.3)] py-2 px-4 shadow-[0_8px_20px_-14px_rgba(60,45,12,0.5)]">
            <span className="w-[7px] h-[7px] rounded-full bg-green animate-[pulse-dot_2s_infinite] shrink-0" />
            <span className="text-[15px] font-bold text-text">
              <span className="num text-primary">{CLIENT_COUNT}</span> محلاً في الأردن يشتغل على كايروس اليوم
            </span>
          </span>

          <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-muted">
            <CheckIcon className="w-4 h-4 text-green shrink-0" />
            مربوط رسمياً مع جوفوترة
          </span>
        </div>

        {/* الفئات — سياق لا دليل، فتأخذ وزناً بصرياً أقل */}
        <div className="flex items-center justify-center gap-x-7 gap-y-2.5 flex-wrap mt-4 opacity-80">
          <span className="text-[13px] text-muted">يُدير:</span>
          <span className="flex items-center gap-2 font-semibold text-[14px] text-muted">
            <CoffeeIcon className="w-4 h-4 text-primary" /> المقاهي
          </span>
          <span className="flex items-center gap-2 font-semibold text-[14px] text-muted">
            <NavigationIcon className="w-4 h-4 text-primary" /> المطاعم
          </span>
          <span className="flex items-center gap-2 font-semibold text-[14px] text-muted">
            <ShoppingBagIcon className="w-4 h-4 text-primary" /> المتاجر
          </span>
          <span className="flex items-center gap-2 font-semibold text-[14px] text-muted">
            <BookIcon className="w-4 h-4 text-primary" /> مساحات العمل
          </span>
        </div>
      </div>
    </div>
  );
}
