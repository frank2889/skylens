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
  const cfg = getLocaleConfig(locale);
  const jur = getJurisdiction(cfg.country);

  const meta = pick(locale, {
    nl: {
      title: `Privacy & ${jur.legal.privacyRegime} — ${SITE.name}`,
      description:
        "Hoe Skylens omgaat met persoonsgegevens: welke gegevens we verwerken, waarom, hoelang we ze bewaren, je rechten, EU-dataopslag (Frankfurt), verwerkers en cookies.",
    },
    en: {
      title: `Privacy & ${jur.legal.privacyRegime} — ${SITE.name}`,
      description:
        "How Skylens handles personal data: what we collect, why, how long we keep it, your rights, EU data hosting (Frankfurt), processors and cookies.",
    },
    de: {
      title: `Datenschutz & ${jur.legal.privacyRegime} — ${SITE.name}`,
      description:
        "Wie Skylens mit personenbezogenen Daten umgeht: welche Daten wir verarbeiten, warum, wie lange wir sie speichern, deine Rechte, EU-Hosting (Frankfurt), Auftragsverarbeiter und Cookies.",
    },
  });

  const base = SITE.url;
  return {
    title: meta.title,
    description: meta.description,
    robots: { index: true, follow: true },
    alternates: {
      languages: {
        nl: `${base}/nl/privacy`,
        "en-GB": `${base}/en/privacy`,
        de: `${base}/de/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cfg = getLocaleConfig(locale);
  const jur = getJurisdiction(cfg.country);
  const { dpa, privacyRegime, recordRetentionYears } = jur.legal;

  const T = pick(locale, {
    nl: {
      eyebrow: "Juridisch",
      h1: `Privacy & ${privacyRegime}`,
      lead: `Hoe ${SITE.name} omgaat met jouw persoonsgegevens als opdrachtgever of dronepiloot. We verwerken niet meer dan nodig, slaan op binnen de EU (Frankfurt) en geven je controle over je gegevens.`,
      concept: (
        <>
          <strong className="font-semibold">Concept.</strong> Dit is een leesbare
          samenvatting ter illustratie en nog geen definitieve privacyverklaring. Vóór
          livegang moet deze tekst worden gecontroleerd en aangevuld door een gekwalificeerd
          jurist in de betreffende jurisdictie.
        </>
      ),
      updated: "Laatst bijgewerkt: 20 juni 2026",
      intro: (
        <>
          {SITE.name} ({SITE.domain}) is een marktplaats die opdrachtgevers koppelt aan
          geverifieerde dronepiloten. Bij dat matchen verwerken we persoonsgegevens van zowel
          opdrachtgevers als piloten, onder de {privacyRegime}. Hieronder lees je wat we
          verzamelen, op welke grondslag, hoelang we het bewaren en welke rechten je hebt.
        </>
      ),
      h2_1: "1. Welke gegevens we verwerken",
      p_1: "Welke gegevens we verwerken hangt af van je rol op het platform.",
      clientsTitle: "Opdrachtgevers",
      clients: [
        "Contactgegevens: naam, e-mailadres, telefoonnummer.",
        "Aanvraaggegevens: type klus, locatie, gewenste datum, budgetindicatie.",
        "Communicatie tussen jou, ons en de gematchte piloot.",
        "Technische gegevens: IP-adres, apparaat- en browserinformatie.",
      ],
      pilotsTitle: "Piloten",
      pilots: [
        `Profiel- en bedrijfsgegevens: naam, bedrijfsnaam, regio, werkgebied.`,
        `Verificatiedocumenten: ${jur.operatorId.label}, ${jur.authority.short}-/EASA-certificaten en verzekeringsbewijs.`,
        "Portfolio, beoordelingen en gerealiseerde opdrachten.",
        "Betaal- en uitbetalingsgegevens (via onze betaalverwerker).",
      ],
      h2_2: "2. Grondslag voor de verwerking",
      p_2: `We verwerken gegevens alleen met een geldige grondslag onder de ${privacyRegime}:`,
      bases: [
        ["Uitvoering van de overeenkomst:", " om je aanvraag te matchen, het platform te leveren en betalingen te verwerken."],
        ["Wettelijke verplichting:", " onder meer voor administratie en fiscale bewaarplicht."],
        ["Gerechtvaardigd belang:", " beveiliging, fraudepreventie, kwaliteits- en verificatiecontrole en verbetering van het platform."],
        ["Toestemming:", " voor niet-noodzakelijke cookies, marketingmail en het publiceren van footage in onze showcase."],
      ],
      h2_3: "3. Bewaartermijnen",
      p_3: `We bewaren gegevens niet langer dan nodig. Aanvragen die niet tot een opdracht leiden verwijderen of anonimiseren we doorgaans binnen 12 maanden. Account- en profielgegevens bewaren we zolang je account actief is. Facturen en administratiegegevens bewaren we ${recordRetentionYears} jaar conform de fiscale bewaarplicht.`,
      h2_4: "4. Footage-gebruik & toestemming",
      p_4: "Luchtbeelden kunnen herleidbare informatie bevatten (panden, kentekens, personen). Wij tonen footage in onze publieke showcase uitsluitend met toestemming van de opdrachtgever en de piloot. Je kunt die toestemming altijd intrekken; we verwijderen het materiaal dan zo snel als redelijkerwijs mogelijk. Voor de vlucht zelf en de naleving van privacyregels tijdens het filmen is de piloot verantwoordelijk.",
      h2_5: "5. EU-dataopslag & verwerkers",
      p_5: "We slaan persoonsgegevens op binnen de Europese Unie (datacenter in Frankfurt, Duitsland) en werken met zorgvuldig gekozen verwerkers, met wie we verwerkersovereenkomsten sluiten:",
      processors: [
        ["Supabase", " — database en accountopslag, inclusief verificatiedocumenten (EU-regio, Frankfurt)."],
        ["Stripe", " — betalingen, lead-fees en uitbetalingen aan piloten."],
        ["Resend", " — transactionele e-mail (matches, bevestigingen)."],
      ],
      p_5b: "Mocht een verwerker gegevens buiten de EU verwerken, dan gebeurt dat alleen met passende waarborgen zoals de EU-standaardcontractbepalingen.",
      h2_6: "6. Cookies",
      p_6: "We gebruiken functionele cookies die nodig zijn om het platform te laten werken (bijvoorbeeld om je sessie te onthouden). Analytische en marketingcookies plaatsen we alleen na jouw toestemming. Je kunt je voorkeuren altijd aanpassen via je browser of de cookie-instellingen.",
      h2_7: "7. Je rechten",
      p_7: `Onder de ${privacyRegime} heb je het recht op:`,
      rights: [
        "inzage in de gegevens die we van je hebben;",
        "correctie van onjuiste gegevens;",
        'verwijdering van je gegevens ("recht op vergetelheid");',
        "beperking van of bezwaar tegen de verwerking;",
        "overdraagbaarheid van je gegevens;",
        "intrekken van eerder gegeven toestemming.",
      ],
      complaint_pre: "Een verzoek doe je via ",
      complaint_post: (
        <>
          . We reageren binnen de wettelijke termijn. Ben je het oneens met hoe we met je
          gegevens omgaan, dan kun je een klacht indienen bij de{" "}
          <a href={dpa.url} target="_blank" rel="noopener noreferrer" className="link-underline">
            {dpa.name}
          </a>
          .
        </>
      ),
      h2_8: "8. Contact",
      contact_pre: "Vragen over deze verklaring? Mail ",
      contact_mid: ". Zie ook onze ",
      contact_link: "algemene voorwaarden",
      contact_post: ".",
    },
    en: {
      eyebrow: "Legal",
      h1: `Privacy & ${privacyRegime}`,
      lead: `How ${SITE.name} handles your personal data, whether you are a client or a drone pilot. We process no more than we need to, host within the EU (Frankfurt) and give you control over your data.`,
      concept: (
        <>
          <strong className="font-semibold">Draft.</strong> This is a plain-language summary
          for illustration only and is not a final privacy notice. Before going live, this text
          must be reviewed and completed by a qualified lawyer in the relevant jurisdiction.
        </>
      ),
      updated: "Last updated: 20 June 2026",
      intro: (
        <>
          {SITE.name} ({SITE.domain}) is a marketplace that connects clients with verified
          drone pilots. In matching them we process personal data of both clients and pilots
          under {privacyRegime}. Below you can read what we collect, on what lawful basis, how
          long we keep it and what rights you have.
        </>
      ),
      h2_1: "1. What data we collect",
      p_1: "The data we process depends on your role on the platform.",
      clientsTitle: "Clients",
      clients: [
        "Contact details: name, email address, telephone number.",
        "Request details: type of job, location, preferred date, budget indication.",
        "Communications between you, us and the matched pilot.",
        "Technical data: IP address, device and browser information.",
      ],
      pilotsTitle: "Pilots",
      pilots: [
        "Profile and business details: name, company name, region, area covered.",
        `Verification documents: ${jur.operatorId.label}, ${jur.authority.short} flight certificates and proof of insurance.`,
        "Portfolio, reviews and completed jobs.",
        "Payment and payout details (via our payment processor).",
      ],
      h2_2: "2. Lawful basis for processing",
      p_2: `We only process data where we have a valid lawful basis under ${privacyRegime}:`,
      bases: [
        ["Performance of a contract:", " to match your request, provide the platform and process payments."],
        ["Legal obligation:", " including accounting and statutory record-keeping."],
        ["Legitimate interests:", " security, fraud prevention, quality and verification checks, and improving the platform."],
        ["Consent:", " for non-essential cookies, marketing email and publishing footage in our showcase."],
      ],
      h2_3: "3. Retention periods",
      p_3: `We keep data no longer than necessary. Requests that do not lead to a job are usually deleted or anonymised within 12 months. Account and profile data are kept for as long as your account is active. Invoices and accounting records are kept for ${recordRetentionYears} years in line with statutory record-keeping requirements.`,
      h2_4: "4. Footage use & consent",
      p_4: "Aerial imagery can contain identifiable information (buildings, number plates, people). We only display footage in our public showcase with the consent of both the client and the pilot. You can withdraw that consent at any time; we will then remove the material as soon as reasonably practicable. The pilot is responsible for the flight itself and for complying with privacy rules while filming.",
      h2_5: "5. EU data hosting & processors",
      p_5: "We store personal data within the European Union (data centre in Frankfurt, Germany) and work with carefully selected processors with whom we have data processing agreements:",
      processors: [
        ["Supabase", " — database and account storage, including verification documents (EU region, Frankfurt)."],
        ["Stripe", " — payments, lead fees and payouts to pilots."],
        ["Resend", " — transactional email (matches, confirmations)."],
      ],
      p_5b: "Where a processor processes data outside the EU, it does so only with appropriate safeguards such as the EU Standard Contractual Clauses (as recognised under UK GDPR, supplemented by the UK Addendum where relevant).",
      h2_6: "6. Cookies",
      p_6: "We use functional cookies that are necessary for the platform to work (for example to remember your session). We only set analytics and marketing cookies after you consent. You can change your preferences at any time via your browser or the cookie settings.",
      h2_7: "7. Your rights",
      p_7: `Under ${privacyRegime} you have the right to:`,
      rights: [
        "access the data we hold about you;",
        "have inaccurate data corrected;",
        "have your data erased (the right to be forgotten);",
        "restrict or object to processing;",
        "data portability;",
        "withdraw consent you have previously given.",
      ],
      complaint_pre: "To make a request, email ",
      complaint_post: (
        <>
          . We respond within the statutory time limit. If you disagree with how we handle your
          data, you can lodge a complaint with the{" "}
          <a href={dpa.url} target="_blank" rel="noopener noreferrer" className="link-underline">
            {dpa.name}
          </a>
          .
        </>
      ),
      h2_8: "8. Contact",
      contact_pre: "Questions about this notice? Email ",
      contact_mid: ". See also our ",
      contact_link: "terms of service",
      contact_post: ".",
    },
    de: {
      eyebrow: "Rechtliches",
      h1: `Datenschutz & ${privacyRegime}`,
      lead: `Wie ${SITE.name} mit deinen personenbezogenen Daten umgeht — ob du Auftraggeber oder Drohnenpilot bist. Wir verarbeiten nicht mehr als nötig, hosten innerhalb der EU (Frankfurt) und geben dir die Kontrolle über deine Daten.`,
      concept: (
        <>
          <strong className="font-semibold">Entwurf.</strong> Dies ist eine verständliche
          Zusammenfassung zur Veranschaulichung und noch keine endgültige Datenschutzerklärung.
          Vor dem Livegang muss dieser Text von einem qualifizierten Juristen in der jeweiligen
          Jurisdiktion geprüft und ergänzt werden.
        </>
      ),
      updated: "Zuletzt aktualisiert: 20. Juni 2026",
      intro: (
        <>
          {SITE.name} ({SITE.domain}) ist ein Marktplatz, der Auftraggeber mit geprüften
          Drohnenpiloten zusammenbringt. Bei der Vermittlung verarbeiten wir personenbezogene
          Daten sowohl von Auftraggebern als auch von Piloten nach der {privacyRegime}.
          Nachfolgend erfährst du, was wir erheben, auf welcher Rechtsgrundlage, wie lange wir
          es speichern und welche Rechte du hast.
        </>
      ),
      h2_1: "1. Welche Daten wir verarbeiten",
      p_1: "Welche Daten wir verarbeiten, hängt von deiner Rolle auf der Plattform ab.",
      clientsTitle: "Auftraggeber",
      clients: [
        "Kontaktdaten: Name, E-Mail-Adresse, Telefonnummer.",
        "Anfragedaten: Art des Auftrags, Ort, Wunschtermin, Budgetangabe.",
        "Kommunikation zwischen dir, uns und dem vermittelten Piloten.",
        "Technische Daten: IP-Adresse, Geräte- und Browserinformationen.",
      ],
      pilotsTitle: "Piloten",
      pilots: [
        "Profil- und Unternehmensdaten: Name, Firmenname, Region, Einsatzgebiet.",
        `Nachweisdokumente: ${jur.operatorId.label}, ${jur.authority.short}-/EASA-Zertifikate und Versicherungsnachweis.`,
        "Portfolio, Bewertungen und durchgeführte Aufträge.",
        "Zahlungs- und Auszahlungsdaten (über unseren Zahlungsdienstleister).",
      ],
      h2_2: "2. Rechtsgrundlage der Verarbeitung",
      p_2: `Wir verarbeiten Daten nur auf einer gültigen Rechtsgrundlage nach der ${privacyRegime}:`,
      bases: [
        ["Vertragserfüllung:", " um deine Anfrage zu vermitteln, die Plattform bereitzustellen und Zahlungen abzuwickeln."],
        ["Gesetzliche Pflicht:", " unter anderem für Buchhaltung und steuerliche Aufbewahrungspflichten."],
        ["Berechtigtes Interesse:", " Sicherheit, Betrugsprävention, Qualitäts- und Verifizierungsprüfung sowie Verbesserung der Plattform."],
        ["Einwilligung:", " für nicht notwendige Cookies, Marketing-E-Mails und die Veröffentlichung von Aufnahmen in unserer Showcase."],
      ],
      h2_3: "3. Speicherfristen",
      p_3: `Wir speichern Daten nicht länger als nötig. Anfragen, die nicht zu einem Auftrag führen, löschen oder anonymisieren wir in der Regel innerhalb von 12 Monaten. Konto- und Profildaten speichern wir, solange dein Konto aktiv ist. Rechnungen und Buchhaltungsunterlagen bewahren wir gemäß den steuerlichen Aufbewahrungspflichten ${recordRetentionYears} Jahre auf.`,
      h2_4: "4. Nutzung von Aufnahmen & Einwilligung",
      p_4: "Luftaufnahmen können identifizierbare Informationen enthalten (Gebäude, Kennzeichen, Personen). Wir zeigen Aufnahmen in unserer öffentlichen Showcase ausschließlich mit Einwilligung sowohl des Auftraggebers als auch des Piloten. Du kannst diese Einwilligung jederzeit widerrufen; wir entfernen das Material dann so schnell wie vernünftigerweise möglich. Für den Flug selbst und die Einhaltung der Datenschutzregeln während der Aufnahmen ist der Pilot verantwortlich.",
      h2_5: "5. EU-Datenhaltung & Auftragsverarbeiter",
      p_5: "Wir speichern personenbezogene Daten innerhalb der Europäischen Union (Rechenzentrum in Frankfurt, Deutschland) und arbeiten mit sorgfältig ausgewählten Auftragsverarbeitern, mit denen wir Auftragsverarbeitungsverträge schließen:",
      processors: [
        ["Supabase", " — Datenbank und Kontospeicherung, einschließlich Nachweisdokumente (EU-Region, Frankfurt)."],
        ["Stripe", " — Zahlungen, Lead-Gebühren und Auszahlungen an Piloten."],
        ["Resend", " — transaktionale E-Mails (Vermittlungen, Bestätigungen)."],
      ],
      p_5b: "Sollte ein Auftragsverarbeiter Daten außerhalb der EU verarbeiten, geschieht dies nur mit geeigneten Garantien wie den EU-Standardvertragsklauseln.",
      h2_6: "6. Cookies",
      p_6: "Wir verwenden funktionale Cookies, die für den Betrieb der Plattform erforderlich sind (zum Beispiel um deine Sitzung zu speichern). Analyse- und Marketing-Cookies setzen wir nur mit deiner Einwilligung. Du kannst deine Einstellungen jederzeit über deinen Browser oder die Cookie-Einstellungen ändern.",
      h2_7: "7. Deine Rechte",
      p_7: `Nach der ${privacyRegime} hast du das Recht auf:`,
      rights: [
        "Auskunft über die Daten, die wir über dich gespeichert haben;",
        "Berichtigung unrichtiger Daten;",
        "Löschung deiner Daten („Recht auf Vergessenwerden“);",
        "Einschränkung der oder Widerspruch gegen die Verarbeitung;",
        "Datenübertragbarkeit;",
        "Widerruf einer zuvor erteilten Einwilligung.",
      ],
      complaint_pre: "Einen Antrag stellst du per E-Mail an ",
      complaint_post: (
        <>
          . Wir antworten innerhalb der gesetzlichen Frist. Bist du mit dem Umgang mit deinen
          Daten nicht einverstanden, kannst du eine Beschwerde bei der{" "}
          <a href={dpa.url} target="_blank" rel="noopener noreferrer" className="link-underline">
            {dpa.name}
          </a>{" "}
          einreichen.
        </>
      ),
      h2_8: "8. Kontakt",
      contact_pre: "Fragen zu dieser Erklärung? Schreib an ",
      contact_mid: ". Siehe auch unsere ",
      contact_link: "Allgemeinen Geschäftsbedingungen",
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
              <p className="text-sm text-ink-muted">{T.updated}</p>
              <p className="mt-4 leading-relaxed text-ink-soft pretty">{T.intro}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_1}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_1}</p>
              <h3 className="mt-5 font-semibold">{T.clientsTitle}</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                {T.clients.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <h3 className="mt-5 font-semibold">{T.pilotsTitle}</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                {T.pilots.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_2}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_2}</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                {T.bases.map(([b, rest]) => (
                  <li key={b}>
                    <strong>{b}</strong>
                    {rest}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_3}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_3}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_4}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_4}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_5}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_5}</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                {T.processors.map(([name, rest]) => (
                  <li key={name}>
                    <strong>{name}</strong>
                    {rest}
                  </li>
                ))}
              </ul>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_5b}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_6}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_6}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_7}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{T.p_7}</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                {T.rights.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                {T.complaint_pre}
                <a href={`mailto:${SITE.email}`} className="link-underline">
                  {SITE.email}
                </a>
                {T.complaint_post}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">{T.h2_8}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                {T.contact_pre}
                <a href={`mailto:${SITE.email}`} className="link-underline">
                  {SITE.email}
                </a>
                {T.contact_mid}
                <Link href={localized(locale, "/voorwaarden")} className="link-underline">
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
