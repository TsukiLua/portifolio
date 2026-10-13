import type { MetadataRoute } from "next";
import { vehicles } from "@/data/vehicles";
import { siteUrl } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/estoque", "/sobre", "/contato", "/privacidade"].map((p) => ({ url: `${siteUrl}${p}` }));
  return [...pages, ...vehicles.filter((v) => v.status !== "sold").map((v) => ({ url: `${siteUrl}/veiculos/${v.slug}` }))];
}
