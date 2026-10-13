/**
 * Verificações transversais nos quatro sites: responsividade, erros de execução,
 * imagens, aviso de demonstração, links internos e menu móvel.
 */
import { expect, test, type Page } from "@playwright/test";
import { SITES } from "../playwright.config";

const PAGES: Record<keyof typeof SITES, string[]> = {
  barbearia: ["/", "/agendar", "/agendar?servico=corte-barba&barbeiro=diego"],
  servicos: ["/"],
  catalogo: ["/", "/catalogo", "/produto/vestido-midi-laise-branco", "/sobre", "/trocas-e-entregas"],
  estudio: ["/", "/agendar", "/agendar?tratamento=design-sobrancelhas&profissional=joana"],
  veiculos: ["/", "/estoque", "/veiculos/toyota-corolla-xei-2022", "/sobre", "/contato", "/privacidade"],
  portfolio: ["/", "/projetos/catalogo-automotivo", "/projetos/site-para-negocio-local"],
};

const WIDTHS = [
  { name: "celular", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 900 },
];

async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    // "instant": os sites usam scroll suave, que seria interrompido a cada passo.
    for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

for (const [site, base] of Object.entries(SITES) as [keyof typeof SITES, string][]) {
  test.describe(`${site}: qualidade`, () => {
    for (const path of PAGES[site]) {
      for (const vp of WIDTHS) {
        test(`${path} em ${vp.name}: sem rolagem horizontal, sem erros e com imagens`, async ({ page }) => {
          const errors: string[] = [];
          page.on("pageerror", (e) => errors.push(e.message));
          page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
          await page.setViewportSize({ width: vp.width, height: vp.height });
          const response = await page.goto(base + path);
          expect(response?.status()).toBe(200);

          await scrollThrough(page);
          // Só imagens renderizadas: as ocultas por CSS (ex.: "hidden sm:block") corretamente não carregam no celular.
          await page.waitForFunction(
            () => [...document.images].filter((img) => img.getClientRects().length > 0).every((img) => img.complete),
            null,
            { timeout: 30_000 },
          );
          const broken = await page.evaluate(() =>
            [...document.images].filter((img) => img.getClientRects().length > 0 && img.naturalWidth === 0).map((img) => img.currentSrc || img.src),
          );
          expect(broken, "imagens quebradas").toEqual([]);

          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
          expect(overflow, "rolagem horizontal").toBeLessThanOrEqual(0);

          // Sites fictícios exibem aviso de demonstração; o portfólio marca cada projeto como demonstrativo.
          await expect(page.getByText(site === "portfolio" ? /demonstrativo/i : /demonstração/i).first()).toBeVisible();
          await expect(page.locator("h1")).toHaveCount(1);
          expect(errors, "erros no console").toEqual([]);
        });
      }
    }

    test("links internos respondem 200", async ({ page, request }) => {
      const hrefs = new Set<string>();
      for (const path of PAGES[site]) {
        await page.goto(base + path);
        const found = await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href") ?? ""));
        found.forEach((h) => hrefs.add(h.split("#")[0] || "/"));
      }
      for (const href of hrefs) {
        const res = await request.get(base + href);
        expect(res.status(), href).toBe(200);
      }
      // Rota inexistente retorna 404 com página própria.
      expect((await request.get(`${base}/rota-que-nao-existe`)).status()).toBe(404);
    });

    test("links externos de WhatsApp usam wa.me e abrem em nova aba", async ({ page }) => {
      await page.goto(base + "/");
      const links = page.locator("a[href*='wa.me']");
      expect(await links.count()).toBeGreaterThan(0);
      for (const link of await links.all()) {
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", /noopener/);
        expect(await link.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/(\d+)?\?text=.+/);
      }
    });

    test("menu móvel abre, navega e fecha", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(base + "/");
      await page.getByRole("button", { name: "Abrir menu" }).click();
      const menu = page.getByRole("navigation", { name: /menu/i }).first();
      await expect(menu).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await menu.getByRole("link").first().click();
      await expect(menu).toBeHidden();
    });

    test("metadados de SEO e compartilhamento", async ({ page }) => {
      await page.goto(base + "/");
      expect((await page.title()).length).toBeGreaterThan(10);
      await expect(page.locator("meta[name='description']")).toHaveAttribute("content", /.{40,}/);
      await expect(page.locator("meta[property='og:image']")).toHaveAttribute("content", /opengraph-image/);
      await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
      // Demonstrações não são indexadas por padrão.
      await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /noindex/);
    });
  });
}
