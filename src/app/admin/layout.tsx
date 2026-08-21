import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-parchment">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[220px] flex-col border-r border-line bg-white lg:flex">
        <div className="border-b border-line p-6">
          <img src="/logo-black.png" alt="logo" />
          <span className="mt-0.5 block text-center font-mono text-[10px] font-medium uppercase tracking-wider text-indigo">
            Admin
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AdminNav />
        </div>

        <div className="w-full shrink-0 border-t border-line bg-indigo-400 p-4 text-black">
          <p className="mb-2 truncate text-black">{user?.email}</p>
          <SignOutButton />
        </div>
      </aside>

      <main className="p-6 lg:ml-[220px] lg:p-10">{children}</main>
    </div>
  );
}