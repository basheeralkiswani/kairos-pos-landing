import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import {
  DOWNLOAD_APK,
  DOWNLOAD_EXE,
  FALLBACK_VERSION,
  UPDATES_MANIFEST,
  WAITER_MIN_POS_VERSION,
  waUrl,
  WA_MESSAGES,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "تحميل النظام | Kairos Space POS",
  description:
    "حمّل نظام Kairos Space POS لويندوز مجاناً وابدأ تجربة 7 أيام، وحمّل تطبيق الويتر للأندرويد — روابط مباشرة بدون تسجيل.",
  alternates: { canonical: "/download" },
};

// الإصدار يُقرأ من نفس القناة التي تُحدّث أجهزة العملاء، فلا يتقادم الرقم هنا
// عند نشر نسخة جديدة. يُعاد التحقق كل ساعة، وأي تعذّر يسقط للاحتياطي بصمت.
export const revalidate = 3600;

async function liveVersion(): Promise<string> {
  try {
    const res = await fetch(UPDATES_MANIFEST, { next: { revalidate } });
    if (!res.ok) return FALLBACK_VERSION;
    const match = (await res.text()).match(/^version:\s*(.+)$/m);
    return match?.[1]?.trim() || FALLBACK_VERSION;
  } catch {
    return FALLBACK_VERSION;
  }
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-secondary rounded-2xl p-7 reveal">{children}</div>
  );
}

export default async function DownloadPage() {
  const version = await liveVersion();

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="glow w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_70%)] -top-[180px] -right-[120px] absolute" />
        <div className="glow w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(96,165,250,0.08),transparent_70%)] top-[50%] -left-[160px] absolute" />
      </div>

      <Navbar />

      <main className="max-w-[1240px] mx-auto px-7 relative z-1 pt-[130px]">
        <header className="text-center max-w-[720px] mx-auto reveal">
          <span className="inline-block text-[13px] font-bold text-primary border border-primary/30 bg-primary/8 rounded-full py-1.5 px-4">
            الإصدار <span className="num">{version}</span>
          </span>
          <h1 className="text-[clamp(30px,5vw,46px)] font-extrabold leading-[1.25] mt-5">
            حمّل <b className="text-primary">Kairos Space POS</b>
          </h1>
          <p className="text-muted text-[17px] mt-4">
            التحميل مباشر وبدون تسجيل. ثبّت النظام وشغّله، وابدأ تجربة مجانية 7 أيام —
            وبعد التثبيت يحدّث نفسه تلقائياً، فلن تحتاج العودة لهذه الصفحة.
          </p>
        </header>

        {/* ── بطاقتا التحميل ─────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card>
            <div className="text-primary text-[13px] font-bold">للكاشير · ويندوز</div>
            <h2 className="text-[24px] font-extrabold mt-2">نظام نقاط البيع</h2>
            <p className="text-muted text-[15px] mt-3 leading-[1.75]">
              البرنامج الكامل: الكاشير، المنتجات، المخزون، التقارير، والفوترة الوطنية.
              يعمل بدون إنترنت، ويزامن بياناتك للوحة التحكم حين يتوفّر الاتصال.
            </p>
            <a
              href={DOWNLOAD_EXE}
              className="mt-6 flex items-center justify-center bg-primary text-[#0a0a0c] py-4 px-6 rounded-xl font-bold text-[16px] no-underline transition-all duration-250 shadow-[0_6px_20px_-6px_rgba(212,175,55,0.5)] hover:bg-primary-soft hover:-translate-y-0.5"
            >
              تحميل لويندوز · <span className="num mx-1.5">84</span> ميجابايت
            </a>
            <dl className="mt-6 pt-5 border-t border-white/6 text-[14px] space-y-2.5">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">نظام التشغيل</dt>
                <dd className="font-medium">ويندوز <span className="num">10</span> أو <span className="num">11</span> (<span className="num">64</span>-bit)</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">الذاكرة</dt>
                <dd className="font-medium"><span className="num">4</span> جيجابايت فأكثر</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">المساحة</dt>
                <dd className="font-medium"><span className="num">500</span> ميجابايت</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">الإصدار</dt>
                <dd className="font-medium num">{version}</dd>
              </div>
            </dl>
          </Card>

          <Card>
            <div className="text-blue text-[13px] font-bold">للنادل · أندرويد</div>
            <h2 className="text-[24px] font-extrabold mt-2">تطبيق الويتر</h2>
            <p className="text-muted text-[15px] mt-3 leading-[1.75]">
              يأخذ النادل الطلب من الطاولة مباشرةً فيصل مطبوعاً إلى المطبخ. التطبيق يتصل
              بجهاز الكاشير على نفس شبكة الواي فاي — لا يحتاج إنترنت ولا حساباً منفصلاً.
            </p>
            <a
              href={DOWNLOAD_APK}
              className="mt-6 flex items-center justify-center bg-surface-2 border border-secondary text-text py-4 px-6 rounded-xl font-bold text-[16px] no-underline transition-all duration-250 hover:border-primary/50 hover:-translate-y-0.5"
            >
              تحميل APK · <span className="num mx-1.5">3</span> ميجابايت
            </a>
            <dl className="mt-6 pt-5 border-t border-white/6 text-[14px] space-y-2.5">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">نظام التشغيل</dt>
                <dd className="font-medium">أندرويد <span className="num">7</span> فأحدث</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">يتطلّب</dt>
                <dd className="font-medium">
                  الكاشير على <span className="num">{WAITER_MIN_POS_VERSION}</span> فأحدث
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">الشبكة</dt>
                <dd className="font-medium">نفس شبكة جهاز الكاشير</dd>
              </div>
            </dl>
          </Card>
        </div>

        {/* ── تحذير ويندوز عند التثبيت ───────────────────────────────── */}
        <section className="mt-14 reveal">
          <div className="bg-surface border border-primary/25 rounded-2xl p-7">
            <h2 className="text-[21px] font-extrabold">
              إذا ظهرت لك رسالة «<span className="text-primary">Windows protected your PC</span>»
            </h2>
            <p className="text-muted text-[15px] mt-3 leading-[1.85]">
              هذه رسالة اعتيادية يعرضها ويندوز لأي برنامج جديد لم يُحمَّل بعد آلاف المرات —
              وليست تحذيراً من فيروس. الملف يُقدَّم من خوادمنا مباشرةً ولا يمرّ بأي وسيط.
              لمتابعة التثبيت:
            </p>
            <ol className="mt-5 space-y-3 text-[15px]">
              {[
                "اضغط «More info» أو «مزيد من المعلومات» في الرسالة.",
                "اضغط «Run anyway» أو «تشغيل على أي حال».",
                "أكمل خطوات التثبيت المعتادة — لن تتكرّر الرسالة بعدها.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3.5 items-start">
                  <span className="num shrink-0 w-7 h-7 rounded-lg bg-primary/12 text-primary font-bold flex items-center justify-center text-[14px]">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-[13.5px] text-[#71717a] mt-6 pt-5 border-t border-white/6 leading-[1.8]">
              نعمل حالياً على استخراج شهادة توقيع رقمية تُزيل هذه الرسالة نهائياً. إن كنت
              تفضّل التأكد قبل التثبيت، راسلنا على واتساب ونثبّته معك خطوة بخطوة.
            </p>
          </div>
        </section>

        {/* ── بعد التثبيت ────────────────────────────────────────────── */}
        <section className="mt-14 reveal">
          <h2 className="text-[26px] font-extrabold text-center">بعد التثبيت بثلاث خطوات</h2>
          <div className="grid md:grid-cols-3 gap-5 mt-8">
            {[
              {
                n: "1",
                t: "شغّل البرنامج",
                d: "سيفتح على شاشة التفعيل. اختر «تفعيل سحابي» وأدخل بريد المالك وكلمة السر اللذين نرسلهما لك عند الاشتراك.",
              },
              {
                n: "2",
                t: "أدخل بيانات نشاطك",
                d: "اسم المحل والضريبة وشكل الفاتورة، ثم أضف منتجاتك يدوياً أو استوردها دفعة واحدة من ملف Excel.",
              },
              {
                n: "3",
                t: "ابدأ البيع",
                d: "افتح اليومية ثم الوردية، وابدأ. التحديثات تصلك تلقائياً وتُثبَّت عند إغلاق البرنامج.",
              },
            ].map((s) => (
              <div key={s.n} className="bg-surface border border-secondary rounded-2xl p-6">
                <span className="num inline-flex w-9 h-9 rounded-xl bg-primary/12 text-primary font-extrabold items-center justify-center text-[17px]">
                  {s.n}
                </span>
                <h3 className="font-bold text-[18px] mt-4">{s.t}</h3>
                <p className="text-muted text-[14.5px] mt-2.5 leading-[1.8]">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/docs" className="text-primary no-underline font-bold text-[15px] hover:underline">
              اقرأ دليل الاستخدام الكامل ←
            </Link>
          </div>
        </section>

        {/* ── مساعدة ─────────────────────────────────────────────────── */}
        <section className="mt-14 mb-4 reveal">
          <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-[22px] font-extrabold">واجهتك مشكلة في التحميل أو التثبيت؟</h2>
            <p className="text-muted text-[15px] mt-3">
              راسلنا على واتساب ونساعدك فوراً — أو ثبّتناه لك عن بُعد.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
              <a
                href={waUrl(WA_MESSAGES.download)}
                className="bg-primary text-[#0a0a0c] py-3.5 px-7 rounded-xl font-bold text-[15px] no-underline transition-all duration-250 hover:bg-primary-soft hover:-translate-y-0.5"
              >
                تواصل عبر واتساب
              </a>
              <Link
                href="/support"
                className="border border-secondary text-text py-3.5 px-7 rounded-xl font-bold text-[15px] no-underline transition-all duration-250 hover:border-primary/50"
              >
                صفحة الدعم الفني
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
