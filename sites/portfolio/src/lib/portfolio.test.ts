import { describe, expect, it } from "vitest";
import { featuredProject, getProject, otherProjects, projects } from "../data/projects";
import { pendingProfileFields, profile } from "../data/profile";
import { services } from "../data/services";
import { EMPTY_QUOTE, GENERAL_MESSAGE, mailtoLink, projectMessage, quoteMessage, validateQuote, whatsappLink } from "./contact";

describe("projetos", () => {
  it("têm IDs e slugs únicos, amigáveis e dados obrigatórios", () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    for (const p of projects) {
      expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(p.features.length).toBeGreaterThanOrEqual(3);
      expect(p.problem.length).toBeGreaterThan(40);
      expect(p.cover.alt.length).toBeGreaterThan(10);
      expect(p.gallery.every((img) => img.alt.length > 10 && img.caption)).toBe(true);
    }
  });

  it("inclui os três tipos pedidos e exatamente um destaque", () => {
    expect(getProject("catalogo-automotivo")).toBeDefined();
    expect(getProject("site-para-negocio-local")).toBeDefined();
    expect(getProject("catalogo-de-produtos")).toBeDefined();
    expect(projects.filter((p) => p.featured)).toHaveLength(1);
    expect(featuredProject.slug).toBe("catalogo-automotivo");
    expect(otherProjects).not.toContain(featuredProject);
  });

  it("não declara trabalhos de cliente nem demonstração sem URL válida", () => {
    // Enquanto não houver clientes reais, todos os projetos devem ser demonstrativos.
    expect(projects.every((p) => p.status === "demonstrativo")).toBe(true);
    for (const p of projects) if (p.demoUrl) expect(p.demoUrl).toMatch(/^https?:\/\//);
  });

  it("não contém métricas ou resultados inventados", () => {
    const text = JSON.stringify(projects.map((p) => [p.summary, p.problem, p.objective, p.solution, p.features, p.uxDecisions])).toLowerCase();
    for (const forbidden of ["conversão de", "aumento de", "faturamento", "% de", "clientes atendidos", "depoimento de"]) {
      expect(text).not.toContain(forbidden);
    }
  });
});

describe("perfil e serviços", () => {
  it("aponta campos pendentes enquanto houver valores de exemplo", () => {
    expect(pendingProfileFields(profile, "")).toContain("NEXT_PUBLIC_WHATSAPP_NUMBER (.env.local)");
    expect(pendingProfileFields({ ...profile, name: "Ana Lima", email: "ana@ana.dev" }, "11987654321")).toEqual([]);
  });

  it("lista os quatro serviços pedidos", () => {
    expect(services.map((s) => s.title)).toEqual(["Sites institucionais", "Landing pages", "Catálogos digitais", "Funcionalidades personalizadas"]);
  });
});

describe("WhatsApp e e-mail", () => {
  it("gera mensagens geral e por projeto com codificação correta", () => {
    expect(GENERAL_MESSAGE).toBe("Olá! Encontrei seu portfólio e gostaria de conversar sobre o desenvolvimento de um site para minha empresa.");
    expect(projectMessage("Prime Motors")).toBe(
      "Olá! Vi o projeto Prime Motors no seu portfólio e gostaria de solicitar um orçamento para uma solução semelhante.",
    );
    const url = whatsappLink(projectMessage("Maré"), "11987654321");
    expect(url.startsWith("https://wa.me/5511987654321?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1]!)).toBe(projectMessage("Maré"));
    expect(whatsappLink("Oi", "")).toBe("https://wa.me/?text=Oi");
  });

  it("monta mailto com assunto e corpo codificados", () => {
    const link = mailtoLink("Orçamento de site", "Olá & tudo bem?", "eu@exemplo.com");
    expect(link).toBe("mailto:eu@exemplo.com?subject=Or%C3%A7amento%20de%20site&body=Ol%C3%A1%20%26%20tudo%20bem%3F");
  });
});

describe("formulário de orçamento", () => {
  it("exige apenas nome e tipo de site", () => {
    expect(Object.keys(validateQuote(EMPTY_QUOTE)).sort()).toEqual(["name", "siteType"]);
    expect(validateQuote({ ...EMPTY_QUOTE, name: "Ana Lima", siteType: "outro" })).toEqual({});
  });

  it("inclui só os campos preenchidos na mensagem", () => {
    const message = quoteMessage({ ...EMPTY_QUOTE, name: "Ana Lima", company: "Doces da Ana", siteType: "catalogo", deadline: "Dezembro" });
    expect(message).toContain("Meu nome é Ana Lima, da Doces da Ana.");
    expect(message).toContain("• Tipo de site: Catálogo digital");
    expect(message).toContain("• Prazo desejado: Dezembro");
    expect(message).not.toContain("Funcionalidades");
  });
});
