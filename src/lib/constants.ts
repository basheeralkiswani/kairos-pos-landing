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

// ── الباقات (نظام الباقات 2026-07-25) ────────────────────────────────────────
// ثلاث باقات بميزات متدرّجة، شهري أو سنوي فقط — لا خيار 6 أشهر بعد اليوم
// (قاعدة البيانات نفسها تقبل monthly|yearly فقط).
//
// ⚠️ مصدر الحقيقة الفعلي هو جدول `plans` في السحابة
// (cloud/schema-plans.sql في مستودع الـ POS). هذه نسخة ثابتة للعرض التسويقي —
// أي تعديل سعر أو نقل ميزة من لوحة المزوّد يجب أن يُحدَّث هنا يدوياً أيضاً،
// وإلا انحرف الموقع عن الفوترة الحقيقية.
//
// `features` = متاحة فعلاً اليوم. `soon` = على خارطة الطريق ولم تُطلق بعد،
// وتُعرض موسومة «قريباً» — لا نَعِد الزائر بما لا يعمل الآن.
export type PlanKey = "starter" | "business" | "enterprise";

export const PLANS = [
  {
    key: "starter" as PlanKey,
    title: "ستارتر",
    monthly: 9,
    yearly: 80,
    tagline: "لمحل واحد يبدأ بالأساسيات كاملة.",
    devices: "جهاز واحد",
    branches: "فرع واحد",
    features: [
      "الكاشير والمبيعات والمرتجعات",
      "المنتجات والفئات والعملاء والموردين",
      "المخزون الأساسي والمشتريات",
      "التقارير الأساسية",
      "شاشة العميل",
      "ربط جوفوترة والعمل بدون إنترنت",
      "نسخ احتياطي محلي وتحديثات مجانية",
      "دعم فني عبر واتساب والهاتف",
    ],
    soon: [],
  },
  {
    key: "business" as PlanKey,
    title: "بزنس",
    monthly: 14,
    yearly: 120,
    tagline: "لمحل يريد متابعة أعماله من أي مكان.",
    devices: "حتى 3 أجهزة",
    branches: "فرع واحد",
    popular: true,
    features: [
      "كل ما في ستارتر",
      "المزامنة السحابية",
      "لوحة المالك من الجوال والويب",
      "تطبيق المدير",
      "مستخدمون وصلاحيات",
      "إدارة الطاولات",
      "إدارة الأجهزة",
      "نسخ احتياطي سحابي",
      "سجل النشاط والإشعارات",
      "تصدير Excel و PDF",
      "دعم فني بالأولوية",
    ],
    soon: ["API أساسي"],
  },
  {
    key: "enterprise" as PlanKey,
    title: "إنتربرايز",
    monthly: 18,
    yearly: 160,
    tagline: "لأكثر من فرع وفريق عمل كامل.",
    devices: "حتى 10 أجهزة",
    branches: "حتى 10 فروع",
    features: [
      "كل ما في بزنس",
      "تعدد الفروع بتقارير مجمّعة",
      "تطبيق الويتر على التابلت",
      "التقارير المتقدمة",
      "الصلاحيات المتقدمة",
      "الوصول المبكر للميزات الجديدة",
    ],
    soon: ["شاشة المطبخ KDS", "QR Menu والطلب الذاتي", "تطبيق التوصيل", "API كامل و Webhooks"],
  },
] as const;

// أرخص سعر شهري — يظهر في الهيرو وصفحات المقارنة («ابدأ من …»).
export const PRICE_FROM = Math.min(...PLANS.map((p) => p.monthly));

export const WA_MESSAGES = {
  hero: `مرحباً 👋 بدي أبدأ تجربة Kairos Space POS المجانية لمدة ${TRIAL_DAYS} يوم — بدون التزام.`,
  cta: `مرحباً 👋 بدي أبدأ تجربة Kairos Space POS المجانية لمدة ${TRIAL_DAYS} يوم — بدون التزام.`,
  float: `مرحباً 👋 بدي أبدأ تجربة Kairos Space POS المجانية لمدة ${TRIAL_DAYS} يوم — بدون التزام.`,
  starter: "مرحباً 👋 بدي أشترك بنظام Kairos Space POS — باقة ستارتر.",
  business: "مرحباً 👋 بدي أشترك بنظام Kairos Space POS — باقة بزنس.",
  enterprise: "مرحباً 👋 بدي أشترك بنظام Kairos Space POS — باقة إنتربرايز.",
  // مفاتيح قديمة: إعلانات منشورة قد تحمل ?src=monthly|annual|semiannual.
  // تبقى لتردّ رسالة معقولة بدل التراجع لرسالة التجربة — بلا ذكر أسعار قديمة.
  monthly: "مرحباً 👋 بدي أشترك بنظام Kairos Space POS — اشتراك شهري.",
  annual: "مرحباً 👋 بدي أشترك بنظام Kairos Space POS — اشتراك سنوي.",
  semiannual: "مرحباً 👋 بدي أستفسر عن اشتراك Kairos Space POS والباقات المتاحة.",
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
