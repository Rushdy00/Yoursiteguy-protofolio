import Header from "@/components/Header";
import MotionLayer from "@/components/MotionLayer";
import Reveals from "@/components/Reveals";
import SoundToggle from "@/components/SoundToggle";
import Blueprint from "@/components/sections/Blueprint";
import Faq from "@/components/sections/Faq";
import Footer, { Marquee } from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Pricing from "@/components/sections/Pricing";
import Problem from "@/components/sections/Problem";
import Ready from "@/components/sections/Ready";
import Testimonials from "@/components/sections/Testimonials";
import Trust from "@/components/sections/Trust";

export default function Home() {
  return (
    <div className="page">
      <MotionLayer />
      <Header />
      <SoundToggle />
      <Reveals />

      <main id="top" style={{ position: "relative", zIndex: 10 }}>
        <Hero />
        <Portfolio />
        <Trust />
        <Pricing />
        <Testimonials />
        <Problem />
        <Blueprint />
        <Ready />
        <Faq />
        <Marquee />
        <Footer />
      </main>
    </div>
  );
}
