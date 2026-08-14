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
        <Reveal>
          <Developments />
        </Reveal>
        <Reveal>
          <LandQuality />
        </Reveal>
        <Reveal>
          <Location />
        </Reveal>
        <Reveal>
          <WhyInvest />
        </Reveal>
        <Reveal>
          <Trust />
        </Reveal>
        <Reveal>
          <Investor />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}