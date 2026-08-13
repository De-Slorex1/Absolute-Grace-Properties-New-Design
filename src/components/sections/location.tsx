const nearRoad = [
  { label: "Eruwa Express Road", value: "5–7 min walk" },
  { label: "Federal Express/Highway (Moniya)", value: "3 min drive" },
  { label: "Old Bodija (head office)", value: "18 min drive" },
];

const landmarks = [
  { label: "Lagelu Local Govt Secretariat", value: "10 min drive" },
  { label: "Moniya Market", value: "6 min drive" },
  { label: "Ibadan City Centre", value: "25–35 min drive" },
];

export function Location() {
  return (
    <section id="location" className="bg-parchment-warm py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-[28px] font-semibold sm:text-[38px]">
            Location &amp; Access
          </h2>
          <p className="max-w-[380px] text-[15px] text-ink/55">
            All three developments sit within a short drive of central Ibadan.
          </p>
        </div>

        <div className="grid grid-cols-1 border border-line md:grid-cols-2">
          <LocCol title="Right off the main road" rows={nearRoad} />
          <LocCol title="Nearby landmarks" rows={landmarks} border />
        </div>
      </div>
    </section>
  );
}

function LocCol({
  title,
  rows,
  border,
}: {
  title: string;
  rows: { label: string; value: string }[];
  border?: boolean;
}) {
  return (
    <div className={`p-7 sm:p-11 ${border ? "border-t md:border-l md:border-t-0 border-line" : ""}`}>
      <h3 className="mb-5 font-serif text-xl font-semibold">{title}</h3>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex justify-between border-b border-line py-3.5 text-sm last:border-none"
        >
          <span>{r.label}</span>
          <span className="font-mono text-[12.5px] text-clay">{r.value}</span>
        </div>
      ))}
    </div>
  );
}
