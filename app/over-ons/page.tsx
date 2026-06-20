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

export const metadata: Metadata = {
  title: "Over ons — Skylens",
  description:
    "Skylens is de Nederlandse marktplaats die opdrachtgevers koppelt aan geverifieerde, verzekerde dronepiloten. Lees waar we voor staan en hoe we piloten controleren.",
};

const VERIFY_STEPS = [
  {
    icon: FileCheck2,
    title: "RDW-registratie",
    text: "We controleren of de piloot als exploitant geregistreerd staat bij de RDW en een geldig exploitantnummer voert.",
  },
  {
    icon: BadgeCheck,
    title: "EASA-certificaat",
    text: "Per toepassing kijken we naar het juiste vliegbewijs — A1/A3, A2 of STS — en of dat past bij de klus.",
  },
  {
    icon: ShieldCheck,
    title: "Aansprakelijkheidsverzekering",
    text: "Een geldige drone-aansprakelijkheidsverzekering van minimaal €1M is voorwaarde voor het 'Geverifieerd'-label.",
  },
  {
    icon: ClipboardCheck,
    title: "Werk & reviews",
    text: "We beoordelen portfolio en klantbeoordelingen. Pas na een geslaagde controle wordt een profiel zichtbaar verhoogd.",
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Vertrouwen",
    text: "Je kunt zelf niet zien of iemand legaal vliegt en verzekerd is. Wij checken het, zodat jij met een gerust hart kiest.",
  },
  {
    icon: Zap,
    title: "Snelheid",
    text: "Eén aanvraag, binnen enkele uren matches, beelden doorgaans binnen 48–72 uur. Geen offertes najagen.",
  },
  {
    icon: Award,
    title: "Vakmanschap",
    text: "We sturen je klus alleen naar piloten met de juiste apparatuur en certificering voor precies dat type werk.",
  },
  {
    icon: MapPin,
    title: "Lokaal",
    text: "Altijd de dichtstbijzijnde geschikte piloot. Minder reistijd, geen reiskosten, kennis van de omgeving.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Over {SITE.name}</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Luchtbeeld zonder gokken op wie je inhuurt
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted pretty">
              De Nederlandse markt telt duizenden dronepiloten — van hobbyist tot mission-grade
              specialist. Voor een opdrachtgever is bijna onmogelijk te zien wie legaal vliegt,
              verzekerd is en het juiste certificaat heeft. Skylens lost dat op: wij verifiëren
              de piloten, jij kiest met vertrouwen.
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <MediaPlaceholder seed="about-a" aspect="tall" label="Vastgoed · luchtfoto" className="rounded-2xl shadow-card" />
              <div className="mt-10 grid gap-4">
                <MediaPlaceholder seed="about-b" aspect="square" label="Inspectie · detail" className="rounded-2xl shadow-card" />
                <MediaPlaceholder seed="about-c" aspect="video" isVideo label="Marketing · film" className="rounded-2xl shadow-card" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat row ── */}
      <section className="border-y border-line bg-paper-soft">
        <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          <Stat value={formatNumber(STATS.activePilots)} label="Actieve piloten in NL" />
          <Stat value={`${STATS.citiesCovered}+`} label="Steden gedekt" />
          <Stat value={STATS.avgDelivery} label="Gem. levertijd" />
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-1.5 font-display text-3xl font-bold text-ink sm:text-4xl">
              <Star className="h-6 w-6 fill-signal text-signal" />
              {STATS.avgRating.toFixed(1)}
            </span>
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">
              Gem. beoordeling
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Onze missie"
            title="De beste piloot voor de klus — eerlijk geprijsd"
          />
          <div className="space-y-5 text-lg leading-relaxed text-ink-soft pretty">
            <p>
              We bouwen een Nederlandse marktplaats die opdrachtgevers en dronepiloten op een
              eerlijke manier samenbrengt. Geen ondoorzichtige bureaumarges, geen onbekende
              freelancers van een advertentiesite — maar geverifieerde vakmensen met vaste,
              vooraf zichtbare prijzen.
            </p>
            <p>
              Alles wat we doen draait om footage: het concrete resultaat dat je in handen krijgt.
              Daarom werken we met heldere pakketten en standaard deliverables per toepassing, zodat
              je appels met appels vergelijkt en precies weet wat je oplevert.
            </p>
            <p>
              We zijn NL-first. Nederlandse regelgeving, Nederlandse piloten, Nederlandse steden en
              een platform in het Nederlands. Lokaal matchen betekent kortere reistijden, geen
              reiskosten en een piloot die de omgeving kent.
            </p>
          </div>
        </div>
      </section>

      {/* ── Verification ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Hoe we piloten verifiëren"
            title="Het 'Geverifieerd'-label moet je vertrouwen waard zijn"
            intro="Een badge is alleen iets waard als er een echte controle achter zit. Dit checken we voordat een piloot zich geverifieerd mag noemen."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VERIFY_STEPS.map((s) => (
              <div key={s.title} className="card card-pad">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                  <s.icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Verificatie is een momentopname en geen garantie: de eindverantwoordelijkheid voor een
            veilige, legale vlucht ligt altijd bij de piloot. We controleren steekproefsgewijs
            opnieuw en trekken het label in bij signalen dat niet meer aan de eisen wordt voldaan.
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          center
          eyebrow="Waar we voor staan"
          title="Vier dingen die niet onderhandelbaar zijn"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="card card-pad">
              <v.icon className="h-6 w-6 text-brand-600" strokeWidth={1.7} />
              <h3 className="mt-4 font-bold">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Klaar om met vertrouwen te kiezen?"
        intro="Plaats gratis je aanvraag en ontvang binnen enkele uren matches met geverifieerde piloten bij jou in de buurt."
      />
    </>
  );
}
