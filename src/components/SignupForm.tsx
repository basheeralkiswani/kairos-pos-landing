"use client";

import { useRef, useState } from "react";
import {
  BUSINESS_TYPES,
  SIGNUP_ENDPOINT,
  TRIAL_DAYS,
  WA_MESSAGES,
  waUrl,
} from "@/lib/constants";
import { trackSignupSubmit } from "@/components/Analytics";

// نموذج التسجيل الذاتي. لا ينشئ حساباً مباشرة — يسجّل طلباً يراجعه الفريق ثم
// يُفعَّل الحساب وتصل بيانات الدخول بالبريد. هذا مقصود: النقطة الوحيدة المكشوفة
// على السحابة لا يجوز أن تنشئ مستأجرين بلا مراجعة.
//
// ⚠️ الوجهة تغيّرت (2026-08-20) من دالة Edge على مشروع Supabase القديم إلى
// `app.kairos-pos.com/api/web/signup-request`. حقل `website` أدناه مصيدة بوتات
// يفهمها الخادم الجديد كما فهمها القديم.

const inputCls = "field";

const ERR_AR: Record<string, string> = {
  // رموز نقطة Kairos Web الجديدة (/api/web/signup-request).
  email_invalid: "البريد الإلكتروني غير صحيح",
  store_name_required: "اكتب اسم النشاط",
  phone_required: "اكتب رقم هاتف نتواصل عليه",
  too_many_requests: "وصلتنا عدة طلبات من هذا الجهاز — انتظر قليلاً ثم أعد المحاولة",
  could_not_save: "تعذّر إرسال الطلب الآن — راسلنا على واتساب ونكمل معك",
  // رموز الدالة القديمة، مُبقاة حتى تنتهي أي نسخة مخبّأة من الصفحة عند الزوّار.
  invalid_email: "البريد الإلكتروني غير صحيح",
  business_name_required: "اكتب اسم النشاط",
  server_error: "تعذّر إرسال الطلب الآن — راسلنا على واتساب ونكمل معك",
};

export default function SignupForm() {
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("supermarket");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // مصيدة البوتات — مخفية عن البشر
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);

  // بعد فشل الإرسال ينتقل التركيز إلى رسالة الخطأ: مستخدم قارئ الشاشة كان
  // يبقى على الزر بلا أي إشعار بأن شيئاً حدث.
  const failWith = (msg: string) => {
    setError(msg);
    setBusy(false);
    requestAnimationFrame(() => errorRef.current?.focus());
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        // ⚠️ لا تظنّ أن content-type وحده يُعفي من الـpreflight — جسم JSON ليس
        // طلباً «بسيطاً»، فالمتصفّح يرسل OPTIONS أولاً دائماً. الخادم يسمح لأصل
        // هذا الموقع صراحةً؛ ولا يُرسَل أي مفتاح أو كوكي من هنا.
        headers: { "content-type": "application/json" },
        // أسماء الحقول هي عقد نقطة Kairos Web، لا أسماء الدالة القديمة.
        body: JSON.stringify({
          store_name: businessName.trim(),
          owner_name: ownerName.trim(),
          owner_email: email.trim(),
          phone: phone.trim(),
          business_type: businessType,
          note: notes.trim(),
          source: "landing",
          website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        failWith(ERR_AR[data?.error] ?? "تعذّر إرسال الطلب — حاول مجدداً أو راسلنا على واتساب");
        return;
      }
      trackSignupSubmit({ business: businessName.trim() });
      setDone(true);
    } catch {
      // فشل الشبكة: لا نترك الزائر بلا مخرج — نوجّهه لواتساب.
      failWith("لا يوجد اتصال بالإنترنت أو تعذّر الوصول للخادم — راسلنا على واتساب ونكمل معك");
    }
  };

  if (done) {
    return (
      <div className="bg-surface border border-[rgba(168,128,26,0.28)] rounded-[24px] shadow-[0_30px_60px_-35px_rgba(60,45,12,0.45)] p-10 max-sm:p-6 text-center">
        <div className="w-[64px] h-[64px] mx-auto mb-4 rounded-full bg-[rgba(23,138,88,0.1)] border border-[rgba(23,138,88,0.35)] flex items-center justify-center"><svg viewBox="0 0 24 24" className="w-8 h-8 text-green" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
        <h2 className="text-[clamp(20px,3vw,28px)] font-black mb-3">استلمنا طلبك</h2>
        <p className="text-[15px] text-muted leading-[1.9] mb-6">
          أرسلنا تأكيداً إلى <span dir="ltr" className="text-text">{email.trim()}</span>.
          سيراجع فريقنا الطلب ويصلك بريد فيه بيانات الدخول وتفعيل تجربتك المجانية
          لمدة <span className="num">{TRIAL_DAYS}</span> يوماً — عادةً خلال ساعات العمل.
        </p>
        <p className="text-[14px] text-muted mb-6">
          مستعجل؟ راسلنا على واتساب ونفعّل حسابك فوراً.
        </p>
        <a
          href={waUrl(WA_MESSAGES.hero)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa"
        >
          تواصل على واتساب
        </a>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-[rgba(168,128,26,0.28)] rounded-[24px] shadow-[0_30px_60px_-35px_rgba(60,45,12,0.45)] p-10 max-sm:p-6 relative overflow-hidden">
      <div className="absolute w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] top-[-150px] right-[-80px] blur-[30px]" />

      <form onSubmit={submit} className="flex flex-col gap-4 relative">
        <div>
          <label htmlFor="su-business" className="block text-[14px] font-semibold mb-2 text-text">
            اسم النشاط
          </label>
          <input
            id="su-business" type="text" required value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="مثال: سوبرماركت النور"
            autoComplete="organization"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="su-type" className="block text-[14px] font-semibold mb-2 text-text">
            نوع النشاط
          </label>
          <select
            id="su-type" value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className={inputCls}
          >
            {BUSINESS_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="su-name" className="block text-[14px] font-semibold mb-2 text-text">
            اسم صاحب النشاط
          </label>
          <input
            id="su-name" type="text" required value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="أدخل اسمك الكامل"
            autoComplete="name"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="su-email" className="block text-[14px] font-semibold mb-2 text-text">
            البريد الإلكتروني
          </label>
          <input
            id="su-email" type="email" required dir="ltr" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email" inputMode="email"
            className={`${inputCls} text-left`}
          />
          <p className="text-[12px] text-muted mt-1.5">
            هذا هو بريد الدخول للنظام وللوحة التحكم — تأكد من صحته.
          </p>
        </div>

        <div>
          <label htmlFor="su-phone" className="block text-[14px] font-semibold mb-2 text-text">
            رقم الهاتف
          </label>
          <input
            id="su-phone" type="tel" required dir="ltr" value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="07XXXXXXXX"
            autoComplete="tel" inputMode="tel"
            className={`${inputCls} text-left`}
          />
        </div>

        <div>
          <label htmlFor="su-notes" className="block text-[14px] font-semibold mb-2 text-text">
            ملاحظات <span className="text-muted font-normal">(اختياري)</span>
          </label>
          <textarea
            id="su-notes" rows={3} value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="عدد الفروع، عدد الأجهزة، أي متطلبات خاصة…"
            className={`${inputCls} resize-y`}
          />
        </div>

        {/* مصيدة البوتات: مخفية بصرياً وعن قارئات الشاشة، ولا يملؤها إلا آلي */}
        <div className="absolute opacity-0 -z-10 pointer-events-none" aria-hidden="true">
          <label htmlFor="su-website">Website</label>
          <input
            id="su-website" type="text" tabIndex={-1} autoComplete="off"
            value={website} onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {error && (
          <div
            ref={errorRef}
            tabIndex={-1}
            role="alert"
            aria-live="assertive"
            className="rounded-xl border border-red-800/40 bg-red-50 text-red-900 text-[15px] py-3 px-4"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="btn-gold mt-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {busy ? "جارٍ الإرسال…" : `ابدأ التجربة المجانية ${TRIAL_DAYS} يوماً`}
        </button>

        <p className="text-center text-[12px] text-muted relative">
          بلا بطاقة ائتمان — ولا التزام.
        </p>
      </form>
    </div>
  );
}
