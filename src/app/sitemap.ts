import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/team", "/ways-to-help", "/in-memory"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
