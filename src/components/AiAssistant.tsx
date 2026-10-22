import Link from "next/link";
import { ArrowIcon, CheckIcon, SparkleIcon } from "@/components/Icons";

// مساعد Claude (موصل MCP على app.kairos-pos.com/mcp — ميزة ai_assistant،
// البزنس والشاملة). كل سطر هنا يقابل أداة تعمل اليوم: القراءة تحت reports:read،
// فاتورة المورد عبر kairos_record_purchase_invoice (اقتراح ثم تأكيد)، والتنبؤ
// بالطلب عبر kairos_reorder_forecast. ما لا يستطيعه أبداً (بيع، حذف، إبطال)
// مكتوب في docs/kairos-cloud/AI-ASSISTANT.md في مستودع الـ POS — لا نعد بغيره.
//
// المحادثة نصّ حقيقي في HTML لا صورة: تُقرأ لمحرّكات البحث ولقارئ الشاشة.
// الحركة CSS فقط (.ai-chat.in .ai-msg في globals.css) — لا JS إضافي.

export const AI_POINTS = [
  "يقرأ أرقامك كلها: المبيعات، صافي الربح، الورديات، الضريبة، والمخزون",
  "يسجّل فواتير الموردين والمصاريف من صورة أو رسالة",
  "يعدّل الأسعار والوصفات والمخزون — بعد موافقتك فقط",
  "لا يبيع ولا يحذف، وكل خطوة له مكتوبة في سجل التدقيق",
];

export function AiChatDemo() {
  return (
    <figure
      className="ai-chat reveal d2 relative bg-surface text-text rounded-[24px] border border-[rgba(212,175,55,0.45)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] overflow-hidden"
      aria-label="مثال محادثة مع مساعد Kairos الذكي"
    >
      {/* شريط العنوان */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-secondary bg-surface-2/60">
        <span className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-[#e3c14f] to-[#a8801a] text-[#221b10] flex items-center justify-center">
          <SparkleIcon className="w-[18px] h-[18px]" />
        </span>
        <div className="leading-tight">
          <div className="font-extrabold text-[15px]">مساعد Kairos الذكي</div>
          <div className="text-[12px] text-muted flex items-center gap-1.5">
            <span className="w-[7px] h-[7px] rounded-full bg-green" />
            متصل بأرقام محلّك
          </div>
        </div>
      </div>

      <div className="ai-thread flex flex-col gap-3.5 p-5 max-sm:p-4 text-[15px] leading-[1.75]">
        {/* سؤال 1 */}
        <div className="ai-msg self-end max-w-[85%] bg-[#f1e4c2] rounded-[18px] rounded-bl-[6px] px-4 py-2.5 font-semibold">
          كم بعنا اليوم مقارنة بأمس؟
        </div>

        {/* جواب 1 — بطاقة أرقام */}
        <div className="ai-msg self-start max-w-[92%] bg-surface border border-secondary rounded-[18px] rounded-br-[6px] px-4 py-3">
          <div className="flex items-end gap-3 flex-wrap">
            <div>
              <div className="text-[12px] text-muted">مبيعات اليوم</div>
              <div className="num text-[26px] font-extrabold leading-none mt-1">
                412.75 <span className="text-[14px] text-muted font-bold">د.أ</span>
              </div>
            </div>
            <span className="num text-[13px] font-bold text-green bg-[rgba(19,116,74,0.1)] rounded-full px-2.5 py-0.5 mb-0.5">
              ▲ 18٪ عن أمس
            </span>
          </div>
          <p className="mt-2.5 text-muted text-[14px]">
            الأكثر طلباً: <b className="text-text">لاتيه</b> (<span className="num">64</span> كوب).
            مخزون الحليب يكفي يومين تقريباً — أضيفه لطلبية بكرة؟
          </p>
        </div>

        {/* سؤال 2 — صورة فاتورة */}
        <div className="ai-msg self-end max-w-[85%] bg-[#f1e4c2] rounded-[18px] rounded-bl-[6px] px-4 py-2.5">
          <div className="inline-flex items-center gap-2 bg-surface/70 border border-[rgba(168,128,26,0.3)] rounded-[10px] px-2.5 py-1.5 text-[13px] font-bold mb-1.5">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            فاتورة-الألبان.jpg
          </div>
          <div className="font-semibold">سجّل هالفاتورة على مورد الألبان</div>
        </div>

        {/* جواب 2 — اقتراح ينتظر التأكيد */}
        <div className="ai-msg self-start max-w-[92%] bg-surface border border-[rgba(168,128,26,0.4)] rounded-[18px] rounded-br-[6px] px-4 py-3">
          <div className="text-[14px] text-muted">طابقت الأصناف مع موادك. هذا ما سأسجّله:</div>
          <ul className="mt-2 text-[14px] divide-y divide-secondary">
            <li className="flex justify-between gap-3 py-1.5"><span>حليب كامل الدسم × 24</span><span className="num font-bold">21.60</span></li>
            <li className="flex justify-between gap-3 py-1.5"><span>كريمة طبخ × 12</span><span className="num font-bold">18.00</span></li>
            <li className="flex justify-between gap-3 py-1.5"><span>جبنة موزاريلا 2 كغ × 4</span><span className="num font-bold">46.80</span></li>
          </ul>
          <div className="flex justify-between font-extrabold text-[15px] border-t border-secondary pt-2 mt-1">
            <span>الإجمالي كما في الورقة</span>
            <span className="num">86.40 د.أ</span>
          </div>
          {/* أزرار للعرض فقط — ليست عناصر تفاعل */}
          <div className="flex gap-2 mt-3" aria-hidden="true">
            <span className="inline-flex items-center gap-1.5 bg-green text-white text-[13px] font-bold rounded-[10px] px-3.5 py-1.5">
              <CheckIcon className="w-3.5 h-3.5" /> تأكيد
            </span>
            <span className="inline-flex items-center text-[13px] font-bold rounded-[10px] px-3.5 py-1.5 border border-secondary text-muted">
              تعديل
            </span>
          </div>
        </div>
      </div>

      {/* شريط الكتابة */}
      <div className="ai-msg mx-5 mb-5 max-sm:mx-4 max-sm:mb-4 flex items-center gap-2 rounded-[14px] border border-secondary bg-bg px-4 py-3 text-[14px] text-muted">
        <span className="ai-caret" aria-hidden="true" />
        اسأل عن أي رقم في محلّك…
      </div>

      <figcaption className="sr-only">
        مثال توضيحي: صاحب المحل يسأل عن مبيعات اليوم، ثم يرسل صورة فاتورة مورد،
        والمساعد يعرض ما سيسجّله وينتظر التأكيد. الأرقام للتوضيح.
      </figcaption>
    </figure>
  );
}

export default function AiAssistant() {
  return (
    <section className="section scroll-mt-[104px]" id="ai" aria-labelledby="aiHeading">
      <div className="shell">
        <div className="on-dark ai-band relative overflow-hidden bg-gradient-to-br from-dark to-dark-2 border border-[rgba(212,175,55,0.35)] rounded-[32px] px-[clamp(22px,5vw,64px)] py-[clamp(48px,6vw,80px)] shadow-[0_40px_80px_-40px_rgba(34,27,16,0.7)]">
          <div className="relative grid grid-cols-[1fr_1.05fr] gap-[clamp(36px,5vw,72px)] items-center max-lg:grid-cols-1">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full border border-[rgba(227,193,79,0.45)] text-[#e3c14f] text-[13px] font-bold">
                <SparkleIcon className="w-4 h-4" />
                جديد · مساعد ذكاء اصطناعي
              </span>

              <h2
                id="aiHeading"
                className="text-[clamp(30px,4.4vw,50px)] font-black leading-[1.25] tracking-[-0.5px] mt-5 text-[#f7f2e7]"
              >
                اسأل محلّك بالعربي…
                <br />
                <span className="bg-gradient-to-l from-[#e3c14f] via-[#f3dc8a] to-[#c49b25] bg-clip-text text-transparent">
                  ويجاوبك بالأرقام.
                </span>
              </h2>

              <p className="text-[clamp(16px,1.9vw,18px)] text-[#cfc4a8] mt-5 leading-[1.9] max-w-[540px]">
                اربط Kairos بـ <b className="text-[#f7f2e7]">Claude</b> — مساعد الذكاء الاصطناعي
                من Anthropic — واسأله عن مبيعاتك وأرباحك ومخزونك كأنك تحكي مع محاسبك.
                صوّر فاتورة المورد وقله «سجّلها»: يطابق الأصناف ويعرضها عليك قبل أن يكتب أي شيء.
              </p>

              <ul className="mt-7 space-y-3">
                {AI_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] text-[#e9e0c9] leading-[1.7]">
                    <span className="mt-[3px] w-[22px] h-[22px] shrink-0 rounded-full bg-[rgba(127,227,171,0.14)] text-[#7fe3ab] flex items-center justify-center">
                      <CheckIcon className="w-3.5 h-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex items-center gap-x-6 gap-y-3 flex-wrap">
                <Link href="/ai-assistant" className="btn-gold max-sm:w-full">
                  اكتشف المساعد الذكي
                  <ArrowIcon className="w-[18px] h-[18px] rotate-180" />
                </Link>
                <span className="text-[14px] text-[#a89d85]">
                  ضمن باقتَي <b className="text-[#e3c14f]">البزنس</b> و<b className="text-[#e3c14f]">الشاملة</b>
                </span>
              </div>
            </div>

            <AiChatDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
