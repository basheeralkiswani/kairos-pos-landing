"use client";

import { trackWhatsAppClick } from "@/components/Analytics";
import { WhatsAppIcon } from "@/components/Icons";
import type { PlanKey } from "@/lib/constants";

// المخرج الثانوي في بطاقة السعر. معزول في مكوّن عميل خاص به لأنه الشيء
// الوحيد المتفاعل في قسم الأسعار بعد إزالة مفتاح شهري/سنوي — فيبقى القسم
// كله يُرسَل من الخادم بلا JS.
//
// معرّف التتبّع صار مفتاح الباقة وحده: كان `${key}_${cycle}` حين كانت هناك
// دورتان، وستّة أحداث لثلاث باقات تُشتّت التقرير بلا فائدة.
export default function PlanWaLink({ planKey, href }: { planKey: PlanKey; href: string }) {
  return (
    <a
      id={`${planKey}Wa`}
      className="inline-flex items-center justify-center gap-2 mt-3.5 min-h-[44px] text-[15px] font-bold text-wa no-underline hover:underline"
      href={href}
      target="_blank"
      rel="noopener"
      onClick={() => trackWhatsAppClick(planKey)}
    >
      <WhatsAppIcon className="w-[17px] h-[17px]" />
      أو اشترك مباشرة عبر واتساب
    </a>
  );
}
