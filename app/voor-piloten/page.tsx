import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  UserPlus,
  BadgeCheck,
  Inbox,
  CreditCard,
  Lock,
  ShieldCheck,
  FileBadge,
  Wallet,
  Check,
} from "lucide-react";
import { SectionHeading, Eyebrow, Stat, TierBadge } from "@/components/bits";
import { MediaPlaceholder } from "@/components/media";
import { MEMBERSHIPS, LEAD_TIERS } from "@/lib/catalog";
import { STATS } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Voor piloten · Krijg betaalde drone-klussen | Skylens",
  description:
    "Krijg betaalde drone-opdrachten in jouw regio. Gratis aanmelden, betaal alleen per lead die je accepteert. Geverifieerd profiel, gematchte leads en heldere lidmaatschappen voor dronepiloten in Nederland.",
};

const LEAD_FLOW = [
  {
    icon: UserPlus,
    title: "Meld je gratis aan",
    text: "Maak in een paar minuten een account aan. Geen abonnement, geen verplichtingen — je begint kosteloos en bepaalt zelf wanneer je opschaalt.",
  },
  {
    icon: BadgeCheck,
    title: "Profiel + verificatie",
    text: "Vul je profiel, portfolio en werkgebied in. Wij verifiëren je RDW-registratie, je certificaat (A2 of STS) en je verzekering van minimaal €1 miljoen. Geverifieerde piloten ontvangen aantoonbaar meer en betere leads.",
  },
  {
    icon: Inbox,
    title: "Ontvang gematchte leads",
    text: "Zodra een klant een aanvraag plaatst die binnen jouw werkgebied, apparatuur en certificering valt, ontvang je een lead met alle details. Geen koud bellen, geen offertes najagen.",
  },
  {
    icon: CreditCard,
    title: "Betaal alleen wat je accepteert",
    text: "Een lead bekijken is gratis. Pas wanneer je een lead accepteert, betaal je de leadprijs. Past de klus je niet, dan sla je hem zonder kosten over.",
  },
  {
    icon: Lock,
    title: "Exclusiviteit per lead",
    text: "Wij verkopen een lead nooit eindeloos door. Afhankelijk van de jobwaarde gaat elke lead naar maximaal 1 tot 3 piloten — bij Platinum-klussen ben jij de enige die hem krijgt.",
  },
];

const VERIFY = [
  {
    icon: ShieldCheck,
    title: "RDW-registratie",
    text: "We controleren je exploitantnummer en registratie bij de RDW. Klanten zien een geverifieerde badge, jij vliegt aantoonbaar legaal.",
  },
  {
    icon: FileBadge,
    title: "Certificering A2 / STS",
    text: "Je EASA-certificaat bepaalt welke leads je ontvangt. Hoe hoger je bevoegdheid, hoe meer en hoe waardevollere klussen je matcht.",
  },
  {
    icon: Wallet,
    title: "€1M verzekering",
    text: "Een geldige aansprakelijkheidsverzekering van minimaal €1 miljoen is verplicht om leads te ontvangen. Zo bouwen we vertrouwen bij de klant — en bescherm jij jezelf.",
  },
];

const MEMBERSHIP_ICON: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  free: UserPlus,
  pro: BadgeCheck,
  elite: ShieldCheck,
};

export default function VoorPilotenPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[460px] w-[460px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <Eyebrow>Voor piloten</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-[1.04] sm:text-5xl lg:text-6xl">
              Krijg betaalde drone-klussen{" "}
              <span className="text-brand-600">in jouw regio</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted pretty">
              Gratis aanmelden, betaal per lead. Geen abonnement nodig om te starten, geen koude
              acquisitie. Wij brengen geverifieerde opdrachten naar jou — jij kiest wat je oppakt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn btn-lg btn-primary">
                Meld je gratis aan
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#leads" className="btn btn-lg btn-outline">
                Hoe leads werken
              </Link>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
              <Stat value="€0" label="Aanmelden" />
              <Stat value="3,5×" label="Meer leads als verified" />
              <Stat value={`${STATS.citiesCovered}+`} label="Steden met vraag" />
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <MediaPlaceholder seed="pilot-hero-a" aspect="tall" label="Inspectie · Rotterdam" className="rounded-2xl shadow-card" />
              <div className="mt-10 grid gap-4">
                <MediaPlaceholder seed="pilot-hero-b" aspect="square" isVideo label="Marketing · reel" className="rounded-2xl shadow-card" />
                <MediaPlaceholder seed="pilot-hero-c" aspect="video" label="Vastgoed · Utrecht" className="rounded-2xl shadow-card" />
              </div>
            </div>
            <div className="card absolute -bottom-5 left-6 flex items-center gap-3 px-4 py-3 shadow-lift">
              <Inbox className="h-5 w-5 text-brand-600" />
              <div className="text-sm">
                <div className="font-semibold leading-tight">Nieuwe lead</div>
                <div className="font-mono text-xs text-ink-muted">Vastgoed · 6 km · Zilver</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof bar ── */}
      <section className="border-b border-line bg-paper-soft">
        <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          <Stat value={STATS.activePilots.toLocaleString("nl-NL")} label="Piloten in NL" />
          <Stat value={`${STATS.citiesCovered}+`} label="Steden gedekt" />
          <Stat value="< 1u" label="Reactietijd toppers" />
          <Stat value="3 tiers" label="Lidmaatschappen" />
        </div>
      </section>

      {/* ── How leads work ── */}
      <section id="leads" className="scroll-mt-24 container-x py-16 sm:py-24">
        <SectionHeading
          center
          eyebrow="Hoe leads werken"
          title="Van aanmelding tot betaalde opdracht"
          intro="Een eerlijk model zonder verrassingen: gratis starten, alleen betalen voor leads die je zelf accepteert en altijd exclusiviteit naar jobwaarde."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {LEAD_FLOW.map((step, i) => (
            <div key={step.title} className="card card-pad flex flex-col">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                  <step.icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Memberships ── */}
      <section id="lidmaatschap" className="scroll-mt-24 border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Lidmaatschap"
            title="Kies wat bij je past — start gratis"
            intro="Begin kosteloos op Free en stap over zodra je meer leads wilt. Elk niveau verlaagt je leadprijs en commissie en geeft je meer zichtbaarheid."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {MEMBERSHIPS.map((m) => {
              const Icon = MEMBERSHIP_ICON[m.key] ?? BadgeCheck;
              return (
                <div
                  key={m.key}
                  className={
                    m.highlight
                      ? "card card-pad relative flex flex-col ring-2 ring-brand-500"
                      : "card card-pad flex flex-col"
                  }
                >
                  {m.highlight ? (
                    <span className="badge-verify absolute -top-3 left-6">Meest gekozen</span>
                  ) : null}
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        m.highlight
                          ? "grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white shadow-card"
                          : "grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700"
                      }
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="font-display text-xl font-bold">{m.name}</h3>
                  </div>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-ink">{m.price}</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                      {m.priceSub}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-ink-muted">{m.forWho}</p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-line bg-paper-soft px-3 py-2.5">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                        Leadprijs
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-ink">{m.leadModifier}</div>
                    </div>
                    <div className="rounded-xl border border-line bg-paper-soft px-3 py-2.5">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                        Commissie
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-ink">{m.commission}</div>
                    </div>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                    {m.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.2} />
                        <span className="leading-relaxed">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/signup"
                    className={
                      m.highlight
                        ? "btn btn-md btn-primary mt-7 w-full"
                        : "btn btn-md btn-outline mt-7 w-full"
                    }
                  >
                    {m.key === "free" ? "Gratis starten" : `Kies ${m.name}`}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-center font-mono text-xs uppercase tracking-wider text-ink-faint">
            Alle prijzen exclusief BTW · maandelijks opzegbaar
          </p>
        </div>
      </section>

      {/* ── Lead tiers table ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          eyebrow="Leadprijzen"
          title="Wat kost een lead?"
          intro="Je betaalt alleen voor leads die je accepteert. De leadprijs is afgestemd op de jobwaarde — hoe groter de klus, hoe exclusiever de lead."
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="py-4 pr-4 font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Job-tier
                </th>
                <th className="py-4 pr-4 font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Jobwaarde
                </th>
                <th className="py-4 pr-4 font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Leadprijs
                </th>
                <th className="py-4 pr-4 font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Exclusiviteit
                </th>
              </tr>
            </thead>
            <tbody>
              {LEAD_TIERS.map((lt) => (
                <tr key={lt.tier} className="border-b border-line">
                  <td className="py-4 pr-4">
                    <TierBadge tier={lt.tier} />
                  </td>
                  <td className="py-4 pr-4 font-mono text-sm text-ink-soft">{lt.jobValue}</td>
                  <td className="py-4 pr-4 font-mono text-sm font-semibold text-brand-700">
                    {lt.leadPrice}
                  </td>
                  <td className="py-4 pr-4 text-sm text-ink-soft">{lt.exclusivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 font-mono text-xs uppercase tracking-wider text-ink-faint">
          Leadprijzen exclusief BTW · Elite-leden krijgen 25% korting op elke lead
        </p>
      </section>

      {/* ── Verification / trust block ── */}
      <section className="border-t border-line bg-ink py-16 text-white sm:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-xl">
              <span className="eyebrow text-brand-300">Verificatie</span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Geverifieerd zijn loont
              </h2>
              <p className="mt-4 text-lg text-white/70 pretty">
                Klanten kiezen voor zekerheid. Een geverifieerd profiel met de juiste papieren staat
                hoger in de matches en levert aantoonbaar meer en betere leads op. De drempel is laag,
                het rendement hoog.
              </p>
              <Link href="/signup" className="btn btn-lg btn-primary mt-8">
                Start je verificatie
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-1">
              {VERIFY.map((v) => (
                <div
                  key={v.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/20 text-brand-300">
                    <v.icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/70">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-white px-6 py-14 text-center shadow-card sm:px-16 sm:py-20">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-200/50 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <Eyebrow className="justify-center">Klaar om te vliegen?</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Meld je gratis aan en ontvang je eerste leads
            </h2>
            <p className="mt-4 text-lg text-ink-muted pretty">
              Geen kosten om te starten. Bouw je profiel, laat je verifiëren en kies zelf welke
              opdrachten je oppakt.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/signup" className="btn btn-lg btn-primary">
                Meld je gratis aan
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#lidmaatschap" className="btn btn-lg btn-outline">
                Bekijk de lidmaatschappen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
