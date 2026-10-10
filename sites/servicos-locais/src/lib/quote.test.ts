import { describe, expect, it } from "vitest";
import { EMPTY_QUOTE, quoteMessage, serviceWhatsAppMessage, validateQuote, type QuoteForm } from "./quote";

const valid: QuoteForm = {
  name: "Mariana Costa",
  phone: "(11) 98765-4321",
  service: "eletrica",
  region: "vila-aurora",
  description: "Trocar o chuveiro e duas tomadas da cozinha.",
  period: "manha",
};

describe("formulário de orçamento", () => {
  it("aceita um formulário completo", () => {
    expect(validateQuote(valid)).toEqual({});
  });

  it("aponta todos os campos obrigatórios vazios", () => {
    expect(Object.keys(validateQuote(EMPTY_QUOTE)).sort()).toEqual(["description", "name", "phone", "region", "service"]);
  });

  it("recusa telefone inválido, serviço/bairro inexistentes e descrição curta", () => {
    const errors = validateQuote({ ...valid, phone: "(11) 1234", service: "jardinagem", region: "atlantida", description: "Tomada" });
    expect(errors.phone).toMatch(/incompleto/);
    expect(errors.service).toBeDefined();
    expect(errors.region).toBeDefined();
    expect(errors.description).toMatch(/ao menos 15/);
  });

  it("aceita 'outro serviço' e 'outro bairro'", () => {
    expect(validateQuote({ ...valid, service: "outro", region: "outra" })).toEqual({});
  });

  it("monta mensagem de WhatsApp com os dados preenchidos", () => {
    const message = quoteMessage(valid);
    expect(message).toContain("Serviço: Elétrica");
    expect(message).toContain("Bairro: Vila Aurora");
    expect(message).toContain("Melhor período: Manhã");
    expect(message).toContain("O que preciso: Trocar o chuveiro");
    expect(quoteMessage({ ...valid, period: "" })).not.toContain("período");
  });

  it("contextualiza a mensagem curta por serviço", () => {
    expect(serviceWhatsAppMessage("pintura")).toContain("orçamento de pintura");
    expect(serviceWhatsAppMessage()).toContain("serviço na minha casa");
  });
});
