import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen bg-parchment">
      <aside className="hidden w-[220px] shrink-0 border-r border-line bg-white lg:block">
        <div className="border-b border-line p-6">
          <img src="/logo-black.png" alt="logo" />
          <span className="mt-0.5 block text-center font-mono text-[10px] font-medium uppercase tracking-wider text-indigo">
            Admin
          </span>
        </div>

        <AdminNav />

        <div className="absolute bg-indigo-400 text-white bottom-0 w-[220px] border-t border-line p-4">
          <p className="mb-2 truncate text-white">{user?.email}</p>
          <SignOutButton />
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10">{children}</main>
    </div>
  );
}