import type { MetadataRoute } from "next";
import { allowIndexing, siteUrl } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowIndexing ? { userAgent: "*", allow: "/", disallow: "/agendar" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
