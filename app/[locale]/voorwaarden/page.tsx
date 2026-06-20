import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { pick, localized } from "@/lib/i18n/messages";
import { getLocaleConfig } from "@/lib/i18n/config";
import { getJurisdiction } from "@/lib/jurisdictions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const meta = pick(locale, {
    nl: {
      title: `Algemene voorwaarden — ${SITE.name}`,
      description:
        "De algemene voorwaarden van Skylens: onze rol als marktplaats, lead-fees en commissie, exclusiviteit, verificatie-disclaimer, footage-licentie, aansprakelijkheid en toepasselijk recht.",
    },
    en: {
      title: `Terms of service — ${SITE.name}`,
      description:
        "Skylens terms of service: our role as a marketplace, lead fees and commission, exclusivity, verification disclaimer, footage licence, liability and governing law.",
    },
    de: {
      title: `Allgemeine Geschäftsbedingungen — ${SITE.name}`,
      description:
        "Die AGB von Skylens: unsere Rolle als Marktplatz, Lead-Gebühren und Provision, Exklusivität, Verifizierungs-Disclaimer, Aufnahmenlizenz, Haftung und anwendbares Recht.",
    },
  });

  const base = SITE.url;
  return {
    title: meta.title,
    description: meta.description,
    robots: { index: true, follow: true },
    alternates: {
      languages: {
        nl: `${base}/nl/voorwaarden`,
        "en-GB": `${base}/en/voorwaarden`,
        de: `${base}/de/voorwaarden`,
      },
    },
  };
}

export default async function VoorwaardenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cfg = getLocaleConfig(locale);
  const jur = getJurisdiction(cfg.country);
  const { governingLaw, vatRatePct } = jur.legal;

  const T = pick(locale, {
    nl: {
      eyebrow: "Juridisch",
      h1: "Algemene voorwaarden",
      lead: `De spelregels voor het gebruik van ${SITE.name}. We zijn een marktplaats die opdrachtgevers en dronepiloten samenbrengt — we zijn zelf geen partij bij de opdracht die jullie met elkaar sluiten.`,
      concept: (
        <>
          <strong className="font-semibold">Concept.</strong> Dit is een voorbeeldtekst ter
          illustratie en nog geen rechtsgeldige overeenkomst. Deze voorwaarden moeten vóór
          livegang worden beoordeeld en definitief gemaakt door een gekwalificeerd jurist in de
          betreffende jurisdictie.
        </>
      ),
      version: "Versie: concept · 20 juni 2026",
      h2_1: "1. Onze rol als marktplaats",
      p_1: `${SITE.name} biedt een platform dat opdrachtgevers koppelt aan dronepiloten. Wij faciliteren het contact, de informatie-uitwisseling en (waar van toepassing) de betaling. De daadwerkelijke dronedienst wordt geleverd door de piloot.`,
      h2_2: "2. Geen partij bij de overeenkomst",
      p_2: `De overeenkomst voor het uitvoeren van een drone-opdracht komt rechtstreeks tot stand tussen de opdrachtgever en de piloot. ${SITE.name} is daarbij geen partij en draagt geen verantwoordelijkheid voor de uitvoering, de kwaliteit of de oplevering van het werk. Afspraken over prijs, planning, meerwerk en oplevering maken opdrachtgever en piloot onderling.`,
      h2_3: "3. Lead-fees, commissie & exclusiviteit",
      p_3_pre: "Piloten betalen voor het ontvangen van leads en/of een commissie over via het platform afgeronde opdrachten, afhankelijk van hun lidmaatschap. De geldende tarieven, commissiepercentages en exclusiviteit per job-tier staan vermeld op de pagina ",
      p_3_link: "voor piloten",
      p_3_post: ".",
      vatNote: `Alle door ${SITE.name} in rekening gebrachte tarieven en commissies zijn exclusief btw; het geldende btw-tarief is ${vatRatePct}%.`,
      list_3: [
        ["Leads", " kunnen gedeeld (meerdere piloten), semi-exclusief of exclusief worden aangeboden, afhankelijk van het tier."],
        ["Een betaalde lead", " is geen garantie op een opdracht; het is toegang tot de aanvraag en de contactgegevens."],
        ["Tarieven", " kunnen wijzigen; wijzigingen worden vooraf gecommuniceerd."],
      ],
      h2_4: "4. Verificatie-disclaimer",
      p_4: `Wij controleren piloten op onder meer ${jur.operatorId.label}, ${jur.authority.short}-/EASA-certificering en verzekering en kennen op basis daarvan een "Geverifieerd"-label toe. Deze controle is een momentopname en geen garantie. De eindverantwoordelijkheid voor een veilige, legale vlucht en voor het naleven van alle toepasselijke regelgeving ligt te allen tijde bij de piloot. ${SITE.name} is niet aansprakelijk voor onjuiste of verouderde informatie die door een piloot is verstrekt.`,
      h2_5: "5. Footage-licentie",
      p_5: `De rechten op gemaakte beelden worden geregeld in de overeenkomst tussen opdrachtgever en piloot. Door materiaal aan te leveren voor onze showcase, verlenen opdrachtgever en piloot ${SITE.name} een niet-exclusieve, herroepbare licentie om die beelden te tonen ter promotie van het platform en de betreffende piloot. Deze licentie kan worden ingetrokken, waarna wij het materiaal zo snel als redelijkerwijs mogelijk verwijderen.`,
      h2_6: "6. Aansprakelijkheid",
      p_6: `${SITE.name} levert het platform "as is" en spant zich in voor een goede werking, maar geeft geen garantie op ononderbroken beschikbaarheid. Voor zover wettelijk toegestaan is onze aansprakelijkheid beperkt tot directe schade en tot het bedrag dat de betrokken partij in de voorgaande twaalf maanden aan ons heeft betaald. Wij zijn niet aansprakelijk voor schade die voortvloeit uit de uitvoering van een opdracht door een piloot of uit afspraken tussen opdrachtgever en piloot.`,
      h2_7: "7. Verplichtingen van gebruikers",
      list_7: [
        "Je verstrekt juiste en actuele gegevens.",
        "Piloten beschikken over de vereiste certificaten en verzekering en houden deze actueel.",
        "Je gebruikt het platform niet voor onrechtmatige doeleinden of om regels te omzeilen.",
        "Je respecteert de privacy van derden bij het maken en delen van beelden.",
      ],
      h2_8: "8. Wijzigingen",
      p_8: "We kunnen deze voorwaarden van tijd tot tijd aanpassen. Belangrijke wijzigingen communiceren we vooraf. De meest actuele versie staat altijd op deze pagina.",
      h2_9: "9. Toepasselijk recht",
      p_9: `Op deze voorwaarden en op het gebruik van ${SITE.name} is ${governingLaw} van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter binnen die jurisdictie, tenzij dwingend recht anders bepaalt.`,
      h2_10: "10. Contact",
      contact_pre: "Vragen over deze voorwaarden? Mail ",
      contact_mid: ". Lees ook ons ",
      contact_link: "privacybeleid",
      contact_post: ".",
    },
    en: {
      eyebrow: "Legal",
      h1: "Terms of service",
      lead: `The ground rules for using ${SITE.name}. We are a marketplace that brings clients and drone pilots together — we are not ourselves a party to the engagement you enter into with one another.`,
      concept: (
        <>
          <strong className="font-semibold">Draft.</strong> This is sample text for
          illustration only and is not a legally binding agreement. These terms must be reviewed
          and finalised by a qualified lawyer in the relevant jurisdiction before going live.
        </>
      ),
      version: "Version: draft · 20 June 2026",
      h2_1: "1. Our role as a marketplace",
      p_1: `${SITE.name} provides a platform that connects clients with drone pilots. We facilitate contact, the exchange of information and (where applicable) payment. The drone service itself is delivered by the pilot.`,
      h2_2: "2. Not a party to the contract",
      p_2: `The contract to carry out a drone job is formed directly between the client and the pilot. ${SITE.name} is not a party to it and bears no responsibility for the performance, quality or delivery of the work. The client and pilot agree price, scheduling, additional work and delivery between themselves.`,
      h2_3: "3. Lead fees, commission & exclusivity",
      p_3_pre: "Pilots pay to receive leads and/or a commission on jobs completed through the platform, depending on their membership. The applicable fees, commission rates and exclusivity per job tier are set out on the ",
      p_3_link: "for pilots",
      p_3_post: " page.",
      vatNote: `All fees and commission charged by ${SITE.name} are exclusive of VAT; the applicable VAT rate is ${vatRatePct}%.`,
      list_3: [
        ["Leads", " may be offered shared (multiple pilots), semi-exclusive or exclusive, depending on the tier."],
        ["A paid lead", " is not a guarantee of a job; it is access to the request and the contact details."],
        ["Fees", " may change; changes are communicated in advance."],
      ],
      h2_4: "4. Verification disclaimer",
      p_4: `We check pilots for, among other things, ${jur.operatorId.label}, ${jur.authority.short}/EASA certification and insurance, and award a "Verified" label on that basis. This check is a snapshot in time and not a guarantee. Ultimate responsibility for a safe, lawful flight and for complying with all applicable regulations always rests with the pilot. ${SITE.name} is not liable for incorrect or out-of-date information provided by a pilot.`,
      h2_5: "5. Footage licence",
      p_5: `Rights in the imagery produced are governed by the contract between the client and the pilot. By supplying material for our showcase, the client and pilot grant ${SITE.name} a non-exclusive, revocable licence to display that imagery to promote the platform and the pilot concerned. This licence may be withdrawn, after which we will remove the material as soon as reasonably practicable.`,
      h2_6: "6. Liability",
      p_6: `${SITE.name} provides the platform "as is" and uses reasonable efforts to keep it working, but does not guarantee uninterrupted availability. To the extent permitted by law, our liability is limited to direct loss and to the amount the relevant party paid us in the preceding twelve months. We are not liable for loss arising from the performance of a job by a pilot or from arrangements between the client and the pilot.`,
      h2_7: "7. Users' obligations",
      list_7: [
        "You provide accurate and up-to-date information.",
        "Pilots hold the required certificates and insurance and keep them current.",
        "You do not use the platform for unlawful purposes or to circumvent the rules.",
        "You respect the privacy of third parties when capturing and sharing imagery.",
      ],
      h2_8: "8. Changes",
      p_8: "We may amend these terms from time to time. We communicate material changes in advance. The most current version is always available on this page.",
      h2_9: "9. Governing law",
      p_9: `These terms and your use of ${SITE.name} are governed by ${governingLaw}. Disputes are submitted to the competent courts of that jurisdiction, unless mandatory law provides otherwise.`,
      h2_10: "10. Contact",
      contact_pre: "Questions about these terms? Email ",
      contact_mid: ". See also our ",
      contact_link: "privacy policy",
      contact_post: ".",
    },
    de: {
      eyebrow: "Rechtliches",
      h1: "Allgemeine Geschäftsbedingungen",
      lead: `Die Spielregeln für die Nutzung von ${SITE.name}. Wir sind ein Marktplatz, der Auftraggeber und Drohnenpiloten zusammenbringt — wir sind selbst nicht Vertragspartei des Auftrags, den ihr miteinander schließt.`,
      concept: (
        <>
          <strong className="font-semibold">Entwurf.</strong> Dies ist ein Beispieltext zur
          Veranschaulichung und noch keine rechtsverbindliche Vereinbarung. Diese Bedingungen
          müssen vor dem Livegang von einem qualifizierten Juristen in der jeweiligen
          Jurisdiktion geprüft und finalisiert werden.
        </>
      ),
      version: "Version: Entwurf · 20. Juni 2026",
      h2_1: "1. Unsere Rolle als Marktplatz",
      p_1: `${SITE.name} stellt eine Plattform bereit, die Auftraggeber mit Drohnenpiloten verbindet. Wir vermitteln den Kontakt, den Informationsaustausch und (sofern zutreffend) die Zahlung. Die eigentliche Drohnendienstleistung wird vom Piloten erbracht.`,
      h2_2: "2. Keine Vertragspartei",
      p_2: `Der Vertrag über die Durchführung eines Drohnenauftrags kommt unmittelbar zwischen dem Auftraggeber und dem Piloten zustande. ${SITE.name} ist dabei nicht Vertragspartei und trägt keine Verantwortung für die Durchführung, die Qualität oder die Abnahme der Arbeit. Preis, Terminplanung, Mehrarbeit und Abnahme vereinbaren Auftraggeber und Pilot untereinander.`,
      h2_3: "3. Lead-Gebühren, Provision & Exklusivität",
      p_3_pre: "Piloten zahlen für den Erhalt von Leads und/oder eine Provision auf über die Plattform abgeschlossene Aufträge, je nach Mitgliedschaft. Die geltenden Gebühren, Provisionssätze und die Exklusivität je Job-Tier sind auf der Seite ",
      p_3_link: "für Piloten",
      p_3_post: " angegeben.",
      vatNote: `Alle von ${SITE.name} berechneten Gebühren und Provisionen verstehen sich zzgl. Umsatzsteuer; der geltende Umsatzsteuersatz beträgt ${vatRatePct}%.`,
      list_3: [
        ["Leads", " können je nach Tier geteilt (mehrere Piloten), semi-exklusiv oder exklusiv angeboten werden."],
        ["Ein bezahlter Lead", " ist keine Garantie für einen Auftrag; er gewährt Zugang zur Anfrage und zu den Kontaktdaten."],
        ["Gebühren", " können sich ändern; Änderungen werden vorab kommuniziert."],
      ],
      h2_4: "4. Verifizierungs-Disclaimer",
      p_4: `Wir prüfen Piloten unter anderem auf ${jur.operatorId.label}, ${jur.authority.short}-/EASA-Zertifizierung und Versicherung und vergeben auf dieser Grundlage ein „Geprüft“-Label. Diese Prüfung ist eine Momentaufnahme und keine Garantie. Die Endverantwortung für einen sicheren, legalen Flug und für die Einhaltung aller geltenden Vorschriften liegt jederzeit beim Piloten. ${SITE.name} haftet nicht für falsche oder veraltete Angaben eines Piloten.`,
      h2_5: "5. Aufnahmenlizenz",
      p_5: `Die Rechte an den erstellten Aufnahmen werden im Vertrag zwischen Auftraggeber und Pilot geregelt. Durch die Bereitstellung von Material für unsere Showcase gewähren Auftraggeber und Pilot ${SITE.name} eine nicht-exklusive, widerrufliche Lizenz, diese Aufnahmen zur Bewerbung der Plattform und des betreffenden Piloten zu zeigen. Diese Lizenz kann widerrufen werden; wir entfernen das Material dann so schnell wie vernünftigerweise möglich.`,
      h2_6: "6. Haftung",
      p_6: `${SITE.name} stellt die Plattform „wie besehen“ bereit und bemüht sich um einen einwandfreien Betrieb, garantiert jedoch keine ununterbrochene Verfügbarkeit. Soweit gesetzlich zulässig, ist unsere Haftung auf den unmittelbaren Schaden und auf den Betrag begrenzt, den die betreffende Partei in den vorangegangenen zwölf Monaten an uns gezahlt hat. Wir haften nicht für Schäden, die aus der Durchführung eines Auftrags durch einen Piloten oder aus Vereinbarungen zwischen Auftraggeber und Pilot entstehen.`,
      h2_7: "7. Pflichten der Nutzer",
      list_7: [
        "Du machst richtige und aktuelle Angaben.",
        "Piloten verfügen über die erforderlichen Zertifikate und Versicherungen und halten diese aktuell.",
        "Du nutzt die Plattform nicht für rechtswidrige Zwecke oder zur Umgehung der Regeln.",
        "Du respektierst die Privatsphäre Dritter beim Erstellen und Teilen von Aufnahmen.",
      ],
      h2_8: "8. Änderungen",
      p_8: "Wir können diese Bedingungen von Zeit zu Zeit anpassen. Wesentliche Änderungen kommunizieren wir vorab. Die jeweils aktuelle Fassung ist stets auf dieser Seite verfügbar.",
      h2_9: "9. Anwendbares Recht",
      p_9: `Auf diese Bedingungen und die Nutzung von ${SITE.name} ist ${governingLaw} anwendbar. Streitigkeiten werden den zuständigen Gerichten dieser Jurisdiktion vorgelegt, sofern zwingendes Recht nichts anderes bestimmt.`,
      h2_10: "10. Kontakt",
      contact_pre: "Fragen zu diesen Bedingungen? Schreib an ",
      contact_mid: ". Lies auch unsere ",
      contact_link: "Datenschutzerklärung",
      contact_post: ".",
    },
  });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative py-14 sm:py-20">
          <span className="eyebrow">{T.eyebrow}</span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">{T.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted pretty">{T.lead}</p>
        </div>
      </section>

      {/* ── Prose ── */}
      <section className="container-x py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-signal/40 bg-signal/10 px-5 py-4 text-sm leading-relaxed text-ink-soft">
            {T.concept}
          </div>

          <div className="mt-10 space-y-10">
            <section>
              <p className="text-sm text-ink-muted">{T.version}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_1}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_1}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_2}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_2}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_3}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                {T.p_3_pre}
                <Link href={localized(locale, "/voor-piloten")} className="link-underline">
                  {T.p_3_link}
                </Link>
                {T.p_3_post}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                {T.list_3.map(([b, rest]) => (
                  <li key={b}>
                    <strong>{b}</strong>
                    {rest}
                  </li>
                ))}
              </ul>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.vatNote}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_4}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_4}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_5}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_5}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_6}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_6}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_7}</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                {T.list_7.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_8}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_8}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_9}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_9}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_10}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                {T.contact_pre}
                <a href={`mailto:${SITE.email}`} className="link-underline">
                  {SITE.email}
                </a>
                {T.contact_mid}
                <Link href={localized(locale, "/privacy")} className="link-underline">
                  {T.contact_link}
                </Link>
                {T.contact_post}
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
