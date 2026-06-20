import type { Metadata } from "next";
import {
  ShieldCheck,
  Zap,
  Award,
  MapPin,
  ClipboardCheck,
  FileCheck2,
  BadgeCheck,
  Star,
} from "lucide-react";
import { SectionHeading, Stat } from "@/components/bits";
import { MediaPlaceholder } from "@/components/media";
import { CTASection } from "@/components/cta";
import { SITE } from "@/lib/site";
import { STATS } from "@/lib/seed";
import { formatNumber } from "@/lib/utils";
import { pick } from "@/lib/i18n/messages";
import { getLocaleConfig, LOCALES } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const M = pick(locale, {
    nl: {
      title: `Over ons — ${SITE.name}`,
      description:
        "Skylens is de marktplaats die opdrachtgevers koppelt aan geverifieerde, verzekerde dronepiloten. Lees waar we voor staan en hoe we piloten controleren.",
    },
    en: {
      title: `About us — ${SITE.name}`,
      description:
        "Skylens is the marketplace connecting clients with verified, insured drone pilots. Read what we stand for and how we vet pilots.",
    },
    de: {
      title: `Über uns — ${SITE.name}`,
      description:
        "Skylens ist der Marktplatz, der Auftraggeber mit geprüften, versicherten Drohnenpiloten verbindet. Erfahren Sie, wofür wir stehen und wie wir Piloten prüfen.",
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [getLocaleConfig(l).htmlLang, `${SITE.url}/${l}/over-ons`]),
      ),
    },
  };
}

export default async function OverOnsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const T = pick(locale, {
    nl: {
      eyebrowHero: `Over ${SITE.name}`,
      heroTitle: "Luchtbeeld zonder gokken op wie je inhuurt",
      heroIntro:
        "De markt telt duizenden dronepiloten — van hobbyist tot mission-grade specialist. Voor een opdrachtgever is bijna onmogelijk te zien wie legaal vliegt, verzekerd is en het juiste certificaat heeft. Skylens lost dat op: wij verifiëren de piloten, jij kiest met vertrouwen.",
      mediaA: "Vastgoed · luchtfoto",
      mediaB: "Inspectie · detail",
      mediaC: "Marketing · film",
      statPilots: "Actieve piloten",
      statCities: "Steden gedekt",
      statDelivery: "Gem. levertijd",
      statRating: "Gem. beoordeling",
      missionEyebrow: "Onze missie",
      missionTitle: "De beste piloot voor de klus — eerlijk geprijsd",
      missionP1:
        "We bouwen een marktplaats die opdrachtgevers en dronepiloten op een eerlijke manier samenbrengt. Geen ondoorzichtige bureaumarges, geen onbekende freelancers van een advertentiesite — maar geverifieerde vakmensen met vaste, vooraf zichtbare prijzen.",
      missionP2:
        "Alles wat we doen draait om footage: het concrete resultaat dat je in handen krijgt. Daarom werken we met heldere pakketten en standaard deliverables per toepassing, zodat je appels met appels vergelijkt en precies weet wat je oplevert.",
      missionP3:
        "Lokaal matchen betekent kortere reistijden, geen reiskosten en een piloot die de omgeving kent. We werken volgens de regelgeving van het land waar je vliegt, met piloten en steden uit die markt.",
      verifyEyebrow: "Hoe we piloten verifiëren",
      verifyTitle: "Het 'Geverifieerd'-label moet je vertrouwen waard zijn",
      verifyIntro:
        "Een badge is alleen iets waard als er een echte controle achter zit. Dit checken we voordat een piloot zich geverifieerd mag noemen.",
      verifyNote:
        "Verificatie is een momentopname en geen garantie: de eindverantwoordelijkheid voor een veilige, legale vlucht ligt altijd bij de piloot. We controleren steekproefsgewijs opnieuw en trekken het label in bij signalen dat niet meer aan de eisen wordt voldaan.",
      valuesEyebrow: "Waar we voor staan",
      valuesTitle: "Vier dingen die niet onderhandelbaar zijn",
      ctaTitle: "Klaar om met vertrouwen te kiezen?",
      ctaIntro:
        "Plaats gratis je aanvraag en ontvang binnen enkele uren matches met geverifieerde piloten bij jou in de buurt.",
      verifySteps: [
        { title: "Operator-registratie", text: "We controleren of de piloot als exploitant geregistreerd staat bij de bevoegde autoriteit en een geldig operator-nummer voert." },
        { title: "Vliegbewijs", text: "Per toepassing kijken we naar het juiste certificaat — A1/A3, A2 of specifieke categorie — en of dat past bij de klus." },
        { title: "Aansprakelijkheidsverzekering", text: "Een geldige drone-aansprakelijkheidsverzekering van minimaal €1 mln is voorwaarde voor het 'Geverifieerd'-label." },
        { title: "Werk & reviews", text: "We beoordelen portfolio en klantbeoordelingen. Pas na een geslaagde controle wordt een profiel zichtbaar verhoogd." },
      ],
      values: [
        { title: "Vertrouwen", text: "Je kunt zelf niet zien of iemand legaal vliegt en verzekerd is. Wij checken het, zodat jij met een gerust hart kiest." },
        { title: "Snelheid", text: "Eén aanvraag, binnen enkele uren matches, beelden doorgaans binnen 48–72 uur. Geen offertes najagen." },
        { title: "Vakmanschap", text: "We sturen je klus alleen naar piloten met de juiste apparatuur en certificering voor precies dat type werk." },
        { title: "Lokaal", text: "Altijd de dichtstbijzijnde geschikte piloot. Minder reistijd, geen reiskosten, kennis van de omgeving." },
      ],
    },
    en: {
      eyebrowHero: `About ${SITE.name}`,
      heroTitle: "Aerial footage without gambling on who you hire",
      heroIntro:
        "The market has thousands of drone pilots — from hobbyists to mission-grade specialists. For a client it is nearly impossible to tell who flies legally, who is insured and who holds the right certificate. Skylens solves that: we verify the pilots, you choose with confidence.",
      mediaA: "Property · aerial",
      mediaB: "Inspection · detail",
      mediaC: "Marketing · film",
      statPilots: "Active pilots",
      statCities: "Towns covered",
      statDelivery: "Avg. delivery time",
      statRating: "Avg. rating",
      missionEyebrow: "Our mission",
      missionTitle: "The best pilot for the job — fairly priced",
      missionP1:
        "We are building a marketplace that brings clients and drone pilots together fairly. No opaque agency mark-ups, no unknown freelancers from a classifieds site — just verified professionals with fixed, up-front prices.",
      missionP2:
        "Everything we do comes back to the footage: the concrete result you end up with. That is why we work with clear packages and standard deliverables per service, so you compare like with like and know exactly what you will get.",
      missionP3:
        "Matching locally means shorter travel times, no travel costs and a pilot who knows the area. We work to the rules of the country where you fly, with pilots and towns from that market.",
      verifyEyebrow: "How we verify pilots",
      verifyTitle: "The 'Verified' badge has to earn your trust",
      verifyIntro:
        "A badge is only worth something if there is a real check behind it. This is what we verify before a pilot may call themselves verified.",
      verifyNote:
        "Verification is a snapshot, not a guarantee: ultimate responsibility for a safe, legal flight always rests with the pilot. We re-check on a sample basis and withdraw the badge at any sign that the requirements are no longer met.",
      valuesEyebrow: "What we stand for",
      valuesTitle: "Four things that are non-negotiable",
      ctaTitle: "Ready to choose with confidence?",
      ctaIntro:
        "Post your request for free and receive matches with verified pilots near you within hours.",
      verifySteps: [
        { title: "Operator registration", text: "We check that the pilot is registered as an operator with the competent authority and holds a valid operator ID." },
        { title: "Pilot certificate", text: "For each service we look at the right certificate — A1/A3, A2 or specific category — and whether it suits the job." },
        { title: "Liability insurance", text: "Valid drone third-party liability cover of at least £1m is a condition of the 'Verified' badge." },
        { title: "Work & reviews", text: "We assess portfolio and customer reviews. Only after a successful check is a profile promoted." },
      ],
      values: [
        { title: "Trust", text: "You cannot see for yourself whether someone flies legally and is insured. We check it, so you can choose with peace of mind." },
        { title: "Speed", text: "One request, matches within hours, footage usually within 48–72 hours. No chasing quotes." },
        { title: "Craft", text: "We only send your job to pilots with the right equipment and certification for that exact type of work." },
        { title: "Local", text: "Always the nearest suitable pilot. Less travel time, no travel costs, knowledge of the area." },
      ],
    },
    de: {
      eyebrowHero: `Über ${SITE.name}`,
      heroTitle: "Luftaufnahmen, ohne zu raten, wen Sie beauftragen",
      heroIntro:
        "Der Markt zählt Tausende Drohnenpiloten — vom Hobbyisten bis zum Mission-Grade-Spezialisten. Für Auftraggeber ist kaum zu erkennen, wer legal fliegt, versichert ist und das richtige Zeugnis besitzt. Skylens löst das: Wir prüfen die Piloten, Sie wählen mit Vertrauen.",
      mediaA: "Immobilien · Luftbild",
      mediaB: "Inspektion · Detail",
      mediaC: "Marketing · Film",
      statPilots: "Aktive Piloten",
      statCities: "Städte abgedeckt",
      statDelivery: "Ø Lieferzeit",
      statRating: "Ø Bewertung",
      missionEyebrow: "Unsere Mission",
      missionTitle: "Der beste Pilot für den Auftrag — fair bepreist",
      missionP1:
        "Wir bauen einen Marktplatz, der Auftraggeber und Drohnenpiloten auf faire Weise zusammenbringt. Keine undurchsichtigen Agenturmargen, keine unbekannten Freelancer von einer Kleinanzeigenseite — sondern geprüfte Fachleute mit festen, vorab sichtbaren Preisen.",
      missionP2:
        "Alles, was wir tun, dreht sich um die Footage: das konkrete Ergebnis, das Sie in Händen halten. Deshalb arbeiten wir mit klaren Paketen und Standard-Deliverables je Anwendung, damit Sie Gleiches mit Gleichem vergleichen und genau wissen, was Sie erhalten.",
      missionP3:
        "Lokale Vermittlung bedeutet kürzere Anfahrtswege, keine Reisekosten und einen Piloten, der die Umgebung kennt. Wir arbeiten nach den Vorschriften des Landes, in dem Sie fliegen, mit Piloten und Städten aus diesem Markt.",
      verifyEyebrow: "Wie wir Piloten prüfen",
      verifyTitle: "Das Siegel 'Geprüft' muss Ihr Vertrauen verdienen",
      verifyIntro:
        "Ein Siegel ist nur etwas wert, wenn eine echte Prüfung dahintersteht. Das prüfen wir, bevor sich ein Pilot geprüft nennen darf.",
      verifyNote:
        "Die Prüfung ist eine Momentaufnahme und keine Garantie: Die Endverantwortung für einen sicheren, legalen Flug liegt stets beim Piloten. Wir prüfen stichprobenartig erneut und entziehen das Siegel bei Hinweisen, dass die Anforderungen nicht mehr erfüllt werden.",
      valuesEyebrow: "Wofür wir stehen",
      valuesTitle: "Vier Dinge, die nicht verhandelbar sind",
      ctaTitle: "Bereit, mit Vertrauen zu wählen?",
      ctaIntro:
        "Stellen Sie kostenlos Ihre Anfrage und erhalten Sie innerhalb von Stunden Vermittlungen zu geprüften Piloten in Ihrer Nähe.",
      verifySteps: [
        { title: "Betreiber-Registrierung", text: "Wir prüfen, ob der Pilot als Betreiber bei der zuständigen Behörde registriert ist und eine gültige Betreiber-ID führt." },
        { title: "Pilotenzeugnis", text: "Je Anwendung achten wir auf das richtige Zeugnis — A1/A3, A2 oder spezielle Kategorie — und ob es zum Auftrag passt." },
        { title: "Haftpflichtversicherung", text: "Eine gültige Drohnen-Haftpflicht von mindestens 1 Mio. € ist Voraussetzung für das Siegel 'Geprüft'." },
        { title: "Arbeit & Bewertungen", text: "Wir bewerten Portfolio und Kundenbewertungen. Erst nach erfolgreicher Prüfung wird ein Profil sichtbar hervorgehoben." },
      ],
      values: [
        { title: "Vertrauen", text: "Sie können selbst nicht sehen, ob jemand legal fliegt und versichert ist. Wir prüfen es, damit Sie beruhigt wählen." },
        { title: "Tempo", text: "Eine Anfrage, Vermittlungen innerhalb von Stunden, Aufnahmen meist in 48–72 Stunden. Kein Angebote-Hinterherjagen." },
        { title: "Handwerk", text: "Wir geben Ihren Auftrag nur an Piloten mit der richtigen Ausrüstung und Zertifizierung für genau diese Art Arbeit." },
        { title: "Lokal", text: "Immer der nächstgelegene geeignete Pilot. Weniger Anfahrt, keine Reisekosten, Kenntnis der Umgebung." },
      ],
    },
  });

  const verifyIcons = [FileCheck2, BadgeCheck, ShieldCheck, ClipboardCheck];
  const valueIcons = [ShieldCheck, Zap, Award, MapPin];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="eyebrow">{T.eyebrowHero}</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              {T.heroTitle}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted pretty">
              {T.heroIntro}
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <MediaPlaceholder seed="about-a" aspect="tall" label={T.mediaA} className="rounded-2xl shadow-card" />
              <div className="mt-10 grid gap-4">
                <MediaPlaceholder seed="about-b" aspect="square" label={T.mediaB} className="rounded-2xl shadow-card" />
                <MediaPlaceholder seed="about-c" aspect="video" isVideo label={T.mediaC} className="rounded-2xl shadow-card" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat row ── */}
      <section className="border-y border-line bg-paper-soft">
        <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          <Stat value={formatNumber(STATS.activePilots, locale)} label={T.statPilots} />
          <Stat value={`${STATS.citiesCovered}+`} label={T.statCities} />
          <Stat value={STATS.avgDelivery} label={T.statDelivery} />
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-1.5 font-display text-3xl font-bold text-ink sm:text-4xl">
              <Star className="h-6 w-6 fill-signal text-signal" />
              {STATS.avgRating.toFixed(1)}
            </span>
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">
              {T.statRating}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow={T.missionEyebrow}
            title={T.missionTitle}
          />
          <div className="space-y-5 text-lg leading-relaxed text-ink-soft pretty">
            <p>{T.missionP1}</p>
            <p>{T.missionP2}</p>
            <p>{T.missionP3}</p>
          </div>
        </div>
      </section>

      {/* ── Verification ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={T.verifyEyebrow}
            title={T.verifyTitle}
            intro={T.verifyIntro}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {T.verifySteps.map((s, i) => {
              const Icon = verifyIcons[i];
              return (
                <div key={s.title} className="card card-pad">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.text}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {T.verifyNote}
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          center
          eyebrow={T.valuesEyebrow}
          title={T.valuesTitle}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {T.values.map((v, i) => {
            const Icon = valueIcons[i];
            return (
              <div key={v.title} className="card card-pad">
                <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.7} />
                <h3 className="mt-4 font-bold">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{v.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection
        title={T.ctaTitle}
        intro={T.ctaIntro}
      />
    </>
  );
}
