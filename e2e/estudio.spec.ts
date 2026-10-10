import { expect, test } from "@playwright/test";
import { SITES } from "../playwright.config";
import { pickFirstFreeSlot } from "./helpers";

const BASE = SITES.estudio;

test("etapas ficam bloqueadas até a anterior ser concluída", async ({ page }) => {
  await page.goto(BASE + "/agendar");
  await expect(page.locator("#etapa-profissional")).toContainText("Conclua a etapa anterior");
  // Sobrancelha é feita por duas profissionais: é preciso escolher para liberar a etapa 3.
  await page.getByText("Design de sobrancelhas", { exact: true }).click();
  await expect(page.locator("#etapa-profissional")).not.toContainText("Conclua a etapa anterior");
  await expect(page.locator("#etapa-horario")).toContainText("Conclua a etapa anterior");
  await page.getByText("Helena Duarte", { exact: true }).click();
  await expect(page.locator("#etapa-horario")).not.toContainText("Conclua a etapa anterior");
});

test("limite de 3 tratamentos e profissionais compatíveis", async ({ page }) => {
  await page.goto(BASE + "/agendar");
  for (const name of ["Manicure", "Pedicure", "Lash lifting"]) await page.getByText(name, { exact: true }).click();
  await expect(page.getByText("Limite de 3 tratamentos por solicitação.")).toBeVisible();
  await expect(page.locator("label", { hasText: "Corte e escova" }).locator("input")).toBeDisabled();
  // Só a Joana faz unhas + cílios: ela já vem selecionada e não há "sem preferência".
  const pros = page.locator("#etapa-profissional input[name='profissional']");
  await expect(pros).toHaveCount(1);
  await expect(pros.first()).toBeChecked();

  await page.getByText("Lash lifting", { exact: true }).click();
  await page.getByText("Coloração de raiz", { exact: true }).click();
  await expect(page.getByText(/Nenhuma profissional realiza essa combinação/)).toBeVisible();
});

test("fluxo completo com calendário, horários, validação e confirmação demonstrativa", async ({ page }) => {
  await page.goto(BASE + "/agendar?tratamento=design-sobrancelhas");
  await page.getByText("Sem preferência").click();

  // Datas passadas e dias fechados estão desabilitados.
  expect(await page.locator("input[name='data']:disabled").count()).toBeGreaterThan(0);
  await pickFirstFreeSlot(page);

  await page.getByRole("button", { name: "Revisar" }).click();
  await expect(page.getByLabel("Nome")).toBeFocused();
  await expect(page.getByText("Informe seu nome.")).toBeVisible();
  await expect(page.getByText(/Precisamos do seu consentimento/)).toBeVisible();

  await page.getByLabel("Nome").fill("Ana Souza");
  await page.getByLabel("WhatsApp").pressSequentially("11987654321");
  await page.getByLabel("E-mail").fill("ana@");
  await page.getByRole("button", { name: "Revisar" }).click();
  await expect(page.getByText(/Confira o e-mail/)).toBeVisible();
  await page.getByLabel("E-mail").fill("ana@exemplo.com");
  await page.getByRole("checkbox", { name: /Autorizo o uso/ }).check();
  await page.getByRole("button", { name: "Revisar" }).click();

  await expect(page.getByRole("heading", { name: "Revise sua solicitação" })).toBeVisible();
  await page.getByRole("button", { name: "Confirmar solicitação" }).click();
  await expect(page.getByRole("heading", { name: "Solicitação pronta para envio" })).toBeVisible();
  await expect(page.getByText(/nenhum horário foi reservado/)).toBeVisible();
  const href = await page.getByRole("link", { name: "Enviar pelo WhatsApp" }).getAttribute("href");
  const message = decodeURIComponent(href!.split("text=")[1]!);
  expect(message).toContain("Design de sobrancelhas (30 min)");
  expect(message).toMatch(/Profissional: (Helena Duarte|Joana Reis)/);
  expect(message).toContain("E-mail: ana@exemplo.com");
});
