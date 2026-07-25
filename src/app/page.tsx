import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Trust from "@/components/Trust";
import FotaraBadge from "@/components/FotaraBadge";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import HomeSignup from "@/components/HomeSignup";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      {/* توهجات ذهبية شفافة على العاجي */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="glow w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.22),transparent_70%)] -top-[180px] -right-[120px] absolute" />
        <div className="glow w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(23,138,88,0.08),transparent_70%)] top-[42%] -left-[160px] absolute" />
        <div className="glow w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.14),transparent_70%)] -bottom-[120px] left-[30%] absolute" />
      </div>

      {/* رابط التخطّي — أول ما يصله مستخدم الكيبورد، ويظل مخفياً حتى يُركَّز عليه */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[400] focus:bg-surface focus:text-text focus:font-bold focus:py-3 focus:px-5 focus:rounded-xl focus:border focus:border-primary focus:shadow-lg"
      >
        تخطَّ إلى المحتوى
      </a>

      <Navbar />
      {/* الصفحة الرئيسية كانت الوحيدة بلا معلَم <main> — صفحة /signup فيها واحد */}
      <main id="main">
        <Hero />
        <Trust />
        <FotaraBadge />
        <HowItWorks />
        <Features />
        <Gallery />
        <Testimonials />
        <Pricing />
        <HomeSignup />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
