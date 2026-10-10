import path from "node:path";
import type { NextConfig } from "next";

const monorepoRoot = path.join(__dirname, "..", "..");

const nextConfig: NextConfig = {
  transpilePackages: ["@demo/core"],
  poweredByHeader: false,
  // Evita que o `next dev` gere arquivos AGENTS.md no repositório.
  agentRules: false,
  turbopack: { root: monorepoRoot },
  outputFileTracingRoot: monorepoRoot,
};

export default nextConfig;
