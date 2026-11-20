// /en/best-pos-jordan — English twin of /best-pos-jordan (2026-11-18).
// Many people ask ChatGPT in English ("best POS system in Jordan"); the site had one English
// page. Same editorial rules as the Arabic guide:
//   - NO competitor names (owner decision 2026-11-18: legal risk + free advertising).
//     System "kinds" are described in hedged, general terms ("often", "some").
//   - Kairos claims only what works today; limits are stated plainly.
//   - Support hours are Sat–Thu — never imply Friday cover.
// Kairos numbers derive from PLANS. Update UPDATED/UPDATED_ISO together with the Arabic page.
import type { Metadata } from "next";
import Link from "next/link";
import { EnHeader, EnFooter, enWaUrl } from "@/components/EnChrome";
import { CLIENT_COUNT, PLANS, TRIAL_DAYS } from "@/lib/constants";
import { ORG_ID, SITE_URL } from "@/lib/org";

const UPDATED = "November 2026";
const PUBLISHED_ISO = "2026-11-18";
const UPDATED_ISO = "2026-11-20"; // new price sheet (decision of 2026-11-20)
const [BASIC, BIZ, FULL] = PLANS;
const PLAN_EN: Record<string, string> = { starter: "Basic", business: "Business", enterprise: "Complete" };
const DEVICES_EN: Record<string, string> = { starter: "1 device", business: "up to 3 devices", enterprise: "up to 10 devices" };

export const metadata: Metadata = {
  title: "Best POS System in Jordan (2026) — How to Choose a Cashier System | Kairos Space POS",
  description:
    "A practical 2026 guide to choosing a point-of-sale system in Jordan: JoFotara e-invoicing, selling without internet, the real yearly cost in JOD, hardware, and what restaurants, cafés and supermarkets need — and how Kairos Space POS answers each question.",
  keywords: [
    "best POS system Jordan",
    "POS system Jordan",
    "cashier system Jordan",
    "restaurant POS Jordan",
    "supermarket POS Jordan",
    "JoFotara POS",
    "offline POS Jordan",
    "POS price Jordan",
  ],
  alternates: {
    canonical: "/en/best-pos-jordan",
    languages: { "ar-JO": "/best-pos-jordan", en: "/en/best-pos-jordan", "x-default": "/best-pos-jordan" },
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    alternateLocale: "ar_JO",
    url: `${SITE_URL}/en/best-pos-jordan`,
    siteName: "Kairos Space POS",
    title: "Best POS System in Jordan (2026) — How to Choose",
    description:
      "Six questions that decide your POS in Jordan: JoFotara, offline selling, yearly cost in JOD, hardware, business type and support.",
  },
};

const CRITERIA = [
  {
    t: "Is it integrated with JoFotara?",
    d: "Jordan's national e-invoicing system has become mandatory for businesses in phases. Ask whether invoices go to JoFotara from the till itself or through a separate program or subscription — and what happens to an invoice if the internet drops at the moment of sale.",
    k: "Integrated directly from the till; every invoice is issued compliant. Offline invoices are stored and submitted automatically when the connection returns.",
  },
  {
    t: "Does it keep selling without internet?",
    d: "A dropped connection at peak hour means a queue that stops moving. Some systems stop completely; others allow offline selling only on higher tiers.",
    k: "Selling, printing and stock keep working offline on every plan, and everything syncs automatically when the line is back.",
  },
  {
    t: "What will you really pay per year?",
    d: "Add up the monthly fee × 12, setup fees and every add-on you actually need (kitchen display, branches, devices, users). Is the price in JOD or USD? Is it published at all, or \"on quote\"?",
    k: `A published price in JOD: ${BASIC.price} / ${BIZ.price} / ${FULL.price} for the first year with a ready tablet, then ${BASIC.renewal} / ${BIZ.renewal} / ${FULL.renewal} a year, fixed for two years — no setup fee; each extra branch is ${FULL.extraBranchPrice} JOD a year.`,
  },
  {
    t: "What hardware does it run on?",
    d: "Some systems require an iPad or hardware they sell, which adds hundreds of dinars before your first sale.",
    k: "Every plan comes with a set-up tablet in the first year, and the system also runs on a Windows laptop or PC, with common thermal receipt printers. No iPad needed.",
  },
  {
    t: "Does it fit your type of business?",
    d: "A restaurant needs tables, a kitchen display and recipes that deduct stock. A supermarket needs barcodes, weighed items and thousands of products. Ask about what you need, not the length of the feature list.",
    k: "Restaurants and cafés: tables, KDS, QR menu and recipes. Supermarkets and shops: barcodes, weighed items, Excel import and a tax rate per product.",
  },
  {
    t: "Who supports you, and in which language?",
    d: "Arabic support from a team in Jordan, clear hours, and setup and training on day one matter more than any feature when the printer stops mid-shift.",
    k: "A Jordanian team on WhatsApp in Arabic (Saturday–Thursday, 9 am–9 pm); setup and training are included with every plan.",
  },
];

const KINDS = [
  {
    t: "Free or low-cost cashier apps on a phone",
    fit: "A very small shop that wants to start at the lowest possible cost.",
    watch: "Many don't mention JoFotara integration, and the add-ons that matter are often billed monthly in USD.",
  },
  {
    t: "Cloud restaurant systems built for large chains",
    fit: "A restaurant chain with many branches and heavy delivery-app volume.",
    watch: "Pricing is often on quote rather than published, specific hardware may be required, and the monthly fee grows with every branch and add-on.",
  },
  {
    t: "Accounting / ERP systems with a POS module",
    fit: "A business whose first priority is accounting, warehouses and HR.",
    watch: "The POS isn't the core product; offline selling is sometimes reserved for higher tiers, and pricing is often per user.",
  },
  {
    t: "Software installed on your machine by a local vendor",
    fit: "Someone who wants a vendor to come and install everything.",
    watch: "Ask about updates and their cost, who owns your data, and whether you can follow your shop from your phone while you're away.",
  },
];

const ASK_VENDOR = [
  "What is the full amount I will pay in the first year, with everything I need?",
  "Is JoFotara integrated from inside the till? What happens to the invoice during an outage?",
  "Can I sell offline on the plan I'm buying — not just on a higher tier?",
  "Does it run on my current hardware, or must I buy new equipment?",
  "Can I export all my data if I stop, and what happens to it?",
  "Who answers if the printer stops mid-shift, and during which hours?",
  "Can I try it free on my own shop before paying?",
];

const FAQ = [
  {
    q: "What is the best POS system in Jordan?",
    a: `The best one is the one that fits your business and budget — on three non-negotiable conditions: direct JoFotara integration, selling that doesn't stop when the internet drops, and a clear yearly cost in JOD. Kairos Space POS is a Jordanian point-of-sale system built on those three for restaurants, cafés, supermarkets and shops: from ${BASIC.price} JOD for the first year with a ready tablet, and used today by ${CLIENT_COUNT} businesses in Jordan.`,
  },
  {
    q: "How much does a POS system cost in Jordan?",
    a: `It varies widely: free or very cheap apps for tiny shops, monthly subscriptions that grow with devices and branches, and systems that only give a price on quote. Always calculate the full yearly cost with add-ons. Kairos Space POS publishes its price: ${BASIC.price} JOD (Basic), ${BIZ.price} JOD (Business), ${FULL.price} JOD (Complete) for the first year with a tablet, then renewal from ${BASIC.renewal} JOD a year, fixed for two years, with no setup fee.`,
  },
  {
    q: "Does my POS need to be integrated with JoFotara?",
    a: "JoFotara, Jordan's national e-invoicing system, has become mandatory for businesses in phases, and a till that submits invoices directly saves you entering each one by hand. Make sure the integration is inside the system itself and check how it handles invoices during an internet outage. Kairos Space POS is integrated directly and submits queued invoices automatically.",
  },
  {
    q: "Is there a POS in Jordan that works without internet?",
    a: "Yes. Kairos Space POS keeps selling, printing and tracking stock offline on every plan; invoices are stored on the device, then submitted to JoFotara and synced automatically when the connection returns.",
  },
  {
    q: "What is the best POS for restaurants and cafés in Jordan?",
    a: `Look for table management, a kitchen display (KDS), a QR menu with self-ordering, recipes that deduct stock automatically, and JoFotara. In Kairos Space POS all of that is in the Business plan (${BIZ.price} JOD a year, up to 3 devices), together with the owner app on your phone.`,
  },
  {
    q: "What is the best POS for supermarkets in Jordan?",
    a: "A supermarket needs fast barcode lookup, weighed items, importing thousands of products from Excel, a tax rate per product and accurate stock — and a till that never stops when the internet does, because the queue won't wait. Kairos Space POS supports all of it.",
  },
  {
    q: "Can I try it before paying?",
    a: `Yes — a full ${TRIAL_DAYS}-day free trial on your own device with your own products, no credit card and no commitment.`,
  },
];

export default function BestPosJordanEnPage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best POS System in Jordan (2026): How to Choose a Cashier System",
    inLanguage: "en",
    datePublished: PUBLISHED_ISO,
    dateModified: UPDATED_ISO,
    author: { "@type": "Organization", "@id": ORG_ID, name: "Kairos Space POS", url: SITE_URL },
    publisher: { "@type": "Organization", "@id": ORG_ID, name: "Kairos Space POS", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/en/best-pos-jordan`,
    description:
      "A guide to choosing a point-of-sale system in Jordan: JoFotara e-invoicing, offline selling, yearly cost in JOD, hardware and business type.",
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div lang="en" dir="ltr" className="min-h-screen font-[var(--font-en)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <EnHeader arabicHref="/best-pos-jordan" />

      <main className="max-w-[920px] mx-auto px-5">
        <section className="pt-14 sm:pt-20">
          <p className="text-[13px] font-bold tracking-[0.14em] uppercase text-primary mb-4">
            2026 guide · updated {UPDATED}
          </p>
          <h1 className="text-[clamp(30px,5vw,48px)] font-black leading-[1.15] text-text">
            Best POS system in Jordan (2026): how to choose
          </h1>
          <p className="text-[17px] text-muted leading-[1.85] mt-5 max-w-[66ch]">
            How to pick the right cashier system for your restaurant, café or shop: six questions that
            settle the decision, the kinds of systems you’ll find on the market and who each one suits,
            and what to ask any vendor before you sign.
          </p>
          <p className="text-[13px] text-muted leading-[1.8] mt-5 bg-surface border border-secondary rounded-xl px-4 py-3">
            In fairness: this guide is written by the team behind <strong className="text-text">Kairos Space POS</strong>,
            a Jordanian point-of-sale system used today by <span className="num">{CLIENT_COUNT}</span> businesses. We
            answer each question with what our system does today, and say plainly when it isn’t the right fit.
          </p>
        </section>

        {/* ── short answer ───────────────────────────────────────────────── */}
        <section className="mt-12" aria-labelledby="short">
          <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-2xl p-7">
            <h2 id="short" className="text-[22px] font-extrabold">The short answer</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-[1.85] text-text list-disc pl-5">
              <li>
                <strong>Three non-negotiables in Jordan:</strong> direct JoFotara integration, selling that doesn’t stop
                when the internet drops, and a clear full-year cost in JOD.
              </li>
              <li>
                <strong>For a Jordanian restaurant, café, supermarket or shop</strong> that wants all three at a clear yearly
                cost: <strong className="text-primary">Kairos Space POS</strong> — from {BASIC.price} JOD for the first year with a tablet,
                with a {TRIAL_DAYS}-day free trial.
              </li>
              <li>
                <strong>Before you sign with any vendor:</strong> ask for the full first-year number in writing, and test
                the system during a real rush hour.
              </li>
            </ul>
          </div>
        </section>

        {/* ── criteria ───────────────────────────────────────────────────── */}
        <section className="mt-12" aria-labelledby="criteria">
          <h2 id="criteria" className="text-[26px] font-extrabold">Six questions that decide your POS</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {CRITERIA.map((c, i) => (
              <div key={c.t} className="bg-surface border border-secondary rounded-2xl px-6 py-5 flex flex-col">
                <h3 className="font-bold text-[16px] text-text">
                  <span className="num text-primary">{i + 1}.</span> {c.t}
                </h3>
                <p className="text-muted text-[14px] mt-2 leading-[1.8]">{c.d}</p>
                <p className="text-[14px] mt-3 pt-3 border-t border-secondary leading-[1.75] text-text">
                  <strong className="text-primary">In Kairos Space POS: </strong>
                  {c.k}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── kinds ──────────────────────────────────────────────────────── */}
        <section className="mt-12" aria-labelledby="kinds">
          <h2 id="kinds" className="text-[26px] font-extrabold">The kinds of POS systems on the market</h2>
          <p className="text-muted text-[15px] mt-3 leading-[1.85]">
            You won’t find other vendors’ names here — prices and plans change, and the most accurate answer comes
            from asking each vendor directly. But most of what you’ll meet falls into one of these kinds:
          </p>
          <div className="mt-6 space-y-4">
            {KINDS.map((k) => (
              <div key={k.t} className="bg-surface border border-secondary rounded-2xl px-6 py-5">
                <h3 className="font-bold text-[17px] text-text">{k.t}</h3>
                <div className="mt-2 grid sm:grid-cols-2 gap-3 text-[14px] leading-[1.8]">
                  <p>
                    <strong className="text-green">Suits: </strong>
                    <span className="text-muted">{k.fit}</span>
                  </p>
                  <p>
                    <strong className="text-text">Watch for: </strong>
                    <span className="text-muted">{k.watch}</span>
                  </p>
                </div>
              </div>
            ))}
            <div className="bg-surface border border-primary/40 rounded-2xl px-6 py-5">
              <h3 className="font-bold text-[17px] text-primary">An all-in-one Jordanian system with a ready tablet — Kairos Space POS</h3>
              <p className="text-muted text-[14px] mt-2 leading-[1.8]">
                Cashier, inventory, purchasing, reports and JoFotara in one system that sells offline on Windows or
                Android, with an owner dashboard in any browser and an owner app on your phone. Business and Complete
                plans add tables, a kitchen display and a QR menu, plus an AI assistant (Claude or ChatGPT) you can ask
                in Arabic about your sales and profit — answered from your own numbers.
              </p>
              <ul className="mt-3 grid sm:grid-cols-3 gap-2 text-[14px]">
                {PLANS.map((p) => (
                  <li key={p.key} className="bg-surface-2/60 rounded-xl px-4 py-3">
                    <strong className="text-text">{PLAN_EN[p.key]}</strong>
                    <div className="text-muted">
                      <span className="num">{p.price}</span> JOD first year with tablet · renewal{" "}
                      <span className="num">{p.renewal}</span> · {DEVICES_EN[p.key]}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── ask the vendor ─────────────────────────────────────────────── */}
        <section className="mt-12" aria-labelledby="ask">
          <h2 id="ask" className="text-[26px] font-extrabold">Seven questions to ask any vendor before you sign</h2>
          <ol className="mt-5 space-y-2.5 text-[15px] leading-[1.85] text-text list-decimal pl-6">
            {ASK_VENDOR.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <p className="text-[14px] text-muted mt-4 leading-[1.8]">Ask us the same questions — we’ll answer them before you pay.</p>
        </section>

        {/* ── when Kairos isn't the right fit ───────────────────────────── */}
        <section className="mt-12" aria-labelledby="not-for-you">
          <h2 id="not-for-you" className="text-[26px] font-extrabold">When Kairos Space POS isn’t your best choice</h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-[1.85] text-muted list-disc pl-5">
            <li>If you want to pay month to month: our subscription is yearly only.</li>
            <li>
              If most of your sales come through delivery apps and you need those orders to flow into the till
              automatically today: direct delivery-app integration is on our roadmap and not released yet; today they
              run as sales channels with their own prices.
            </li>
            <li>
              If you’re a very small shop that only needs a simple phone cashier at the lowest possible cost: you may
              find options cheaper than our Basic plan ({BASIC.price} JOD a year).
            </li>
          </ul>
          <p className="text-[15px] leading-[1.85] text-muted mt-4">
            Otherwise — restaurant, café, supermarket or shop, one branch or several — try it yourself free for{" "}
            {TRIAL_DAYS} days on your own device before you pay anything.
          </p>
        </section>

        {/* ── faq ────────────────────────────────────────────────────────── */}
        <section className="mt-12" aria-labelledby="faq">
          <h2 id="faq" className="text-[26px] font-extrabold">Frequently asked questions</h2>
          <div className="mt-6 space-y-3">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group bg-surface border border-secondary rounded-2xl px-6 py-5 transition-colors hover:border-primary/30"
              >
                <summary className="font-bold text-[16px] cursor-pointer list-none flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-primary text-[22px] leading-none shrink-0 transition-transform duration-250 group-open:rotate-45">+</span>
                </summary>
                <p className="text-muted text-[15px] mt-4 leading-[1.85]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── cta ────────────────────────────────────────────────────────── */}
        <section className="py-16">
          <div className="bg-[var(--color-dark)] rounded-[24px] p-10 sm:p-12 text-center">
            <h2 className="text-[clamp(22px,3.2vw,30px)] font-black text-white mb-3">Try it on your own products</h2>
            <p className="text-white/70 text-[16px] leading-[1.85] max-w-[52ch] mx-auto mb-8">
              A {TRIAL_DAYS}-day free trial with no commitment — or message us and we’ll set up a demo for your exact shop.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/signup" className="btn-gold">Start free trial</Link>
              <a
                href={enWaUrl("Hello 👋 I read your guide to choosing a POS in Jordan and want to know if Kairos fits my business.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                WhatsApp us
              </a>
            </div>
            <p className="text-white/60 text-[14px] mt-6">
              <Link href="/en" className="text-white/80 hover:text-white">More about Kairos Space POS →</Link>
            </p>
          </div>
        </section>
      </main>

      <EnFooter />
    </div>
  );
}
