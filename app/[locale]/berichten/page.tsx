import type { Metadata } from "next";
import { DemoInbox } from "@/components/demo-inbox";
import { getLocaleConfig } from "@/lib/i18n/config";
import { pick } from "@/lib/i18n/messages";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const M = pick(locale, {
    nl: { title: "Berichten — alles via het platform", description: "Communicatie, boeking en betaling lopen via Skylens. Contactgegevens blijven afgeschermd." },
    en: { title: "Messages — everything on-platform", description: "Communication, booking and payment run through Skylens. Contact details stay hidden." },
    de: { title: "Nachrichten — alles über die Plattform", description: "Kommunikation, Buchung und Zahlung laufen über Skylens. Kontaktdaten bleiben verborgen." },
  });
  return {
    title: M.title,
    description: M.description,
    robots: { index: false, follow: false },
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/berichten`,
        "en-GB": `${SITE.url}/en/berichten`,
        de: `${SITE.url}/de/berichten`,
      },
    },
  };
}

export default async function BerichtenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // touch locale so the route is locale-scoped; DemoInbox reads locale from the URL.
  void getLocaleConfig(locale);
  return <DemoInbox />;
}
