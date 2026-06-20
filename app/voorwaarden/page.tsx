import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Algemene voorwaarden — Skylens",
  description:
    "De algemene voorwaarden van Skylens: onze rol als marktplaats, lead-fees en commissie, exclusiviteit, verificatie-disclaimer, footage-licentie, aansprakelijkheid en toepasselijk recht.",
};

export default function VoorwaardenPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative py-14 sm:py-20">
          <span className="eyebrow">Juridisch</span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
            Algemene voorwaarden
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted pretty">
            De spelregels voor het gebruik van {SITE.name}. We zijn een marktplaats die
            opdrachtgevers en dronepiloten samenbrengt — we zijn zelf geen partij bij de opdracht
            die jullie met elkaar sluiten.
          </p>
        </div>
      </section>

      {/* ── Prose ── */}
      <section className="container-x py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-signal/40 bg-signal/10 px-5 py-4 text-sm leading-relaxed text-ink-soft">
            <strong className="font-semibold">Concept.</strong> Dit is een voorbeeldtekst ter
            illustratie en nog geen rechtsgeldige overeenkomst. Deze voorwaarden worden vóór
            livegang door een jurist beoordeeld en definitief gemaakt.
          </div>

          <div className="mt-10 space-y-10">
            <section>
              <p className="text-sm text-ink-muted">Versie: concept · 20 juni 2026</p>
            </section>

            <section>
              <h2 className="text-xl font-bold">1. Onze rol als marktplaats</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                {SITE.name} biedt een platform dat opdrachtgevers koppelt aan dronepiloten. Wij
                faciliteren het contact, de informatie-uitwisseling en (waar van toepassing) de
                betaling. De daadwerkelijke dronedienst wordt geleverd door de piloot.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">2. Geen partij bij de overeenkomst</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                De overeenkomst voor het uitvoeren van een drone-opdracht komt rechtstreeks tot stand
                tussen de opdrachtgever en de piloot. {SITE.name} is daarbij geen partij en draagt
                geen verantwoordelijkheid voor de uitvoering, de kwaliteit of de oplevering van het
                werk. Afspraken over prijs, planning, meerwerk en oplevering maken opdrachtgever en
                piloot onderling.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">3. Lead-fees, commissie &amp; exclusiviteit</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                Piloten betalen voor het ontvangen van leads en/of een commissie over via het
                platform afgeronde opdrachten, afhankelijk van hun lidmaatschap. De geldende tarieven,
                commissiepercentages en exclusiviteit per job-tier staan vermeld op de pagina{" "}
                <Link href="/voor-piloten" className="link-underline">
                  voor piloten
                </Link>
                .
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                <li>
                  <strong>Leads</strong> kunnen gedeeld (meerdere piloten), semi-exclusief of exclusief
                  worden aangeboden, afhankelijk van het tier.
                </li>
                <li>
                  <strong>Een betaalde lead</strong> is geen garantie op een opdracht; het is toegang
                  tot de aanvraag en de contactgegevens.
                </li>
                <li>
                  Tarieven kunnen wijzigen; wijzigingen worden vooraf gecommuniceerd.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold">4. Verificatie-disclaimer</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                Wij controleren piloten op onder meer RDW-registratie, EASA-certificering en
                verzekering en kennen op basis daarvan een "Geverifieerd"-label toe. Deze controle is
                een momentopname en geen garantie. De eindverantwoordelijkheid voor een veilige,
                legale vlucht en voor het naleven van alle toepasselijke regelgeving ligt te allen
                tijde bij de piloot. {SITE.name} is niet aansprakelijk voor onjuiste of verouderde
                informatie die door een piloot is verstrekt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">5. Footage-licentie</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                De rechten op gemaakte beelden worden geregeld in de overeenkomst tussen opdrachtgever
                en piloot. Door materiaal aan te leveren voor onze showcase, verlenen opdrachtgever en
                piloot {SITE.name} een niet-exclusieve licentie om die beelden te tonen ter promotie
                van het platform en de betreffende piloot. Deze licentie kan worden ingetrokken,
                waarna wij het materiaal zo snel als redelijkerwijs mogelijk verwijderen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">6. Aansprakelijkheid</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                {SITE.name} levert het platform "as is" en spant zich in voor een goede werking,
                maar geeft geen garantie op ononderbroken beschikbaarheid. Voor zover wettelijk
                toegestaan is onze aansprakelijkheid beperkt tot directe schade en tot het bedrag dat
                de betrokken partij in de voorgaande twaalf maanden aan ons heeft betaald. Wij zijn
                niet aansprakelijk voor schade die voortvloeit uit de uitvoering van een opdracht door
                een piloot of uit afspraken tussen opdrachtgever en piloot.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">7. Verplichtingen van gebruikers</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand-400">
                <li>Je verstrekt juiste en actuele gegevens.</li>
                <li>Piloten beschikken over de vereiste certificaten en verzekering en houden deze actueel.</li>
                <li>Je gebruikt het platform niet voor onrechtmatige doeleinden of om regels te omzeilen.</li>
                <li>Je respecteert de privacy van derden bij het maken en delen van beelden.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold">8. Wijzigingen</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                We kunnen deze voorwaarden van tijd tot tijd aanpassen. Belangrijke wijzigingen
                communiceren we vooraf. De meest actuele versie staat altijd op deze pagina.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">9. Toepasselijk recht</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                Op deze voorwaarden en op het gebruik van {SITE.name} is Nederlands recht van
                toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland, tenzij
                dwingend recht anders bepaalt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">10. Contact</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">
                Vragen over deze voorwaarden? Mail{" "}
                <a href={`mailto:${SITE.email}`} className="link-underline">
                  {SITE.email}
                </a>
                . Lees ook ons{" "}
                <Link href="/privacy" className="link-underline">
                  privacybeleid
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
