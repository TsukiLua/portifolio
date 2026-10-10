import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteUrl } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/catalogo", "/sobre", "/trocas-e-entregas"].map((path) => ({ url: `${siteUrl}${path}` }));
  return [...pages, ...products.map((p) => ({ url: `${siteUrl}/produto/${p.slug}` }))];
}
