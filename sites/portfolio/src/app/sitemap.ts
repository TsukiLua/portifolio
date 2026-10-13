import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, priority: 1 }, ...projects.map((p) => ({ url: `${siteUrl}/projetos/${p.slug}`, priority: 0.8 }))];
}
