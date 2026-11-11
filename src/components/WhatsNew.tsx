import Link from "next/link";
import { type ReactNode } from "react";
import {
  ArrowIcon,
  KitchenScreenIcon,
  ReceiptIcon,
  ShoppingBagIcon,
  SparkleIcon,
  TagIcon,
  UsersIcon,
} from "@/components/Icons";

// «آخر التحديثات» — ما شُحن فعلاً هذا الشهر، لا ما نخطّط له. قسم رابط خفيف
// (section-sm) بين المزايا والمعرض: الزائر يرى أن النظام حيّ ويتحرّك، وهذا عند
// مشروع في بدايته أقوى من بطاقة ميزة إضافية.
//
// ⚠️ ثلاث قواعد لمن يحدّث القائمة:
// 1. كل سطر منشور على كل القطارات التي يصدق عليها قبل أن يُكتب هنا — المرجع
//    docs/kairos-cloud/STATE.md في مستودع الـ POS، لا الذاكرة.
// 2. `scope` ليس زينة: يقول للزائر أين تعمل الميزة. «نقاط الولاء» سحابية بقرار
//    (الرصيد لا يتزامن للأجهزة) فهي على الكاشير الأونلاين فقط — لا تحذف الوسم.
// 3. العدد ستة عن قصد: يقبل القسمة على 3 و2 فلا يبقى صفّ ناقص في أي عرض.
//    تحديث جديد يدخل = الأقدم يخرج، ويتغيّر UPDATES_MONTH معه.
const UPDATES_MONTH = "تشرين الثاني 2026";

const ICON = "w-[22px] h-[22px]";

const UPDATES: { icon: ReactNode; title: string; desc: string; scope: string; href?: string }[] = [
  {
    icon: <SparkleIcon className={ICON} />,
    title: "المساعد الذكي صار يعمل مع ChatGPT",
    desc: "الرابط نفسه والصلاحيات نفسها: اسأل ChatGPT أو Claude عن أرقام محلّك.",
    scope: "البزنس والشاملة",
    href: "/ai-assistant",
  },
  {
    icon: <TagIcon className={ICON} />,
    title: "عروض بشروط وكوبونات",
    desc: "هابي أور، أيام محدّدة، حدّ أدنى للفاتورة، أو كوبون يكتبه الكاشير — وتُطبَّق وحدها.",
    scope: "كل الباقات",
  },
  {
    icon: <ShoppingBagIcon className={ICON} />,
    title: "وجبات الكومبو",
    desc: "وجبة من أصنافك الحقيقية: كل مكوّن يخصم مخزونه ويصل قسمه في المطبخ.",
    scope: "كل الباقات",
  },
  {
    icon: <KitchenScreenIcon className={ICON} />,
    title: "كورسات وإكرامية للصالة",
    desc: "المقبلات تنزل للمطبخ الآن والطبق الرئيسي حين تطلبه، والإكرامية للموظفين لا للإيراد.",
    scope: "مع الطاولات",
  },
  {
    icon: <UsersIcon className={ICON} />,
    title: "نقاط الولاء",
    desc: "الزبون يكسب نقاطاً مع كل فاتورة ويستبدلها خصماً، بقيمة وسقف تحدّدهما أنت.",
    scope: "الكاشير الأونلاين",
  },
  {
    icon: <ReceiptIcon className={ICON} />,
    title: "نسبة ضريبة لكل صنف",
    desc: "16٪ أو 8٪ أو 4٪ أو 2٪ أو معفى — وكل فاتورة تخرج بضريبتها الصحيحة.",
    scope: "كل الباقات",
  },
];

export default function WhatsNew() {
  return (
    <section className="section-sm scroll-mt-[104px]" id="updates" aria-labelledby="updatesHeading">
      <div className="shell">
        <div className="section-head reveal">
          <span className="eyebrow">آخر التحديثات · {UPDATES_MONTH}</span>
          <h2 id="updatesHeading">نظام يكبر مع محلّك</h2>
          <p>ستة أشياء وصلت محلات كايروس هذا الشهر — والتحديث ينزل على جهازك وحده.</p>
        </div>

        <ul className="list-none grid grid-cols-3 gap-4 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
          {UPDATES.map((u, i) => (
            <li
              key={u.title}
              className={`reveal ${["", "d1", "d2"][i % 3]} flex gap-4 bg-surface border border-secondary rounded-[18px] px-5 py-5`}
            >
              <span className="w-11 h-11 shrink-0 rounded-[12px] bg-[rgba(168,128,26,0.1)] border border-[rgba(168,128,26,0.22)] text-primary flex items-center justify-center">
                {u.icon}
              </span>
              <div className="min-w-0">
                <h3 className="text-[16px] font-extrabold leading-[1.5]">{u.title}</h3>
                <p className="text-[14px] text-muted leading-[1.75] mt-1">{u.desc}</p>
                <div className="mt-3 flex items-center gap-x-3 gap-y-1.5 flex-wrap">
                  <span className="inline-flex rounded-full bg-surface-2 border border-secondary px-2.5 py-0.5 text-2xs font-bold text-muted">
                    {u.scope}
                  </span>
                  {u.href && (
                    <Link
                      href={u.href}
                      className="hit-44 inline-flex items-center gap-1 text-[13px] font-bold text-primary no-underline hover:underline"
                    >
                      التفاصيل
                      <ArrowIcon className="w-3.5 h-3.5 rotate-180" />
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
