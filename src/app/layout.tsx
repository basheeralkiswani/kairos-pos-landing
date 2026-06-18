import type { Metadata } from "next";
import { Tajawal, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-ar",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-en",
  display: "swap",
});

// الدومين المنشور — يُستخدم لتحويل صور الـOpenGraph إلى روابط مطلقة (واتساب/تويتر).
// غيّره بضبط NEXT_PUBLIC_SITE_URL عند الانتقال إلى الدومين الرسمي.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kairos-pos.com";

// معرّف Google Tag Manager — يُحمّل على كل الصفحات (بما فيها /thank-you)
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-MT2ZF278";

export const metadata: Metadata = {
  title: "نظام نقاط البيع للمطاعم والمقاهي في الأردن | Kairos Space POS",
  description:
    "نظام نقاط بيع متكامل للمطاعم والمقاهي والمتاجر في الأردن — متكامل مع نظام الفوترة الوطني (JoFotara). كاشير سريع، إدارة مخزون، تقارير لحظية، ودعم فني كامل.",
  keywords: [
    "نظام نقاط بيع",
    "POS",
    "كاشير",
    "مطاعم",
    "مقاهي",
    "الأردن",
    "إدارة مخزون",
    "تقارير مبيعات",
    "نظام الفوترة الوطني",
    "الفوترة الإلكترونية",
    "فاتورة إلكترونية الأردن",
    "JoFotara",
    "Kairos Space",
  ],
  authors: [{ name: "Kairos Space" }],
  creator: "Kairos Space",
  publisher: "Kairos Space",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_JO",
    url: siteUrl,
    siteName: "Kairos Space POS",
    title: "نظام نقاط البيع للمطاعم والمقاهي في الأردن | Kairos Space POS",
    description:
      "نظام نقاط بيع متكامل للمطاعم والمقاهي والمتاجر في الأردن. كاشير سريع، إدارة مخزون، تقارير لحظية، ودعم فني كامل.",
    images: [
      {
        url: "/images/shots/cashier.png",
        width: 1562,
        height: 943,
        alt: "Kairos Space POS - شاشة الكاشير",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "نظام نقاط البيع للمطاعم والمقاهي في الأردن | Kairos Space POS",
    description:
      "نظام نقاط بيع متكامل للمطاعم والمقاهي والمتاجر في الأردن. كاشير سريع، إدارة مخزون، تقارير لحظية، ودعم فني كامل.",
    images: ["/images/shots/cashier.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${inter.variable}`}>
      <head>
        {/* Google Tag Manager */}
        {GTM_ID && (
          <script
            id="gtm-head"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Kairos Space POS",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Windows",
              offers: [
                {
                  "@type": "Offer",
                  price: "100",
                  priceCurrency: "JOD",
                  name: "الاشتراك السنوي",
                  description: "سنة كاملة من الاستخدام الكامل",
                },
                {
                  "@type": "Offer",
                  price: "15",
                  priceCurrency: "JOD",
                  name: "الاشتراك الشهري",
                  description: "اشتراك شهري مرن",
                },
              ],
              description:
                "نظام نقاط بيع متكامل للمطاعم والمقاهي والمتاجر في الأردن",
              featureList: [
                "متكامل مع نظام الفوترة الوطني (JoFotara)",
                "كاشير فائق السرعة",
                "تقارير لحظية",
                "إدارة المخزون",
                "يعمل بدون إنترنت",
                "تصدير Excel",
                "صلاحيات وموظفون",
              ],
            }),
          }}
        />
      </head>
      <body className="font-[var(--font-ar)]">
        {/* Google Tag Manager (noscript) */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
