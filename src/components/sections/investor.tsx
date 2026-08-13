"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { developments, waLink } from "@/lib/data";

export function Investor() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Hook this up to your form handler / API route of choice.
  }

  return (
    <section id="invest" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid grid-cols-1 border border-line lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-indigo p-7 text-white sm:p-11 lg:p-14">
            <div className="mb-5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-[#c9c1f0]">
              <span className="h-px w-7 bg-[#c9c1f0]" />
              Become an Investor
            </div>
            <h2 className="mb-4.5 font-serif text-[26px] font-semibold text-white sm:text-[32px]">
              Put capital into land that&apos;s verified before you commit.
            </h2>
            <p className="mb-8 text-[15px] leading-relaxed text-[#d9d3f5]">
              Whether you&apos;re acquiring a single plot or looking to fund a
              development phase, our team will walk you through exactly what&apos;s
              available, what it costs, and what you&apos;ll own.
            </p>
            <div className="flex flex-wrap gap-8 border-t border-white/20 pt-7">
              <InvestorStat value="₦500K–₦20M+" label="Typical range" />
              <InvestorStat value="24hrs" label="Response time" />
              <InvestorStat value="10+ yrs" label="Track record" />
            </div>
          </div>

          <div className="bg-white p-7 sm:p-11 lg:p-14">
            <form onSubmit={handleSubmit}>
              <div className="mb-3.5">
                <Label htmlFor="name">Full Name / Company</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@email.com" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+234 800 000 0000" required />
                </div>
              </div>
              <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <Label>Investment Capacity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500k-2m">₦500,000 – ₦2,000,000</SelectItem>
                      <SelectItem value="2m-10m">₦2,000,000 – ₦10,000,000</SelectItem>
                      <SelectItem value="10m-20m">₦10,000,000 – ₦20,000,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Preferred Development</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="No preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No preference</SelectItem>
                      {developments.map((d) => (
                        <SelectItem key={d.slug} value={d.slug}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mb-4.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us about your investment goals" />
              </div>
              <div className="mb-5.5 flex items-start gap-2.5">
                <input type="checkbox" id="consent" required className="mt-1" />
                <label htmlFor="consent" className="text-[12.5px] leading-relaxed text-ink/55">
                  I agree to be contacted about investment opportunities at Absolute
                  Grace Properties.
                </label>
              </div>
              <Button type="submit" className="w-full">
                Submit Application
              </Button>
              <p className="mt-4 text-center text-[13px] text-ink/55">
                Prefer to talk now?{" "}
                <a
                  href={waLink("Hi, I'd like to talk about investing with Absolute Grace Properties.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-whatsapp"
                >
                  Message us on WhatsApp →
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function InvestorStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <b className="block font-serif text-[26px] font-semibold text-white">{value}</b>
      <span className="text-[11.5px] text-[#c9c1f0]">{label}</span>
    </div>
  );
}
