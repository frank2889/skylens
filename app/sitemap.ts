import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SEGMENTS, CITIES } from "@/lib/catalog";
import { PILOTS } from "@/lib/seed";

const LAST_MODIFIED = new Date("2026-06-20");

// Subset that matches the generateStaticParams subset of the
// /toepassingen/{segment}/{city} route: first 6 segments × first 8 cities.
const SITEMAP_SEGMENTS = SEGMENTS.slice(0, 6);
const SITEMAP_CITIES = CITIES.slice(0, 8);

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/hoe-het-werkt", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/pakketten", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/voor-piloten", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/toepassingen", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/showcase", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/piloten", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/over-ons", priority: 0.5, changeFrequency: "yearly" as const },
  ].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const segmentRoutes: MetadataRoute.Sitemap = SEGMENTS.map((s) => ({
    url: `${base}/toepassingen/${s.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const pilotRoutes: MetadataRoute.Sitemap = PILOTS.map((p) => ({
    url: `${base}/piloten/${p.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const cityRoutes: MetadataRoute.Sitemap = SITEMAP_SEGMENTS.flatMap((s) =>
    SITEMAP_CITIES.map((c) => ({
      url: `${base}/toepassingen/${s.slug}/${c.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  );

  return [...staticRoutes, ...segmentRoutes, ...pilotRoutes, ...cityRoutes];
}
