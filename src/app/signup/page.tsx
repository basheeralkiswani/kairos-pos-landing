import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import SignupForm from "@/components/SignupForm";
import { TRIAL_DAYS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "ابدأ تجربتك المجانية | Kairos Space POS",
  description:
    `سجّل نشاطك وابدأ تجربة مجانية ${TRIAL_DAYS} يوماً على نظام Kairos Space POS — بلا بطاقة ائتمان وبلا التزام. نراجع طلبك ونرسل بيانات الدخول بالبريد.`,
  alternates: { canonical: "/signup" },
};

const STEPS = [
  {
    n: "١",
    t: "املأ النموذج",
    d: "اسم النشاط وبريدك ورقمك — أقل من دقيقة.",
  },
  {
    n: "٢",
    t: "نراجع الطلب ونفعّل حسابك",
    d: "يصلك بريد فيه بيانات الدخول وتاريخ انتهاء التجربة، عادةً خلال ساعات العمل.",
  },
  {
    n: "٣",
    t: "حمّل البرنامج وابدأ البيع",
    d: "ثبّت النظام، اختر «تفعيل سحابي»، وأدخل بريدك — ويشتغل المحل.",
  },
];

export default function SignupPage() {
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
            ابدأ تجربتك <b className="text-primary">المجانية</b>
          </h1>
          <p className="text-muted text-[17px] mt-4 leading-[1.9]">
            سجّل نشاطك وجرّب النظام كاملاً <span className="num">{TRIAL_DAYS}</span> يوماً —
            بلا بطاقة ائتمان وبلا التزام. كل الميزات مفتوحة خلال التجربة.
          </p>
        </header>

        {/* ── كيف تسير الأمور ─────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-surface border border-secondary rounded-2xl p-7 reveal">
              <div className="num text-primary text-[28px] font-black">{s.n}</div>
              <h2 className="text-[19px] font-extrabold mt-2">{s.t}</h2>
              <p className="text-muted text-[14.5px] mt-2.5 leading-[1.75]">{s.d}</p>
            </div>
          ))}
        </div>

        {/* ── النموذج ─────────────────────────────────────────────────── */}
        <section className="max-w-[640px] mx-auto mt-14 reveal">
          <SignupForm />
        </section>

        {/* ── طمأنة ───────────────────────────────────────────────────── */}
        <section className="max-w-[720px] mx-auto mt-14 mb-24 text-center reveal">
          <div className="bg-surface border border-secondary rounded-2xl p-8">
            <h2 className="text-[20px] font-extrabold">وماذا بعد التجربة؟</h2>
            <p className="text-muted text-[15px] mt-3 leading-[1.9]">
              لا شيء يُحذف ولا يتوقف شيء فجأة. قبل انتهاء التجربة نتواصل معك، وإن قررت
              المتابعة تكمل على بياناتك نفسها. تفاصيل الأسعار على{" "}
              <a href="/#pricing" className="text-primary no-underline hover:underline">
                صفحة الأسعار
              </a>
              ، والدليل الكامل على{" "}
              <Link href="/docs" className="text-primary no-underline hover:underline">
                صفحة الشرح
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
