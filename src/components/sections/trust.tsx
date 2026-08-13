const credentials = [
  {
    tag: "CAC / RC 000000",
    body: "Absolute Grace Properties Ltd is fully registered with the Corporate Affairs Commission.",
  },
  {
    tag: "SCUML COMPLIANT",
    body: "Registered with the Special Control Unit Against Money Laundering, as required for real estate operators in Nigeria.",
  },
  {
    tag: "OYSBPP APPROVED",
    body: "Development layouts approved by the Oyo State Bureau of Physical Planning and Development Control.",
  },
  {
    tag: "SURVEYED & BEACONED",
    body: "Every plot boundary is set by a licensed surveyor before it is listed for sale.",
  },
];

export function Trust() {
  return (
    <section className="bg-ink py-14 text-white sm:py-16">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="mb-9 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-serif text-2xl font-semibold text-white sm:text-[28px]">
            Verified &amp; Trusted
          </h2>
          <span className="font-mono text-xs text-clay-light">
            COMPLIANCE &amp; REGISTRATION
          </span>
        </div>

        <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((c) => (
            <div key={c.tag} className="bg-ink p-6">
              <span className="mb-3 block font-mono text-[11px] tracking-wider text-clay-light">
                {c.tag}
              </span>
              <p className="text-[13.5px] leading-relaxed text-white/75">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
