import { buildWhatsAppUrl } from "@demo/core/whatsapp";
import { business } from "../data/business";
import { whatsappNumber } from "./config";

export const generalWhatsAppUrl = buildWhatsAppUrl(
  `Olá, ${business.shortName}! Vim pelo site e gostaria de tirar uma dúvida sobre os serviços.`,
  whatsappNumber,
);

export const whatsappUrl = (message: string) => buildWhatsAppUrl(message, whatsappNumber);
