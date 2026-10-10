import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Agendar horário",
  description: "Escolha serviço, barbeiro, dia e horário em poucos toques.",
  robots: { index: false, follow: false },
};

export default function BookingPage() {
  return (
    <div className="border-b border-smoke">
      <Container className="py-12 sm:py-16">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-ember">Agendamento online</p>
        <h1 className="sr-only">Agendar horário na Brasa Barbearia</h1>
        <Suspense fallback={<p className="text-ash">Carregando…</p>}>
          <BookingFlow />
        </Suspense>
      </Container>
    </div>
  );
}
