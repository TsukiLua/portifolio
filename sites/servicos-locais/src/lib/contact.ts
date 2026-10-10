import { buildWhatsAppUrl } from "@demo/core/whatsapp";
import { whatsappNumber } from "./config";
import { serviceWhatsAppMessage } from "./quote";

export const whatsappUrl = (message: string) => buildWhatsAppUrl(message, whatsappNumber);

/** Link de WhatsApp com mensagem inicial contextualizada (por serviço, quando informado). */
export const serviceWhatsAppUrl = (serviceId?: string) => whatsappUrl(serviceWhatsAppMessage(serviceId));
