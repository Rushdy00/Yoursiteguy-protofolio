import Header from "@/components/Header";
import MotionLayer from "@/components/MotionLayer";
import Reveals from "@/components/Reveals";
import SoundToggle from "@/components/SoundToggle";
import Faq from "@/components/sections/Faq";
import Footer, { Marquee } from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Problem from "@/components/sections/Problem";
import Ready from "@/components/sections/Ready";
import ShopifyFeatures from "@/components/sections/ShopifyFeatures";
import { dictionaries, type Locale } from "@/lib/i18n";

export default function SitePage({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  return (
    <div className="page">
      <MotionLayer />
      <Header nav={t.nav} menu={t.menu} langSwitch={t.langSwitch} locale={t.locale} />
      <SoundToggle t={t.sound} />
      <Reveals />

      <main id="top" style={{ position: "relative", zIndex: 10 }}>
        <Hero t={t} />
        <Portfolio t={t} />
        <ShopifyFeatures t={t} />
        <Problem t={t} />
        <Ready t={t} />
        <Faq t={t} />
        <Marquee t={t} />
        <Footer t={t} />
      </main>
    </div>
  );
}
