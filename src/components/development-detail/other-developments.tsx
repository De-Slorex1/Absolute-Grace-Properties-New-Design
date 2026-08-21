import Image from "next/image";
import Link from "next/link";
import { getPublishedDevelopments } from "@/lib/developments";
import type { Development } from "@/lib/types";

export async function OtherDevelopments({ current }: { current: string }) {
  const all = await getPublishedDevelopments();
  const others = all.filter((d) => d.slug !== current);
  if (others.length === 0) return null;

  return (
    <section className="border-t border-line bg-parchment-warm py-14 sm:py-16">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <h2 className="mb-8 font-serif text-2xl font-semibold sm:text-[28px]">
          Other Developments
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {others.map((d) => (
            <OtherCard key={d.slug} dev={d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OtherCard({ dev }: { dev: Development }) {
  return (
    <Link
      href={`/developments/${dev.slug}`}
      className="group flex overflow-hidden border border-line bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative w-2/5 shrink-0 overflow-hidden">
        <Image
          src={dev.image}
          alt={dev.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
        <span className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-clay">
          {dev.location}
        </span>
        <h3 className="mb-2 font-serif text-lg font-semibold leading-snug">{dev.name}</h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[11px] text-ink/45">From</span>
          <b className="font-serif text-base font-semibold">{dev.priceFrom}</b>
        </div>
      </div>
    </Link>
  );
}