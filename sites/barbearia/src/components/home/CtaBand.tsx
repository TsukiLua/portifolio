import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { Container } from "../ui";

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="bg-ember text-coal">
      <Container className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
        <h2 id="cta-title" className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl">
          Sua cadeira
          <br />
          está esperando
        </h2>
        <Link
          href="/agendar"
          className="inline-flex min-h-12 items-center gap-2 bg-coal px-7 text-sm font-bold uppercase tracking-[0.12em] text-bone transition-colors hover:bg-char"
        >
          <CalendarClock aria-hidden className="h-4 w-4" />
          Escolher horário
        </Link>
      </Container>
    </section>
  );
}
