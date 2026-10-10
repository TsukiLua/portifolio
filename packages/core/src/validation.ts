import { PHONE_ERROR_MESSAGES, validateBrPhone } from "./phone";

export function validateName(value: string): string | null {
  const name = value.trim().replace(/\s+/g, " ");
  if (!name) return "Informe seu nome.";
  if (name.length < 3) return "O nome precisa ter ao menos 3 letras.";
  if (name.length > 80) return "Use no máximo 80 caracteres.";
  if (!/^[\p{L}][\p{L}' .-]*$/u.test(name)) return "Use apenas letras no nome.";
  return null;
}

export function validatePhone(value: string): string | null {
  const error = validateBrPhone(value);
  return error ? PHONE_ERROR_MESSAGES[error] : null;
}

export function validateRequired(value: string, message: string): string | null {
  return value.trim() ? null : message;
}

export function validateLength(value: string, { min, max }: { min?: number; max?: number }, label: string) {
  const length = value.trim().length;
  if (min !== undefined && length < min) return `${label} precisa ter ao menos ${min} caracteres.`;
  if (max !== undefined && length > max) return `${label} pode ter no máximo ${max} caracteres.`;
  return null;
}

/** Remove chaves sem erro; útil para saber se o formulário é válido. */
export function compactErrors<K extends string>(errors: Record<K, string | null>): Partial<Record<K, string>> {
  const result: Partial<Record<K, string>> = {};
  for (const key of Object.keys(errors) as K[]) {
    const message = errors[key];
    if (message) result[key] = message;
  }
  return result;
}
