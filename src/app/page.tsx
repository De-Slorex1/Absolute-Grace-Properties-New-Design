import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Promise } from "@/components/sections/promise";
import { Developments } from "@/components/sections/developments";
import { LandQuality } from "@/components/sections/land-quality";
import { Location } from "@/components/sections/location";
import { WhyInvest } from "@/components/sections/why-invest";
import { Trust } from "@/components/sections/trust";
import { Investor } from "@/components/sections/investor";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <Reveal>
          <Promise />
        </Reveal>

        <Reveal delay={60}>
          <Developments />
        </Reveal>

        <Reveal delay={60}>
          <LandQuality />
        </Reveal>

        <Reveal delay={60}>
          <Location />
        </Reveal>

        <Reveal delay={60}>
          <WhyInvest />
        </Reveal>

        <Reveal delay={60}>
          <Trust />
        </Reveal>

        <Reveal delay={60}>
          <Investor />
        </Reveal>

        <Reveal delay={60}>
          <Faq />
        </Reveal>
      </main>

      <Footer />
    </>
  );
}