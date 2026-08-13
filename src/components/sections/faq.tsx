import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

export function Faq() {
  return (
    <section id="faq" className="bg-parchment-warm py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-[28px] font-semibold sm:text-[38px]">
            Frequently Asked
          </h2>
          <p className="max-w-[380px] text-[15px] text-ink/55">
            Straight answers, before you ever have to ask.
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0" className="max-w-[760px]">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
