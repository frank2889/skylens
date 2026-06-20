import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Check,
  Wallet,
  Info,
  Lock,
  Unlock,
  Award,
  TrendingUp,
} from "lucide-react";
import { Eyebrow, VerifiedBadge, TierBadge, Stars } from "@/components/bits";
import { getPilot } from "@/lib/seed";
import { MEMBERSHIPS } from "@/lib/catalog";
import { getSegment, getCity } from "@/lib/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn, formatCurrency } from "@/lib/utils";
import { localized, pick } from "@/lib/i18n/messages";
import { segmentText } from "@/lib/i18n/catalog-i18n";
import { getLocaleConfig } from "@/lib/i18n/config";
import { capabilityLabel, getJurisdiction } from "@/lib/jurisdictions";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = pick(locale, {
    nl: {
      title: "Pilotendashboard",
      description:
        "Beheer je profiel, verificatie, lidmaatschap en inkomende leads als geverifieerde dronepiloot op Skylens.",
    },
    en: {
      title: "Pilot dashboard",
      description:
        "Manage your profile, verification, membership and incoming leads as a verified drone pilot on Skylens.",
    },
    de: {
      title: "Piloten-Dashboard",
      description:
        "Verwalte dein Profil, deine Verifizierung, Mitgliedschaft und eingehende Leads als geprüfter Drohnenpilot bei Skylens.",
    },
  });
  return {
    title: meta.title,
    description: meta.description,
    robots: { index: false, follow: false },
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/piloot`,
        "en-GB": `${SITE.url}/en/piloot`,
        de: `${SITE.url}/de/piloot`,
      },
    },
  };
}

type LeadStatus = "new" | "unlocked";

const LEAD_STATUS_STYLE: Record<LeadStatus, string> = {
  new: "bg-brand-50 text-brand-700",
  unlocked: "bg-ink text-white",
};

const SAMPLE_LEADS: {
  ref: string;
  segmentSlug: string;
  citySlug: string;
  budget: { min?: number; max?: number };
  leadPrice: number;
  status: LeadStatus;
}[] = [
  { ref: "LEAD-7741", segmentSlug: "vastgoed", citySlug: "amsterdam", budget: { min: 250, max: 500 }, leadPrice: 24, status: "new" },
  { ref: "LEAD-7726", segmentSlug: "marketing", citySlug: "haarlem", budget: { min: 500, max: 1000 }, leadPrice: 30, status: "new" },
  { ref: "LEAD-7710", segmentSlug: "evenementen", citySlug: "amsterdam", budget: { min: 500, max: 1000 }, leadPrice: 28, status: "unlocked" },
  { ref: "LEAD-7689", segmentSlug: "vastgoed", citySlug: "utrecht", budget: { max: 250 }, leadPrice: 12, status: "unlocked" },
];

export default async function PilotDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pilot = getPilot("lars-de-vries");
  if (!pilot) notFound();

  const membership = MEMBERSHIPS.find((m) => m.key === pilot.membership);
  const leadCredit = 25; // demo leadtegoed
  const jur = getJurisdiction(pilot.country);
  const insuranceCfg = getLocaleConfig(jur.insurance.currency === "GBP" ? "en" : locale);
  const insuranceAmount = new Intl.NumberFormat(insuranceCfg.intlLocale, {
    style: "currency",
    currency: jur.insurance.currency,
    maximumFractionDigits: 0,
  }).format(jur.insurance.minMajor);

  // Profile-completeness checklist (demo) — country-correct labels.
  const PROFILE_CHECKS = pick(locale, {
    nl: [
      { label: "Basisgegevens & bio", done: true },
      { label: `${jur.operatorId.label}`, done: true },
      { label: "Certificaten", done: true },
      { label: "Verzekeringsbewijs", done: true },
      { label: "Apparatuur toegevoegd", done: true },
      { label: "Portfolio-werk (min. 6 stuks)", done: false },
    ],
    en: [
      { label: "Basic details & bio", done: true },
      { label: `${jur.operatorId.label}`, done: true },
      { label: "Certificates", done: true },
      { label: "Proof of insurance", done: true },
      { label: "Equipment added", done: true },
      { label: "Portfolio work (min. 6 pieces)", done: false },
    ],
    de: [
      { label: "Basisdaten & Bio", done: true },
      { label: `${jur.operatorId.label}`, done: true },
      { label: "Zertifikate", done: true },
      { label: "Versicherungsnachweis", done: true },
      { label: "Ausrüstung hinzugefügt", done: true },
      { label: "Portfolio-Arbeiten (mind. 6 Stück)", done: false },
    ],
  });

  const doneCount = PROFILE_CHECKS.filter((c) => c.done).length;
  const completeness = Math.round((doneCount / PROFILE_CHECKS.length) * 100);

  const budgetLabel = (b: { min?: number; max?: number }) => {
    if (b.min != null && b.max != null)
      return `${formatCurrency(b.min, locale)} – ${formatCurrency(b.max, locale)}`;
    if (b.max != null) return `< ${formatCurrency(b.max, locale)}`;
    if (b.min != null) return `${formatCurrency(b.min, locale)}+`;
    return "";
  };

  const T = pick(locale, {
    nl: {
      demo:
        "Demo — koppel Supabase voor live login & data. Profiel en leads hieronder zijn voorbeelddata.",
      eyebrow: "Pilotendashboard",
      hello: "Hallo",
      viewPublic: "Bekijk openbaar profiel",
      completeness: "Profiel-compleetheid",
      completeHint: "Maak je profiel compleet om hoger te ranken en meer leads te ontvangen.",
      addPortfolio: "Portfolio toevoegen",
      leadCredit: "Leadtegoed",
      available: "Beschikbaar om leads te ontgrendelen.",
      membershipCredit: (name: string, amount: string) =>
        `Je ${name}-lidmaatschap geeft maandelijks ${amount} leadtegoed.`,
      topUp: "Tegoed opwaarderen",
      verifTitle: "Verificatiestatus",
      verifiedNote: "Je profiel is volledig geverifieerd. Klanten zien je geverifieerd-badge.",
      pendingNote: "Je verificatie is in behandeling.",
      certificates: "Certificaten",
      liability: "Aansprakelijkheidsverzekering",
      insuredActive: (amount: string) => `Actief (${amount}+)`,
      insuredMissing: "Ontbreekt",
      status: "Status",
      pending: "In behandeling",
      membershipTitle: "Lidmaatschap",
      leadsAt: "Leads tegen",
      included: "Inbegrepen",
      upgrade: "Upgrade lidmaatschap",
      incoming: "Inkomende leads",
      incomingHint: "Ontgrendel een lead om een gesprek met de opdrachtgever te openen. Contactgegevens blijven afgeschermd — alles loopt via Skylens.",
      colApplication: "Toepassing",
      colCity: "Stad",
      colBudget: "Budget",
      colLeadPrice: "Leadprijs",
      colAction: "Actie",
      unlocked: "Ontgrendeld",
      unlockLead: "Ontgrendel lead",
      unlockTitle: (amount: string) =>
        `Ontgrendel deze lead voor ${amount} — opent een gesprek op het platform. Contactgegevens blijven afgeschermd (demo).`,
      rating: "Beoordeling",
      jobsDone: "Klussen gedaan",
      responseTime: "Reactietijd",
      serviceArea: "Werkgebied",
    },
    en: {
      demo:
        "Demo — connect Supabase for live login & data. The profile and leads below are sample data.",
      eyebrow: "Pilot dashboard",
      hello: "Hello",
      viewPublic: "View public profile",
      completeness: "Profile completeness",
      completeHint: "Complete your profile to rank higher and receive more leads.",
      addPortfolio: "Add portfolio",
      leadCredit: "Lead credit",
      available: "Available to unlock leads.",
      membershipCredit: (name: string, amount: string) =>
        `Your ${name} membership gives ${amount} lead credit each month.`,
      topUp: "Top up credit",
      verifTitle: "Verification status",
      verifiedNote: "Your profile is fully verified. Clients see your verified badge.",
      pendingNote: "Your verification is in review.",
      certificates: "Certificates",
      liability: "Liability insurance",
      insuredActive: (amount: string) => `Active (${amount}+)`,
      insuredMissing: "Missing",
      status: "Status",
      pending: "In review",
      membershipTitle: "Membership",
      leadsAt: "Leads at",
      included: "Included",
      upgrade: "Upgrade membership",
      incoming: "Incoming leads",
      incomingHint: "Unlock a lead to open a conversation with the client. Contact details stay hidden — everything runs through Skylens.",
      colApplication: "Service",
      colCity: "City",
      colBudget: "Budget",
      colLeadPrice: "Lead price",
      colAction: "Action",
      unlocked: "Unlocked",
      unlockLead: "Unlock lead",
      unlockTitle: (amount: string) =>
        `Unlock this lead for ${amount} — opens a conversation on the platform. Contact details stay hidden (demo).`,
      rating: "Rating",
      jobsDone: "Jobs done",
      responseTime: "Response time",
      serviceArea: "Service area",
    },
    de: {
      demo:
        "Demo — verbinde Supabase für Live-Login & -Daten. Profil und Leads unten sind Beispieldaten.",
      eyebrow: "Piloten-Dashboard",
      hello: "Hallo",
      viewPublic: "Öffentliches Profil ansehen",
      completeness: "Profil-Vollständigkeit",
      completeHint:
        "Vervollständige dein Profil, um höher zu ranken und mehr Leads zu erhalten.",
      addPortfolio: "Portfolio hinzufügen",
      leadCredit: "Lead-Guthaben",
      available: "Verfügbar, um Leads freizuschalten.",
      membershipCredit: (name: string, amount: string) =>
        `Deine ${name}-Mitgliedschaft gibt dir monatlich ${amount} Lead-Guthaben.`,
      topUp: "Guthaben aufladen",
      verifTitle: "Verifizierungsstatus",
      verifiedNote:
        "Dein Profil ist vollständig verifiziert. Kunden sehen dein Geprüft-Badge.",
      pendingNote: "Deine Verifizierung wird geprüft.",
      certificates: "Zertifikate",
      liability: "Haftpflichtversicherung",
      insuredActive: (amount: string) => `Aktiv (${amount}+)`,
      insuredMissing: "Fehlt",
      status: "Status",
      pending: "In Prüfung",
      membershipTitle: "Mitgliedschaft",
      leadsAt: "Leads zu",
      included: "Inklusive",
      upgrade: "Mitgliedschaft upgraden",
      incoming: "Eingehende Leads",
      incomingHint: "Schalte einen Lead frei, um ein Gespräch mit dem Auftraggeber zu öffnen. Kontaktdaten bleiben verborgen — alles läuft über Skylens.",
      colApplication: "Anwendung",
      colCity: "Stadt",
      colBudget: "Budget",
      colLeadPrice: "Lead-Preis",
      colAction: "Aktion",
      unlocked: "Freigeschaltet",
      unlockLead: "Lead freischalten",
      unlockTitle: (amount: string) =>
        `Schalte diesen Lead für ${amount} frei — öffnet ein Gespräch auf der Plattform. Kontaktdaten bleiben verborgen (Demo).`,
      rating: "Bewertung",
      jobsDone: "Erledigte Aufträge",
      responseTime: "Reaktionszeit",
      serviceArea: "Einsatzgebiet",
    },
  });

  return (
    <section className="container-x py-12 sm:py-16">
      {!isSupabaseConfigured ? (
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-line bg-paper-soft px-4 py-3 text-sm text-ink-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <p className="pretty">{T.demo}</p>
        </div>
      ) : null}

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>{T.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            {T.hello}, {pilot.name.split(" ")[0]}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-ink-muted">{pilot.company}</span>
            {pilot.verified ? <VerifiedBadge /> : null}
            <TierBadge tier={pilot.tier} />
          </div>
        </div>
        <Link href={localized(locale, `/piloten/${pilot.slug}`)} className="btn btn-md btn-outline">
          {T.viewPublic}
        </Link>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* Profile completeness */}
        <div className="card card-pad lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{T.completeness}</h2>
            <span className="font-mono text-2xl font-bold text-brand-700">{completeness}%</span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-paper-soft">
            <div
              className="h-full rounded-full bg-brand-600 transition-all"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {PROFILE_CHECKS.map((c) => (
              <li key={c.label} className="flex items-center gap-2.5 text-sm">
                <span
                  className={cn(
                    "grid h-5 w-5 shrink-0 place-items-center rounded-full",
                    c.done ? "bg-brand-50 text-brand-700" : "border border-dashed border-line text-ink-faint",
                  )}
                >
                  {c.done ? <Check className="h-3.5 w-3.5" strokeWidth={2.4} /> : null}
                </span>
                <span className={cn(c.done ? "text-ink-soft" : "text-ink-muted")}>{c.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink-muted">
            {T.completeHint}{" "}
            <Link href={localized(locale, "/piloot")} className="link-underline">
              {T.addPortfolio}
            </Link>
          </p>
        </div>

        {/* Lead credit */}
        <div className="card card-pad flex flex-col">
          <div className="flex items-center gap-2 text-ink-muted">
            <Wallet className="h-4 w-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider">{T.leadCredit}</h2>
          </div>
          <div className="mt-4 font-display text-4xl font-bold text-ink">
            {formatCurrency(leadCredit, locale)}
          </div>
          <p className="mt-1 text-sm text-ink-muted">{T.available}</p>
          {membership ? (
            <p className="mt-4 rounded-lg bg-paper-soft px-3 py-2 text-xs text-ink-muted">
              {T.membershipCredit(membership.name, formatCurrency(25, locale))}
            </p>
          ) : null}
          <Link href={localized(locale, "/piloot")} className="btn btn-sm btn-outline mt-auto">
            {T.topUp}
          </Link>
        </div>
      </div>

      {/* Verification + membership row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Verification status */}
        <div className="card card-pad">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-600" />
            <h2 className="text-lg font-bold">{T.verifTitle}</h2>
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            {pilot.verified ? T.verifiedNote : T.pendingNote}
          </p>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <dt className="text-ink-muted">{jur.operatorId.label}</dt>
              <dd className="font-mono text-ink">{pilot.operatorId}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <dt className="text-ink-muted">{T.certificates}</dt>
              <dd className="flex flex-wrap justify-end gap-1.5">
                {pilot.certs.map((c) => (
                  <span key={c} className="pill">
                    {capabilityLabel(pilot.country, c)}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <dt className="text-ink-muted">{T.liability}</dt>
              <dd className="flex items-center gap-1.5 font-medium text-brand-700">
                <Check className="h-4 w-4" strokeWidth={2.4} />
                {pilot.insured ? T.insuredActive(insuranceAmount) : T.insuredMissing}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-muted">{T.status}</dt>
              <dd>
                {pilot.verified ? (
                  <VerifiedBadge />
                ) : (
                  <span className="pill">{T.pending}</span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* Membership */}
        {membership ? (
          <div className="card card-pad flex flex-col">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-brand-600" />
              <h2 className="text-lg font-bold">{T.membershipTitle}</h2>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold">{membership.name}</span>
              <span className="font-mono text-sm text-ink-muted">
                {membership.price} {membership.priceSub}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-ink-muted">
              <span className="pill">{membership.commission}</span>
              <span className="pill">{T.leadsAt} {membership.leadModifier}</span>
            </div>
            <h3 className="mt-5 text-sm font-bold uppercase tracking-wider text-ink-muted">
              {T.included}
            </h3>
            <ul className="mt-3 flex-1 space-y-2 text-sm">
              {membership.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                  <span className="text-ink-soft">{perk}</span>
                </li>
              ))}
            </ul>
            <Link
              href={localized(locale, "/voor-piloten#lidmaatschap")}
              className="btn btn-sm btn-outline mt-5"
            >
              {T.upgrade}
            </Link>
          </div>
        ) : null}
      </div>

      {/* Incoming leads */}
      <div className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand-600" />
            <h2 className="text-lg font-bold">{T.incoming}</h2>
          </div>
          <p className="text-sm text-ink-muted">{T.incomingHint}</p>
        </div>

        {/* Table (desktop) */}
        <div className="mt-4 hidden overflow-hidden rounded-2xl border border-line bg-white shadow-card md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-paper-soft">
              <tr className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                <th className="px-5 py-3 font-medium">{T.colApplication}</th>
                <th className="px-5 py-3 font-medium">{T.colCity}</th>
                <th className="px-5 py-3 font-medium">{T.colBudget}</th>
                <th className="px-5 py-3 font-medium">{T.colLeadPrice}</th>
                <th className="px-5 py-3 text-right font-medium">{T.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {SAMPLE_LEADS.map((lead) => {
                const seg = getSegment(lead.segmentSlug);
                const city = getCity(lead.citySlug);
                const unlocked = lead.status === "unlocked";
                return (
                  <tr key={lead.ref} className="transition-colors hover:bg-paper-soft">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-ink">
                        {seg ? segmentText(seg.slug, locale).name : lead.segmentSlug}
                      </div>
                      <div className="font-mono text-xs text-ink-faint">{lead.ref}</div>
                    </td>
                    <td className="px-5 py-4 text-ink-soft">{city?.name ?? lead.citySlug}</td>
                    <td className="px-5 py-4 text-ink-soft">{budgetLabel(lead.budget)}</td>
                    <td className="px-5 py-4 font-mono font-semibold text-ink">
                      {formatCurrency(lead.leadPrice, locale)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {unlocked ? (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider",
                            LEAD_STATUS_STYLE[lead.status],
                          )}
                        >
                          <Unlock className="h-3.5 w-3.5" />
                          {T.unlocked}
                        </span>
                      ) : (
                        <Link
                          href={localized(locale, "/berichten")}
                          title={T.unlockTitle(formatCurrency(lead.leadPrice, locale))}
                          className="btn btn-sm btn-primary"
                        >
                          <Lock className="h-3.5 w-3.5" />
                          {T.unlockLead}
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Cards (mobile) */}
        <div className="mt-4 space-y-3 md:hidden">
          {SAMPLE_LEADS.map((lead) => {
            const seg = getSegment(lead.segmentSlug);
            const city = getCity(lead.citySlug);
            const unlocked = lead.status === "unlocked";
            return (
              <div key={lead.ref} className="card card-pad">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold">
                      {seg ? segmentText(seg.slug, locale).name : lead.segmentSlug}
                    </div>
                    <div className="mt-1 text-sm text-ink-muted">
                      {city?.name ?? lead.citySlug} · {budgetLabel(lead.budget)}
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-ink">
                    {formatCurrency(lead.leadPrice, locale)}
                  </span>
                </div>
                <div className="mt-4">
                  {unlocked ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider",
                        LEAD_STATUS_STYLE[lead.status],
                      )}
                    >
                      <Unlock className="h-3.5 w-3.5" />
                      {T.unlocked}
                    </span>
                  ) : (
                    <button
                      type="button"
                      title={T.unlockTitle(formatCurrency(lead.leadPrice, locale))}
                      className="btn btn-sm btn-primary w-full"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      {T.unlockLead}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reputation strip */}
      <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-paper-soft p-6 sm:grid-cols-4">
        <div>
          <Stars rating={pilot.rating} count={pilot.reviewCount} />
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">{T.rating}</div>
        </div>
        <div>
          <div className="font-display text-2xl font-bold">{pilot.jobsDone}</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">{T.jobsDone}</div>
        </div>
        <div>
          <div className="font-display text-2xl font-bold">{pilot.responseTime}</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">{T.responseTime}</div>
        </div>
        <div>
          <div className="font-display text-2xl font-bold">{pilot.serviceRadiusKm} km</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">{T.serviceArea}</div>
        </div>
      </div>
    </section>
  );
}
