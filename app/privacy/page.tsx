import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & AVG — Skylens",
  description:
    "Hoe Skylens omgaat met persoonsgegevens: welke gegevens we verwerken, waarom, hoelang we ze bewaren, je rechten onder de AVG, EU-dataopslag, verwerkers en cookies.",
};

export default function PrivacyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative py-14 sm:py-20">
          <span className="eyebrow">Juridisch</span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
            Privacy &amp; AVG
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted pretty">
            Hoe {SITE.name} omgaat met jouw persoonsgegevens als opdrachtgever of dronepiloot.
            We verwerken niet meer dan nodig, slaan op binnen de EU en geven je controle over je
            gegevens.
          </p>
        </div>
      </section>

      {/* ── Prose ── */}
      <section className="container-x py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-signal/40 bg-signal/10 px-5 py-4 text-sm leading-relaxed text-ink-soft">
            <strong className="font-semibold">Concept.</strong> Dit is een leesbare samenvatting
            ter illustratie en nog geen definitieve privacyverklaring. Vóór livegang wordt deze
            tekst door een jurist gecontroleerd en aangevuld.
          </div>

          <div className="mt-10 space-y-10">
            <section>
              <p className="text-sm text-ink-muted">Laatst bijgewerkt: 20 juni 2026</p>
              <p className="mt-4 leading-relaxed text-ink-soft pretty">
                {SITE.name} ({SITE.domain}) is een marktplaats die opdrachtgevers koppelt aan
                geverifieerde dronepiloten. Bij dat matchen verwerken we persoonsgegevens van zowel
                opdrachtgevers als piloten. Hieronder lees je wat we verzamelen, waarom, hoelang we
                het bewaren en welke rechten je hebt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">1. Welke gegevens we verwerken</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                Welke gegevens we verwerken hangt af van je rol op het platform.
              </p>
              <h3 className="mt-5 font-semibold">Opdrachtgevers</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                <li>Contactgegevens: naam, e-mailadres, telefoonnummer.</li>
                <li>Aanvraaggegevens: type klus, locatie, gewenste datum, budgetindicatie.</li>
                <li>Communicatie tussen jou, ons en de gematchte piloot.</li>
                <li>Technische gegevens: IP-adres, apparaat- en browserinformatie.</li>
              </ul>
              <h3 className="mt-5 font-semibold">Piloten</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                <li>Profiel- en bedrijfsgegevens: naam, bedrijfsnaam, regio, werkgebied.</li>
                <li>Verificatiegegevens: RDW-exploitantnummer, EASA-certificaten, verzekeringsbewijs.</li>
                <li>Portfolio, beoordelingen en gerealiseerde opdrachten.</li>
                <li>Betaal- en uitbetalingsgegevens (via onze betaalverwerker).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold">2. Waarom we deze gegevens verwerken</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                We verwerken gegevens alleen met een geldige grondslag onder de AVG:
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                <li>
                  <strong>Uitvoering van de overeenkomst:</strong> om je aanvraag te matchen, het
                  platform te leveren en betalingen te verwerken.
                </li>
                <li>
                  <strong>Wettelijke verplichting:</strong> onder meer voor administratie en fiscale
                  bewaarplicht.
                </li>
                <li>
                  <strong>Gerechtvaardigd belang:</strong> beveiliging, fraudepreventie, kwaliteits-
                  en verificatiecontrole en verbetering van het platform.
                </li>
                <li>
                  <strong>Toestemming:</strong> voor niet-noodzakelijke cookies, marketingmail en het
                  publiceren van footage in onze showcase.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold">3. Bewaartermijnen</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                We bewaren gegevens niet langer dan nodig. Aanvragen die niet tot een opdracht leiden
                verwijderen of anonimiseren we doorgaans binnen 12 maanden. Account- en
                profielgegevens bewaren we zolang je account actief is. Facturen en
                administratiegegevens bewaren we 7 jaar conform de fiscale bewaarplicht.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">4. Footage-gebruik &amp; toestemming</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                Luchtbeelden kunnen herleidbare informatie bevatten (panden, kentekens, personen).
                Wij tonen footage in onze publieke showcase uitsluitend met toestemming van de
                opdrachtgever en de piloot. Je kunt die toestemming altijd intrekken; we verwijderen
                het materiaal dan zo snel als redelijkerwijs mogelijk. Voor de vlucht zelf en de
                naleving van privacyregels tijdens het filmen is de piloot verantwoordelijk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">5. EU-dataopslag &amp; verwerkers</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                We slaan persoonsgegevens op binnen de Europese Unie en werken met zorgvuldig
                gekozen verwerkers, met wie we verwerkersovereenkomsten sluiten:
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                <li>
                  <strong>Supabase</strong> — database en accountopslag (EU-regio).
                </li>
                <li>
                  <strong>Stripe</strong> — betalingen, lead-fees en uitbetalingen aan piloten.
                </li>
                <li>
                  <strong>Resend</strong> — transactionele e-mail (matches, bevestigingen).
                </li>
              </ul>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                Mocht een verwerker gegevens buiten de EU verwerken, dan gebeurt dat alleen met
                passende waarborgen zoals de EU-standaardcontractbepalingen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">6. Cookies</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                We gebruiken functionele cookies die nodig zijn om het platform te laten werken
                (bijvoorbeeld om je sessie te onthouden). Analytische en marketingcookies plaatsen
                we alleen na jouw toestemming. Je kunt je voorkeuren altijd aanpassen via je browser
                of de cookie-instellingen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">7. Je rechten</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                Onder de AVG heb je het recht op:
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                <li>inzage in de gegevens die we van je hebben;</li>
                <li>correctie van onjuiste gegevens;</li>
                <li>verwijdering van je gegevens ("recht op vergetelheid");</li>
                <li>beperking van of bezwaar tegen de verwerking;</li>
                <li>overdraagbaarheid van je gegevens;</li>
                <li>intrekken van eerder gegeven toestemming.</li>
              </ul>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                Een verzoek doe je via{" "}
                <a href={`mailto:${SITE.email}`} className="link-underline">
                  {SITE.email}
                </a>
                . We reageren binnen de wettelijke termijn. Ben je het oneens met hoe we met je
                gegevens omgaan, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">8. Contact</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                Vragen over deze verklaring? Mail{" "}
                <a href={`mailto:${SITE.email}`} className="link-underline">
                  {SITE.email}
                </a>
                . Zie ook onze{" "}
                <Link href="/voorwaarden" className="link-underline">
                  algemene voorwaarden
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
