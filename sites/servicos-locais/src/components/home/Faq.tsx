import { ChevronDown } from "lucide-react";
import { faq } from "@/data/content";
import { Container, SectionHeading } from "../ui";

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading id="duvidas-title" center eyebrow="Dúvidas frequentes" title="Antes de pedir, talvez você queira saber" />
        <div className="mt-12 space-y-3">
          {faq.map((item) => (
            <details key={item.q} className="group rounded-2xl bg-white ring-1 ring-line open:ring-brand/40">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-6 py-4 text-lg font-bold">
                {item.q}
                <ChevronDown aria-hidden className="h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
