import Link from "next/link";
import { CircleCheck, Info, MessageCircle, RotateCcw } from "lucide-react";
import { buttonClasses } from "../ui";
import { Summary, type SummaryData } from "./Summary";

export function BookingDone({
  data,
  whatsappUrl,
  onRestart,
  headingRef,
}: {
  data: SummaryData;
  whatsappUrl: string;
  onRestart: () => void;
  headingRef: React.Ref<HTMLHeadingElement>;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <CircleCheck aria-hidden className="h-14 w-14 text-ok" />
      <h2 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.95] focus:outline-none">
        Pedido de horário pronto
      </h2>
      <p className="mt-4 text-lg text-bone/85">
        Falta só um passo: envie o pedido pelo WhatsApp para a barbearia confirmar.
      </p>

      <div role="note" className="mt-6 flex gap-3 border-l-2 border-ember bg-char p-4 text-sm leading-relaxed text-ash">
        <Info aria-hidden className="h-5 w-5 shrink-0 text-ember" />
        <p>
          <strong className="text-bone">Esta é uma demonstração.</strong> Nenhum horário foi reservado e nenhum dado foi
          enviado à barbearia. Em um site real, este passo gravaria o agendamento no sistema de agenda ou enviaria a
          confirmação automaticamente.
        </p>
      </div>

      <div className="mt-8">
        <Summary data={data} title="Seu pedido" />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary")}>
          <MessageCircle aria-hidden className="h-4 w-4" />
          Enviar pelo WhatsApp
        </a>
        <button type="button" onClick={onRestart} className={buttonClasses("outline")}>
          <RotateCcw aria-hidden className="h-4 w-4" />
          Novo agendamento
        </button>
      </div>
      <p className="mt-3 text-xs text-ash">O WhatsApp abre com a mensagem pronta. Nada é enviado sem a sua ação.</p>
      <Link href="/" className="mt-10 inline-block text-sm text-ash underline underline-offset-4 hover:text-bone">
        Voltar ao site
      </Link>
    </div>
  );
}
