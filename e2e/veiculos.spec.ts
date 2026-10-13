import { expect, test, type Page } from "@playwright/test";
import { SITES } from "../playwright.config";

const BASE = SITES.veiculos;
const count = (page: Page) => page.locator("#contagem");
const cards = (page: Page) => page.locator("#conteudo section article");
const sidebar = (page: Page) => page.getByRole("complementary", { name: "Filtros" });

test("busca rápida da home leva ao estoque com os filtros aplicados", async ({ page }) => {
  await page.goto(BASE + "/");
  await page.getByLabel("Marca", { exact: true }).selectOption("Toyota");
  await page.getByLabel("Tipo de veículo", { exact: true }).selectOption("suv");
  await page.getByRole("button", { name: "Buscar veículos" }).click();
  await expect(page).toHaveURL(/\/estoque\?.*marca=Toyota.*tipo=suv/);
  await expect(count(page)).toHaveText("2 veículos encontrados");
  await expect(page.getByRole("button", { name: "Remover filtro Toyota" })).toBeVisible();
  await expect(sidebar(page).getByLabel("Marca")).toHaveValue("Toyota");
});

test("destaques e categorias da home vêm dos dados", async ({ page }) => {
  await page.goto(BASE + "/");
  const featured = page.getByRole("region", { name: "Veículos em destaque" }).locator("article");
  await expect(featured).toHaveCount(6);
  await expect(featured.first().getByText("Destaque")).toBeVisible();
  await page.getByRole("link", { name: /Picapes/ }).click();
  await expect(page).toHaveURL(/tipo=pickup/);
  await expect(count(page)).toHaveText("2 veículos encontrados");
});

test("busca textual, modelo dependente da marca, chips e limpar filtros", async ({ page }) => {
  await page.goto(BASE + "/estoque");
  await expect(count(page)).toHaveText("17 veículos encontrados");

  await page.getByLabel("Buscar por marca, modelo ou versão").fill("corolla");
  await expect(count(page)).toHaveText("2 veículos encontrados");
  await expect(page).toHaveURL(/q=corolla/);
  await page.getByRole("button", { name: "Limpar busca" }).click();

  const model = sidebar(page).getByLabel("Modelo");
  await expect(model).toBeDisabled();
  await sidebar(page).getByLabel("Marca").selectOption("Honda");
  await expect(model).toBeEnabled();
  await model.selectOption("Civic");
  await expect(count(page)).toHaveText("1 veículo encontrado");
  await expect(page).toHaveURL(/marca=Honda&modelo=Civic/);

  // Remover a marca remove também o modelo dependente.
  await page.getByRole("button", { name: "Remover filtro Honda" }).click();
  await expect(page.getByRole("button", { name: "Remover filtro Civic" })).toHaveCount(0);
  await expect(count(page)).toHaveText("17 veículos encontrados");

  await sidebar(page).getByLabel("Combustível").selectOption("diesel");
  await sidebar(page).getByLabel("Somente disponíveis").check();
  await expect(count(page)).toHaveText("1 veículo encontrado");
  await page.getByRole("button", { name: "Limpar filtros" }).first().click();
  await expect(count(page)).toHaveText("17 veículos encontrados");
  await expect(page).toHaveURL(/\/estoque$/);
});

test("filtros combinados e ordenação por preço", async ({ page }) => {
  await page.goto(BASE + "/estoque");
  await sidebar(page).getByLabel("Tipo de veículo").selectOption("suv");
  await sidebar(page).getByLabel("Câmbio").selectOption("cvt");
  await sidebar(page).getByLabel("Preço máximo").selectOption("150000");
  await expect(count(page)).toHaveText("2 veículos encontrados");
  await sidebar(page).getByLabel("Preço máximo").selectOption("120000");
  await expect(count(page)).toHaveText("1 veículo encontrado");
  await expect(cards(page).first()).toContainText("HR-V");

  await page.goto(BASE + "/estoque?ordem=menor-preco&disponiveis=1");
  const prices = await cards(page).locator("p.font-display").allInnerTexts();
  const values = prices.map((p) => Number(p.replace(/\D/g, "")));
  expect(values.length).toBeGreaterThan(5);
  expect(values).toEqual([...values].sort((a, b) => a - b));
});

test("URL filtrada reconstrói os filtros e estado vazio aparece sem correspondência", async ({ page }) => {
  await page.goto(BASE + "/estoque?marca=Honda&modelo=Civic&ordem=menor-km");
  await expect(sidebar(page).getByLabel("Modelo")).toHaveValue("Civic");
  await expect(page.getByLabel("Ordenar")).toHaveValue("menor-km");
  await expect(count(page)).toHaveText("1 veículo encontrado");

  await page.goto(BASE + "/estoque?tipo=motorcycle&combustivel=diesel");
  await expect(page.getByRole("heading", { name: "Nenhum veículo com esses filtros" })).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).last().click();
  await expect(count(page)).toHaveText("17 veículos encontrados");
});

test("no celular, os filtros abrem em gaveta", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE + "/estoque");
  await expect(sidebar(page)).toBeHidden();
  await page.getByRole("button", { name: /^Filtros/ }).click();
  const drawer = page.getByRole("dialog", { name: "Filtros" });
  await expect(drawer).toBeVisible();
  await drawer.getByLabel("Tipo de veículo").selectOption("pickup");
  await drawer.getByRole("button", { name: "Ver 2 resultados" }).click();
  await expect(drawer).toBeHidden();
  await expect(page.getByRole("button", { name: "Filtros (1)" })).toBeVisible();
  await expect(cards(page)).toHaveCount(2);
});

test("galeria: setas, teclado, miniaturas e ampliação", async ({ page }) => {
  await page.goto(BASE + "/veiculos/toyota-corolla-cross-xre-2022");
  const gallery = page.getByRole("region", { name: /Fotos de Toyota Corolla Cross/ });
  const counter = (n: number) => gallery.locator("[aria-live]").filter({ hasText: `Foto ${n} de 4` });
  await expect(counter(1)).toBeVisible();
  await gallery.getByRole("button", { name: "Próxima foto" }).click();
  await expect(counter(2)).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(counter(3)).toBeVisible();
  await gallery.getByRole("button", { name: /Ver foto 1 de 4/ }).click();
  await expect(gallery.getByRole("button", { name: /Ver foto 1 de 4/ })).toHaveAttribute("aria-current", "true");
  await gallery.getByRole("button", { name: "Foto anterior" }).click();
  await expect(counter(4)).toBeVisible();

  await gallery.getByRole("button", { name: "Ampliar" }).click();
  const zoom = page.getByRole("dialog", { name: /Fotos ampliadas/ });
  await expect(zoom).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(zoom.getByText("Foto 1 de 4")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(zoom).toBeHidden();
});

test("página de detalhe: dados, WhatsApp contextualizado e relacionados", async ({ page }) => {
  await page.goto(BASE + "/veiculos/toyota-corolla-xei-2022");
  await expect(page).toHaveTitle(/Toyota Corolla XEi 2\.0 2021\/2022/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Corolla XEi 2.0");
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", /\/veiculos\/toyota-corolla-xei-2022$/);
  const href = await page.getByRole("link", { name: "Tenho interesse" }).getAttribute("href");
  expect(decodeURIComponent(href!)).toContain(
    "Olá! Tenho interesse no veículo Toyota Corolla XEi 2.0, ano 2021/2022, anunciado por R$ 129.900. Gostaria de receber mais informações. Referência: PM-1001.",
  );
  const related = page.getByRole("region", { name: "Veículos semelhantes" }).locator("article");
  await expect(related).toHaveCount(3);
  await expect(related.filter({ hasText: "Corolla XEi" })).toHaveCount(0);
  const jsonLd = JSON.parse((await page.locator("script[type='application/ld+json']").textContent())!);
  expect(jsonLd).toMatchObject({ "@type": "Car", sku: "PM-1001", offers: { price: 129900, priceCurrency: "BRL" } });
});

test("vendidos e reservados têm indicação clara e ações adequadas", async ({ page }) => {
  await page.goto(BASE + "/veiculos/ford-ranger-xlt-4x4-2019");
  await expect(page.getByText("Vendido", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Tenho interesse" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Ver similares" })).toHaveAttribute("href", "/estoque?tipo=pickup");
  await page.goto(BASE + "/veiculos/fiat-500-turbo-2017");
  await expect(page.getByText("Reservado", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Avise-me se liberar" })).toBeVisible();
});

test("veículo inexistente mostra página própria com status 404", async ({ page }) => {
  const res = await page.goto(BASE + "/veiculos/carro-que-nao-existe");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Veículo não encontrado" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ver estoque" })).toHaveAttribute("href", "/estoque");
});

function nextOpenDay(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

test("agendar visita: validação e mensagem pronta sem alegar envio", async ({ page }) => {
  await page.goto(BASE + "/veiculos/honda-hr-v-exl-2020");
  await page.getByRole("link", { name: "Agendar visita" }).click();
  await expect(page.getByRole("radio", { name: "Agendar visita" })).toBeChecked();
  await page.getByRole("button", { name: "Preparar agendamento" }).click();
  await expect(page.getByText("Informe seu nome.")).toBeVisible();
  await expect(page.getByText("Escolha a data da visita.")).toBeVisible();
  await expect(page.getByLabel("Nome")).toBeFocused();

  await page.getByLabel("Nome").fill("Carla Mendes");
  await page.getByLabel("Telefone / WhatsApp").pressSequentially("11987654321");
  await expect(page.getByLabel("Telefone / WhatsApp")).toHaveValue("(11) 98765-4321");
  await page.getByLabel("Data preferida").fill(nextOpenDay());
  await page.getByText("Manhã", { exact: true }).click();
  await page.getByRole("button", { name: "Preparar agendamento" }).click();

  await expect(page.getByRole("heading", { name: "Mensagem pronta" })).toBeFocused();
  await expect(page.getByText(/nada foi enviado nem armazenado/)).toBeVisible();
  await expect(page.getByText(/enviad[ao] com sucesso/i)).toHaveCount(0);
  const href = await page.getByRole("link", { name: "Abrir no WhatsApp" }).getAttribute("href");
  const message = decodeURIComponent(href!.split("text=")[1]!);
  expect(message).toContain("Honda HR-V EXL 1.8");
  expect(message).toContain("Referência: PM-1010");
  expect(message).toContain("(Manhã)");
  expect(message).toContain("Meu nome é Carla Mendes");
});

test("formulário de contato valida campos e prepara mensagem para WhatsApp", async ({ page }) => {
  await page.goto(BASE + "/contato");
  await expect(page.getByText(/Modo demonstrativo/).first()).toBeVisible();
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await expect(page.getByText("Informe seu nome.")).toBeVisible();
  await expect(page.getByText("Escolha um assunto.")).toBeVisible();
  await expect(page.getByText(/ao menos 10 caracteres/)).toBeVisible();

  await page.getByLabel("Nome").fill("Rafael Souza");
  await page.getByLabel("Telefone / WhatsApp").pressSequentially("21987654321");
  await page.getByLabel("E-mail (opcional)").fill("rafael@");
  await page.getByLabel("Assunto").selectOption("financiamento");
  await page.getByLabel("Mensagem", { exact: true }).fill("Gostaria de simular o financiamento de um SUV.");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await expect(page.getByText(/Confira o e-mail/)).toBeVisible();
  await page.getByLabel("E-mail (opcional)").fill("rafael@exemplo.com");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();

  await expect(page.getByRole("heading", { name: "Mensagem pronta para enviar" })).toBeVisible();
  const href = await page.getByRole("link", { name: "Abrir no WhatsApp" }).getAttribute("href");
  const message = decodeURIComponent(href!.split("text=")[1]!);
  expect(message).toContain("Assunto: Simulação de financiamento.");
  expect(message).toContain("E-mail: rafael@exemplo.com");
});
