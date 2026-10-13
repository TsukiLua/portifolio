import type { MetadataRoute } from "next";
import { allowIndexing, siteUrl } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowIndexing ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
