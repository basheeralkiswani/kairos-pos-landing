"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
// ملاحظة: Google Tag Manager يُحمَّل من src/app/layout.tsx (الوسم الرسمي في <head> و<body>).

export function Analytics() {
  return (
    <>
      {/* Google Analytics 4 */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

    </>
  );
}

// Tracking helper — يدفع الحدث إلى dataLayer (GTM) و gtag (GA4) إن وُجد
function pushEvent(event: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
  if (w.gtag) w.gtag("event", event, params);
}

export function trackWhatsAppClick(label: string) {
  pushEvent("whatsapp_click", { event_category: "engagement", event_label: label });
}

export function trackFormSubmit(formData: { name: string; business: string }) {
  pushEvent("lead_form_submit", {
    event_category: "conversion",
    event_label: formData.business,
    value: 1,
  });
}
