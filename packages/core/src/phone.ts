/** Telefones brasileiros: máscara progressiva e validação de DDD e formato. */

export const onlyDigits = (value: string) => value.replace(/\D/g, "");

const VALID_DDDS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
  49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

/** Aplica a máscara "(11) 98765-4321" ou "(11) 3456-7890" conforme o usuário digita. */
export function maskBrPhone(value: string): string {
  let digits = onlyDigits(value);
  // Permite colar com código do país.
  if (digits.length > 11 && digits.startsWith("55")) digits = digits.slice(2);
  digits = digits.slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  const splitAt = digits.length === 11 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, splitAt)}-${rest.slice(splitAt)}`;
}

export type PhoneError = "vazio" | "incompleto" | "ddd" | "formato";

export function validateBrPhone(value: string): PhoneError | null {
  const digits = onlyDigits(value);
  if (digits.length === 0) return "vazio";
  if (digits.length < 10 || digits.length > 11) return "incompleto";
  if (!VALID_DDDS.has(Number(digits.slice(0, 2)))) return "ddd";
  const first = digits[2];
  if (digits.length === 11 && first !== "9") return "formato"; // celular começa com 9
  if (digits.length === 10 && !["2", "3", "4", "5"].includes(first ?? "")) return "formato"; // fixo
  return null;
}

export const isValidBrPhone = (value: string) => validateBrPhone(value) === null;

export const PHONE_ERROR_MESSAGES: Record<PhoneError, string> = {
  vazio: "Informe um telefone para contato.",
  incompleto: "Telefone incompleto. Use DDD + número, ex.: (11) 98765-4321.",
  ddd: "DDD inválido. Confira os dois primeiros dígitos.",
  formato: "Número inválido. Celulares têm 9 dígitos e começam com 9.",
};
