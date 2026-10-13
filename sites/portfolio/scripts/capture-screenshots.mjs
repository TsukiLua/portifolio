/**
 * Gera capturas REAIS dos projetos demonstrativos para o portfólio.
 *
 * Pré-requisito: os sites rodando (de preferência em produção):
 *   npm run build && (npm run start -w sites/<site> para cada um)   — ou use `npx playwright test`, que sobe todos.
 * Uso:   npm run capture -w sites/portfolio
 * Bases: altere com variáveis CAPTURE_<SITE>=http://... (ex.: CAPTURE_VEICULOS=https://demo.exemplo.com)
 *
 * Saída: src/assets/projects/<projeto>-<tela>.jpg (desktop 1440×900 e celular 390×844 @2x).
 */
import { chromium } from "playwright-core";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "assets", "projects");

const BASES = {
  veiculos: process.env.CAPTURE_VEICULOS ?? "http://localhost:3005",
  barbearia: process.env.CAPTURE_BARBEARIA ?? "http://localhost:3001",
  servicos: process.env.CAPTURE_SERVICOS ?? "http://localhost:3002",
  catalogo: process.env.CAPTURE_CATALOGO ?? "http://localhost:3003",
  estudio: process.env.CAPTURE_ESTUDIO ?? "http://localhost:3004",
};

/** Clica no primeiro dia que tenha horário livre (fluxos de agendamento). */
async function pickFirstFreeSlot(page) {
  const dates = page.locator("input[name='data']:not([disabled])");
  for (let i = 0; i < (await dates.count()); i++) {
    await dates.nth(i).locator("xpath=..").click();
    const free = page.locator("input[name='horario']:not([disabled])");
    if ((await free.count()) > 0) {
      await free.nth(Math.min(2, (await free.count()) - 1)).locator("xpath=..").click();
      return;
    }
  }
}

const SHOTS = [
  { file: "veiculos-home", site: "veiculos", path: "/" },
  { file: "veiculos-estoque", site: "veiculos", path: "/estoque?tipo=suv" },
  { file: "veiculos-detalhe", site: "veiculos", path: "/veiculos/toyota-corolla-cross-xre-2022" },
  { file: "veiculos-mobile", site: "veiculos", path: "/estoque", mobile: true },
  { file: "barbearia-home", site: "barbearia", path: "/" },
  {
    file: "barbearia-agendar",
    site: "barbearia",
    path: "/agendar?servico=corte-barba&barbeiro=diego",
    prepare: async (page) => {
      await pickFirstFreeSlot(page);
    },
  },
  { file: "barbearia-mobile", site: "barbearia", path: "/", mobile: true },
  { file: "catalogo-home", site: "catalogo", path: "/" },
  { file: "catalogo-lista", site: "catalogo", path: "/catalogo?categoria=vestidos" },
  { file: "catalogo-produto", site: "catalogo", path: "/produto/camisa-linho-gola-padre-off-white" },
  { file: "catalogo-mobile", site: "catalogo", path: "/catalogo", mobile: true },
  { file: "estudio-home", site: "estudio", path: "/" },
  {
    file: "estudio-agendar",
    site: "estudio",
    path: "/agendar?tratamento=design-sobrancelhas&profissional=joana",
    prepare: async (page) => {
      await pickFirstFreeSlot(page);
      await page.locator("#etapa-horario").scrollIntoViewIfNeeded();
    },
    scrollTo: "#etapa-horario",
  },
  { file: "estudio-mobile", site: "estudio", path: "/", mobile: true },
  { file: "servicos-home", site: "servicos", path: "/" },
  { file: "servicos-orcamento", site: "servicos", path: "/", scrollTo: "#orcamento" },
  { file: "servicos-mobile", site: "servicos", path: "/", mobile: true },
];

const browser = await chromium.launch();
try {
  for (const shot of SHOTS) {
    const context = await browser.newContext(
      shot.mobile
        ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
        : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
    );
    const page = await context.newPage();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(BASES[shot.site] + shot.path, { waitUntil: "networkidle" });
    if (shot.prepare) await shot.prepare(page);
    // Força o carregamento de imagens lazy e volta ao ponto desejado.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    if (shot.scrollTo) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "instant" });
      }, shot.scrollTo);
    }
    await page
      .waitForFunction(() => [...document.images].filter((i) => i.getClientRects().length).every((i) => i.complete), null, { timeout: 30000 })
      .catch(() => console.warn("  aviso: imagens ainda carregando em", shot.file));
    await page.waitForTimeout(400);
    const png = await page.screenshot();
    await sharp(png).jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(path.join(OUT, `${shot.file}.jpg`));
    console.log("ok", shot.file);
    await context.close();
  }
} finally {
  await browser.close();
}
