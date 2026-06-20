import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SEGMENTS, CITIES } from "@/lib/catalog";
import { PILOTS } from "@/lib/seed";
import { LOCALES, getLocaleConfig } from "@/lib/i18n/config";

// Vereist voor statische export (output: export).
export const dynamic = "force-static";

const LAST_MODIFIED = new Date("2026-06-20");

const STATIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/hoe-het-werkt", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/pakketten", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/voor-piloten", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/toepassingen", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/showcase", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/piloten", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/regels", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/over-ons", priority: 0.5, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const country = getLocaleConfig(locale).country;

    // Static routes, locale-prefixed.
    for (const r of STATIC_ROUTES) {
      entries.push({
        url: `${base}/${locale}${r.path}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
      });
    }

    // Segment hubs.
    for (const s of SEGMENTS) {
      entries.push({
        url: `${base}/${locale}/toepassingen/${s.slug}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Per-market segment × city pages (only cities in this locale's market).
    const marketCities = CITIES.filter((c) => c.country === country);
    for (const s of SEGMENTS) {
      for (const c of marketCities) {
        entries.push({
          url: `${base}/${locale}/toepassingen/${s.slug}/${c.slug}`,
          lastModified: LAST_MODIFIED,
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    }

    // Pilot profiles.
    for (const p of PILOTS) {
      entries.push({
        url: `${base}/${locale}/piloten/${p.slug}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
