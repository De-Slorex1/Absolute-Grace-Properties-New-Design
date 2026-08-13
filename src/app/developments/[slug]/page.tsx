import { notFound } from "next/navigation";
import { MapPin, Ruler, FileText, Calendar, Share2 } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Gallery } from "@/components/development-detail/gallery";
import { ContactCard } from "@/components/development-detail/contact-card";
import { OtherDevelopments } from "@/components/development-detail/other-developments";
import { Badge } from "@/components/ui/badge";
import { developments } from "@/lib/data";
import { GoogleMap } from "@/components/development-detail/google-map";

export function generateStaticParams() {
  return developments.map((d) => ({ slug: d.slug }));
}

export default async function DevelopmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dev = developments.find((d) => d.slug === slug);
  if (!dev) notFound();

  const scarcity = dev.plotsAvailable <= 5;

  return (
    <>
      <Header />
      <main className="pb-24 lg:pb-0">
        <div className="mx-auto max-w-[1240px] px-5 pt-6 sm:px-8">
          {/* Breadcrumb */}
          <nav className="mb-5 flex items-center gap-2 text-[13px] text-ink/45">
            <a href="/" className="hover:text-ink">
              Home
            </a>
            <span>/</span>
            <a href="/#developments" className="hover:text-ink">
              Our Developments
            </a>
            <span>/</span>
            <span className="text-ink/70">{dev.name}</span>
          </nav>

          {/* Gallery */}
          <Gallery media={dev.media} alt={dev.name} placeholderNotice={dev.isPlaceholderMedia} />

          {/* Title + key info bar */}
          <div className="mt-8 flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2.5 flex items-center gap-2.5">
                <Badge>PLOT {dev.index}</Badge>
                {scarcity && (
                  <span className="font-mono text-[11px] uppercase tracking-wider text-clay">
                    Only {dev.plotsAvailable} plots left
                  </span>
                )}
              </div>
              <h1 className="mb-2.5 font-serif text-[28px] font-semibold leading-tight sm:text-[36px]">
                {dev.name}
              </h1>
              <p className="flex items-center gap-1.5 text-[14.5px] text-ink/55">
                <MapPin className="h-4 w-4" />
                {dev.location}
              </p>
            </div>

            <button className="flex items-center gap-2 self-start rounded-sm border border-line px-4 py-2.5 text-[13px] font-medium text-ink/70 transition-colors hover:border-ink hover:text-ink">
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 py-4 sm:grid-cols-4 sm:gap-4 sm:border-b sm:border-line sm:py-6">
            <KeyInfo icon={Ruler} label="Plot size" value={`${dev.plotSize} (${dev.priceUnit})`} />
            <KeyInfo icon={FileText} label="Document" value={dev.document} />
            <KeyInfo icon={MapPin} label="Zoning" value={dev.zoning} />
            <KeyInfo icon={Calendar} label="Listed" value={dev.listedDate} />
          </div>

          {/* Main two-column layout */}
          <div className="grid grid-cols-1 gap-12 py-10 lg:grid-cols-[1fr_380px] lg:gap-14 lg:py-14">
            <div>
              {/* Description */}
              <section className="mb-12">
                <h2 className="mb-5 font-serif text-2xl font-semibold">About This Development</h2>
                <div className="space-y-4">
                  {dev.fullDescription.map((p, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-ink/65">
                      {p}
                    </p>
                  ))}
                </div>
              </section>

              {/* Features */}
              <section className="mb-12">
                <h2 className="mb-5 font-serif text-2xl font-semibold">Key Features</h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
                  {dev.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo" />
                      <p className="text-[14.5px] leading-relaxed text-ink/70">{f}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Spec table */}
              <section className="mb-12">
                <h2 className="mb-5 font-serif text-2xl font-semibold">Property Details</h2>
                <div className="border border-line">
                  <SpecRow label="Plot size" value={dev.plotSize} />
                  <SpecRow label="Document type" value={dev.titleStatus} />
                  <SpecRow label="Location" value={dev.location} />
                  <SpecRow label="Local Government" value={dev.lga} />
                  <SpecRow label="Zoning" value={dev.zoning} />
                  <SpecRow label="Plots available" value={`${dev.plotsAvailable} of ${dev.plotsTotal}`} last />
                </div>
              </section>

              {/* Location */}
              <section>
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold">
                      Location
                    </h2>

                    <p className="mt-1.5 text-[13px] text-ink/50">
                      Find this development on Google Maps
                    </p>
                  </div>
                </div>

                <GoogleMap
                  name={dev.name}
                  location={dev.location}
                  coordinates={dev.coordinates}
                />
              </section>
            </div>

            {/* Sticky contact card */}
            <div>
              <ContactCard dev={dev} />
            </div>
          </div>
        </div>
      </main>

      <OtherDevelopments current={dev.slug} />
      <Footer />
    </>
  );
}

function KeyInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo/10">
        <Icon className="h-4 w-4 text-indigo" />
      </div>
      <div>
        <span className="block text-[11px] text-ink/45">{label}</span>
        <b className="text-[13.5px] font-semibold">{value}</b>
      </div>
    </div>
  );
}

function SpecRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-5 py-3.5 text-[14px] ${
        !last ? "border-b border-line" : ""
      }`}
    >
      <span className="text-ink/50">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
