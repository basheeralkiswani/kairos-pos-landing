"use client";

import { useState } from "react";
import {
  BUSINESS_TYPES,
  SIGNUP_ENDPOINT,
  TRIAL_DAYS,
  WA_MESSAGES,
  waUrl,
} from "@/lib/constants";
import { trackSignupSubmit } from "@/components/Analytics";

// نموذج التسجيل الذاتي (Phase 6 §5). لا ينشئ حساباً مباشرة — يسجّل طلباً
// يراجعه الفريق ثم يُفعَّل الحساب وتصل بيانات الدخول بالبريد. هذا مقصود:
// النقطة الوحيدة المكشوفة على السحابة لا يجوز أن تنشئ مستأجرين بلا مراجعة.

const inputCls =
  "w-full bg-[rgba(255,255,255,0.04)] border border-secondary rounded-xl py-3 px-4 text-text text-[15px] placeholder:text-[#52525b] outline-none focus:border-primary/50 transition-colors";

const ERR_AR: Record<string, string> = {
  invalid_email: "البريد الإلكتروني غير صحيح",
  business_name_required: "اكتب اسم النشاط",
  too_many_requests: "وصلتنا عدة طلبات من هذا الجهاز — انتظر قليلاً ثم أعد المحاولة",
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        // بلا ترويسات مخصّصة: content-type وحده لا يستدعي preflight معقّداً.
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          business_name: businessName.trim(),
          owner_email: email.trim(),
          owner_name: ownerName.trim(),
          phone: phone.trim(),
          business_type: businessType,
          notes: notes.trim(),
          website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(ERR_AR[data?.error] ?? "تعذّر إرسال الطلب — حاول مجدداً أو راسلنا على واتساب");
        setBusy(false);
        return;
      }
      trackSignupSubmit({ business: businessName.trim() });
      setDone(true);
    } catch {
      // فشل الشبكة: لا نترك الزائر بلا مخرج — نوجّهه لواتساب.
      setError("لا يوجد اتصال بالإنترنت أو تعذّر الوصول للخادم — راسلنا على واتساب ونكمل معك");
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="bg-gradient-to-b from-[rgba(212,175,55,0.08)] to-[rgba(18,18,20,0.6)] border border-[rgba(212,175,55,0.2)] rounded-[24px] p-10 max-sm:p-6 text-center">
        <div className="text-[44px] mb-3">✅</div>
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
          className="inline-flex items-center justify-center gap-2.5 py-3.5 px-7 rounded-[13px] font-bold text-base bg-primary text-[#0a0a0c] hover:bg-primary-soft transition-all"
        >
          تواصل على واتساب
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[rgba(212,175,55,0.08)] to-[rgba(18,18,20,0.6)] border border-[rgba(212,175,55,0.2)] rounded-[24px] p-10 max-sm:p-6 relative overflow-hidden">
      <div className="absolute w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] top-[-150px] right-[-80px] blur-[30px]" />

      <form onSubmit={submit} className="flex flex-col gap-4 relative">
        <div>
          <label htmlFor="su-business" className="block text-[14px] font-semibold mb-2 text-[#d4d4d8]">
            اسم النشاط
          </label>
          <input
            id="su-business" type="text" required value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="مثال: سوبرماركت النور"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="su-type" className="block text-[14px] font-semibold mb-2 text-[#d4d4d8]">
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
          <label htmlFor="su-name" className="block text-[14px] font-semibold mb-2 text-[#d4d4d8]">
            اسم صاحب النشاط
          </label>
          <input
            id="su-name" type="text" required value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="أدخل اسمك الكامل"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="su-email" className="block text-[14px] font-semibold mb-2 text-[#d4d4d8]">
            البريد الإلكتروني
          </label>
          <input
            id="su-email" type="email" required dir="ltr" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`${inputCls} text-left`}
          />
          <p className="text-[12px] text-[#52525b] mt-1.5">
            هذا هو بريد الدخول للنظام وللوحة التحكم — تأكد من صحته.
          </p>
        </div>

        <div>
          <label htmlFor="su-phone" className="block text-[14px] font-semibold mb-2 text-[#d4d4d8]">
            رقم الهاتف
          </label>
          <input
            id="su-phone" type="tel" required dir="ltr" value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="07XXXXXXXX"
            className={`${inputCls} text-left`}
          />
        </div>

        <div>
          <label htmlFor="su-notes" className="block text-[14px] font-semibold mb-2 text-[#d4d4d8]">
            ملاحظات <span className="text-[#52525b] font-normal">(اختياري)</span>
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
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-[14px] py-3 px-4">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-2 w-full inline-flex items-center justify-center gap-2.5 py-4 px-7 rounded-[13px] font-bold text-base bg-primary text-[#0a0a0c] shadow-[0_10px_30px_-8px_rgba(212,175,55,0.55)] hover:bg-primary-soft hover:-translate-y-0.5 transition-all duration-250 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {busy ? "جارٍ الإرسال…" : `ابدأ التجربة المجانية ${TRIAL_DAYS} يوماً`}
        </button>

        <p className="text-center text-[12px] text-[#52525b] relative">
          بلا بطاقة ائتمان — ولا التزام.
        </p>
      </form>
    </div>
  );
}
