// src/app/en/page.tsx — the English entry point.
//
// WHY THIS EXISTS. Every page on this site is Arabic and the document is lang="ar".
// Google decides a page's language from its CONTENT, so no amount of metadata was ever
// going to surface the Arabic homepage for "pos system jordan" or "jofotara integration".
// English visibility needs English text on the page — this is that page.
//
// It is deliberately NOT a translation of the homepage. A thin mirror of an existing page
// is what Google calls a doorway, and those get demoted rather than ranked. This is a
// standalone page that answers the questions an English-language searcher actually has
// (is it JoFotara compliant, does it work in Arabic, what happens when the internet drops)
// and links to the Arabic site for everything else.
//
// It also does NOT reuse Navbar/Footer: those are Arabic and RTL, and half-Arabic chrome
// on an English page reads as broken to the visitor and as mixed-language to the crawler.
// The wrapper carries lang="en" dir="ltr" to override the RTL root (the app router lets
// only the ROOT layout render <html>, so the override has to live here).
import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL, WA_NUMBER, PRICE_FROM, TRIAL_DAYS, CLIENT_COUNT } from "@/lib/constants";

const SITE = "https://www.kairos-pos.com";

export const metadata: Metadata = {
  title: "POS System in Jordan — JoFotara-Ready | Kairos Space POS",
  description:
    "Cloud point-of-sale for restaurants, cafés and shops in Jordan. Integrated with JoFotara e-invoicing, keeps selling when the internet drops, multi-branch reporting, full Arabic interface.",
  keywords: [
    "POS system Jordan", "point of sale Jordan", "restaurant POS Amman",
    "JoFotara POS", "JoFotara integration", "e-invoicing Jordan",
    "cloud POS Middle East", "Arabic POS system", "cafe POS Jordan",
    "supermarket POS Jordan", "multi branch POS",
  ],
  alternates: {
    canonical: "/en",
    languages: { "ar-JO": "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_JO",
    url: `${SITE}/en`,
    siteName: "Kairos Space POS",
    title: "POS System in Jordan — JoFotara-Ready | Kairos Space POS",
    description:
      "Cloud point-of-sale for restaurants, cafés and shops in Jordan. JoFotara e-invoicing, offline-tolerant selling, multi-branch reporting, Arabic-first interface.",
    images: [{ url: "/images/shots/cashier.png", width: 1917, height: 867, alt: "Kairos Space POS cashier screen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "POS System in Jordan — JoFotara-Ready | Kairos Space POS",
    description: "Cloud point-of-sale for restaurants, cafés and shops in Jordan. JoFotara-ready, works through internet outages.",
    images: ["/images/shots/cashier.png"],
  },
};

// Real questions from real sales conversations. FAQPage markup earns the expandable
// results in Google — but only when the answers on the page match the markup exactly,
// so both are generated from this one array.
const FAQ = [
  {
    q: "Is Kairos integrated with JoFotara?",
    a: "Yes. Invoices are submitted to Jordan's national e-invoicing system (JoFotara) directly from the point of sale, and failed submissions are queued and retried rather than silently dropped.",
  },
  {
    q: "What happens when the internet goes down?",
    a: "The till keeps selling. Sales are recorded locally and pushed to the cloud automatically once the connection returns, so a line outage never stops the shop or loses a receipt.",
  },
  {
    q: "Does it support Arabic?",
    a: "Arabic is the primary interface, right-to-left throughout, including printed receipts and kitchen tickets. English is available as well.",
  },
  {
    q: "Can I run more than one branch?",
    a: "Yes. Each branch keeps its own inventory and sales while the owner dashboard reports across all of them, either combined or branch by branch.",
  },
  {
    q: "What hardware do I need?",
    a: "Any Windows PC or Android tablet, plus a thermal receipt printer and a barcode scanner if you sell packaged goods. Existing hardware usually works — there is nothing proprietary to buy.",
  },
  {
    q: "How is it priced?",
    a: `Plans start from ${PRICE_FROM} JOD per month, with a ${TRIAL_DAYS}-day free trial and no card required. Extra branches and extra tills are priced per unit on top of the base plan.`,
  },
];

const CAPABILITIES = [
  {
    t: "Sells through outages",
    d: "The register works from local data and syncs to the cloud when the line returns. An internet problem becomes an inconvenience for you, not a closed shop for your customers.",
  },
  {
    t: "JoFotara e-invoicing",
    d: "Built for Jordan's national e-invoicing mandate. Invoices are submitted from the point of sale, with a retry queue so nothing is lost to a bad connection.",
  },
  {
    t: "Multi-branch by design",
    d: "Separate inventory per branch, one consolidated view for the owner. Adding a branch seeds its full catalogue so its first sale draws down a real stock row.",
  },
  {
    t: "Owner dashboard anywhere",
    d: "Sales, stock, costs and staff activity from any browser — no VPN, no installed client, no waiting until you are back at the shop.",
  },
  {
    t: "Inventory that reflects reality",
    d: "Recipes and modifiers deduct real ingredients, purchases update real costs, and expiry and low-stock views tell you what to act on today.",
  },
  {
    t: "Staff and permissions",
    d: "Per-cashier logins, per-role permissions, shift reports and an activity log — so you can see who did what, and limit what each person can do.",
  },
];

export default function EnglishPage() {
  const wa = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hello 👋 I would like to know more about Kairos Space POS."
  )}`;

  return (
    <div lang="en" dir="ltr" className="min-h-screen font-[var(--font-en)]">
      {/* FAQPage + SoftwareApplication, in English, for the English URL. Separate from the
          Arabic JSON-LD in the root layout — one page, one language, one description. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "Kairos Space POS",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Windows, Android, Web",
                inLanguage: ["ar", "en"],
                url: `${SITE}/en`,
                description:
                  "Cloud point-of-sale for restaurants, cafés and shops in Jordan, integrated with JoFotara e-invoicing and tolerant of internet outages.",
                offers: {
                  "@type": "Offer",
                  price: String(PRICE_FROM),
                  priceCurrency: "JOD",
                  description: `Plans from ${PRICE_FROM} JOD/month with a ${TRIAL_DAYS}-day free trial`,
                },
                areaServed: { "@type": "Country", name: "Jordan" },
              },
              {
                "@type": "FAQPage",
                mainEntity: FAQ.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          }),
        }}
      />

      {/* ── header ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-secondary bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-5 h-[72px] flex items-center justify-between gap-4">
          <Link href="/en" className="text-[19px] font-extrabold text-text no-underline tracking-tight">
            Kairos <span className="text-primary">Space</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-4">
            <Link
              href="/"
              hrefLang="ar"
              className="text-[14px] font-semibold text-muted hover:text-primary no-underline px-2 py-2 transition-colors"
            >
              العربية
            </Link>
            <a
              href={APP_URL}
              className="hidden sm:inline-flex text-[14px] font-semibold text-muted hover:text-primary no-underline px-2 py-2 transition-colors"
            >
              Sign in
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-gold !py-[10px] !px-[18px] !text-[14px] whitespace-nowrap">
              Talk to us
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-5">
        {/* ── hero ─────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24">
          <p className="text-[13px] font-bold tracking-[0.14em] uppercase text-primary mb-4">
            Point of sale · Jordan
          </p>
          <h1 className="text-[clamp(32px,5.5vw,52px)] font-black leading-[1.15] text-text max-w-[18ch]">
            The POS that keeps selling when the internet stops.
          </h1>
          <p className="text-[17px] sm:text-[19px] text-muted leading-[1.85] mt-6 max-w-[60ch]">
            Kairos Space POS runs restaurants, cafés and shops across Jordan — integrated with{" "}
            <strong className="text-text font-semibold">JoFotara</strong> e-invoicing, Arabic-first,
            and built so a dropped connection never becomes a closed till. Used by{" "}
            <span className="num">{CLIENT_COUNT}</span> businesses today.
          </p>
          <div className="flex flex-wrap gap-3 mt-9">
            <Link href="/signup" className="btn-gold">
              Start a {TRIAL_DAYS}-day free trial
            </Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Ask a question on WhatsApp
            </a>
          </div>
          <p className="text-[13px] text-muted mt-4">
            No credit card. Plans from <span className="num">{PRICE_FROM}</span> JOD/month.
          </p>
        </section>

        {/* ── capabilities ─────────────────────────────────────────────────── */}
        <section className="py-14 border-t border-secondary">
          <h2 className="text-[clamp(24px,3.5vw,34px)] font-black text-text mb-3">
            What it actually does
          </h2>
          <p className="text-muted text-[16px] leading-[1.85] max-w-[62ch] mb-10">
            Not a feature list — the six things shop owners tell us made the difference.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {CAPABILITIES.map((c) => (
              <div key={c.t} className="bg-surface border border-secondary rounded-[18px] p-6">
                <h3 className="text-[17px] font-bold text-text mb-2">{c.t}</h3>
                <p className="text-[15px] text-muted leading-[1.85]">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── how it works ─────────────────────────────────────────────────── */}
        <section className="py-14 border-t border-secondary">
          <h2 className="text-[clamp(24px,3.5vw,34px)] font-black text-text mb-10">
            Getting started takes a day, not a project
          </h2>
          <ol className="grid gap-6 sm:grid-cols-3 list-none p-0">
            {[
              { n: "1", t: "Tell us about your shop", d: "One short conversation: what you sell, how many branches, how many tills." },
              { n: "2", t: "We set up your account", d: "Your catalogue is imported from a spreadsheet, your branches and staff are created, your till is linked." },
              { n: "3", t: "You start selling", d: "Train a cashier in under an hour. We stay on WhatsApp through your first week." },
            ].map((s) => (
              <li key={s.n}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 text-primary font-black flex items-center justify-center mb-4 num">
                  {s.n}
                </div>
                <h3 className="text-[17px] font-bold text-text mb-2">{s.t}</h3>
                <p className="text-[15px] text-muted leading-[1.85]">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── faq ──────────────────────────────────────────────────────────── */}
        <section className="py-14 border-t border-secondary">
          <h2 className="text-[clamp(24px,3.5vw,34px)] font-black text-text mb-10">
            Questions we get asked
          </h2>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group bg-surface border border-secondary rounded-[16px] px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-[16px] font-bold text-text">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-primary text-[22px] leading-none transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="text-[15px] text-muted leading-[1.9] mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── cta ──────────────────────────────────────────────────────────── */}
        <section className="py-16 border-t border-secondary">
          <div className="bg-[var(--color-dark)] rounded-[24px] p-10 sm:p-12 text-center">
            <h2 className="text-[clamp(22px,3.2vw,30px)] font-black text-white mb-3">
              See it running on your own products
            </h2>
            <p className="text-white/70 text-[16px] leading-[1.85] max-w-[52ch] mx-auto mb-8">
              Send us your product list and we will set up a live account you can actually sell
              from — no slides, no obligation.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/signup" className="btn-gold">Start free trial</Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wa">WhatsApp us</a>
            </div>
          </div>
        </section>
      </main>

      {/* ── footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-secondary py-10">
        <div className="max-w-[1100px] mx-auto px-5 flex flex-wrap items-center justify-between gap-4 text-[14px]">
          <p className="text-muted">© Kairos Space — point of sale for Jordan.</p>
          <nav className="flex flex-wrap items-center gap-5">
            <Link href="/" hrefLang="ar" className="text-muted hover:text-primary no-underline">
              الموقع بالعربية
            </Link>
            <Link href="/jofotara" className="text-muted hover:text-primary no-underline">JoFotara</Link>
            <Link href="/support" className="text-muted hover:text-primary no-underline">Support</Link>
            <a href={APP_URL} className="text-muted hover:text-primary no-underline">Sign in</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
