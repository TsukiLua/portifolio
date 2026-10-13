/**
 * Contato: links de WhatsApp (função única) e e-mail. Nada é enviado automaticamente —
 * os links abrem o aplicativo com a mensagem pronta e o visitante decide.
 */
import { buildWhatsAppUrl, composeMessage } from "@demo/core/whatsapp";
import { validateName } from "@demo/core/validation";
import { profile } from "../data/profile";

/** Número em NEXT_PUBLIC_WHATSAPP_NUMBER (DDD + número). Sem número, abre o seletor de contatos. */
export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export const whatsappLink = (message: string, number: string = whatsappNumber) => buildWhatsAppUrl(message, number);

export const GENERAL_MESSAGE = "Olá! Encontrei seu portfólio e gostaria de conversar sobre o desenvolvimento de um site para minha empresa.";

export const projectMessage = (projectName: string) =>
  `Olá! Vi o projeto ${projectName} no seu portfólio e gostaria de solicitar um orçamento para uma solução semelhante.`;

export function mailtoLink(subject: string, body = "", email: string = profile.email): string {
  const params = new URLSearchParams();
  params.set("subject", subject);
  if (body) params.set("body", body);
  // mailto usa %20 para espaços (URLSearchParams usa "+", que alguns clientes de e-mail exibem literalmente).
  return `mailto:${email}?${params.toString().replace(/\+/g, "%20")}`;
}

export const SITE_TYPES = {
  institucional: "Site institucional",
  landing: "Landing page",
  catalogo: "Catálogo digital",
  agendamento: "Site com agendamento",
  outro: "Ainda não sei / outro",
} as const;

export type SiteType = keyof typeof SITE_TYPES;

export interface QuoteForm {
  name: string;
  company: string;
  siteType: SiteType | "";
  features: string;
  deadline: string;
  message: string;
}

export const EMPTY_QUOTE: QuoteForm = { name: "", company: "", siteType: "", features: "", deadline: "", message: "" };

/** Só nome e tipo de site são obrigatórios: o resto é opcional para não travar a conversa. */
export function validateQuote(form: QuoteForm): Partial<Record<keyof QuoteForm, string>> {
  const errors: Partial<Record<keyof QuoteForm, string>> = {};
  const name = validateName(form.name);
  if (name) errors.name = name;
  if (!form.siteType) errors.siteType = "Escolha o tipo de site (pode ser \"Ainda não sei\").";
  for (const key of ["company", "features", "deadline", "message"] as const) {
    if (form[key].length > 500) errors[key] = "Use no máximo 500 caracteres.";
  }
  return errors;
}

export function quoteMessage(form: QuoteForm): string {
  return composeMessage([
    `Olá! Meu nome é ${form.name.trim()}${form.company.trim() ? `, da ${form.company.trim()}` : ""}. Encontrei seu portfólio e gostaria de um orçamento.`,
    form.siteType && `• Tipo de site: ${SITE_TYPES[form.siteType]}`,
    form.features.trim() && `• Funcionalidades: ${form.features.trim()}`,
    form.deadline.trim() && `• Prazo desejado: ${form.deadline.trim()}`,
    form.message.trim() && `• Mais detalhes: ${form.message.trim()}`,
  ]);
}
