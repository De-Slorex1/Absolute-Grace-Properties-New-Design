import { createClient } from "@/lib/supabase/server";

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("property_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-8 font-serif text-2xl font-semibold">Messages</h1>

      <div className="space-y-3">
        {messages?.map((msg) => (
          <div key={msg.id} className="rounded-sm border border-line bg-white p-5">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-medium">{msg.name}</span>
                <span className="ml-2 text-[12.5px] text-ink/50">{msg.email}</span>
              </div>
              <span className="font-mono text-[11px] text-ink/40">
                {new Date(msg.created_at).toLocaleString()}
              </span>
            </div>
            {msg.development_name && (
              <span className="mb-2 inline-block rounded-sm bg-indigo/10 px-2.5 py-1 font-mono text-[10.5px] text-indigo">
                {msg.development_name}
              </span>
            )}
            <p className="text-[14px] leading-relaxed text-ink/70">{msg.message}</p>
          </div>
        ))}
        {(!messages || messages.length === 0) && (
          <p className="rounded-sm border border-line bg-white p-6 text-center text-[13px] text-ink/45">
            No messages yet.
          </p>
        )}
      </div>
    </div>
  );
}