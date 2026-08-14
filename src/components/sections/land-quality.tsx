"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type GalleryItem =
  | {
      type: "image";
      src: string;
      alt: string;
      label: string;
      className?: string;
    }
  | {
      type: "video";
      src: string;
      alt: string;
      label: string;
      className?: string;
    };

const gallery: GalleryItem[] = [
  {
  type: "video",
  src: "/plant.mp4",
  alt: "Video showing the land and site development",
  label: "Farmland Development",
  className: "col-span-2 row-span-2",
},
  {
    type: "image",
    src: "/bloom.jpg",
    alt: "Aerial view of land development in Ibadan, Nigeria",
    label: "Site Development",
  },
  {
    type: "image",
    src: "/planting.png",
    alt: "Cashew trees growing on Nigerian farmland",
    label: "Site Development",
  },
  {
    type: "image",
    src: "/cashew.jpg",
    alt: "Open agricultural land",
    label: "Fertile Land",
  },

  {
    type: "image",
    src: "/crop.png",
    alt: "Agricultural land ready for development",
    label: "Ready to Develop",
  },
];

const features = [
  "Fertile soil, tested and confirmed suitable for farming where applicable",
  "Flood-free, elevated terrain across all three developments",
  "Existing access roads to every plot — no landlocked parcels",
  "Boundary beacons and survey markers placed before sale, not after",
];

export function LandQuality() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">

        {/* Heading */}
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-clay">
              <span className="h-px w-7 bg-clay" />
              The Land
            </div>

            <h2 className="font-serif text-[28px] font-semibold sm:text-[38px]">
              The Land Itself
            </h2>
          </div>

          <p className="max-w-[380px] text-[15px] leading-relaxed text-ink/55">
            What you&apos;re actually buying — before any building begins.
          </p>
        </div>

        {/* Premium gallery */}
        <div
          className="
            mb-14
            grid
            auto-rows-[180px]
            grid-cols-2
            gap-2
            sm:auto-rows-[220px]
            sm:gap-3
            lg:auto-rows-[210px]
            lg:grid-cols-4
            lg:gap-3
          "
        >
          {gallery.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className={`
                group
                relative
                overflow-hidden
                rounded-sm
                bg-ink
                ${item.className ?? ""}
              `}
            >
              {/* Media */}
              {item.type === "video" ? (
                <video
  src={item.src}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  controls={false}
  disablePictureInPicture
  disableRemotePlayback
  aria-label={item.alt}
  className="
    absolute
    inset-0
    h-full
    w-full
    object-cover
    transition-transform
    duration-700
    ease-[cubic-bezier(0.22,1,0.36,1)]
    group-hover:scale-[1.07]
  "
/>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="
                    (max-width: 640px) 50vw,
                    (max-width: 1024px) 50vw,
                    25vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:scale-[1.07]
                  "
                />
              )}

              {/* Dark cinematic overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/65
                  via-black/10
                  to-transparent
                  opacity-60
                  transition-opacity
                  duration-500
                  group-hover:opacity-90
                "
              />

              {/* Subtle warm hover wash */}
              <div
                className="
                  absolute
                  inset-0
                  bg-indigo/10
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              {/* Media number */}
              <span
                className="
                  absolute
                  left-4
                  top-4
                  font-mono
                  text-[10px]
                  tracking-[0.15em]
                  text-white/70
                  transition-transform
                  duration-500
                  group-hover:translate-y-0.5
                "
              >
                0{i + 1}
              </span>

              {/* Bottom label */}
              <div
                className="
                  absolute
                  inset-x-4
                  bottom-4
                  flex
                  items-end
                  justify-between
                  gap-3
                "
              >
                <span
                  className="
                    text-xs
                    font-medium
                    tracking-wide
                    text-white
                    transition-transform
                    duration-500
                    group-hover:-translate-y-1
                  "
                >
                  {item.label}
                </span>

                <span
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/30
                    text-white
                    opacity-0
                    transition-all
                    duration-500
                    group-hover:translate-x-0
                    group-hover:opacity-100
                  "
                >
                  ↗
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-10">
          {features.map((feature) => (
            <div
              key={feature}
              className="group flex items-start gap-3.5"
            >
              <span
                className="
                  mt-2
                  h-1.5
                  w-1.5
                  shrink-0
                  rounded-full
                  bg-indigo
                  transition-transform
                  duration-300
                  group-hover:scale-150
                "
              />

              <p className="text-[14.5px] leading-relaxed text-ink/70">
                {feature}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}