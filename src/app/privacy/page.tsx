import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import { SUPPORT_HOURS, waUrl } from "@/lib/constants";

// سياسة الخصوصية — مطلوبة لبطاقة Google Play (تطبيق الكاشير com.kairos.cashier.thin)
// ولكل منصّة توزيع. كل سطر هنا يجب أن يطابق سلوك الكود الفعلي: لو أضاف التطبيق
// صلاحية (كاميرا، موقع) أو مكتبة طرف ثالث (تحليلات، إشعارات)، حدِّث هذه الصفحة
// ونموذج «أمان البيانات» في Play Console معاً قبل النشر.

const UPDATED = "24 نوفمبر 2026";
const CONTACT_EMAIL = "basheeralkiswani@gmail.com";
const DELETE_MSG =
  "مرحباً، أطلب حذف حسابي وبيانات محلّي من Kairos POS. اسم المحل: ____ — البريد المسجّل: ____";

const COLLECT = [
  {
    t: "بيانات الحساب",
    d: "البريد الإلكتروني وكلمة المرور لصاحب المحل أو المدير، واسم المحل وعنوانه ورقم هاتفه. عند ربط جهاز الكاشير تُستخدم بيانات الدخول مرة واحدة للحصول على رمز ربط للجهاز، ولا تُحفظ كلمة المرور على الجهاز.",
  },
  {
    t: "بيانات تشغيل المحل",
    d: "المنتجات والأسعار والمخزون، والمبيعات والمدفوعات والمرتجعات، والورديات وحركات الصندوق والمصاريف. هذه بيانات محلّك أنت، تُحفظ على جهاز الكاشير وتُزامَن مع لوحة التحكم السحابية.",
  },
  {
    t: "بيانات الموظفين",
    d: "أسماء الموظفين وأدوارهم، ورموز الدخول (PIN) محفوظة كقيمة مشفّرة (hash) لا كرقم صريح.",
  },
  {
    t: "بيانات عملاء المحل",
    d: "ما يدخله المحل بنفسه عن زبائنه، مثل الاسم ورقم الهاتف والملاحظات وحدّ الدَّين ونقاط الولاء. يتحكّم المحل في هذه البيانات ويستطيع تعديلها أو حذفها.",
  },
  {
    t: "بيانات الجهاز",
    d: "معرّف عشوائي ينشئه التطبيق عند الربط، واسم الجهاز إن كتبته، وآخر وقت اتصال. نستخدمها لتطبيق عدد الأجهزة المسموح في باقتك ولإيقاف جهاز مفقود عن بُعد. لا نقرأ معرّفات النظام أو الإعلانات.",
  },
];

const PERMISSIONS = [
  { p: "الإنترنت وحالة الشبكة", w: "مزامنة المبيعات والكتالوج مع لوحة التحكم، والطباعة على طابعات الشبكة." },
  { p: "حالة الواي فاي ومنع السكون", w: "إبقاء الاتصال بطابعات الشبكة الحرارية أثناء فتح الكاشير." },
  { p: "البلوتوث (الاتصال بالأجهزة المقترنة)", w: "الطباعة على طابعة بلوتوث مقترنة مسبقاً. لا يبحث التطبيق عن أجهزة ولا يستخدم البلوتوث لتحديد الموقع." },
];

const NOT_DONE = [
  "لا نعرض إعلانات، ولا نستخدم مكتبات تحليلات أو تتبّع من أطراف ثالثة داخل التطبيق.",
  "لا نبيع بياناتك ولا نؤجّرها ولا نشاركها لأغراض تسويقية.",
  "تطبيق الكاشير لا يطلب الكاميرا ولا الموقع الجغرافي ولا جهات الاتصال ولا الميكروفون.",
  "لا يرى محلٌّ بيانات محل آخر: بيانات كل محل معزولة على مستوى قاعدة البيانات.",
];

export const metadata: Metadata = {
  title: "سياسة الخصوصية | Kairos Space POS",
  description:
    "ما الذي يجمعه Kairos POS (لوحة التحكم وتطبيق الكاشير) ولماذا، وأين يُحفظ، ومع من يُشارَك، وكيف تطلب حذف حسابك وبياناتك.",
  alternates: { canonical: "/privacy" },
};

function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-[24px] font-extrabold">{children}</h2>;
}

export default function PrivacyPage() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="glow w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.14),transparent_70%)] -top-[180px] -right-[120px] absolute" />
      </div>

      <Navbar />

      <main className="max-w-[860px] mx-auto px-7 relative z-1 pt-[130px]">
        <header className="text-center reveal">
          <div className="text-primary text-[13px] font-bold tracking-wide">آخر تحديث: {UPDATED}</div>
          <h1 className="text-[clamp(30px,5vw,46px)] font-extrabold leading-[1.22] mt-2">
            سياسة <b className="text-primary">الخصوصية</b>
          </h1>
          <p className="text-muted text-[17px] mt-5 leading-[1.85] max-w-[700px] mx-auto">
            Kairos Space POS نظام نقاط بيع للمحلات التجارية المشتركة في الخدمة، ويشمل لوحة التحكم على
            الويب وتطبيقات الكاشير على ويندوز وأندرويد. توضّح هذه الصفحة ما نجمعه ولماذا، وأين يُحفظ،
            وكيف تحذفه.
          </p>
        </header>

        <section className="mt-14 reveal">
          <H2>ما الذي نجمعه</H2>
          <div className="mt-6 space-y-4">
            {COLLECT.map((c) => (
              <div key={c.t} className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                <h3 className="font-bold text-[16px] text-text">{c.t}</h3>
                <p className="text-muted text-[14.5px] mt-2 leading-[1.85]">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 reveal">
          <H2>لماذا نستخدمها</H2>
          <p className="text-muted text-[15.5px] mt-4 leading-[1.95]">
            فقط لتشغيل الخدمة نفسها: البيع والطباعة، ومزامنة بيانات المحل بين أجهزته ولوحة التحكم،
            وإصدار التقارير، والفوترة الوطنية (جوفوترة) عند تفعيلها، وتطبيق حدود الباقة، والدعم الفني
            عندما تطلبه.
          </p>
        </section>

        <section className="mt-12 reveal">
          <H2>صلاحيات تطبيق الكاشير على أندرويد</H2>
          <div className="mt-5 overflow-x-auto">
            <div className="min-w-[520px] border border-secondary rounded-2xl overflow-hidden">
              {PERMISSIONS.map((r, i) => (
                <div
                  key={r.p}
                  className={`grid grid-cols-[1fr_1.8fr] ${i ? "border-t border-secondary" : ""} ${i % 2 ? "bg-surface" : ""}`}
                >
                  <div className="px-5 py-4 font-bold text-[14px] text-text">{r.p}</div>
                  <div className="px-5 py-4 text-[14px] text-muted leading-[1.7] border-r border-secondary">{r.w}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 reveal">
          <H2>ما لا نفعله</H2>
          <ul className="mt-5 space-y-3">
            {NOT_DONE.map((s) => (
              <li key={s} className="flex gap-3 text-[15px] leading-[1.85] text-text">
                <span className="text-green shrink-0 mt-0.5">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 reveal">
          <H2>أين تُحفظ ومع من تُشارَك</H2>
          <p className="text-muted text-[15.5px] mt-4 leading-[1.95]">
            تُحفظ نسخة على جهاز الكاشير نفسه، وتُنقل إلى خوادمنا مشفّرة (HTTPS/TLS). نستخدم مزوّدي
            بنية تحتية سحابية لتشغيل الخدمة فقط: Railway لتشغيل الخادم، وSupabase لقاعدة البيانات.
            ونرسل الفواتير إلى نظام الفوترة الوطني الأردني (جوفوترة) فقط إذا فعّل المحل هذه الميزة.
            لا نشارك البيانات مع أي جهة أخرى إلا إذا ألزمنا القانون بذلك.
          </p>
        </section>

        <section id="delete" className="mt-12 reveal scroll-mt-28">
          <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8">
            <H2>حذف حسابك وبياناتك</H2>
            <p className="text-muted text-[15.5px] mt-4 leading-[1.95]">
              يستطيع صاحب المحل طلب حذف حسابه وكل بيانات محلّه في أي وقت، عبر واتساب أو البريد الإلكتروني،
              مع ذكر اسم المحل والبريد المسجّل. نتحقّق من أن الطلب صادر من صاحب الحساب، ثم نحذف الحساب
              وبيانات المحل من خوادمنا خلال 30 يوماً. قد نحتفظ بالحدّ الأدنى من سجلات الفواتير التي يُلزمنا
              القانون الضريبي بالاحتفاظ بها، للمدة التي يفرضها فقط. البيانات المحفوظة على جهاز الكاشير
              تُحذف بإلغاء تثبيت التطبيق أو مسح بياناته من إعدادات الجهاز.
            </p>
            <p className="text-muted text-[15px] mt-3 leading-[1.85]">
              ولحذف بيانات زبون أو موظف بعينه دون حذف الحساب، يستطيع المحل فعل ذلك بنفسه من لوحة التحكم.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={waUrl(DELETE_MSG)}
                className="inline-flex items-center gap-2 bg-[var(--color-wa)] text-white font-bold text-[15px] rounded-xl px-6 py-3.5 no-underline hover:opacity-90 transition-opacity"
              >
                اطلب الحذف على واتساب
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("طلب حذف حساب Kairos POS")}`}
                className="inline-flex items-center gap-2 bg-surface border border-secondary text-text font-bold text-[15px] rounded-xl px-6 py-3.5 no-underline hover:border-primary/45 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </section>

        <section className="mt-12 reveal">
          <H2>الأطفال</H2>
          <p className="text-muted text-[15.5px] mt-4 leading-[1.95]">
            الخدمة أداة عمل للمحلات وغير موجّهة لمن هم دون 18 عاماً، ولا نجمع عن قصد بيانات أطفال.
          </p>
        </section>

        <section className="mt-12 reveal">
          <H2>التواصل والتعديلات</H2>
          <p className="text-muted text-[15.5px] mt-4 leading-[1.95]">
            لأي سؤال عن خصوصيتك: واتساب ({SUPPORT_HOURS}) أو {CONTACT_EMAIL}. إذا غيّرنا هذه السياسة نحدّث
            تاريخ «آخر تحديث» أعلى الصفحة، ونُعلم المشتركين بأي تغيير جوهري قبل تطبيقه.
          </p>
          <p className="text-[15px] mt-4">
            <Link href="/sla" className="text-primary font-bold no-underline hover:underline">
              التزامنا بالخدمة وملكية بياناتك ←
            </Link>
          </p>
        </section>

        {/* ملخّص إنجليزي لمراجعي المتاجر والزوّار غير العرب — يطابق النص العربي أعلاه. */}
        <section lang="en" dir="ltr" className="mt-14 mb-4 reveal text-left">
          <div className="bg-surface border border-secondary rounded-2xl p-7">
            <h2 className="text-[20px] font-extrabold">Privacy Policy — English summary</h2>
            <div className="text-muted text-[14.5px] mt-4 leading-[1.8] space-y-3">
              <p>
                Kairos Space POS is a point-of-sale service for subscribing businesses (web dashboard plus
                Windows and Android cashier apps). We collect: the owner&apos;s account email and business
                details; the business&apos;s own operational data (products, stock, sales, payments,
                shifts); staff names and hashed PINs; customer records the business enters itself (name,
                phone, notes, loyalty); and an app-generated device ID, device name and last-seen time.
              </p>
              <p>
                We use this data only to provide the service. It is sent over HTTPS and hosted with Railway
                (server) and Supabase (database). We do not sell or share it, show ads, or use third-party
                analytics. The Android cashier app uses internet/network, Wi-Fi state and wake lock (network
                printers) and Bluetooth connect (paired thermal printers) only — no camera, location,
                contacts or microphone.
              </p>
              <p>
                <b className="text-text">Account deletion:</b> request it via WhatsApp or {CONTACT_EMAIL}{" "}
                with your business name and registered email. We verify ownership and delete the account
                and business data within 30 days, except invoice records we must keep by tax law. The
                service is not directed at children under 18. Last updated: 24 November 2026.
              </p>
            </div>
          </div>
        </section>

        <div className="h-16" />
      </main>

      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
