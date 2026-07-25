import SignupForm from "@/components/SignupForm";
import { goUrl, TRIAL_DAYS } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/Icons";

// يحلّ محلّ LeadForm القديم.
//
// LeadForm كان يجمع اسماً ونشاطاً ورقماً ثم يفتح واتساب — أي أن الزائر يملأ
// نموذجاً كاملاً فلا يُسجَّل، بينما كل أزرار الصفحة الأخرى تقوده إلى التسجيل
// الذاتي. مسارَان متنافسان في صفحة واحدة. والأسوأ أنه كان يعرض «✓ تم الإرسال
// بنجاح!» بمجرد استدعاء window.open — فلو حجب المتصفح النافذة يظن الزائر أن
// طلبه وصل ولا يصل شيء.
//
// الحل: النموذج الحقيقي نفسه هنا، فيتحوّل الزائر في مكانه بلا نقلة إضافية.
// وواتساب يبقى مخرجاً ثانوياً لمن يفضّل البشر — رابطاً لا زراً.
export default function HomeSignup() {
  return (
    <section className="py-[70px] relative scroll-mt-[104px]" id="lead-form">
      <div className="max-w-[640px] mx-auto px-7 relative z-1">
        <div className="text-center mb-8 reveal">
          <span className="inline-block text-[13px] font-bold text-primary tracking-[1px] uppercase mb-3">
            ابدأ اليوم
          </span>
          <h2 className="text-[clamp(26px,3.5vw,36px)] font-black tracking-[-0.5px] leading-[1.3] mb-3">
            جرّب النظام <span className="num">{TRIAL_DAYS}</span> يوماً مجاناً
          </h2>
          <p className="text-[16px] text-muted">
            املأ النموذج ونفعّل حسابك ونرسل بيانات الدخول على بريدك — بلا بطاقة ائتمان.
          </p>
        </div>

        <div className="reveal">
          <SignupForm />
        </div>

        <p className="text-center text-[14px] text-muted mt-6 reveal">
          تفضّل تحكي مع حدا؟{" "}
          <a
            className="hit-44 inline-flex items-center gap-1.5 font-bold text-wa no-underline hover:underline align-middle"
            href={goUrl("hero")}
            target="_blank"
            rel="noopener"
          >
            <WhatsAppIcon className="w-4 h-4" />
            راسلنا على واتساب
          </a>
        </p>
      </div>
    </section>
  );
}
