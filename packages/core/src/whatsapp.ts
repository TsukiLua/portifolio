/**
 * Links de abertura de conversa no WhatsApp (wa.me). Nada é enviado automaticamente:
 * o visitante revisa a mensagem e decide se envia.
 *
 * Sem número configurado, o link abre o WhatsApp com a mensagem pronta e o seletor de contatos,
 * evitando expor telefones de terceiros nas demonstrações.
 */
import { onlyDigits } from "./phone";

export function normalizeWhatsAppNumber(phone: string | undefined | null): string | null {
  const digits = onlyDigits(phone ?? "");
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  if (digits.length >= 12 && digits.length <= 13 && digits.startsWith("55")) return digits;
  return null;
}

export function buildWhatsAppUrl(message: string, phone?: string | null): string {
  const number = normalizeWhatsAppNumber(phone);
  const text = encodeURIComponent(message.trim());
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

/** Monta mensagens em linhas, ignorando linhas vazias/indefinidas. */
export function composeMessage(lines: ReadonlyArray<string | false | null | undefined>): string {
  return lines.filter((line): line is string => typeof line === "string" && line.length > 0).join("\n");
}
