"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, MessageSquare, Building2 } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Listings", href: "/admin/listings", icon: Building2 },
  { label: "Investor Leads", href: "/admin/leads", icon: Users },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="p-4">
      {navItems.map((item) => {
        // Exact match for the Dashboard root; startsWith for everything else,
        // so /admin/listings/new or /admin/listings/[id]/edit still highlight "Listings".
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mb-1 flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-[14px] font-medium transition-colors ${
              isActive
                ? "bg-indigo/10 text-indigo"
                : "text-ink/70 hover:bg-parchment-warm hover:text-ink"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}