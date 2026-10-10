import { buildWhatsAppUrl } from "@demo/core/whatsapp";
import { store } from "../data/store";
import { siteUrl, whatsappNumber } from "./config";

export const whatsappUrl = (message: string) => buildWhatsAppUrl(message, whatsappNumber);

export const generalWhatsAppUrl = whatsappUrl(`Olá, ${store.name}! Vi o catálogo no site e gostaria de atendimento.`);

export const productUrl = (slug: string) => `${siteUrl}/produto/${slug}`;
