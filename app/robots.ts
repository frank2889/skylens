import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Vereist voor statische export (output: export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/*/dashboard",
        "/*/piloot",
        "/*/admin",
        "/*/aanvraag/bedankt",
      ],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
