import AboutCard from "@/components/AboutCard";
import AtmosphereCard from "@/components/AtmosphereCard";
import ContactSection from "@/components/ContactSection";
import GigsList from "@/components/GigsList";
import Hero from "@/components/Hero";
import MixPlayer from "@/components/MixPlayer";
import Navbar from "@/components/Navbar";
import { latestMix } from "@/data/site";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] bg-accent px-4 py-2 font-bold text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <div className="relative z-10 mx-auto -mt-20 flex max-w-[1440px] flex-col gap-5 px-4 md:-mt-28 md:px-8 lg:px-12">
          <MixPlayer mix={latestMix} />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_0.85fr_1.25fr]">
            <GigsList />
            <AtmosphereCard />
            <AboutCard />
          </div>
        </div>
      </main>
      <ContactSection />
    </>
  );
}
