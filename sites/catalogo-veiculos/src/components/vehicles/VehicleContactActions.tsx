import Link from "next/link";
import { CalendarCheck, Search } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { vehicleWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/icons";
import { buttonClasses } from "../ui/primitives";

/** CTAs do anúncio, adaptados ao status (disponível, reservado, vendido). */
export function VehicleContactActions({ vehicle }: { vehicle: Vehicle }) {
  if (vehicle.status === "sold") {
    return (
      <div className="grid gap-3">
        <p className="rounded-lg bg-ink/5 p-3 text-sm">Este veículo já foi vendido. Veja opções parecidas ou peça para um consultor procurar.</p>
        <Link href={`/estoque?tipo=${vehicle.category}`} className={buttonClasses("dark")}>
          <Search aria-hidden className="h-4 w-4" /> Ver similares
        </Link>
        <a href={vehicleWhatsAppLink(vehicle, "similar")} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp")}>
          <WhatsAppIcon /> Pedir algo parecido
        </a>
      </div>
    );
  }

  if (vehicle.status === "reserved") {
    return (
      <div className="grid gap-3">
        <p className="rounded-lg bg-warn/10 p-3 text-sm text-warn">Reservado para outro cliente. Podemos avisar se a negociação não for concluída.</p>
        <a href={vehicleWhatsAppLink(vehicle, "reserva")} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp")}>
          <WhatsAppIcon /> Avise-me se liberar
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      <a href={vehicleWhatsAppLink(vehicle, "interesse")} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "text-base")}>
        <WhatsAppIcon /> Tenho interesse
      </a>
      <a href="#agendar-visita" className={buttonClasses("outline", "text-base")}>
        <CalendarCheck aria-hidden className="h-4 w-4" /> Agendar visita
      </a>
      <p className="text-xs text-steel">O WhatsApp abre com a mensagem pronta; nada é enviado sem a sua confirmação.</p>
    </div>
  );
}
