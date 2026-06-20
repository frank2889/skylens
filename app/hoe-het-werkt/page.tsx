import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  Users,
  PlaneTakeoff,
  ShieldCheck,
  Euro,
  Clock,
  Lock,
  ArrowRight,
  Plus,
} from "lucide-react";
import { SectionHeading, Eyebrow, Stat } from "@/components/bits";
import { MediaPlaceholder } from "@/components/media";
import { CTASection } from "@/components/cta";
import { STATS } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Hoe het werkt · Van aanvraag tot luchtbeeld | Skylens",
  description:
    "In drie stappen naar geverifieerde dronebeelden: plaats je gratis aanvraag, ontvang matches met verzekerde EASA-piloten bij jou in de buurt en kies op prijs en reviews. Beelden binnen 48–72 uur.",
};

const STEPS = [
  {
    icon: ClipboardList,
    eyebrow: "Stap 1",
    title: "Plaats je aanvraag",
    text: "Vertel ons in zo'n 60 seconden wat je nodig hebt: de toepassing, de locatie, je gewenste datum en een indicatie van je budget. Gratis en vrijblijvend — je hoeft geen account aan te maken en je betaalt niets om matches te ontvangen.",
    points: [
      "Kies je toepassing (vastgoed, marketing, inspectie, mapping …)",
      "Vul je locatie en gewenste datum in",
      "Geef een budgetindicatie — handig voor de juiste piloot",
    ],
    seed: "hiw-step-1",
    label: "Aanvraagformulier",
    aspect: "video" as const,
  },
  {
    icon: Users,
    eyebrow: "Stap 2",
    title: "Ontvang je matches",
    text: "Onze matching koppelt je aanvraag automatisch aan piloten die binnen hun vliegbereik vallen, de juiste apparatuur hebben en het vereiste EASA-certificaat en de verzekering voor jouw klus bezitten. Doorgaans heb je binnen enkele uren passende profielen.",
    points: [
      "Alleen geverifieerde, verzekerde piloten in jouw regio",
      "Gematcht op apparatuur en certificering per toepassing",
      "Geen reiskosten — altijd een piloot dicht bij de locatie",
    ],
    seed: "hiw-step-2",
    label: "Gematchte piloten",
    aspect: "video" as const,
  },
  {
    icon: PlaneTakeoff,
    eyebrow: "Stap 3",
    title: "Kies & vlieg",
    text: "Vergelijk de profielen op prijs, portfolio en reviews en kies de piloot die bij je past. Je maakt rechtstreeks afspraken over de vluchtdatum. Na de vlucht ontvang je je bewerkte beelden — standaard binnen 48 tot 72 uur.",
    points: [
      "Vergelijk profielen, vaste pakketprijzen en beoordelingen",
      "Plan de vlucht op een moment dat jou uitkomt",
      "Bewerkte beelden geleverd binnen 48–72 uur",
    ],
    seed: "hiw-step-3",
    label: "Oplevering · 4K",
    aspect: "video" as const,
  },
];

const TRUST = [
  {
    icon: ShieldCheck,
    title: "Geverifieerd & verzekerd",
    text: "Elke piloot is gecontroleerd op RDW-registratie, EASA-certificering (A1/A3, A2 of STS) en een aansprakelijkheidsverzekering van minimaal €1 miljoen. Jij hoeft niets te controleren.",
  },
  {
    icon: Euro,
    title: "Vaste, transparante prijzen",
    text: "Geen vage offertetrajecten of verborgen bureaumarges. Je ziet vooraf per pakket wat je betaalt, zodat je appels met appels vergelijkt. Alle prijzen zijn exclusief BTW.",
  },
  {
    icon: Clock,
    title: "Snel geregeld",
    text: "Matches binnen enkele uren, beelden doorgaans binnen 48–72 uur. Omdat we altijd de dichtstbijzijnde geschikte piloot koppelen, betaal je geen onnodige reiskosten.",
  },
  {
    icon: Lock,
    title: "AVG-proof & veilig",
    text: "Je gegevens delen we alleen met de piloten die op jouw aanvraag matchen, en uitsluitend om je opdracht uit te voeren. Conform de AVG, zonder doorverkoop aan derden.",
  },
];

const FAQ = [
  {
    q: "Wat kost het om een aanvraag te plaatsen?",
    a: "Niets. Een aanvraag plaatsen en matches ontvangen is volledig gratis en vrijblijvend. Je betaalt pas wanneer je een piloot kiest en een opdracht bevestigt. De pakketprijzen staan vooraf vast, zodat je nooit voor verrassingen komt te staan. Alle bedragen zijn exclusief BTW.",
  },
  {
    q: "Hoe snel ontvang ik mijn beelden?",
    a: "Voor de meeste opdrachten leveren piloten de bewerkte beelden binnen 48 tot 72 uur na de vlucht. Voor technische opdrachten zoals inspectierapporten, 3D-modellen of LiDAR-karteringen geldt een langere doorlooptijd — doorgaans 3 tot 15 werkdagen, afhankelijk van het pakket. De match zelf heb je meestal al binnen enkele uren.",
  },
  {
    q: "Zijn de piloten verzekerd?",
    a: "Ja. We verifiëren bij elke piloot een geldige aansprakelijkheidsverzekering van minimaal €1 miljoen, specifiek voor het vliegen met drones. Daarmee ben je gedekt voor eventuele schade tijdens de vlucht. Piloten zonder geldige verzekering ontvangen geen leads.",
  },
  {
    q: "Wat betekenen de certificeringen A1/A3, A2 en STS?",
    a: "Dit zijn de EASA-bewijzen die bepalen waar en hoe dicht bij mensen een piloot mag vliegen. A1/A3 is de basis voor lichte drones en vluchten op afstand van mensen — prima voor veel vastgoed- en landschapsopnames. Met A2 mag dichter bij omstanders worden gevlogen, nodig voor marketing in bebouwd gebied en de meeste inspecties. STS (Standaardscenario, STS-01/STS-02) en operationele autorisaties horen bij de 'specific'-categorie voor complexere of risicovollere vluchten, zoals mapping en infraprojecten. Wij koppelen je automatisch aan een piloot met het juiste certificaat voor jouw klus.",
  },
  {
    q: "Van wie zijn de gebruiksrechten op de footage?",
    a: "Na betaling van de opdracht ontvang jij de gebruiksrechten op de opgeleverde beelden voor het afgesproken doel — bijvoorbeeld je listing, website of campagne. Maak je vooraf duidelijke afspraken over breder commercieel gebruik, dan leggen jij en de piloot dat samen vast. De piloot mag het werk doorgaans tonen in zijn eigen portfolio, tenzij anders afgesproken.",
  },
  {
    q: "Kan ik een opdracht annuleren of verzetten?",
    a: "Ja. Het verzetten van een vlucht is meestal kosteloos mogelijk tot kort voor de geplande datum; drone-opnames zijn sowieso weersafhankelijk, dus piloten zijn gewend om te schuiven. Annuleren kan ook — de exacte voorwaarden en eventuele kosten spreek je af met de gekozen piloot voordat je bevestigt. Een aanvraag die nog geen bevestigde opdracht is, kun je altijd zonder kosten laten vervallen.",
  },
  {
    q: "Mag je overal in Nederland vliegen?",
    a: "Niet overal. Rond luchthavens, in natuurgebieden en boven bepaalde zones gelden vlieg- en no-flyrestricties. Geverifieerde piloten kennen de regels en regelen waar nodig vooraf toestemming, bijvoorbeeld via een vluchtaanvraag. Valt jouw locatie in een beperkt gebied, dan laat de piloot dat weten en bekijkt hij wat wél mogelijk is.",
  },
  {
    q: "Welke regio's dekken jullie?",
    a: `Skylens werkt landelijk. We hebben ${STATS.activePilots.toLocaleString("nl-NL")} actieve piloten in het netwerk, verspreid over heel Nederland en met dekking in ${STATS.citiesCovered}+ steden. Omdat we matchen op vliegbereik vinden we ook buiten de grote steden vrijwel altijd een geschikte piloot bij jou in de buurt.`,
  },
  {
    q: "Hoe werkt de matching precies?",
    a: "Op basis van je toepassing en locatie filteren we het netwerk op piloten die binnen hun servicegebied vallen, de juiste apparatuur bezitten en het vereiste certificaat en de verzekering voor die klus hebben. Geverifieerde en hoger gewaardeerde piloten worden hoger getoond. Vervolgens zie jij een korte lijst met passende profielen om uit te kiezen — wij dwingen niets af, de keuze is aan jou.",
  },
  {
    q: "Wat als ik niet weet welk pakket ik nodig heb?",
    a: "Geen probleem. Geef bij je aanvraag globaal aan wat je wilt bereiken en welk budget je in gedachten hebt; de gematchte piloten denken met je mee en adviseren het juiste pakket. Twijfel je tussen toepassingen, bekijk dan de pakketpagina — daar staat per niveau (Brons tot Platinum) wat je krijgt en voor welke situaties het bedoeld is.",
  },
];

export default function HoeHetWerktPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>Hoe het werkt</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Van aanvraag tot luchtbeeld,{" "}
              <span className="text-brand-600">zonder gedoe</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              Geen offertes najagen of onbekende freelancers vergelijken. Eén gratis aanvraag,
              geverifieerde matches bij jou in de buurt en vaste prijzen. Zo werkt Skylens van begin
              tot eind.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/aanvraag" className="btn btn-lg btn-primary">
                Plaats je aanvraag
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#faq" className="btn btn-lg btn-outline">
                Naar de veelgestelde vragen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3-step explanation for clients ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          center
          eyebrow="Voor klanten"
          title="Drie stappen naar je luchtbeelden"
          intro="Helder, snel en zonder verplichtingen. Zo ziet het traject er voor jou uit."
        />
        <div className="mt-16 space-y-16 sm:space-y-24">
          {STEPS.map((step, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={step.title}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <div className={flip ? "lg:order-2" : undefined}>
                  <Eyebrow>{step.eyebrow}</Eyebrow>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                      <step.icon className="h-6 w-6" strokeWidth={1.7} />
                    </span>
                    <h3 className="text-2xl font-bold sm:text-3xl">{step.title}</h3>
                  </div>
                  <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">{step.text}</p>
                  <ul className="mt-6 space-y-3">
                    {step.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-ink-soft">
                        <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                        </span>
                        <span className="leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={flip ? "lg:order-1" : undefined}>
                  <MediaPlaceholder
                    seed={step.seed}
                    aspect={step.aspect}
                    label={step.label}
                    isVideo={i === 2}
                    className="rounded-2xl shadow-card"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Why via Skylens (trust block) ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow="Waarom via Skylens"
              title="Vertrouwen ingebouwd, vanaf de eerste klik"
              intro="Je kunt zelf niet zien of een piloot legaal vliegt, goed verzekerd is en het juiste certificaat heeft. Wij controleren het vooraf, zodat jij met een gerust hart kunt boeken."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {TRUST.map((t) => (
                <div key={t.title} className="card card-pad">
                  <t.icon className="h-6 w-6 text-brand-600" strokeWidth={1.7} />
                  <h3 className="mt-4 font-bold">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── For pilots cross-link band ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="card relative overflow-hidden">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>Ben je dronepiloot?</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold">Ontvang betaalde klussen in jouw regio</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted pretty">
                Sta je aan de andere kant en wil je opdrachten ontvangen? Meld je gratis aan, bouw je
                profiel en betaal alleen voor de leads die je accepteert.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/voor-piloten" className="btn btn-lg btn-dark">
                  Word piloot
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/voor-piloten#leads" className="btn btn-lg btn-ghost">
                  Hoe leads werken
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Stat value="€0" label="Aanmelden" />
              <Stat value="3,5×" label="Meer leads als verified" />
              <Stat value="< 1u" label="Reactietijd toppers" />
            </div>
          </div>
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-24 border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Veelgestelde vragen"
            title="Alles wat je wilt weten"
            intro="Staat je vraag er niet bij? Neem gerust contact op — we helpen je graag op weg."
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group card overflow-hidden [&_summary]:list-none"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-display text-lg font-semibold text-ink transition-colors hover:text-brand-700">
                  {item.q}
                  <Plus
                    className="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-45"
                    strokeWidth={2}
                  />
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="leading-relaxed text-ink-muted pretty">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
