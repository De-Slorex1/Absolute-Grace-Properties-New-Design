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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Promise />
        <Developments />
        <LandQuality />
        <Location />
        <WhyInvest />
        <Trust />
        <Investor />
        <Faq />
      </main>
      <Footer />
    </>
  );
}