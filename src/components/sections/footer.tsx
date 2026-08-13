import { site, waLink } from "@/lib/data";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import Image from "next/image"

export function Footer() {
  return (
    <>
      <footer id="contact" className="bg-ink py-16 text-white sm:py-[72px]">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="mb-10 grid grid-cols-1 gap-9 sm:mb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
            <div>
              <div className="mb-4.5 flex items-center gap-2.5">
                <Image src="/logo-white.png" alt="logo" width={180} height={100} />
              </div>
              <p className="mb-5 max-w-[280px] text-[13.5px] leading-relaxed text-white/60">
                Verified lands and farmland developments across Ibadan and Oyo
                State, sold directly no middlemen, no paper-only plots.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {["CAC REGISTERED", "SCUML COMPLIANT", "OYSBPP APPROVED"].map((b) => (
                  <span
                    key={b}
                    className="border border-white/18 px-2.5 py-1.5 font-mono text-[10px] text-indigo"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <FooterCol
              title="Quick Links"
              links={[
                { label: "Our Developments", href: "#developments" },
                { label: "About Us", href: "#about" },
                { label: "Location", href: "#location" },
                { label: "FAQ", href: "#faq" },
              ]}
            />
            <FooterCol
              title="Support"
              links={[
                { label: "Terms & Conditions", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Cookie Policy", href: "#" },
              ]}
            />

            <div>
              <h5 className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/50">
                Contact
              </h5>
              <p className="mb-2.5 text-[13.5px] text-white/80">{site.phone}</p>
              <p className="mb-2.5 text-[13.5px] text-white/80">{site.email}</p>
              <p className="text-[13.5px] leading-relaxed text-white/80">{site.address}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 border-t border-white/10 pt-6 text-[12.5px] text-white/45 sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} Absolute Grace Properties. All rights reserved.</span>
            <span>Built on trust since 2025</span>
          </div>
        </div>
      </footer>

      <a
        href={waLink("Hi, I'd like to know more about Absolute Grace Properties.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-7 right-7 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp shadow-lg transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="h-6.5 w-6.5 text-white" />
      </a>
    </>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h5 className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/50">
        {title}
      </h5>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          className="mb-3 block text-sm text-white/80 opacity-85 hover:opacity-100"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
