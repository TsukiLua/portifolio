import type { Metadata } from "next";
import { Suspense } from "react";
import { RequestFlow } from "@/components/booking/RequestFlow";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Solicitar horário",
  description: "Escolha tratamentos, profissional, data e horário e envie sua solicitação.",
  robots: { index: false, follow: false },
};

export default function RequestPage() {
  return (
    <Container className="pt-10 sm:pt-14">
      <p className="font-serif text-lg text-clay italic">Agenda online</p>
      <h1 className="mt-1 font-serif text-5xl font-medium text-moss-dark sm:text-6xl">Solicitar horário</h1>
      <p className="mt-3 mb-10 max-w-xl text-mute">Monte seu atendimento em quatro etapas. Você revisa tudo antes de confirmar.</p>
      <Suspense fallback={<p className="text-mute">Carregando…</p>}>
        <RequestFlow />
      </Suspense>
    </Container>
  );
}
