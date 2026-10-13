/**
 * Função ÚNICA para links de WhatsApp do site. Usa wa.me com a mensagem codificada;
 * o envio é sempre decisão do visitante (nada é enviado automaticamente).
 */
import { buildWhatsAppUrl } from "@demo/core/whatsapp";
import type { Vehicle } from "../types/vehicle";
import { dealership } from "../data/dealership";
import { formatKm, formatPrice, formatYear, vehicleFullName } from "./formatters";

/**
 * Número da loja vindo de NEXT_PUBLIC_WHATSAPP_NUMBER (DDD + número; o 55 é adicionado se faltar).
 * Sem número configurado, o link abre o WhatsApp com a mensagem pronta e o visitante escolhe o contato,
 * para que a demonstração nunca direcione mensagens a um telefone de terceiros.
 */
export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export const whatsappLink = (message: string, number: string = whatsappNumber) => buildWhatsAppUrl(message, number);

export type VehicleIntent = "interesse" | "visita" | "reserva" | "similar";

/** Mensagem padrão do briefing, com variações por intenção. */
export function vehicleMessage(v: Vehicle, intent: VehicleIntent = "interesse"): string {
  const base = `Olá! Tenho interesse no veículo ${vehicleFullName(v)}, ano ${formatYear(v)}, anunciado por ${formatPrice(v.price)}.`;
  const ref = `Referência: ${v.id}.`;
  switch (intent) {
    case "visita":
      return `${base} Gostaria de agendar uma visita para conhecê-lo. ${ref}`;
    case "reserva":
      return `${base} Vi que está reservado. Podem me avisar se ficar disponível? ${ref}`;
    case "similar":
      return `Olá! Vi o ${vehicleFullName(v)} (${formatYear(v)}, ${formatKm(v.mileageKm)}) já vendido no site. Vocês têm algo parecido? ${ref}`;
    default:
      return `${base} Gostaria de receber mais informações. ${ref}`;
  }
}

/** Intenção adequada ao status do anúncio. */
export const intentForStatus = (v: Vehicle): VehicleIntent =>
  v.status === "sold" ? "similar" : v.status === "reserved" ? "reserva" : "interesse";

export const vehicleWhatsAppLink = (v: Vehicle, intent: VehicleIntent = intentForStatus(v)) =>
  whatsappLink(vehicleMessage(v, intent));

export const generalWhatsAppLink = () =>
  whatsappLink(`Olá, ${dealership.name}! Vim pelo site e gostaria de falar com um consultor.`);
