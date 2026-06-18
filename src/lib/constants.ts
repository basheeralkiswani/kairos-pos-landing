export const WA_NUMBER = "962788606428";

export function waUrl(msg: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// رابط صفحة التحويل الوسيطة (تُستخدم كـ"عنوان تحويل" في Google Ads)،
// تعرض رسالة تأكيد ثم تحوّل المستخدم إلى واتساب.
export function goUrl(src: keyof typeof WA_MESSAGES): string {
  return `/thank-you?src=${src}`;
}

export const WA_MESSAGES = {
  hero: "مرحباً 👋 بدي أبدأ تجربة Kairos Space POS المجانية لمدة 7 أيام — بدون التزام.",
  cta: "مرحباً 👋 بدي أبدأ تجربة Kairos Space POS المجانية لمدة 7 أيام — بدون التزام.",
  float: "مرحباً 👋 بدي أبدأ تجربة Kairos Space POS المجانية لمدة 7 أيام — بدون التزام.",
  annual: "مرحباً 👋 بدي أشترك بنظام Kairos Space POS — الباقة السنوية (100 دينار / سنة).",
  monthly: "مرحباً 👋 بدي أشترك بنظام Kairos Space POS — الباقة الشهرية (15 دينار/شهر + تفعيل 15 دينار).",
} as const;

export const GALLERY_SHOTS = [
  { key: "cashier", title: "شاشة الكاشير", desc: "إضافة المنتجات للطلب بنقرة، تطبيق الخصومات، وإتمام الدفع نقداً أو بطاقة أو محفظة بسرعة.", src: "/images/shots/cashier.png", alt: "شاشة الكاشير في Kairos Space POS" },
  { key: "overview", title: "لوحة التحكم", desc: "إيرادات ومصاريف وصافي ربح وعدد الطلبات، مع منحنى مبيعات وقائمة المنتجات الأكثر طلباً — تتحدّث تلقائياً.", src: "/images/shots/overview.png", alt: "لوحة التحكم" },
  { key: "products", title: "إدارة المنتجات", desc: "أضف وعدّل منتجاتك وأسعارها وصورها وتصنيفاتها من مكان واحد.", src: "/images/shots/products.png", alt: "إدارة المنتجات" },
  { key: "categories", title: "إدارة التصنيفات", desc: "نظّم قائمتك بتصنيفات مخصصة، وانقل المنتجات بينها بسهولة.", src: "/images/shots/categories.png", alt: "إدارة التصنيفات" },
  { key: "inventory", title: "إدارة المخزون", desc: "سجّل فواتير الموردين بدقة، وتتبّع الكميات الفعلية لحظياً مع حساب المصاريف.", src: "/images/shots/inventory.png", alt: "إدارة المخزون" },
  { key: "orders", title: "سجل الطلبات", desc: "تصفّح وأعد طباعة أي طلب سابق، وفلتر حسب التاريخ، وصدّر إلى Excel.", src: "/images/shots/orders.png", alt: "سجل الطلبات" },
] as const;
