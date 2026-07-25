import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import { SUPPORT_HOURS, WA_MESSAGES, WA_NUMBER, waUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "الدعم الفني | Kairos Space POS",
  description:
    "دعم فني لنظام Kairos Space POS — واتساب مباشر، حلول لأكثر المشاكل شيوعاً (الطابعة، المزامنة، التفعيل)، ودليل استخدام كامل بالعربية.",
  alternates: { canonical: "/support" },
};

// الأسئلة مرتّبة بحسب ما يتكرّر فعلياً في الدعم: الطابعة أولاً.
const FAQ = [
  {
    q: "الفاتورة ما بتطلع من الطابعة",
    a: "تأكد أولاً أن الطابعة مضاءة وفيها ورق وأن كبل الشبكة موصول. ثم من «إعدادات النشاط ← الطباعة» اضغط «طباعة تجريبية». إن لم تطبع، تحقّق أن عنوان الطابعة (IP) في الإعدادات هو نفسه المطبوع على ورقة إعدادات الطابعة — يتغيّر أحياناً بعد إعادة تشغيل الراوتر. إن بقيت المشكلة راسلنا ونضبطها معك عن بُعد.",
  },
  {
    q: "هل يتوقف النظام إذا انقطع الإنترنت؟",
    a: "لا. النظام يعمل بالكامل بدون إنترنت — البيع والطباعة والتقارير كلها محلية على جهازك. الإنترنت يُستخدم فقط لمزامنة بياناتك مع لوحة التحكم ولإرسال الفواتير لنظام الفوترة الوطني، وكلاهما يُستأنف تلقائياً عند عودة الاتصال دون أن تفقد شيئاً.",
  },
  {
    q: "بياناتي لا تظهر في لوحة التحكم",
    a: "المزامنة تعمل كل دقيقة، فالتأخير الطبيعي دقيقة أو دقيقتان. إن تأخرت أكثر: تأكد من اتصال جهاز الكاشير بالإنترنت، وأن اليومية مفتوحة. لو استمرّ الأمر أكثر من ساعة راسلنا — نرى حالة جهازك من طرفنا ونحدّد السبب بدقة.",
  },
  {
    q: "نسيت رمز الإدارة (PIN)",
    a: "رمز الإدارة لا يمكن استرجاعه من داخل البرنامج لأسباب أمنية. راسلنا من رقم صاحب المحل المسجّل لدينا ونعيد ضبطه لك بعد التحقق من هويتك.",
  },
  {
    q: "كيف أضيف موظفاً وأحدّد صلاحياته؟",
    a: "من «الإدارة ← الكاشيرية» أضف الموظف باسمه ورمز دخوله، واختر دوره: كاشير، مدير، مسؤول مخزون، أو محاسب. كل دور يفتح الشاشات التي تخصّه فقط — المحاسب مثلاً يرى التقارير والمصروفات ولا يستطيع إدارة الموظفين.",
  },
  {
    q: "كيف أحصل على التحديثات؟",
    a: "تلقائياً. يفحص البرنامج وجود تحديث كل بضع ساعات وينزّله في الخلفية دون أن يقاطع عملك، ثم يثبّته عند إغلاق البرنامج. لا تحتاج إعادة تحميل أي ملف.",
  },
  {
    q: "هل أستطيع تشغيل النظام على أكثر من جهاز؟",
    a: "نعم — كل فرع أو نقطة بيع لها جهازها، وتظهر كلها مجمّعة في لوحة تحكم واحدة. عدد الأجهزة يتبع اشتراكك، فراسلنا لإضافة جهاز.",
  },
  {
    q: "كيف أحتفظ بنسخة احتياطية من بياناتي؟",
    a: "النظام يأخذ نسخة احتياطية محلية تلقائياً، ويمكنك أخذ نسخة يدوية في أي وقت من «الإدارة ← النسخ الاحتياطي». وبياناتك مزامَنة سحابياً أيضاً، فحتى لو تعطّل الجهاز نستعيد عملك.",
  },
];

export default function SupportPage() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="glow w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_70%)] -top-[180px] -right-[120px] absolute" />
        <div className="glow w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(52,211,153,0.07),transparent_70%)] top-[55%] -left-[160px] absolute" />
      </div>

      <Navbar />

      <main className="max-w-[1240px] mx-auto px-7 relative z-1 pt-[130px]">
        <header className="text-center max-w-[720px] mx-auto reveal">
          <h1 className="text-[clamp(30px,5vw,46px)] font-extrabold leading-[1.25]">
            الدعم <b className="text-primary">الفني</b>
          </h1>
          <p className="text-muted text-[17px] mt-4">
            نحن على بُعد رسالة. أغلب المشاكل نحلّها معك خلال دقائق — وإن لزم دخلنا على جهازك عن بُعد.
          </p>
        </header>

        {/* ── قنوات التواصل ──────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          <a
            href={waUrl(WA_MESSAGES.support)}
            className="bg-surface border border-secondary rounded-2xl p-7 no-underline transition-all duration-250 hover:border-green/45 hover:-translate-y-1 reveal"
          >
            <div className="text-green text-[13px] font-bold">الأسرع</div>
            <h2 className="text-[20px] font-extrabold mt-2 text-text">واتساب</h2>
            <p className="text-muted text-[15px] mt-2.5 leading-[1.75]">
              اشرح مشكلتك وأرفق صورة للشاشة إن أمكن — نردّ خلال دقائق في أوقات العمل.
            </p>
            <div className="num text-primary font-bold text-[16px] mt-4 dir-ltr">
              +{WA_NUMBER}
            </div>
          </a>

          <div className="bg-surface border border-secondary rounded-2xl p-7 reveal">
            <div className="text-primary text-[13px] font-bold">أوقات العمل</div>
            <h2 className="text-[20px] font-extrabold mt-2">متى نردّ</h2>
            <p className="text-muted text-[15px] mt-2.5 leading-[1.75]">{SUPPORT_HOURS}</p>
            <p className="text-[14px] text-[#71717a] mt-4 leading-[1.8]">
              الأعطال التي توقف البيع نتعامل معها خارج هذه الأوقات أيضاً — راسلنا واكتب
              «عاجل» في بداية الرسالة.
            </p>
          </div>

          <Link
            href="/docs"
            className="bg-surface border border-secondary rounded-2xl p-7 no-underline transition-all duration-250 hover:border-primary/45 hover:-translate-y-1 reveal"
          >
            <div className="text-blue text-[13px] font-bold">اقرأ بنفسك</div>
            <h2 className="text-[20px] font-extrabold mt-2 text-text">دليل الاستخدام</h2>
            <p className="text-muted text-[15px] mt-2.5 leading-[1.75]">
              شرح عربي مصوّر لكل شاشة: من التثبيت والتفعيل حتى إغلاق اليومية والتقارير.
            </p>
            <div className="text-primary font-bold text-[15px] mt-4">افتح الدليل ←</div>
          </Link>
        </div>

        {/* ── الأسئلة الشائعة ────────────────────────────────────────── */}
        <section className="mt-16 reveal">
          <h2 className="text-[26px] font-extrabold text-center">أسئلة تتكرّر علينا</h2>
          <div className="max-w-[860px] mx-auto mt-8 space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group bg-surface border border-secondary rounded-2xl px-6 py-5 transition-colors hover:border-primary/30"
              >
                <summary className="font-bold text-[16px] cursor-pointer list-none flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-primary text-[22px] leading-none shrink-0 transition-transform duration-250 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-muted text-[15px] mt-4 leading-[1.9]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── لم تجد ما تبحث عنه ─────────────────────────────────────── */}
        <section className="mt-14 mb-4 reveal">
          <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-[22px] font-extrabold">مشكلتك ليست في القائمة؟</h2>
            <p className="text-muted text-[15px] mt-3">
              اكتب لنا ما يحصل معك بالضبط — ونتكفّل بالباقي.
            </p>
            <a
              href={waUrl(WA_MESSAGES.support)}
              className="inline-block mt-6 bg-gradient-to-l from-[#e3c14f] to-[#c49b25] text-[#221b10] py-3.5 px-7 rounded-xl font-bold text-[15px] no-underline transition-all duration-250 hover:brightness-105 hover:-translate-y-0.5"
            >
              راسلنا على واتساب
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
