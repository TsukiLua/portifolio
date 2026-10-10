import { defineConfig } from "vitest/config";

// Testes de regras de negócio (sem DOM). Módulos testados usam imports relativos.
export default defineConfig({
  test: {
    include: ["packages/*/src/**/*.test.ts", "sites/*/src/**/*.test.ts"],
    environment: "node",
  },
});
