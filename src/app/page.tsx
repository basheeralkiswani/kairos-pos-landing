import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Trust from "@/components/Trust";
import FotaraBadge from "@/components/FotaraBadge";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import LeadForm from "@/components/LeadForm";
import Pricing from "@/components/Pricing";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      {/* Ambient glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="glow w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_70%)] -top-[180px] -right-[120px] absolute" />
        <div className="glow w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(96,165,250,0.08),transparent_70%)] top-[42%] -left-[160px] absolute" />
        <div className="glow w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.10),transparent_70%)] -bottom-[120px] left-[30%] absolute" />
      </div>

      <Navbar />
      <Hero />
      <Trust />
      <FotaraBadge />
      <Features />
      <Gallery />
      <Testimonials />
      <LeadForm />
      <Pricing />
      <CtaBand />
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
