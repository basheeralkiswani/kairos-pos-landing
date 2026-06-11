# Kairos Space POS — Landing Page

صفحة هبوط احترافية لنظام نقاط البيع **Kairos Space POS** للمطاعم والمقاهي والمتاجر في الأردن.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)

## 🚀 التشغيل

```bash
# تثبيت الحزم
npm install

# تشغيل بيئة التطوير
npm run dev

# بناء المشروع للإنتاج
npm run build

# تشغيل الإنتاج
npm run start
```

## 📁 هيكل المشروع

```
src/
├── app/
│   ├── globals.css          # الأنماط العامة + Tailwind
│   ├── layout.tsx           # التخطيط الرئيسي + SEO + JSON-LD
│   ├── page.tsx             # الصفحة الرئيسية
│   ├── sitemap.ts           # خريطة الموقع
│   └── robots.ts            # ملف robots.txt
├── components/
│   ├── Analytics.tsx         # GA4 + GTM + تتبع الأحداث
│   ├── Navbar.tsx            # شريط التنقل الثابت
│   ├── Hero.tsx              # القسم الرئيسي مع laptop mockup
│   ├── Trust.tsx             # شريط الثقة
│   ├── Features.tsx          # المميزات (6 ميزات)
│   ├── Gallery.tsx           # معرض لقطات النظام التفاعلي
│   ├── LeadForm.tsx          # نموذج التقاط العملاء المحتملين
│   ├── Pricing.tsx           # باقات الأسعار
│   ├── CtaBand.tsx           # شريط الدعوة للإجراء
│   ├── Footer.tsx            # تذييل الصفحة
│   ├── WhatsAppFloat.tsx     # زر واتساب العائم
│   ├── RevealObserver.tsx    # مراقب الظهور التدريجي
│   └── Icons.tsx             # أيقونات SVG
└── lib/
    └── constants.ts          # الثوابت (أرقام واتساب، رسائل، بيانات المعرض)
```

## ⚙️ Environment Variables

انسخ `.env.example` إلى `.env.local` وأضف القيم:

```bash
cp .env.example .env.local
```

| المتغير | الوصف |
|---------|-------|
| `NEXT_PUBLIC_GA_ID` | معرّف Google Analytics 4 |
| `NEXT_PUBLIC_GTM_ID` | معرّف Google Tag Manager |

## 🔍 SEO

- ✅ Meta Title & Description
- ✅ Open Graph Tags
- ✅ Twitter Cards
- ✅ Dynamic Sitemap (`/sitemap.xml`)
- ✅ Dynamic Robots (`/robots.txt`)
- ✅ Schema.org SoftwareApplication JSON-LD

## 📊 Analytics & Tracking

- Google Analytics 4
- Google Tag Manager
- تتبع ضغطات واتساب
- تتبع إرسال نموذج Lead Form

## 🚀 النشر على Vercel

1. اربط الـ Repository بـ [Vercel](https://vercel.com/new)
2. أضف Environment Variables في لوحة Vercel
3. اضغط **Deploy**

## 📄 الترخيص

© 2026 Kairos Space POS — جميع الحقوق محفوظة
