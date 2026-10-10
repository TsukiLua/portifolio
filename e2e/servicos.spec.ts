import { expect, test } from "@playwright/test";
import { SITES } from "../playwright.config";

const BASE = SITES.servicos;

test("CTA principal leva ao formulário de orçamento", async ({ page }) => {
  await page.goto(BASE + "/");
  await page.getByRole("link", { name: "Pedir orçamento grátis" }).click();
  await expect(page).toHaveURL(/#orcamento$/);
  await expect(page.getByLabel("Nome")).toBeInViewport();
});

test("cartão de serviço pré-seleciona o tipo no formulário", async ({ page }) => {
  await page.goto(BASE + "/");
  await page.getByRole("link", { name: "Orçamento de pintura" }).click();
  await expect(page.getByLabel("Tipo de serviço")).toHaveValue("pintura");
});

test("validação, máscara de telefone e confirmação sem alegar envio", async ({ page }) => {
  await page.goto(BASE + "/#orcamento");
  await page.getByRole("button", { name: "Solicitar orçamento grátis" }).click();
  const summary = page.getByRole("alert").filter({ hasText: "Revise" });
  await expect(summary).toContainText("Revise 5 campos");
  await expect(summary).toBeFocused();

  await page.getByLabel("Nome").fill("Mariana Costa");
  await page.getByLabel("Telefone / WhatsApp").pressSequentially("11987654321");
  await expect(page.getByLabel("Telefone / WhatsApp")).toHaveValue("(11) 98765-4321");
  await page.getByLabel("Tipo de serviço").selectOption("eletrica");
  await page.getByLabel("Bairro").selectOption("vila-aurora");
  await page.getByLabel("O que precisa ser feito?").fill("Curto");
  await page.getByRole("button", { name: "Solicitar orçamento grátis" }).click();
  await expect(summary).toContainText("Revise 1 campo");
  await page.getByLabel("O que precisa ser feito?").fill("Trocar o chuveiro e duas tomadas da cozinha.");
  await page.getByText("Manhã", { exact: true }).click();
  await page.getByRole("button", { name: "Solicitar orçamento grátis" }).click();

  await expect(page.getByText("Preparando sua solicitação…")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Solicitação pronta, Mariana/ })).toBeVisible();
  await expect(page.getByText(/não foi enviado/)).toBeVisible();
  const href = await page.getByRole("link", { name: "Enviar pelo WhatsApp" }).getAttribute("href");
  const message = decodeURIComponent(href!.split("text=")[1]!);
  expect(message).toContain("Serviço: Elétrica");
  expect(message).toContain("Bairro: Vila Aurora");
  expect(message).toContain("Melhor período: Manhã");

  await page.getByRole("button", { name: "Nova solicitação" }).click();
  await expect(page.getByLabel("Nome")).toHaveValue("");
});

test("links de contato (telefone e e-mail) são funcionais", async ({ page }) => {
  await page.goto(BASE + "/");
  await expect(page.locator("a[href^='tel:']").first()).toHaveAttribute("href", /^tel:\+55\d{10,11}$/);
  await expect(page.locator("a[href^='mailto:']").first()).toHaveAttribute("href", /^mailto:.+@.+\.example$/);
});
