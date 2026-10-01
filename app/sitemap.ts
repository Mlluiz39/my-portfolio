import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/servicos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${siteConfig.url}/contato`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/sobre`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/processo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacidade`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/termos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
