import { createClient } from "@/lib/supabase/server";
import { Users, MessageSquare, TrendingUp, Building2 } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: leadsCount },
    { count: messagesCount },
    { count: listingsCount },
    { data: recentLeads },
    { data: recentMessages },
    { data: recentListings },
  ] = await Promise.all([
    supabase.from("investor_applications").select("*", { count: "exact", head: true }),
    supabase.from("property_inquiries").select("*", { count: "exact", head: true }),
    supabase.from("developments").select("*", { count: "exact", head: true }),
    supabase
      .from("investor_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("property_inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("developments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <div>
      <h1 className="mb-8 font-serif text-2xl font-semibold">Dashboard</h1>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Building2} label="Listings" value={listingsCount ?? 0} />
        <StatCard icon={Users} label="Investor Leads" value={leadsCount ?? 0} />
        <StatCard icon={MessageSquare} label="Property Inquiries" value={messagesCount ?? 0} />
        <StatCard
          icon={TrendingUp}
          label="Total Submissions"
          value={(leadsCount ?? 0) + (messagesCount ?? 0)}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <h2 className="mb-4 font-serif text-lg font-semibold">Recent Listings</h2>
          <div className="rounded-sm border border-line bg-white">
            {recentListings && recentListings.length > 0 ? (
              recentListings.map((dev) => (
                <div key={dev.id} className="border-b border-line p-4 last:border-none">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[14px] font-medium">{dev.name}</span>
                    <span
                      className={`shrink-0 rounded-sm px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider ${
                        dev.published ? "bg-whatsapp/10 text-whatsapp" : "bg-ink/5 text-ink/50"
                      }`}
                    >
                      {dev.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-ink/55">
                    {dev.location} · {dev.price_from}
                  </p>
                </div>
              ))
            ) : (
              <p className="p-4 text-[13px] text-ink/45">No listings yet.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-lg font-semibold">Recent Investor Leads</h2>
          <div className="rounded-sm border border-line bg-white">
            {recentLeads && recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="border-b border-line p-4 last:border-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-medium">{lead.name}</span>
                    <span className="font-mono text-[11px] text-ink/40">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-ink/55">
                    {lead.capacity} · {lead.development || "No preference"}
                  </p>
                </div>
              ))
            ) : (
              <p className="p-4 text-[13px] text-ink/45">No leads yet.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-lg font-semibold">Recent Messages</h2>
          <div className="rounded-sm border border-line bg-white">
            {recentMessages && recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div key={msg.id} className="border-b border-line p-4 last:border-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-medium">{msg.name}</span>
                    <span className="font-mono text-[11px] text-ink/40">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-[12.5px] text-ink/55">{msg.message}</p>
                </div>
              ))
            ) : (
              <p className="p-4 text-[13px] text-ink/45">No messages yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-sm border border-line bg-white p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo/10">
        <Icon className="h-4.5 w-4.5 text-indigo" />
      </div>
      <b className="block font-serif text-3xl font-semibold">{value}</b>
      <span className="text-[13px] text-ink/50">{label}</span>
    </div>
  );
}