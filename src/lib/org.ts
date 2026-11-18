import { WA_NUMBER } from "@/lib/constants";

// كيان الشركة (Organization) للمحركات وأنظمة الذكاء الاصطناعي — 2026-11-18.
// السبب: اسم «Kairos Space» على الإنترنت يخلط بين نظام نقاط البيع ومقهى/مساحة عمل
// بالاسم نفسه (صفحة فيسبوك spacekairos، موقع kairosspace.co). هذا الكيان يقول صراحةً:
// Kairos Space POS = نظام نقاط بيع أردني، وهذه حساباته الرسمية.
// يُعلَن مرة واحدة على الصفحة الرئيسية (حيث توصي جوجل)، وباقي الصفحات تشير إليه بالـ@id.
// sameAs: أضف أي حساب رسمي **للنظام** (لا للمقهى) يؤكده المالك — يوتيوب، لينكدإن، تيك توك.
export const SITE_URL = "https://www.kairos-pos.com";
export const ORG_ID = `${SITE_URL}/#organization`;

export const ORG_SAME_AS = ["https://www.instagram.com/kairos.pos/"];

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Kairos Space POS",
    alternateName: ["Kairos POS", "كايروس سبيس", "كايروس لنقاط البيع"],
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      "Kairos Space POS is a Jordanian point-of-sale system for restaurants, cafés, supermarkets and shops — JoFotara e-invoicing, offline selling, inventory and multi-branch reporting. نظام نقاط بيع أردني للمطاعم والمقاهي والسوبرماركت والمحلات.",
    areaServed: { "@type": "Country", name: "Jordan" },
    address: { "@type": "PostalAddress", addressCountry: "JO" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${WA_NUMBER}`,
      contactType: "customer support",
      areaServed: "JO",
      availableLanguage: ["ar", "en"],
    },
    sameAs: ORG_SAME_AS,
  };
}
