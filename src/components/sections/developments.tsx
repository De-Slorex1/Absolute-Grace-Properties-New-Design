import Image from "next/image";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/data";
import type { Development } from "@/lib/types";

export function Developments({ developments }: { developments: Development[] }) {
  return (
    <section id="developments" className="bg-parchment-warm py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-[28px] font-semibold sm:text-[38px]">
            Our Developments
          </h2>
          <p className="max-w-[380px] text-[15px] text-ink/55">
            Active sites, each surveyed, beaconed, and open for viewing by appointment.
          </p>
        </div>

        <div className="space-y-7">
          {developments.map((dev, i) => (
            <article
              key={dev.id}
              className="grid grid-cols-1 border border-line bg-white md:grid-cols-2"
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image src={dev.image} alt={dev.name} fill className="object-cover" />
                <span className="absolute left-4.5 top-4.5 bg-white px-3 py-1.5 font-mono text-[11px] tracking-wider">
                  {String(i + 1).padStart(2, "0")} / {String(developments.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-11">
                <div className="mb-3.5 font-mono text-xs uppercase tracking-[0.08em] text-clay">
                  {dev.location}
                </div>
                <h3 className="mb-3.5 font-serif text-2xl font-semibold sm:text-[28px]">
                  {dev.name}
                </h3>
                <p className="mb-6 text-[14.5px] leading-relaxed text-ink/60">
                  {dev.description}
                </p>

                <div className="mb-7 flex flex-wrap gap-5 border-t border-line pt-5 sm:gap-7">
                  <MetaItem label="Plot size" value={dev.plotSize} />
                  <MetaItem label="Document" value={dev.document} />
                  <MetaItem label={`From (${dev.priceUnit})`} value={dev.priceFrom} />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="w-full sm:w-auto">
                    <a href={`/developments/${dev.slug}`}>View This Development</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a
                      href={waLink(`Hi, I'm interested in ${dev.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {developments.length === 0 && (
          <p className="text-center text-[14px] text-ink/45">
            No developments published yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="mb-1 block text-[11.5px] text-ink/45">{label}</span>
      <b className="font-serif text-[17px] font-semibold">{value}</b>
    </div>
  );
}