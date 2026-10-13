import { defineConfig, devices } from "@playwright/test";

/**
 * Testes de ponta a ponta contra os builds de produção.
 * Pré-requisito: `npm run build`. Os servidores sobem automaticamente (`next start`).
 */
export const SITES = {
  barbearia: "http://localhost:3001",
  servicos: "http://localhost:3002",
  catalogo: "http://localhost:3003",
  estudio: "http://localhost:3004",
  veiculos: "http://localhost:3005",
} as const;

const server = (workspace: string, url: string) => ({
  command: `npm run start -w sites/${workspace}`,
  url,
  reuseExistingServer: !process.env.CI,
  timeout: 120_000,
});

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { ...devices["Desktop Chrome"], trace: "retain-on-failure", locale: "pt-BR", timezoneId: "America/Sao_Paulo" },
  webServer: [
    server("barbearia", SITES.barbearia),
    server("servicos-locais", SITES.servicos),
    server("catalogo-loja", SITES.catalogo),
    server("estudio-beleza", SITES.estudio),
    server("catalogo-veiculos", SITES.veiculos),
  ],
});
