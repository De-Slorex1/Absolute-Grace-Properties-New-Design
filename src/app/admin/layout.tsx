import Link from "next/link";
import { LayoutDashboard, Users, MessageSquare, Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/admin/sign-out-button";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Listings", href: "/admin/listings", icon: Building2 },
  { label: "Investor Leads", href: "/admin/leads", icon: Users },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen bg-parchment">
      <aside className="hidden w-[220px] shrink-0 border-r border-line bg-white lg:block">
        <div className="border-b border-line p-6">
          <img src='/logo-black.png' alt="logo" />
          <span className="mt-0.5 block font-medium font-mono text-center text-[10px] uppercase tracking-wider text-indigo">
            Admin
          </span>
        </div>

        <nav className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mb-1 flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-[14px] font-medium text-ink/70 transition-colors hover:bg-parchment-warm hover:text-ink"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-[220px] border-t border-line p-4">
          <p className="mb-2 truncate text-[12.5px] text-ink/50">{user?.email}</p>
          <SignOutButton />
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10">{children}</main>
    </div>
  );
}