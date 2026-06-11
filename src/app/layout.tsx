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

export const metadata: Metadata = {
  title: "نظام نقاط البيع للمطاعم والمقاهي في الأردن | Kairos Space POS",
  description:
    "نظام نقاط بيع متكامل للمطاعم والمقاهي والمتاجر في الأردن. كاشير سريع، إدارة مخزون، تقارير لحظية، ودعم فني كامل.",
  keywords: [
    "نظام نقاط بيع",
    "POS",
    "كاشير",
    "مطاعم",
    "مقاهي",
    "الأردن",
    "إدارة مخزون",
    "تقارير مبيعات",
    "Kairos Space",
  ],
  authors: [{ name: "Kairos Space" }],
  creator: "Kairos Space",
  publisher: "Kairos Space",
  metadataBase: new URL("https://kairosspace.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_JO",
    url: "https://kairosspace.com",
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
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "150",
              },
              featureList: [
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
