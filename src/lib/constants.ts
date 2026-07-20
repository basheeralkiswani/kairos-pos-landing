export const WA_NUMBER = "962788606428";

export function waUrl(msg: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// رابط صفحة التحويل الوسيطة (تُستخدم كـ"عنوان تحويل" في Google Ads)،
// تعرض رسالة تأكيد ثم تحوّل المستخدم إلى واتساب.
export function goUrl(src: keyof typeof WA_MESSAGES): string {
  return `/thank-you?src=${src}`;
}

// مدة التجربة المجانية — **مصدر واحد للحقيقة عبر الموقع كله**. كانت مكرّرة
// كرقم حرفي في 8 مواضع فانحرفت عن الواقع (الموقع يعد بـ7 والتزويد يمنح 14).
// أي تغيير هنا يسري على الرسائل والصفحات معاً. يجب أن يطابق `provision`
// و`signup-manage` في مستودع الـ POS.
export const TRIAL_DAYS = 14;

// الأسعار — مصدر واحد للحقيقة (قرار المالك 2026-07-20): 15 شهري ·
// 70 نصف سنوي · 140 سنوي، بلا رسوم تفعيل. تُغذّي البطاقات والرسائل معاً.
export const PRICES = { monthly: 15, semiannual: 70, annual: 140 } as const;

export const WA_MESSAGES = {
  hero: `مرحباً 👋 بدي أبدأ تجربة Kairos Space POS المجانية لمدة ${TRIAL_DAYS} يوم — بدون التزام.`,
  cta: `مرحباً 👋 بدي أبدأ تجربة Kairos Space POS المجانية لمدة ${TRIAL_DAYS} يوم — بدون التزام.`,
  float: `مرحباً 👋 بدي أبدأ تجربة Kairos Space POS المجانية لمدة ${TRIAL_DAYS} يوم — بدون التزام.`,
  annual: `مرحباً 👋 بدي أشترك بنظام Kairos Space POS — الباقة السنوية (${PRICES.annual} دينار / سنة).`,
  semiannual: `مرحباً 👋 بدي أشترك بنظام Kairos Space POS — باقة 6 أشهر (${PRICES.semiannual} دينار).`,
  monthly: `مرحباً 👋 بدي أشترك بنظام Kairos Space POS — الباقة الشهرية (${PRICES.monthly} دينار/شهر).`,
  download: "مرحباً 👋 حمّلت النظام وبدي مساعدة بالتثبيت أو التفعيل.",
  support: "مرحباً 👋 بحتاج مساعدة فنية بنظام Kairos Space POS.",
} as const;

// ── التحميل المباشر (Phase 5) ────────────────────────────────────────────────
// الملفات تُقدَّم من Cloudflare R2 عبر download.kairos-pos.com، ويرفعها
// `npm run release` في مستودع الـ POS. الرابط الثابت `Kairos-Setup.exe` يشير
// دائماً إلى آخر إصدار، فلا حاجة لتحديث الموقع مع كل نشرة.
export const DOWNLOAD_BASE = "https://download.kairos-pos.com";
export const DOWNLOAD_EXE = `${DOWNLOAD_BASE}/Kairos-Setup.exe`;
export const DOWNLOAD_APK = `${DOWNLOAD_BASE}/KairosWaiter.apk`;
export const DOWNLOAD_CASHIER_APK = `${DOWNLOAD_BASE}/KairosCashier.apk`;
export const UPDATES_MANIFEST = "https://updates.kairos-pos.com/latest.yml";

// احتياطي يُعرض إن تعذّر قراءة الإصدار الحيّ من قناة التحديث وقت البناء.
export const FALLBACK_VERSION = "1.12.0";

// أقل إصدار POS يعمل معه تطبيق الويتر (متطلبات السيرفر وصلت في 1.11.0).
export const WAITER_MIN_POS_VERSION = "1.11.0";

// أقل إصدار POS يعمل معه تابلت الكاشير الثاني (بوابة الاقتران وصلت في 1.14.0).
export const CASHIER_MIN_POS_VERSION = "1.14.0";

export const SUPPORT_HOURS = "السبت – الخميس، 9 صباحاً – 9 مساءً";

// ── التسجيل الذاتي (Phase 6) ─────────────────────────────────────────────────
// النموذج ينادي دالة `signup` على Supabase. الدالة معلَّمة verify_jwt=false،
// فلا تحتاج ترويسة apikey إطلاقاً — والموقع لا يحمل أي مفتاح نتيجة لذلك.
// (إرسال apikey كان يفرض preflight فيرفضه المتصفح؛ تُرك بلا ترويسات مخصّصة.)
export const SIGNUP_ENDPOINT =
  "https://zpgzcdmbxvnlejsgmedk.supabase.co/functions/v1/signup";


export const BUSINESS_TYPES = [
  { value: "supermarket", label: "سوبرماركت / بقالة" },
  { value: "coffee", label: "كوفي شوب" },
  { value: "restaurant", label: "مطعم" },
  { value: "fastfood", label: "وجبات سريعة" },
] as const;

export const GALLERY_SHOTS = [
  { key: "cashier", title: "شاشة الكاشير", desc: "إضافة المنتجات للطلب بنقرة، تطبيق الخصومات، وإتمام الدفع نقداً أو بطاقة أو محفظة بسرعة.", src: "/images/shots/cashier.png", alt: "شاشة الكاشير في Kairos Space POS" },
  { key: "overview", title: "لوحة التحكم", desc: "إيرادات ومصاريف وصافي ربح وعدد الطلبات، مع منحنى مبيعات وقائمة المنتجات الأكثر طلباً — تتحدّث تلقائياً.", src: "/images/shots/overview.png", alt: "لوحة التحكم في Kairos Space POS" },
  { key: "orders", title: "سجل الطلبات", desc: "تصفّح وأعد طباعة أي طلب سابق، وفلتر حسب التاريخ أو الكاشير أو قناة البيع، وصدّر إلى Excel.", src: "/images/shots/orders.png", alt: "سجل الطلبات في Kairos Space POS" },
  { key: "purchases", title: "المشتريات والمخزون", desc: "سجّل فواتير الموردين ومدخلات المخزون بدقة، وتتبّع إجمالي المشتريات وعدد الفواتير في أي فترة.", src: "/images/shots/purchases.png", alt: "المشتريات وإدارة المخزون" },
  { key: "suppliers", title: "حسابات الموردين", desc: "تابع الذمم الدائنة لكل مورّد، سجّل الدفعات لتسويتها، واعرف إجمالي المستحق عليك بضغطة.", src: "/images/shots/suppliers.png", alt: "حسابات الموردين والذمم الدائنة" },
  { key: "waiter", title: "أجهزة الويتر", desc: "خلّي الويترية يدخلوا طلبات الطاولات من تابلت عبر شبكة الواي فاي — تصل للمطبخ فوراً.", src: "/images/shots/waiter.png", alt: "تطبيق الويتر على التابلت" },
] as const;
