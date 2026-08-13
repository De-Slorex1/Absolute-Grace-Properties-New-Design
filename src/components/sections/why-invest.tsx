const reasons = [
  {
    num: "01 — Growth",
    title: "Expanding corridors",
    body: "All three locations sit in Ibadan axes with active road and infrastructure development — Moniya and Akobo in particular have seen steady appreciation over the past five years.",
  },
  {
    num: "02 — Ownership",
    title: "Verified from day one",
    body: "Every title is checked against Oyo State land registry records before a plot is offered for sale, and surveyed boundaries are set before, not after, purchase.",
  },
  {
    num: "03 — Access",
    title: "Never landlocked",
    body: "Every plot we sell has a confirmed access road. We don't sell parcels that require negotiating passage across someone else's land.",
  },
];

export function WhyInvest() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-[28px] font-semibold sm:text-[38px]">
            Why This Lasts
          </h2>
          <p className="max-w-[380px] text-[15px] text-ink/55">
            Three reasons land in these corridors holds and grows in value.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-12">
          {reasons.map((r) => (
            <div key={r.num}>
              <span className="mb-4.5 block font-mono text-[13px] text-indigo">{r.num}</span>
              <h4 className="mb-3 font-serif text-xl font-semibold sm:text-[22px]">{r.title}</h4>
              <p className="text-[14.5px] leading-relaxed text-ink/60">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
