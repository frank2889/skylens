import type { Metadata } from "next";
import Link from "next/link";
import { Check, ShieldCheck, Receipt, Sparkles } from "lucide-react";
import { TierBadge, SectionHeading, Eyebrow } from "@/components/bits";
import { CTASection } from "@/components/cta";
import { PACKAGES, MEMBERSHIPS, LEAD_TIERS } from "@/lib/catalog";
import { cn, TIER_LABELS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pakketten & prijzen — Van Brons tot Platinum | Skylens",
  description:
    "Transparante drone-pakketten van Brons tot Platinum, geprijsd op uitkomst. Bekijk wat je krijgt per pakket, hoe piloten worden gematcht en de leadprijzen per job-tier. Alle prijzen ex 21% BTW.",
};

const PACKAGE_SPECS: { key: keyof typeof PACKAGES[number]; label: string }[] = [
  { key: "useCase", label: "Toepassing" },
  { key: "gear", label: "Apparatuur" },
  { key: "photos", label: "Foto's" },
  { key: "video", label: "Video" },
  { key: "technical", label: "Technisch" },
  { key: "turnaround", label: "Levertijd" },
  { key: "certRequired", label: "Certificering" },
];

export default function PakkettenPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>Pakketten</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Van Brons tot <span className="text-brand-600">Platinum</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              Geprijsd op uitkomst, gepoort op piloot. Je kiest het resultaat dat je nodig hebt —
              wij routeren je klus alleen naar piloten met de juiste apparatuur, certificering en
              verzekering. Vaste, vergelijkbare deliverables per niveau, zonder vage offertes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/aanvraag" className="btn btn-lg btn-primary">
                Plaats je aanvraag
              </Link>
              <Link href="#lidmaatschap" className="btn btn-lg btn-outline">
                Voor piloten
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Package comparison cards ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          eyebrow="De vier pakketten"
          title="Kies het niveau dat bij je klus past"
          intro="Elk pakket is een vast startpunt. De definitieve prijs hangt af van regio, reistijd en opties — je ziet altijd vooraf wat je betaalt."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {PACKAGES.map((p) => (
            <div
              key={p.tier}
              className={cn(
                "card flex flex-col p-6",
                p.highlight && "relative ring-2 ring-brand-500"
              )}
            >
              {p.highlight ? (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-white shadow-card">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                  Populair
                </span>
              ) : null}

              <TierBadge tier={p.tier} />
              <h3 className="mt-4 font-display text-2xl font-bold">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{p.oneLiner}</p>

              <div className="mt-5">
                <p className="font-mono text-2xl font-bold text-brand-700">{p.priceLabel}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  ex BTW
                </p>
              </div>

              <dl className="mt-6 flex-1 space-y-3.5 border-t border-line pt-5 text-sm">
                {PACKAGE_SPECS.map((spec) => (
                  <div key={spec.key}>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                      {spec.label}
                    </dt>
                    <dd className="mt-0.5 leading-snug text-ink-soft">{p[spec.key]}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href={`/aanvraag?pakket=${p.tier}`}
                className={cn(
                  "btn btn-md mt-6 w-full",
                  p.highlight ? "btn-primary" : "btn-outline"
                )}
              >
                Kies {p.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-paper-soft p-5 text-sm text-ink-muted">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.7} />
          <p className="pretty">
            <span className="font-semibold text-ink">Platinum is op aanvraag.</span> Cinema- en
            mission-grade producties — merkfilms, LiDAR-survey, multi-day shoots — stellen we op maat
            samen. Vertel ons je project en we koppelen je aan een gespecialiseerde, vaak
            twee-koppige crew met SORA/LUC-autorisatie.
          </p>
        </div>
      </section>

      {/* ── Pilot memberships ── */}
      <section id="lidmaatschap" className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Voor piloten"
            title="Pilotenlidmaatschappen"
            intro="Klanten betalen per pakket — piloten betalen niets om mee te doen. Het model is opgebouwd uit drie delen: een (optioneel) maandlidmaatschap, een leadfee per klus die je accepteert, en een commissie over de jobwaarde. Hoe hoger je lidmaatschap, hoe lager je leadfee én commissie."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {MEMBERSHIPS.map((m) => (
              <div
                key={m.key}
                className={cn(
                  "card flex flex-col p-7",
                  m.highlight && "relative ring-2 ring-brand-500"
                )}
              >
                {m.highlight ? (
                  <span className="absolute -top-3 left-7 inline-flex items-center rounded-full bg-brand-600 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-white shadow-card">
                    Meest gekozen
                  </span>
                ) : null}

                <h3 className="font-display text-xl font-bold">{m.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{m.forWho}</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-bold text-ink">{m.price}</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                    {m.priceSub}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-y border-line py-4 text-sm">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                      Leadprijs
                    </div>
                    <div className="mt-0.5 font-semibold text-ink-soft">{m.leadModifier}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                      Commissie
                    </div>
                    <div className="mt-0.5 font-semibold text-ink-soft">{m.commission}</div>
                  </div>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                  {m.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.2} />
                      <span className="text-ink-soft">{perk}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/voor-piloten"
                  className={cn(
                    "btn btn-md mt-7 w-full",
                    m.highlight ? "btn-primary" : "btn-outline"
                  )}
                >
                  {m.key === "free" ? "Gratis aanmelden" : `Kies ${m.name}`}
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-muted pretty">
            Zo word je dus belast als piloot: een maandlidmaatschap (vanaf €0), een leadfee per
            geaccepteerde klus en een commissie over de uiteindelijke jobwaarde. Aanmelden is altijd
            gratis — je betaalt pas zodra je een lead aanneemt.{" "}
            <Link href="/voor-piloten#leads" className="link-underline">
              Lees hoe leads werken
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── Lead pricing per job-tier ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          eyebrow="Leadprijzen"
          title="Leadprijzen per job-tier"
          intro="De prijs van een lead schaalt mee met de waarde van de klus. Grotere klussen kosten meer per lead, maar gaan naar minder piloten — zodat je investering ook iets waard blijft."
        />

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  Job-tier
                </th>
                <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  Jobwaarde
                </th>
                <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  Leadprijs
                </th>
                <th className="pb-3 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
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
                  <td className="py-4 text-sm text-ink-soft">{lt.exclusivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-paper-soft p-5 text-sm text-ink-muted">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.7} />
          <p className="pretty">
            <span className="font-semibold text-ink">Exclusiviteit beschermt je conversie.</span>{" "}
            {TIER_LABELS.bronze}- en {TIER_LABELS.silver}-leads worden met maximaal 3 piloten
            gedeeld, {TIER_LABELS.gold} met maximaal 2, en {TIER_LABELS.platinum} gaat exclusief
            naar 1 piloot. Minder concurrentie per lead betekent een hogere kans dat je de klus
            wint — daarom is de leadprijs hoger naarmate de exclusiviteit toeneemt.
          </p>
        </div>
      </section>

      {/* ── Honest caveat ── */}
      <section className="container-x pb-16 sm:pb-24">
        <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5 text-sm text-ink-muted shadow-card">
          <Receipt className="mt-0.5 h-5 w-5 shrink-0 text-ink-faint" strokeWidth={1.7} />
          <p className="pretty">
            Alle prijzen zijn indicatief en exclusief 21% BTW. De definitieve prijs hangt af van
            regio, reistijd en gekozen opties. Je ontvangt vooraf een vaste prijs per klus —
            zonder verrassingen achteraf.
          </p>
        </div>
      </section>

      <CTASection
        title="Niet zeker welk pakket je nodig hebt?"
        intro="Plaats gratis je aanvraag. We adviseren het juiste niveau en matchen je met geverifieerde piloten bij jou in de buurt."
      />
    </>
  );
}
