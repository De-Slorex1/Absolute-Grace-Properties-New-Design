"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { waLink, type Development } from "@/lib/data";
import { X, Clock, ShieldCheck } from "lucide-react";

export function ContactCard({ dev }: { dev: Development }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const waMessage = `Hi, I'm interested in ${dev.name} (${dev.location}). Could you share more details?`;

  return (
    <>
      {/* Desktop / tablet sticky sidebar card */}
      <div className="hidden lg:block">
        <div className="sticky top-[104px] rounded-sm border border-line bg-white p-7">
          <CardBody dev={dev} waMessage={waMessage} />
        </div>
      </div>

      {/* Mobile: fixed bottom bar that expands into a sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white p-4 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="block text-[11px] text-ink/45">From</span>
            <b className="font-serif text-lg font-semibold">{dev.priceFrom}</b>
          </div>
          <div className="flex gap-2.5">
            <Button asChild variant="whatsapp" size="default">
              <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button onClick={() => setMobileOpen(true)}>Contact Agent</Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex items-end lg:hidden">
          <div
            className="absolute inset-0 bg-ink/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-lg bg-white p-6 pb-8">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-5 top-5 text-ink/40 hover:text-ink"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <CardBody dev={dev} waMessage={waMessage} />
          </div>
        </div>
      )}
    </>
  );
}

function CardBody({ dev, waMessage }: { dev: Development; waMessage: string }) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <div className="mb-5 flex items-center gap-3 border-b border-line pb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo/10">
          <ShieldCheck className="h-5 w-5 text-indigo" />
        </div>
        <div>
          <p className="font-serif text-[15px] font-semibold leading-tight">
            Absolute Grace Properties
          </p>
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-clay">
            Verified Developer
          </span>
        </div>
      </div>

      <div className="mb-5">
        <span className="block text-[11.5px] text-ink/45">Starting from</span>
        <b className="font-serif text-[28px] font-semibold">{dev.priceFrom}</b>
        <span className="ml-1.5 text-[13px] text-ink/45">{dev.priceUnit}</span>
      </div>

      <div className="mb-6 flex flex-col gap-2.5">
        <Button asChild variant="whatsapp" className="w-full">
          <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="border-t border-line pt-6">
        <p className="mb-4 text-[13px] font-medium text-ink/70">
          Or send a quick inquiry
        </p>
        <div className="mb-3">
          <Label htmlFor="cc-name">Name</Label>
          <Input id="cc-name" placeholder="Your name" required />
        </div>
        <div className="mb-3">
          <Label htmlFor="cc-email">Email</Label>
          <Input id="cc-email" type="email" placeholder="you@email.com" required />
        </div>
        <div className="mb-3">
          <Label htmlFor="cc-phone">Phone</Label>
          <Input id="cc-phone" type="tel" placeholder="+234 800 000 0000" />
        </div>
        <div className="mb-4">
          <Label htmlFor="cc-message">Message</Label>
          <Textarea id="cc-message" defaultValue={waMessage} />
        </div>
        <Button type="submit" className="w-full">
          Schedule a Viewing
        </Button>
      </form>

      <div className="mt-5 flex items-center gap-2 border-t border-line pt-5 text-[12.5px] text-ink/50">
        <Clock className="h-3.5 w-3.5 text-clay" />
        Response within 24 hours
      </div>
    </>
  );
}
