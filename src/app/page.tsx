import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Promise as PromiseSection } from "@/components/sections/promise";
import { Developments } from "@/components/sections/developments";
import { LandQuality } from "@/components/sections/land-quality";
import { Location } from "@/components/sections/location";
import { WhyInvest } from "@/components/sections/why-invest";
import { Trust } from "@/components/sections/trust";
import { Investor } from "@/components/sections/investor";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/reveal";
import { getPublishedDevelopments } from "@/lib/developments";

export default async function Home() {
  const developments = await getPublishedDevelopments();

  return (
    <>
      <Header />
      <main>
        <Hero />
          <PromiseSection />
          <Developments developments={developments} />
          <LandQuality />
          <Location />
          <WhyInvest />
          <Trust />
          <Investor developments={developments} />
          <Faq />
      </main>
      <Footer />
    </>
  );
}