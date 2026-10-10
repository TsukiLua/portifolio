/**
 * Regras do formulário de orçamento. Sem backend: a "solicitação" é montada localmente e
 * o visitante pode encaminhá-la pelo WhatsApp. Veja o README para ativar um envio real.
 */
import { compactErrors, validateLength, validateName, validatePhone, validateRequired } from "@demo/core/validation";
import { composeMessage } from "@demo/core/whatsapp";
import { OTHER_REGION, business, getRegionName, regions } from "../data/business";
import { OTHER_SERVICE, getServiceName, homeServices } from "../data/services";

export interface QuoteForm {
  name: string;
  phone: string;
  service: string;
  region: string;
  description: string;
  period: "" | "manha" | "tarde" | "qualquer";
}

export type QuoteErrors = Partial<Record<keyof QuoteForm, string>>;

export const EMPTY_QUOTE: QuoteForm = { name: "", phone: "", service: "", region: "", description: "", period: "" };

export const PERIOD_LABELS: Record<Exclude<QuoteForm["period"], "">, string> = {
  manha: "Manhã",
  tarde: "Tarde",
  qualquer: "Qualquer horário",
};

const validServices = new Set([...homeServices.map((s) => s.id), OTHER_SERVICE]);
const validRegions = new Set([...regions.map((r) => r.id), OTHER_REGION]);

export const DESCRIPTION_MIN = 15;
export const DESCRIPTION_MAX = 600;

export function validateQuote(form: QuoteForm): QuoteErrors {
  return compactErrors({
    name: validateName(form.name),
    phone: validatePhone(form.phone),
    service: validServices.has(form.service) ? null : "Escolha o tipo de serviço.",
    region: validRegions.has(form.region) ? null : "Escolha o bairro do atendimento.",
    description:
      validateRequired(form.description, "Conte rapidamente o que precisa ser feito.") ??
      validateLength(form.description, { min: DESCRIPTION_MIN, max: DESCRIPTION_MAX }, "A descrição"),
    period: null,
  });
}

/** Ordem de foco/exibição dos erros. */
export const QUOTE_FIELDS: (keyof QuoteForm)[] = ["name", "phone", "service", "region", "description", "period"];

export function quoteMessage(form: QuoteForm): string {
  return composeMessage([
    `Olá, ${business.name}! Gostaria de um orçamento.`,
    `• Nome: ${form.name.trim()}`,
    `• Telefone: ${form.phone}`,
    `• Serviço: ${getServiceName(form.service) ?? "-"}`,
    `• Bairro: ${getRegionName(form.region) ?? "-"}`,
    form.period ? `• Melhor período: ${PERIOD_LABELS[form.period]}` : null,
    `• O que preciso: ${form.description.trim()}`,
  ]);
}

/** Mensagem curta para CTAs de WhatsApp contextualizados por serviço. */
export function serviceWhatsAppMessage(serviceId?: string): string {
  const name = serviceId ? getServiceName(serviceId) : undefined;
  return name
    ? `Olá, ${business.name}! Vi o site e gostaria de um orçamento de ${name.toLowerCase()}.`
    : `Olá, ${business.name}! Vi o site e gostaria de um orçamento para um serviço na minha casa.`;
}
