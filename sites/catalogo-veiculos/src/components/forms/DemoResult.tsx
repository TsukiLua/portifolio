import { Info, RotateCcw } from "lucide-react";
import { WhatsAppIcon } from "../ui/icons";
import { buttonClasses } from "../ui/primitives";

/**
 * Resultado de formulário em modo demonstrativo: NÃO afirma envio. Mostra a mensagem
 * pronta e oferece abri-la no WhatsApp, onde o visitante decide se envia.
 */
export function DemoResult({
  headingRef,
  title,
  message,
  whatsappUrl,
  onReset,
}: {
  headingRef: React.Ref<HTMLHeadingElement>;
  title: string;
  message: string;
  whatsappUrl: string;
  onReset: () => void;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <h3 ref={headingRef} tabIndex={-1} className="text-xl font-bold focus:outline-none">
        {title}
      </h3>
      <p role="note" className="mt-3 flex gap-2.5 rounded-lg bg-wine-soft p-3 text-sm text-wine-dark">
        <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          <strong>Modo demonstrativo:</strong> nada foi enviado nem armazenado. Para falar com a loja, envie a mensagem
          abaixo pelo WhatsApp.
        </span>
      </p>
      <pre className="mt-4 rounded-lg bg-paper p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">{message}</pre>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp")}>
          <WhatsAppIcon /> Abrir no WhatsApp
        </a>
        <button type="button" onClick={onReset} className={buttonClasses("outline")}>
          <RotateCcw aria-hidden className="h-4 w-4" /> Editar dados
        </button>
      </div>
    </div>
  );
}
