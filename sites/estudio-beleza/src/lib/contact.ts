import { buildWhatsAppUrl } from "@demo/core/whatsapp";
import { studio } from "../data/studio";
import { whatsappNumber } from "./config";

export const whatsappUrl = (message: string) => buildWhatsAppUrl(message, whatsappNumber);

export const generalWhatsAppUrl = whatsappUrl(`Olá, ${studio.shortName}! Vim pelo site e gostaria de tirar uma dúvida sobre os tratamentos.`);
