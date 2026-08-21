"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand, Play } from "lucide-react";
import type { MediaItem } from "@/lib/types";

function youtubeThumb(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function youtubeEmbedSrc(videoId: string, autoplay: boolean) {
  const params = new URLSearchParams({
    mute: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    ...(autoplay ? { autoplay: "1" } : {}),
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function Gallery({
  media,
  alt,
  placeholderNotice,
}: {
  media: MediaItem[];
  alt: string;
  placeholderNotice?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const activeItem = media[active];

  function next() {
    setActive((a) => (a + 1) % media.length);
  }
  function prev() {
    setActive((a) => (a - 1 + media.length) % media.length);
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Thumbnail column — left on desktop, horizontal row on mobile */}
        <div className="order-2 flex gap-2.5 overflow-x-auto sm:order-1 sm:w-[100px] sm:shrink-0 sm:flex-col sm:gap-3 sm:overflow-visible">
          {media.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-sm ring-2 transition-all sm:w-full ${
                i === active ? "ring-indigo" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {item.type === "image" ? (
                <Image src={item.src} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" />
              ) : (
                <>
                  <Image
                    src={youtubeThumb(item.videoId)}
                    alt={`${alt} video thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/35">
                    <Play className="h-4 w-4 fill-white text-white" />
                  </span>
                </>
              )}
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="relative order-1 aspect-[16/10] flex-1 overflow-hidden rounded-sm bg-ink sm:order-2 sm:aspect-[16/9]">
          <MediaFrame item={activeItem} alt={alt} autoplay={false} fill />

          {placeholderNotice && (
            <span className="absolute left-4 top-4 rounded-sm bg-ink/80 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-wider text-clay-light backdrop-blur-sm">
              Placeholder image — real photos coming soon
            </span>
          )}

          {activeItem.type === "image" && (
            <button
              onClick={() => setLightbox(true)}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-sm bg-ink/80 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-ink"
            >
              <Expand className="h-3.5 w-3.5" />
              View all photos
            </button>
          )}
        </div>
      </div>

      {lightbox && activeItem.type === "image" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute right-5 top-5 text-white/70 hover:text-white"
            onClick={() => setLightbox(false)}
            aria-label="Close"
          >
            <X className="h-7 w-7" />
          </button>

          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative aspect-[4/3] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={(activeItem as { src: string }).src} alt={alt} fill className="object-contain" />
          </div>

          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <span className="absolute bottom-6 font-mono text-xs text-white/60">
            {active + 1} / {media.length}
          </span>
        </div>
      )}
    </div>
  );
}

function MediaFrame({
  item,
  alt,
  autoplay,
  fill,
}: {
  item: MediaItem;
  alt: string;
  autoplay: boolean;
  fill?: boolean;
}) {
  if (item.type === "image") {
    return <Image src={item.src} alt={alt} fill={fill} priority className="object-cover" />;
  }

  if (item.vertical) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-ink">
        <iframe
          className="aspect-[9/16] h-full max-w-full"
          src={youtubeEmbedSrc(item.videoId, autoplay)}
          title={alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <iframe
      className="absolute inset-0 h-full w-full"
      src={youtubeEmbedSrc(item.videoId, autoplay)}
      title={alt}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}