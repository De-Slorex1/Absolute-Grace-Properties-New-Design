import { createClient } from "@/lib/supabase/server";

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("investor_applications")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-8 font-serif text-2xl font-semibold">Investor Leads</h1>

      <div className="overflow-x-auto rounded-sm border border-line bg-white">
        <table className="w-full text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-line text-[11.5px] uppercase tracking-wider text-ink/45">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Contact</th>
              <th className="p-4 font-medium">Capacity</th>
              <th className="p-4 font-medium">Development</th>
              <th className="p-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads?.map((lead) => (
              <tr key={lead.id} className="border-b border-line last:border-none hover:bg-parchment-warm">
                <td className="p-4 font-medium">{lead.name}</td>
                <td className="p-4 text-ink/60">
                  <div>{lead.email}</div>
                  <div className="text-[12px]">{lead.phone}</div>
                </td>
                <td className="p-4 text-ink/60">{lead.capacity}</td>
                <td className="p-4 text-ink/60">{lead.development || "—"}</td>
                <td className="p-4 font-mono text-[11.5px] text-ink/40">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!leads || leads.length === 0) && (
          <p className="p-6 text-center text-[13px] text-ink/45">No investor leads yet.</p>
        )}
      </div>
    </div>
  );
}