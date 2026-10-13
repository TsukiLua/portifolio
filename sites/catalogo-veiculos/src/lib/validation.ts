/**
 * Schemas Zod: formulários (contato e interesse) e integridade do estoque de demonstração.
 * O mesmo schema pode ser reutilizado no servidor quando houver backend.
 */
import { z } from "zod";
import { addDays, isISODate, toISODate, weekdayOf } from "@demo/core/date";
import { PHONE_ERROR_MESSAGES, validateBrPhone } from "@demo/core/phone";
import { validateName } from "@demo/core/validation";
import { CATEGORIES, FUELS, STATUSES, TRANSMISSIONS } from "../types/vehicle";

const name = z.string().superRefine((value, ctx) => {
  const error = validateName(value);
  if (error) ctx.addIssue({ code: "custom", message: error });
});

const phone = z.string().superRefine((value, ctx) => {
  const error = validateBrPhone(value);
  if (error) ctx.addIssue({ code: "custom", message: PHONE_ERROR_MESSAGES[error] });
});

const optionalEmail = z
  .string()
  .trim()
  .refine((v) => v === "" || z.email().safeParse(v).success, "Confira o e-mail (ex.: nome@dominio.com).");

export const CONTACT_SUBJECTS = {
  veiculo: "Interesse em um veículo",
  financiamento: "Simulação de financiamento",
  visita: "Agendar visita",
  outro: "Outro assunto",
} as const;

export const contactSchema = z.object({
  name,
  phone,
  email: optionalEmail,
  subject: z.enum(Object.keys(CONTACT_SUBJECTS) as [keyof typeof CONTACT_SUBJECTS, ...(keyof typeof CONTACT_SUBJECTS)[]], {
    error: "Escolha um assunto.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Escreva ao menos 10 caracteres.")
    .max(1000, "Use no máximo 1.000 caracteres."),
});

export type ContactInput = z.input<typeof contactSchema>;

/** Data de visita: a partir de amanhã, até 60 dias, sem dias fechados. Valida contra "hoje" informado. */
export function visitDateSchema(today: Date, closedWeekdays: readonly number[]) {
  const min = addDays(toISODate(today), 1);
  const max = addDays(toISODate(today), 60);
  return z
    .string()
    .refine((v) => v === "" || isISODate(v), "Data inválida.")
    .refine((v) => v === "" || v >= min, "Escolha uma data a partir de amanhã.")
    .refine((v) => v === "" || v <= max, "Agendamos com até 60 dias de antecedência.")
    .refine((v) => v === "" || !closedWeekdays.includes(weekdayOf(v)), "A loja não abre nesse dia. Escolha outra data.");
}

export function interestSchema(today: Date, closedWeekdays: readonly number[]) {
  return z.object({
    name,
    phone,
    intent: z.enum(["interesse", "visita"]),
    visitDate: visitDateSchema(today, closedWeekdays),
    period: z.enum(["", "manha", "tarde"]),
    message: z.string().trim().max(500, "Use no máximo 500 caracteres."),
  }).refine((d) => d.intent !== "visita" || d.visitDate !== "", { path: ["visitDate"], message: "Escolha a data da visita." });
}

export type InterestInput = z.input<ReturnType<typeof interestSchema>>;

/** Converte o resultado do Zod em { campo: primeira mensagem }. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

/** Schema do estoque — garante consistência dos dados de demonstração (rodado nos testes). */
const image = z.object({
  // Em produção é StaticImageData; nos testes (Vite) a importação vira string.
  src: z.union([z.string().min(1), z.object({ src: z.string().min(1), width: z.number(), height: z.number() })]),
  alt: z.string().min(10),
});

const currentYear = new Date().getFullYear();

export const vehicleSchema = z
  .object({
    id: z.string().regex(/^PM-\d{4}$/),
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    brand: z.string().min(2),
    model: z.string().min(1),
    version: z.string().min(1),
    category: z.enum(CATEGORIES),
    year: z.number().int().min(1950).max(currentYear + 1),
    modelYear: z.number().int().optional(),
    price: z.number().int().positive(),
    mileageKm: z.number().int().nonnegative(),
    fuel: z.enum(FUELS),
    transmission: z.enum(TRANSMISSIONS),
    color: z.string().min(3),
    doors: z.number().int().min(2).max(5).optional(),
    passengers: z.number().int().min(1).max(9).optional(),
    description: z.string().min(60),
    features: z.array(z.string().min(3)).min(3),
    images: z.array(image).min(1),
    featured: z.boolean(),
    condition: z.enum(["used", "new"]),
    status: z.enum(STATUSES),
  })
  .refine((v) => v.modelYear === undefined || v.modelYear === v.year || v.modelYear === v.year + 1, {
    message: "Ano-modelo deve ser igual ou um ano após a fabricação.",
    path: ["modelYear"],
  })
  .refine((v) => v.category === "motorcycle" || v.doors !== undefined, { message: "Carros precisam de número de portas.", path: ["doors"] })
  .refine((v) => v.condition === "new" || v.mileageKm > 0, { message: "Usado precisa de quilometragem.", path: ["mileageKm"] });
