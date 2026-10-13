import { expect, test } from "@playwright/test";
import { SITES } from "../playwright.config";

const BASE = SITES.catalogo;
const cards = (page: import("@playwright/test").Page) => page.locator("#conteudo ul li article");

test("busca, filtros, ordenação, URL e estado vazio", async ({ page }) => {
  await page.goto(BASE + "/catalogo");
  await expect(page.getByText("20 peças encontradas")).toBeVisible();

  await page.getByLabel("Buscar por nome do produto").fill("vestido");
  await expect(page.getByText("4 peças encontradas")).toBeVisible();
  await expect(page).toHaveURL(/q=vestido/);

  await page.getByLabel("Buscar por nome do produto").fill("");
  await page.getByRole("complementary", { name: "Filtros" }).getByText("Acessórios").click();
  await expect(page).toHaveURL(/categoria=acessorios/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Acessórios");
  await expect(cards(page)).toHaveCount(4);

  await page.getByRole("complementary", { name: "Filtros" }).getByText("Até R$ 200").click();
  await expect(cards(page)).toHaveCount(2);

  await page.getByLabel("Ordenar por").selectOption("maior-preco");
  const prices = await cards(page).locator("p").allInnerTexts();
  const values = prices.map((p) => Number(p.replace(/[^\d,]/g, "").replace(",", ".")));
  expect(values).toEqual([...values].sort((a, b) => b - a));

  await page.getByLabel("Buscar por nome do produto").fill("bolsa");
  await expect(page.getByRole("heading", { name: "Nenhuma peça encontrada" })).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).last().click();
  await expect(page.getByText("20 peças encontradas")).toBeVisible();
  await expect(page).toHaveURL(/\/catalogo$/);
});

test("URL compartilhável restaura os filtros", async ({ page }) => {
  await page.goto(BASE + "/catalogo?categoria=calcas&ordem=menor-preco");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Calças");
  await expect(cards(page)).toHaveCount(3);
  await expect(page.getByLabel("Ordenar por")).toHaveValue("menor-preco");
});

test("busca do topo leva ao catálogo filtrado", async ({ page }) => {
  await page.goto(BASE + "/");
  await page.getByRole("searchbox", { name: "Buscar produtos" }).first().fill("óculos");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/catalogo\?q=/);
  await expect(page.getByText("2 peças encontradas")).toBeVisible();
});

test("variantes obrigatórias e mensagem de WhatsApp com a variante", async ({ page }) => {
  await page.goto(BASE + "/produto/camisa-linho-gola-padre-off-white");
  const order = page.getByRole("button", { name: "Pedir pelo WhatsApp" });
  await order.click();
  await expect(page.getByText("Escolha uma cor.")).toBeVisible();
  await page.getByText("Areia", { exact: true }).click();
  await order.click();
  await expect(page.getByText("Escolha um tamanho.")).toBeVisible();
  await expect(page.locator("input[name='tamanho'][disabled]")).toHaveCount(1); // GG indisponível
  await page.locator("label", { hasText: /^M$/ }).click();
  const href = await page.getByRole("link", { name: "Pedir pelo WhatsApp" }).getAttribute("href");
  const message = decodeURIComponent(href!.split("text=")[1]!);
  expect(message).toContain("Camisa de Linho Gola Padre (ref. MR-001)");
  expect(message).toContain("Cor: Areia · Tamanho: M");
  expect(message).toContain("/produto/camisa-linho-gola-padre-off-white");
});

test("produto esgotado não permite pedido e oferece aviso de reposição", async ({ page }) => {
  await page.goto(BASE + "/produto/vestido-chemise-rose");
  await expect(page.getByText("Esta peça esgotou.")).toBeVisible();
  await expect(page.getByText("Pedir pelo WhatsApp")).toHaveCount(0);
  const href = await page.getByRole("link", { name: "Perguntar sobre reposição" }).getAttribute("href");
  expect(decodeURIComponent(href!)).toContain("previsão de reposição");
});

test("lista de interesse demonstrativa persiste e gera mensagem única", async ({ page }) => {
  await page.goto(BASE + "/produto/bolsa-transversal-couro-caramelo");
  await page.getByRole("button", { name: "Adicionar à lista" }).click();
  await expect(page.getByText("Adicionada à sua lista de interesse.")).toBeVisible();
  await page.goto(BASE + "/produto/oculos-redondo-tartaruga");
  await page.getByRole("button", { name: "Adicionar à lista" }).click();
  await page.reload();
  const listButton = page.getByRole("button", { name: /Lista de interesse, 2 itens/ });
  await listButton.click();
  const dialog = page.getByRole("dialog", { name: "Lista de interesse" });
  await expect(dialog.getByText(/não é um pedido nem reserva/i)).toBeVisible();
  const href = await dialog.getByRole("link", { name: "Consultar lista no WhatsApp" }).getAttribute("href");
  expect(decodeURIComponent(href!)).toContain("Total estimado: R$ 639,80");
  await dialog.getByRole("button", { name: "Remover Bolsa Transversal Couro Caramelo da lista" }).click();
  await expect(page.getByRole("button", { name: /Lista de interesse, 1 item$/ })).toBeAttached();
});

test("checkbox de esgotados responde na hora (regressão)", async ({ page }) => {
  await page.goto(BASE + "/catalogo");
  const checkbox = page.getByRole("complementary", { name: "Filtros" }).getByLabel("Ocultar peças esgotadas");
  await checkbox.check();
  await expect(checkbox).toBeChecked();
  await expect(page.getByText("19 peças encontradas")).toBeVisible();
  await expect(page).toHaveURL(/disponiveis=1/);
});
