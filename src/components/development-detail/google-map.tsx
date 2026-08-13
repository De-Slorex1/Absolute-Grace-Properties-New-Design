"use client";

import { ExternalLink, MapPin } from "lucide-react";

type GoogleMapProps = {
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export function GoogleMap({
  name,
  location,
  coordinates,
}: GoogleMapProps) {
  const { lat, lng } = coordinates;

  const googleMapsUrl =
    `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  const embedUrl =
    `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

  return (
    <div className="overflow-hidden rounded-sm border border-line bg-ink">
      <div className="relative aspect-[16/9]">
        <iframe
          src={embedUrl}
          title={`${name} location`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Property information overlay */}
        <div className="absolute bottom-4 left-4 max-w-[300px] rounded-sm bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo/10">
              <MapPin className="h-4 w-4 text-indigo" />
            </div>

            <div>
              <p className="text-xs font-semibold text-ink">
                {name}
              </p>

              <p className="mt-1 text-[11px] leading-relaxed text-ink/55">
                {location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map footer */}
      <div className="flex items-center justify-between gap-4 border-t border-line bg-parchment px-4 py-3">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-ink/40">
            Coordinates
          </p>

          <p className="mt-0.5 font-mono text-[11px] text-ink/60">
            {lat.toFixed(6)}° N, {lng.toFixed(6)}° E
          </p>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-indigo transition-colors hover:text-indigo/70"
        >
          Open in Maps
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}