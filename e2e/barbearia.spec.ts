import { expect, test } from "@playwright/test";
import { SITES } from "../playwright.config";
import { pickFirstFreeSlot } from "./helpers";

const BASE = SITES.barbearia;

test("serviço da lista de preços abre o agendamento já selecionado", async ({ page }) => {
  await page.goto(BASE + "/");
  await page.getByRole("link", { name: /Agendar Degradê \(fade\)/ }).click();
  await expect(page).toHaveURL(/agendar\?servico=corte-degrade/);
  await expect(page.getByRole("heading", { name: "Com quem?" })).toBeVisible();
});

test("fluxo completo de agendamento até a confirmação demonstrativa", async ({ page }) => {
  await page.goto(BASE + "/agendar?servico=corte-degrade");

  await page.getByText("Sem preferência", { exact: true }).click();
  await page.getByRole("button", { name: "Continuar" }).click();

  // Data: primeira habilitada. Dias fechados ficam desabilitados.
  await expect(page.getByRole("heading", { name: "Dia e horário" })).toBeVisible();
  expect(await page.locator("input[name='data']:disabled").count()).toBeGreaterThan(0);
  await expect(page.locator("input[name='horario']").first()).toBeAttached();
  await pickFirstFreeSlot(page);
  await expect(page.getByText(/Disponível com:/)).toBeVisible();
  await page.getByRole("button", { name: "Continuar" }).click();

  // Validação do formulário.
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByText("Informe seu nome.")).toBeVisible();
  await page.getByLabel("Nome completo").fill("Lucas Pereira");
  await page.getByLabel("WhatsApp").pressSequentially("1198765");
  await expect(page.getByLabel("WhatsApp")).toHaveValue("(11) 9876-5");
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByText(/Telefone incompleto/)).toBeVisible();
  await page.getByLabel("WhatsApp").fill("");
  await page.getByLabel("WhatsApp").pressSequentially("11987654321");
  await expect(page.getByLabel("WhatsApp")).toHaveValue("(11) 98765-4321");
  await page.getByRole("button", { name: "Continuar" }).click();

  await expect(page.getByRole("heading", { name: "Confira tudo" })).toBeVisible();
  await expect(page.getByRole("main").getByText("Lucas Pereira").first()).toBeVisible();
  await page.getByRole("button", { name: "Confirmar pedido" }).click();

  await expect(page.getByRole("heading", { name: "Pedido de horário pronto" })).toBeVisible();
  await expect(page.getByText(/Nenhum horário foi reservado/)).toBeVisible();
  const href = await page.getByRole("link", { name: "Enviar pelo WhatsApp" }).getAttribute("href");
  const message = decodeURIComponent(href!.split("text=")[1]!);
  expect(message).toContain("Degradê (fade)");
  expect(message).toContain("Nome: Lucas Pereira");
  expect(message).toMatch(/Barbeiro: (Rafael|Diego|Caio)/);
});

test("formulário de dados é operável só pelo teclado", async ({ page }) => {
  await page.goto(BASE + "/agendar?servico=pezinho&barbeiro=caio");
  await expect(page.getByRole("heading", { name: "Dia e horário" })).toBeVisible();
  await pickFirstFreeSlot(page, { keyboard: true });
  await page.getByRole("button", { name: "Continuar" }).focus();
  await page.keyboard.press("Enter");
  // O foco vai para o título da nova etapa; o próximo Tab chega ao primeiro campo.
  await expect(page.getByRole("heading", { name: "Seus dados" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Nome completo")).toBeFocused();
  await page.keyboard.type("Ana Lima");
  await page.keyboard.press("Tab");
  await page.keyboard.type("21987654321");
  await expect(page.getByLabel("WhatsApp")).toHaveValue("(21) 98765-4321");
});
