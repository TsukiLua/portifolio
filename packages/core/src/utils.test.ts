import { describe, expect, it } from "vitest";
import { maskBrPhone, validateBrPhone } from "./phone";
import { buildWhatsAppUrl, composeMessage, normalizeWhatsAppNumber } from "./whatsapp";
import { formatBRL, formatDuration, normalizeText, slugify } from "./format";
import { compactErrors, validateName, validatePhone } from "./validation";
import { addDays, formatDateLong, isISODate, timeToMinutes, minutesToTime } from "./date";

describe("telefone", () => {
  it("aplica máscara progressiva", () => {
    expect(maskBrPhone("1")).toBe("(1");
    expect(maskBrPhone("11")).toBe("(11");
    expect(maskBrPhone("119")).toBe("(11) 9");
    expect(maskBrPhone("1198765")).toBe("(11) 9876-5");
    expect(maskBrPhone("1134567890")).toBe("(11) 3456-7890");
    expect(maskBrPhone("11987654321")).toBe("(11) 98765-4321");
    expect(maskBrPhone("11987654321999")).toBe("(11) 98765-4321");
    expect(maskBrPhone("+55 (11) 98765-4321")).toBe("(11) 98765-4321");
  });

  it("valida DDD e formato", () => {
    expect(validateBrPhone("")).toBe("vazio");
    expect(validateBrPhone("(11) 9876")).toBe("incompleto");
    expect(validateBrPhone("(20) 98765-4321")).toBe("ddd");
    expect(validateBrPhone("(11) 88765-4321")).toBe("formato");
    expect(validateBrPhone("(11) 9876-5432")).toBe("formato");
    expect(validateBrPhone("(11) 98765-4321")).toBeNull();
    expect(validateBrPhone("(21) 3456-7890")).toBeNull();
  });
});

describe("whatsapp", () => {
  it("normaliza números com e sem código do país", () => {
    expect(normalizeWhatsAppNumber("(11) 98765-4321")).toBe("5511987654321");
    expect(normalizeWhatsAppNumber("5511987654321")).toBe("5511987654321");
    expect(normalizeWhatsAppNumber("")).toBeNull();
    expect(normalizeWhatsAppNumber(undefined)).toBeNull();
  });

  it("gera link com mensagem codificada", () => {
    expect(buildWhatsAppUrl("Olá! Corte & barba?", "11987654321")).toBe(
      "https://wa.me/5511987654321?text=Ol%C3%A1!%20Corte%20%26%20barba%3F",
    );
  });

  it("sem número, abre o seletor de contatos", () => {
    expect(buildWhatsAppUrl("Oi")).toBe("https://wa.me/?text=Oi");
  });

  it("compõe mensagens ignorando linhas vazias", () => {
    expect(composeMessage(["a", undefined, false, "", "b"])).toBe("a\nb");
  });
});

describe("formatação", () => {
  it("formata moeda e duração", () => {
    expect(formatBRL(45)).toBe("R$ 45,00");
    expect(formatBRL(1234.5)).toBe("R$ 1.234,50");
    expect(formatDuration(30)).toBe("30 min");
    expect(formatDuration(60)).toBe("1h");
    expect(formatDuration(90)).toBe("1h30");
  });

  it("gera slugs e normaliza texto para busca", () => {
    expect(slugify("Camisa de Linho — Areia")).toBe("camisa-de-linho-areia");
    expect(normalizeText("  Vestido ÁGUA ")).toBe("vestido agua");
  });
});

describe("validação", () => {
  it("valida nome", () => {
    expect(validateName("")).toBe("Informe seu nome.");
    expect(validateName("Jo")).toMatch(/ao menos 3/);
    expect(validateName("João da Silva")).toBeNull();
    expect(validateName("Ana D'Ávila")).toBeNull();
    expect(validateName("R2D2")).toMatch(/apenas letras/);
  });

  it("traduz erros de telefone", () => {
    expect(validatePhone("(11) 98765-4321")).toBeNull();
    expect(validatePhone("123")).toMatch(/incompleto/);
  });

  it("compacta erros", () => {
    expect(compactErrors({ a: null, b: "erro" })).toEqual({ b: "erro" });
  });
});

describe("datas", () => {
  it("manipula datas ISO no fuso local", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(isISODate("2026-02-30")).toBe(false);
    expect(isISODate("2026-02-28")).toBe(true);
    expect(timeToMinutes("09:30")).toBe(570);
    expect(minutesToTime(570)).toBe("09:30");
    expect(formatDateLong("2026-10-12")).toBe("segunda-feira, 12 de outubro");
  });
});
