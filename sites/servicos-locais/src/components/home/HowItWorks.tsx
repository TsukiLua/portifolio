import Link from "next/link";
import { steps } from "@/data/content";
import { buttonClasses, Container, SectionHeading } from "../ui";

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="como-title" center eyebrow="Como funciona" title="Do pedido ao serviço pronto em 4 passos" />
        <ol className="mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className="relative text-center md:text-left">
              {i < steps.length - 1 && (
                <span aria-hidden className="absolute top-6 left-[calc(50%+2rem)] hidden h-0.5 w-[calc(100%-4rem)] bg-line md:left-16 md:block md:w-[calc(100%-4rem)]" />
              )}
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sun text-lg font-extrabold md:mx-0">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-extrabold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <Link href="/#orcamento" className={buttonClasses("primary")}>
            Começar pelo passo 1
          </Link>
        </div>
      </Container>
    </section>
  );
}
