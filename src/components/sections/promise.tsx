const values = [
  {
    n: "01",
    title: "Verified Titles",
    body: "Every plot is surveyed and title-checked before it's ever listed for sale.",
  },
  {
    n: "02",
    title: "Real Developments",
    body: "You can visit every site in person — nothing is sold from a brochure alone.",
  },
  {
    n: "03",
    title: "Transparent Pricing",
    body: "One price, clearly stated in Naira, with payment plans available on request.",
  },
  {
    n: "04",
    title: "Trusted Since 2025",
    body: "Over a decade of closed transactions across Ibadan and Oyo State.",
  },
];

export function Promise() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="mb-14 grid grid-cols-1 gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-clay">
              <span className="h-px w-7 bg-clay" />
              Our Promise
            </div>
            <h2 className="font-serif text-[28px] font-semibold leading-tight sm:text-[38px]">
              We sell land the way land should be sold — plainly.
            </h2>
          </div>
          <p className="text-[16px] leading-relaxed text-ink/70 sm:text-[16.5px]">
            No inflated promises, no paper-only plots. Every development we sell
            is one our team has walked, surveyed, and can take you to see before
            you commit a single naira. We&apos;ve built our name in Ibadan since
            2025 on one principle: what you&apos;re shown is what you get, and
            what you buy is what&apos;s registered in your name.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
           <div
              key={v.n}
              className="group relative overflow-hidden bg-parchment p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Animated background */}
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-indigo transition-transform duration-500 ease-out group-hover:scale-y-100" />

              {/* Content */}
              <div className="relative z-10">
                <span className="mb-3.5 block font-mono text-xs text-indigo transition-colors duration-500 group-hover:text-white/70">
                  {v.n}
                </span>

                <h4 className="mb-2 font-serif text-[19px] font-semibold transition-colors duration-500 group-hover:text-white">
                  {v.title}
                </h4>

                <p className="text-[13.5px] leading-relaxed text-ink/55 transition-colors duration-500 group-hover:text-white/75">
                  {v.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
