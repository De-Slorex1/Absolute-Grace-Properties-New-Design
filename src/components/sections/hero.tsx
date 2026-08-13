import Image from "next/image";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative flex min-h-[640px] items-end overflow-hidden sm:min-h-[720px] lg:min-h-[820px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.jpg"
          alt="Farmland at Absolute Grace"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />
      </div>

      {/* Coordinate tag, top right */}
      {/* <div className="absolute right-5 top-24 hidden rounded-sm bg-ink/60 px-4 py-2.5 backdrop-blur-sm sm:right-8 sm:block sm:top-28">
        <span className="font-mono text-[11px] tracking-wider text-clay-light">
          07.3775° N, 3.9470° E
        </span>
        <p className="mt-0.5 text-[12.5px] text-white/85">
          Ido–Eruwa Farmland — surveyed &amp; beaconed, 2024
        </p>
      </div> */}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-14 pt-32 sm:px-8 sm:pb-20 lg:pb-24">
        <div className="max-w-[640px]">
          <div className="mb-5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-clay-light">
            <span className="h-px w-7 bg-clay-light" />
            Ibadan, Oyo State — since 2025
          </div>
          <h1 className="mb-6 font-serif text-[34px] font-semibold leading-[1.05] tracking-tight text-white sm:text-[48px] lg:text-[64px]">
            Land that holds its <em className="font-medium italic text-clay-light">value.</em>
            <br />
            Verified, from the ground up.
          </h1>
          <p className="mb-9 max-w-[460px] text-[15.5px] leading-relaxed text-white/80 sm:text-base">
            Absolute Grace develops and sells surveyed, title-verified land and
            farmland across a small number of trusted locations in Oyo State.
          </p>
          <div className="mb-12 flex flex-col gap-3.5 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#developments">Explore Our Developments</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-white text-white hover:bg-white hover:text-ink sm:w-auto"
            >
              <a href={waLink("Hi, I'd like to know more about Absolute Grace Properties.")} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-8 border-t border-white/20 pt-8">
            <Stat value="120+" label="Plots Sold" />
            <Stat value="2+" label="Years Active" />
            <Stat value="03" label="Active Developments" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <b className="block font-serif text-2xl font-semibold text-white sm:text-[28px]">{value}</b>
      <span className="text-xs text-white/60">{label}</span>
    </div>
  );
}