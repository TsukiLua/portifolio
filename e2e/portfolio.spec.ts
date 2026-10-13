import { expect, test } from "@playwright/test";
import { SITES } from "../playwright.config";

const BASE = SITES.portfolio;
const PROJECT_SLUGS = ["catalogo-automotivo", "site-para-barbearia", "catalogo-de-produtos", "site-para-estudio-de-beleza", "site-para-negocio-local"];

test("hero comunica quem é, o que faz e leva a projetos e contato", async ({ page }) => {
  await page.goto(BASE + "/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Transformo ideias em sites");
  await page.getByRole("link", { name: "Ver projetos" }).click();
  await expect(page).toHaveURL(/#projetos$/);
  await expect(page.getByRole("heading", { name: /Projetos pensados/ })).toBeInViewport();
  await page.getByRole("banner").getByRole("link", { name: "Solicitar orçamento" }).click();
  await expect(page).toHaveURL(/#contato$/);
  await expect(page.getByRole("heading", { name: /Vamos tirar seu próximo projeto/ })).toBeInViewport();
});

test("navegação indica a seção atual", async ({ page }) => {
  await page.goto(BASE + "/");
  const nav = page.getByRole("navigation", { name: "Principal" });
  await expect(nav.getByRole("link", { name: "Início" })).toHaveAttribute("aria-current", "location");
  await page.locator("#servicos").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 200));
  await expect(nav.getByRole("link", { name: "Serviços" })).toHaveAttribute("aria-current", "location");
});

test("galeria mostra os projetos com destaque, selo demonstrativo e links válidos", async ({ page, request }) => {
  await page.goto(BASE + "/");
  const section = page.locator("#projetos");
  await expect(section.locator("article")).toHaveCount(PROJECT_SLUGS.length);
  await expect(section.locator("article").first()).toContainText("Prime Motors");
  await expect(section.getByText("Projeto demonstrativo")).toHaveCount(PROJECT_SLUGS.length);
  for (const slug of PROJECT_SLUGS) {
    const link = section.locator(`a[href="/projetos/${slug}"]`).filter({ hasText: "Ver projeto" });
    await expect(link).toHaveCount(1);
    expect((await request.get(`${BASE}/projetos/${slug}`)).status()).toBe(200);
  }
  // Build sem URLs de demonstração configuradas: o botão não aparece (nada de link quebrado).
  await expect(page.getByRole("link", { name: /Abrir demonstração/ })).toHaveCount(0);
});

test("página de projeto: conteúdo, aviso honesto e CTA com mensagem do projeto", async ({ page }) => {
  await page.goto(BASE + "/projetos/catalogo-automotivo");
  await expect(page).toHaveTitle(/Prime Motors — Catálogo automotivo/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Prime Motors");
  await expect(page.getByText(/não houve cliente contratante/)).toBeVisible();
  for (const block of ["Visão geral", "Objetivo", "Público-alvo", "Problema", "Funcionalidades", "Decisões de UX/UI", "Tecnologias"]) {
    await expect(page.getByRole("region", { name: block })).toBeVisible();
  }
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", /\/projetos\/catalogo-automotivo$/);
  const href = await page.getByRole("link", { name: "Solicitar projeto semelhante" }).getAttribute("href");
  expect(decodeURIComponent(href!.split("text=")[1]!)).toBe(
    "Olá! Vi o projeto Prime Motors no seu portfólio e gostaria de solicitar um orçamento para uma solução semelhante.",
  );
  await page.getByRole("navigation", { name: "Outros projetos" }).getByRole("link", { name: /Próximo/ }).click();
  await expect(page).toHaveURL(/\/projetos\/site-para-barbearia$/);
  await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Projetos" })).toHaveAttribute("aria-current", "location");
});

test("projeto inexistente retorna 404 com página própria", async ({ page }) => {
  const res = await page.goto(BASE + "/projetos/nao-existe");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Projeto não encontrado" })).toBeVisible();
});

test("contato: WhatsApp geral, e-mail e formulário que só prepara a mensagem", async ({ page }) => {
  await page.goto(BASE + "/#contato");
  const contact = page.locator("#contato");
  const wa = await contact.getByRole("link", { name: "Conversar no WhatsApp" }).getAttribute("href");
  expect(decodeURIComponent(wa!.split("text=")[1]!)).toBe(
    "Olá! Encontrei seu portfólio e gostaria de conversar sobre o desenvolvimento de um site para minha empresa.",
  );
  await expect(contact.locator("a[href^='mailto:']").first()).toHaveAttribute("href", /^mailto:.+\?subject=/);

  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await expect(page.getByText("Informe seu nome.")).toBeVisible();
  await expect(page.getByLabel("Nome", { exact: true })).toBeFocused();
  await page.getByLabel("Nome", { exact: true }).fill("Ana Lima");
  await page.getByLabel("Tipo de site").selectOption("catalogo");
  await page.getByLabel(/Empresa/).fill("Doces da Ana");
  await page.getByLabel(/Prazo desejado/).fill("Dezembro");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();

  await expect(page.getByRole("heading", { name: "Mensagem pronta" })).toBeFocused();
  await expect(page.getByText("Nada foi enviado ainda.", { exact: false })).toBeVisible();
  const send = await page.getByRole("link", { name: "Enviar pelo WhatsApp" }).getAttribute("href");
  const message = decodeURIComponent(send!.split("text=")[1]!);
  expect(message).toContain("Meu nome é Ana Lima, da Doces da Ana.");
  expect(message).toContain("• Tipo de site: Catálogo digital");
  const mail = await page.getByRole("link", { name: "Enviar por e-mail" }).getAttribute("href");
  expect(decodeURIComponent(mail!)).toContain("Orçamento de site — Ana Lima");
});

test("rodapé: ano atual e nenhuma rede social fictícia", async ({ page }) => {
  await page.goto(BASE + "/");
  const footer = page.getByRole("contentinfo");
  await expect(footer).toContainText(`© ${new Date().getFullYear()}`);
  for (const host of ["instagram.com", "linkedin.com", "github.com", "facebook.com"]) {
    await expect(footer.locator(`a[href*="${host}"]`)).toHaveCount(0);
  }
});
