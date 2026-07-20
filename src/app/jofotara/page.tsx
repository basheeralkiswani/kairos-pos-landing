import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";
import { TRIAL_DAYS, waUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "جوفوترة: دليل نظام الفوترة الوطني للمطاعم والمتاجر في الأردن | Kairos Space",
  description:
    "ما هي جوفوترة (نظام الفوترة الوطني JoFotara)؟ من يجب أن يسجّل، كيف تربط نقطة البيع (الكاشير) بها، وكيف يصدر كايروس سبيس فواتير متوافقة تلقائياً — حتى بدون إنترنت.",
  keywords: [
    "جوفوترة",
    "JoFotara",
    "نظام الفوترة الوطني",
    "الفوترة الإلكترونية الأردن",
    "فاتورة إلكترونية الأردن",
    "نظام نقاط بيع متوافق مع جوفوترة",
    "ربط الكاشير بجوفوترة",
    "الفوترة الوطنية الأردن",
  ],
  alternates: { canonical: "/jofotara" },
  openGraph: {
    type: "article",
    locale: "ar_JO",
    url: "/jofotara",
    title: "جوفوترة: دليل نظام الفوترة الوطني للمطاعم والمتاجر في الأردن",
    description:
      "دليل عملي لنظام الفوترة الوطني (جوفوترة) في الأردن: من يجب أن يسجّل، كيف تربط الكاشير، وكيف يتكفّل كايروس سبيس بالتوافق تلقائياً.",
  },
};

// أقسام الصفحة — تُغذّي الفهرس الجانبي وروابط القفز (مفيدة للـUX وللـSEO).
const SECTIONS = [
  { id: "what", title: "ما هي جوفوترة؟" },
  { id: "mandatory", title: "هل جوفوترة إلزامية؟" },
  { id: "register", title: "كيف تسجّل في جوفوترة؟" },
  { id: "connect", title: "كيف تربط الكاشير بجوفوترة؟" },
  { id: "kairos", title: "كايروس سبيس وجوفوترة" },
  { id: "offline", title: "ماذا لو انقطع الإنترنت؟" },
  { id: "faq", title: "أسئلة شائعة عن جوفوترة" },
];

const FAQ = [
  {
    q: "ما هي جوفوترة بكلمات بسيطة؟",
    a: "جوفوترة هي منظومة الفوترة الوطنية في الأردن التابعة لدائرة ضريبة الدخل والمبيعات. تُصدِر فيها كل منشأة فواتيرها إلكترونياً وتُرسَل نسخة منها إلى المنظومة الحكومية لحظة البيع، بدل الفاتورة الورقية غير الموثّقة.",
  },
  {
    q: "هل جوفوترة إلزامية على مطعمي أو محلي؟",
    a: "نعم، أصبح التسجيل في منظومة الفوترة الوطنية إلزامياً على المنشآت في الأردن بشكل تدريجي. إن كنت غير متأكد من موعد إلزامك تحديداً، راجع دائرة ضريبة الدخل والمبيعات أو راسلنا لنوجّهك للخطوة الصحيحة.",
  },
  {
    q: "هل أحتاج برنامجاً خاصاً للفوترة الوطنية؟",
    a: "تحتاج نظام فوترة أو نقطة بيع مربوطاً مباشرة مع جوفوترة يصدر فواتير بالصيغة المعتمدة. كايروس سبيس مربوط معها أصلاً، فكل فاتورة تخرج منه تكون متوافقة تلقائياً دون برنامج منفصل أو خطوات يدوية.",
  },
  {
    q: "هل يعمل ربط جوفوترة بدون إنترنت؟",
    a: "البيع والفوترة يستمران بالكامل بدون إنترنت في كايروس سبيس. تُحفَظ الفاتورة على جهازك وتُرسَل إلى جوفوترة تلقائياً أول ما يعود الاتصال عبر نظام إرسال مؤجَّل، فلا تتوقف عن البيع ولا تفقد أي فاتورة.",
  },
  {
    q: "كم يستغرق ربط كايروس سبيس بجوفوترة؟",
    a: "بعد أن تكون بيانات ربطك في جوفوترة جاهزة، نُدخلها في النظام وقت التركيب ويبدأ إصدار الفواتير المتوافقة في نفس اليوم. نتكفّل بالإعداد معك خطوة بخطوة.",
  },
];

const CTA_MSG =
  "مرحباً 👋 عندي استفسار عن ربط نظام نقاط البيع مع جوفوترة (الفوترة الوطنية).";

export default function JofotaraPage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "جوفوترة: دليل نظام الفوترة الوطني للمطاعم والمتاجر في الأردن",
    inLanguage: "ar",
    about: "نظام الفوترة الوطني في الأردن (جوفوترة)",
    author: { "@type": "Organization", name: "Kairos Space" },
    publisher: { "@type": "Organization", name: "Kairos Space" },
    description:
      "دليل عملي لنظام الفوترة الوطني (جوفوترة) في الأردن وكيفية ربط نقطة البيع به.",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="glow w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_70%)] -top-[180px] -right-[120px] absolute" />
        <div className="glow w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(23,138,88,0.07),transparent_70%)] top-[55%] -left-[160px] absolute" />
      </div>

      <Navbar />

      <main className="max-w-[1240px] mx-auto px-7 relative z-1 pt-[130px]">
        <header className="text-center max-w-[760px] mx-auto reveal">
          <div className="text-primary text-[13px] font-bold tracking-wide">
            الفوترة الوطنية في الأردن
          </div>
          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-[1.22] mt-2">
            جوفوترة: دليل نظام الفوترة <b className="text-primary">الوطني</b> للمطاعم والمتاجر
          </h1>
          <p className="text-muted text-[17px] mt-5 leading-[1.85]">
            <b className="text-text">جوفوترة</b> (JoFotara) هي منظومة الفوترة الوطنية
            التي أصبحت إلزامية على المنشآت في الأردن. في هذا الدليل نشرح ما هي، ومن
            يجب أن يسجّل، وكيف تربط نقطة البيع (الكاشير) بها — وكيف يصدر كايروس سبيس
            فواتير متوافقة قانونياً تلقائياً، حتى لو انقطع الإنترنت.
          </p>
        </header>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10 mt-14">
          {/* ── فهرس جانبي ─────────────────────────────────────────── */}
          <nav className="hidden lg:block" aria-label="محتويات الدليل">
            <div className="sticky top-[110px] bg-surface border border-secondary rounded-2xl p-5">
              <div className="text-[13px] font-bold text-primary mb-3">المحتويات</div>
              <ul className="space-y-1.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-muted no-underline text-[14px] leading-[1.7] block py-1 hover:text-primary transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* ── المحتوى ────────────────────────────────────────────── */}
          <div className="space-y-12 min-w-0">
            <section id="what" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">ما هي جوفوترة؟</h2>
              <p className="text-muted text-[15.5px] mt-3 leading-[1.95]">
                جوفوترة هي منظومة الفوترة الوطنية التابعة لدائرة ضريبة الدخل
                والمبيعات في الأردن. الفكرة ببساطة: بدل الفاتورة الورقية غير
                الموثّقة، تُصدِر كل منشأة فواتيرها إلكترونياً وتُرسَل نسخة منها إلى
                المنظومة الحكومية لحظة البيع. هذا يوثّق مبيعاتك رسمياً ويوحّد شكل
                الفاتورة الضريبية عبر السوق.
              </p>
              <p className="text-muted text-[15.5px] mt-3 leading-[1.95]">
                عملياً، يعني هذا أن نظام نقاط البيع (الكاشير) الذي تستخدمه يجب أن
                يكون قادراً على إصدار الفاتورة بالصيغة المعتمدة وإرسالها إلى جوفوترة
                — وهنا يأتي دور نظام متوافق مثل كايروس سبيس.
              </p>
            </section>

            <section id="mandatory" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">هل جوفوترة إلزامية؟ ومن يجب أن يسجّل؟</h2>
              <p className="text-muted text-[15.5px] mt-3 leading-[1.95]">
                نعم. أصبح التسجيل في منظومة الفوترة الوطنية إلزامياً على المنشآت في
                الأردن بشكل تدريجي، ويشمل ذلك المطاعم والكافيهات والسوبرماركتات
                والمتاجر. الالتزام لا يقتصر على التسجيل فحسب، بل يشمل إصدار كل فاتورة
                بيع بالصيغة المعتمدة وإرسالها للمنظومة.
              </p>
              <div className="bg-surface border border-secondary rounded-2xl px-6 py-5 mt-5">
                <h3 className="font-bold text-[16.5px] text-text">كيف تعرف موعد إلزامك؟</h3>
                <p className="text-muted text-[14.5px] mt-2 leading-[1.9]">
                  يُطبَّق الإلزام على مراحل بحسب نوع المنشأة وحجمها. للتأكد من موعدك
                  تحديداً، راجع دائرة ضريبة الدخل والمبيعات، أو راسلنا ونوجّهك للخطوة
                  الصحيحة حسب حالتك.
                </p>
              </div>
            </section>

            <section id="register" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">كيف تسجّل في جوفوترة؟</h2>
              <p className="text-muted text-[15.5px] mt-3 leading-[1.95]">
                التسجيل يتم عبر البوابة الرسمية لدائرة ضريبة الدخل والمبيعات. الخطوات
                العامة:
              </p>
              <div className="mt-6 space-y-3">
                {[
                  {
                    t: "١ · سجّل منشأتك في البوابة",
                    d: "أنشئ حساب منشأتك في منظومة الفوترة الوطنية وأدخل بيانات السجل التجاري والرقم الضريبي.",
                  },
                  {
                    t: "٢ · احصل على بيانات الربط",
                    d: "تمنحك المنظومة بيانات الربط (مفاتيح التفعيل) التي تُستخدم لربط نظام نقاط البيع بجوفوترة.",
                  },
                  {
                    t: "٣ · اربط نظام نقاط البيع",
                    d: "أدخل بيانات الربط في نظامك المتوافق ليبدأ إرسال الفواتير تلقائياً. في كايروس سبيس نتكفّل بهذه الخطوة معك.",
                  },
                ].map((step) => (
                  <div
                    key={step.t}
                    className="bg-surface border border-secondary rounded-2xl px-6 py-5"
                  >
                    <h3 className="font-bold text-[16.5px] text-text">{step.t}</h3>
                    <p className="text-muted text-[14.5px] mt-2 leading-[1.85]">{step.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="connect" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">كيف تربط نقطة البيع (الكاشير) بجوفوترة؟</h2>
              <p className="text-muted text-[15.5px] mt-3 leading-[1.95]">
                الربط لا يحتاج برنامجاً منفصلاً إن كان نظام نقاط البيع لديك متوافقاً
                مع جوفوترة. بعد إدخال بيانات الربط مرة واحدة، يتولّى النظام كل شيء
                خلف الكواليس: تكوين الفاتورة بالصيغة المطلوبة، إرسالها للمنظومة،
                واستلام تأكيد التوثيق — كل ذلك في ثوانٍ ودون أي خطوة يدوية من الكاشير.
              </p>
            </section>

            <section id="kairos" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">كايروس سبيس وجوفوترة: التوافق تلقائي</h2>
              <p className="text-muted text-[15.5px] mt-3 leading-[1.95]">
                كايروس سبيس مبنيّ أصلاً للسوق الأردني ومربوط مباشرة مع منظومة الفوترة
                الوطنية. ما الذي يعنيه هذا لك عملياً:
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "كل فاتورة بيع تصدر متوافقة قانونياً تلقائياً — بلا برنامج إضافي.",
                  "لا خطوات يدوية على الكاشير: الإرسال والتوثيق يحدثان في الخلفية.",
                  "نتكفّل بإعداد بيانات الربط معك وقت التركيب.",
                  "الفواتير تُرسَل تلقائياً حتى لو انقطع الإنترنت مؤقتاً (إرسال مؤجَّل).",
                  "تحديثات مستمرة تواكب أي تغيّر في متطلبات المنظومة.",
                ].map((n) => (
                  <li
                    key={n}
                    className="flex gap-3 items-start text-[14.5px] text-text leading-[1.85]"
                  >
                    <span className="text-green shrink-0 mt-0.5">✓</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waUrl(CTA_MSG)}
                  className="inline-flex items-center gap-2 bg-[var(--color-wa)] text-white font-bold text-[15px] rounded-xl px-6 py-3.5 no-underline hover:opacity-90 transition-opacity"
                >
                  استفسر عن ربط جوفوترة عبر واتساب
                </a>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-surface border border-secondary text-text font-bold text-[15px] rounded-xl px-6 py-3.5 no-underline hover:border-primary/45 transition-colors"
                >
                  ابدأ تجربة مجانية {TRIAL_DAYS} يوماً
                </Link>
              </div>
            </section>

            <section id="offline" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">ماذا لو انقطع الإنترنت؟</h2>
              <p className="text-muted text-[15.5px] mt-3 leading-[1.95]">
                هذا سؤال جوهري في الأردن حيث لا يخلو يوم من تذبذب الشبكة. في كايروس
                سبيس، البيع والفوترة يستمران بالكامل دون إنترنت: تُحفَظ الفاتورة على
                جهازك، وتدخل قائمة انتظار إرسال إلى جوفوترة، وتُرسَل تلقائياً أول ما
                يعود الاتصال. النتيجة: لا تتوقف عن البيع، ولا تفقد أي فاتورة، وتبقى
                متوافقاً مع المنظومة دون أن تنتبه أصلاً لانقطاع الشبكة.
              </p>
            </section>

            <section id="faq" className="scroll-mt-[110px] reveal">
              <h2 className="text-[26px] font-extrabold">أسئلة شائعة عن جوفوترة</h2>
              <div className="mt-6 space-y-3">
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
                    <p className="text-muted text-[14.5px] mt-4 leading-[1.9]">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* روابط داخلية ختامية */}
            <div className="bg-gradient-to-l from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8 reveal">
              <h2 className="text-[22px] font-extrabold">جاهز تصدر فواتير متوافقة مع جوفوترة؟</h2>
              <p className="text-muted text-[15px] mt-3 leading-[1.85]">
                كايروس سبيس يتكفّل بالتوافق تلقائياً حتى تركّز على محلك. اطّلع على{" "}
                <Link href="/#features" className="text-primary font-bold no-underline hover:underline">
                  مزايا النظام
                </Link>
                ، أو{" "}
                <Link href="/download" className="text-primary font-bold no-underline hover:underline">
                  حمّل النظام مباشرة
                </Link>
                ، أو{" "}
                <Link href="/signup" className="text-primary font-bold no-underline hover:underline">
                  ابدأ تجربتك المجانية
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="h-16" />
      </main>

      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
