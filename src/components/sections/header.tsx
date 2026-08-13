"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { waLink } from "@/lib/data";

const links = [
  { label: "Our Developments", href: "#developments" },
  { label: "About", href: "#about" },
  { label: "Location", href: "#location" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
          transparent
            ? "border-transparent bg-transparent"
            : "border-line bg-white/95 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[84px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={transparent ? "/logo-white.png" : "/logo-black.png"}
              alt="Absolute Grace Properties"
              width={180}
              height={100}
              priority
            />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex gap-9">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={isHome ? l.href : `/${l.href}`}
                    className={`text-[14.5px] font-medium transition-colors ${
                      transparent
                        ? "text-white/85 hover:text-white"
                        : "text-ink/75 hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="whatsapp"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <a
                href={waLink(
                  "Hi, I'd like to know more about Absolute Grace Properties."
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                Chat on WhatsApp
              </a>
            </Button>

            <Button
              asChild
              variant="whatsapp"
              size="icon"
              className="sm:hidden"
            >
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {!isHome && <div className="h-[84px]" />}
    </>
  );
}