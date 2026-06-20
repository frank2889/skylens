import type { Metadata } from "next";
import { Suspense } from "react";
import { BedanktContent } from "@/components/bedankt-content";
import { pick } from "@/lib/i18n/messages";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const M = pick(locale, {
    nl: {
      title: "Aanvraag ontvangen · Skylens",
      description:
        "Bedankt voor je aanvraag. We koppelen je aan geverifieerde dronepiloten bij jou in de buurt.",
    },
    en: {
      title: "Request received · Skylens",
      description:
        "Thanks for your request. We're matching you with verified drone pilots near you.",
    },
    de: {
      title: "Anfrage erhalten · Skylens",
      description:
        "Danke für Ihre Anfrage. Wir vermitteln Ihnen geprüfte Drohnenpiloten in Ihrer Nähe.",
    },
  });
  return {
    title: M.title,
    description: M.description,
    robots: { index: false, follow: false },
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/aanvraag/bedankt`,
        "en-GB": `${SITE.url}/en/aanvraag/bedankt`,
        de: `${SITE.url}/de/aanvraag/bedankt`,
      },
    },
  };
}

export default async function BedanktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loading = pick(locale, { nl: "Laden…", en: "Loading…", de: "Wird geladen…" });
  return (
    <Suspense fallback={<div className="container-x py-24 text-ink-muted">{loading}</div>}>
      <BedanktContent />
    </Suspense>
  );
}
