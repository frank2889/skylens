import Link from "next/link";
import {
  ShieldCheck,
  Euro,
  Clock,
  FileText,
  MapPin,
  Sparkles,
  ArrowRight,
  ClipboardList,
  Users,
  PlaneTakeoff,
} from "lucide-react";
import { HeroSearch } from "@/components/hero-search";
import { SegmentCard, ShowcaseCard } from "@/components/cards";
import { SectionHeading, Stat, TextLink, Stars } from "@/components/bits";
import { CTASection } from "@/components/cta";
import { MediaPlaceholder } from "@/components/media";
import { SEGMENTS, PACKAGES } from "@/lib/catalog";
import { SHOWCASE, PILOTS, STATS } from "@/lib/seed";
import { euro } from "@/lib/utils";

const STEPS = [
  {
    icon: ClipboardList,
    title: "1 · Plaats je aanvraag",
    text: "Vertel in 60 seconden wat je nodig hebt, waar en wanneer. Gratis en vrijblijvend — geen account nodig.",
  },
  {
    icon: Users,
    title: "2 · Ontvang je matches",
    text: "Wij koppelen je automatisch aan geverifieerde, verzekerde piloten bij jou in de buurt met de juiste apparatuur.",
  },
  {
    icon: PlaneTakeoff,
    title: "3 · Kies & vlieg",
    text: "Vergelijk profielen, prijzen en reviews. Kies je piloot — beelden geleverd binnen 48–72 uur.",
  },
];

const TRUST = [
  { icon: ShieldCheck, title: "Geverifieerd & verzekerd", text: "Elke piloot is gecheckt op RDW-registratie, EASA-certificaat (A1/A3, A2, STS) en €1M aansprakelijkheidsverzekering." },
  { icon: Euro, title: "Vaste, transparante prijzen", text: "Geen vage offertes of bureaumarges. Je ziet vooraf wat je betaalt, per pakket." },
  { icon: Clock, title: "Snel geleverd", text: "Match binnen enkele uren, beelden doorgaans binnen 48–72 uur. Geen reiskosten — altijd de dichtstbijzijnde piloot." },
  { icon: FileText, title: "Eén aanspreekpunt", text: "Van aanvraag tot oplevering: standaard deliverables per toepassing zodat je appels met appels vergelijkt." },
];

export default function HomePage() {
  const featuredPilots = PILOTS.filter((p) => p.verified).slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[460px] w-[460px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Drone-piloot marktplaats · NL</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.04] sm:text-5xl lg:text-6xl">
              De juiste dronepiloot.{" "}
              <span className="text-brand-600">Vandaag geregeld.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted pretty">
              Plaats je aanvraag en wij koppelen je aan een geverifieerde, verzekerde,
              EASA-gecertificeerde piloot bij jou in de buurt. Vaste prijzen, beelden binnen
              48–72 uur.
            </p>
            <div className="mt-8">
              <HeroSearch />
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <MediaPlaceholder seed="hero-a" aspect="tall" label="Vastgoed · Amsterdam" className="rounded-2xl shadow-card" />
              <div className="mt-10 grid gap-4">
                <MediaPlaceholder seed="hero-b" aspect="square" isVideo label="Marketing · Reel" className="rounded-2xl shadow-card" />
                <MediaPlaceholder seed="hero-c" aspect="video" label="Inspectie · thermisch" className="rounded-2xl shadow-card" />
              </div>
            </div>
            <div className="card absolute -bottom-5 left-6 flex items-center gap-3 px-4 py-3 shadow-lift">
              <ShieldCheck className="h-5 w-5 text-brand-600" />
              <div className="text-sm">
                <div className="font-semibold leading-tight">Geverifieerd aanbod</div>
                <div className="font-mono text-xs text-ink-muted">RDW · A2/STS · €1M verzekerd</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="border-y border-line bg-paper-soft">
        <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          <Stat value="50.566" label="Actieve piloten in NL" />
          <Stat value="22+" label="Steden gedekt" />
          <Stat value="48–72u" label="Gem. levertijd" />
          <div className="flex flex-col">
            <Stars rating={STATS.avgRating} className="text-3xl" />
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">Gem. beoordeling</div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          center
          eyebrow="Hoe het werkt"
          title="Van aanvraag tot luchtbeeld in drie stappen"
          intro="Geen gedoe met offertes najagen of onbekende freelancers. Eén aanvraag, geverifieerde matches, vaste prijzen."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.title} className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                <s.icon className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Segments ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Toepassingen"
              title="Voor elke klus de juiste piloot & drone"
              intro="Van een snelle makelaarsfoto tot een centimeter-nauwkeurige LiDAR-scan."
            />
            <TextLink href="/toepassingen">Alle toepassingen</TextLink>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SEGMENTS.map((s) => (
              <SegmentCard key={s.slug} segment={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us / trust moat ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Waarom Skylens"
            title="Het verschil zit in vertrouwen"
            intro="Je kunt zelf niet zien of een piloot legaal vliegt, verzekerd is en het juiste certificaat heeft. Wij checken het — zodat jij dat niet hoeft."
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
      </section>

      {/* ── Showcase teaser ── */}
      <section className="border-t border-line bg-ink py-16 text-white sm:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="eyebrow text-brand-300">Showcase</span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Echt werk van geverifieerde piloten
              </h2>
              <p className="mt-4 text-lg text-white/70 pretty">
                Elke opdracht voegt nieuwe beelden toe aan onze showcase — van grachtenpanden
                tot zonneparken.
              </p>
            </div>
            <Link href="/showcase" className="btn btn-md bg-white/10 text-white hover:bg-white/20">
              Bekijk de showcase
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {SHOWCASE.slice(0, 8).map((item) => (
              <ShowcaseCard key={item.id} item={item} className="border-white/10 bg-white/5" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages teaser ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          center
          eyebrow="Pakketten"
          title="Van Brons tot Platinum"
          intro="Geprijsd op uitkomst. Wij routeren je klus alleen naar piloten met de juiste apparatuur, certificering en verzekering."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((p) => (
            <div key={p.tier} className="card card-pad flex flex-col">
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{p.oneLiner}</p>
              <p className="mt-4 font-mono text-lg font-semibold text-brand-700">{p.priceLabel}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint">ex BTW</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{p.useCase}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/pakketten" className="btn btn-lg btn-outline">
            Vergelijk alle pakketten
          </Link>
        </div>
      </section>

      {/* ── For pilots band ── */}
      <section className="container-x pb-16 sm:pb-24">
        <div className="card relative overflow-hidden">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Voor piloten</span>
              <h2 className="mt-4 text-3xl font-bold">Krijg betaalde drone-klussen in jouw regio</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted pretty">
                Gratis aanmelden, betaal alleen voor leads die je accepteert. Bouw je profiel,
                verzamel reviews en laat ons je werk uitlichten.
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
              <Stat value="3.5×" label="Meer leads als verified" />
              <Stat value="< 1u" label="Reactietijd toppers" />
            </div>
          </div>
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading center eyebrow="Reviews" title="Wat klanten zeggen" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featuredPilots.map((p) => {
              const r = p.reviews[0];
              return (
                <figure key={p.slug} className="card card-pad flex flex-col">
                  <Stars rating={r.rating} />
                  <blockquote className="mt-4 flex-1 text-ink-soft pretty">“{r.text}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    <MediaPlaceholder seed={p.slug + "av"} aspect="square" className="h-10 w-10 shrink-0 rounded-full" />
                    <div className="text-sm">
                      <div className="font-semibold">{r.author}</div>
                      <div className="text-ink-muted">{r.role} · {r.city}</div>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
