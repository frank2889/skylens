"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  CalendarDays,
  Euro,
  FileText,
  User,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
} from "lucide-react";
import { SEGMENTS, citiesByCountry } from "@/lib/catalog";
import { availablePilots } from "@/lib/matching";
import { getSegment, getCity } from "@/lib/catalog";
import { cn, formatCurrency } from "@/lib/utils";
import { useLocale } from "@/components/locale-link";
import { localized, pick } from "@/lib/i18n/messages";
import { getLocaleConfig } from "@/lib/i18n/config";
import { segmentText } from "@/lib/i18n/catalog-i18n";
import type { RequestInput } from "@/lib/types";

const inputClass =
  "w-full rounded-xl border border-line bg-paper-soft py-3 text-sm font-medium text-ink transition-colors focus:border-brand-400 focus:bg-white placeholder:text-ink-faint";

/** Numeric budget thresholds (in the locale's currency units); labels built per-locale. */
const BUDGET_THRESHOLDS = [250, 500, 1000, 2500, 5000];

export function RequestForm({
  initialSegment,
  initialCity,
}: {
  initialSegment?: string;
  initialCity?: string;
}) {
  const router = useRouter();
  const locale = useLocale();
  const sp = useSearchParams();
  const segParam = initialSegment ?? sp.get("segment") ?? undefined;
  const cityParam = initialCity ?? sp.get("stad") ?? undefined;

  const country = getLocaleConfig(locale).country;
  const cities = citiesByCountry(country);

  const T = pick(locale, {
    nl: {
      steps: ["Je klus", "Contact", "Overzicht"],
      progress: "Voortgang",
      needLabel: "Wat heb je nodig?",
      whereLabel: "Waar?",
      whenLabel: "Wanneer? (optioneel)",
      budgetLabel: "Budget (optioneel)",
      budgetPlaceholder: "Kies een indicatie",
      budgetUnknown: "Weet ik nog niet",
      detailsLabel: "Details (optioneel)",
      detailsPlaceholder:
        "Vertel kort over de klus: locatie, doel, wat je opgeleverd wilt hebben…",
      availA: "geverifieerde piloten beschikbaar voor",
      availIn: "in",
      nameLabel: "Naam",
      namePlaceholder: "Voor- en achternaam",
      emailLabel: "E-mail",
      emailPlaceholder: "jij@voorbeeld.nl",
      phoneLabel: "Telefoon (optioneel)",
      phonePlaceholder: "06 12 34 56 78",
      companyLabel: "Bedrijf (optioneel)",
      companyPlaceholder: "Bedrijfsnaam",
      consent: "Skylens mag deze beelden gebruiken voor promotie (optioneel)",
      privacy:
        "Je gegevens worden alleen gebruikt om je te koppelen aan passende piloten. Gratis en vrijblijvend.",
      reviewTitle: "Controleer je aanvraag",
      sumApplication: "Toepassing",
      sumCity: "Stad",
      sumDate: "Datum",
      sumBudget: "Budget",
      sumDetails: "Details",
      sumName: "Naam",
      sumEmail: "E-mail",
      sumPhone: "Telefoon",
      sumCompany: "Bedrijf",
      sumPromo: "Promotie",
      dateFlexible: "Flexibel / nader te bepalen",
      notGiven: "Niet opgegeven",
      promoAllowed: "Toegestaan",
      promoDenied: "Niet toegestaan",
      matchA: "We matchen je direct met",
      matchB: "geverifieerde piloten in",
      sendError:
        "Er ging iets mis bij het versturen. We sturen je alvast door naar je matches…",
      back: "Terug",
      stepOf: (a: number, b: number) => `Stap ${a} van ${b}`,
      nextBtn: "Volgende",
      submitBtn: "Verstuur aanvraag",
      submitting: "Versturen…",
      errSegment: "Kies een toepassing.",
      errCity: "Kies een stad.",
      errName: "Vul je naam in.",
      errEmail: "Vul je e-mailadres in.",
      errEmailInvalid: "Vul een geldig e-mailadres in.",
    },
    en: {
      steps: ["Your job", "Contact", "Review"],
      progress: "Progress",
      needLabel: "What do you need?",
      whereLabel: "Where?",
      whenLabel: "When? (optional)",
      budgetLabel: "Budget (optional)",
      budgetPlaceholder: "Choose a guide",
      budgetUnknown: "Not sure yet",
      detailsLabel: "Details (optional)",
      detailsPlaceholder:
        "Tell us briefly about the job: location, goal, what you want delivered…",
      availA: "verified pilots available for",
      availIn: "in",
      nameLabel: "Name",
      namePlaceholder: "First and last name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.co.uk",
      phoneLabel: "Phone (optional)",
      phonePlaceholder: "07700 900123",
      companyLabel: "Company (optional)",
      companyPlaceholder: "Company name",
      consent: "Skylens may use this imagery for promotion (optional)",
      privacy:
        "Your details are only used to match you with suitable pilots. Free and no obligation.",
      reviewTitle: "Check your request",
      sumApplication: "Service",
      sumCity: "City",
      sumDate: "Date",
      sumBudget: "Budget",
      sumDetails: "Details",
      sumName: "Name",
      sumEmail: "Email",
      sumPhone: "Phone",
      sumCompany: "Company",
      sumPromo: "Promotion",
      dateFlexible: "Flexible / to be confirmed",
      notGiven: "Not specified",
      promoAllowed: "Allowed",
      promoDenied: "Not allowed",
      matchA: "We'll match you straight away with",
      matchB: "verified pilots in",
      sendError:
        "Something went wrong while sending. We're taking you to your matches anyway…",
      back: "Back",
      stepOf: (a: number, b: number) => `Step ${a} of ${b}`,
      nextBtn: "Next",
      submitBtn: "Send request",
      submitting: "Sending…",
      errSegment: "Choose a service.",
      errCity: "Choose a city.",
      errName: "Enter your name.",
      errEmail: "Enter your email address.",
      errEmailInvalid: "Enter a valid email address.",
    },
    de: {
      steps: ["Ihr Auftrag", "Kontakt", "Übersicht"],
      progress: "Fortschritt",
      needLabel: "Was brauchen Sie?",
      whereLabel: "Wo?",
      whenLabel: "Wann? (optional)",
      budgetLabel: "Budget (optional)",
      budgetPlaceholder: "Richtwert wählen",
      budgetUnknown: "Weiß ich noch nicht",
      detailsLabel: "Details (optional)",
      detailsPlaceholder:
        "Beschreiben Sie kurz den Auftrag: Standort, Ziel, gewünschtes Ergebnis…",
      availA: "geprüfte Piloten verfügbar für",
      availIn: "in",
      nameLabel: "Name",
      namePlaceholder: "Vor- und Nachname",
      emailLabel: "E-Mail",
      emailPlaceholder: "sie@beispiel.de",
      phoneLabel: "Telefon (optional)",
      phonePlaceholder: "0151 23456789",
      companyLabel: "Firma (optional)",
      companyPlaceholder: "Firmenname",
      consent: "Skylens darf diese Aufnahmen zu Werbezwecken nutzen (optional)",
      privacy:
        "Ihre Daten werden ausschließlich verwendet, um Sie mit passenden Piloten zu verbinden. Kostenlos und unverbindlich.",
      reviewTitle: "Prüfen Sie Ihre Anfrage",
      sumApplication: "Anwendung",
      sumCity: "Stadt",
      sumDate: "Datum",
      sumBudget: "Budget",
      sumDetails: "Details",
      sumName: "Name",
      sumEmail: "E-Mail",
      sumPhone: "Telefon",
      sumCompany: "Firma",
      sumPromo: "Werbung",
      dateFlexible: "Flexibel / noch festzulegen",
      notGiven: "Keine Angabe",
      promoAllowed: "Erlaubt",
      promoDenied: "Nicht erlaubt",
      matchA: "Wir verbinden Sie sofort mit",
      matchB: "geprüften Piloten in",
      sendError:
        "Beim Senden ist etwas schiefgegangen. Wir leiten Sie schon einmal zu Ihren Matches weiter…",
      back: "Zurück",
      stepOf: (a: number, b: number) => `Schritt ${a} von ${b}`,
      nextBtn: "Weiter",
      submitBtn: "Anfrage senden",
      submitting: "Senden…",
      errSegment: "Wählen Sie eine Anwendung.",
      errCity: "Wählen Sie eine Stadt.",
      errName: "Geben Sie Ihren Namen ein.",
      errEmail: "Geben Sie Ihre E-Mail-Adresse ein.",
      errEmailInvalid: "Geben Sie eine gültige E-Mail-Adresse ein.",
    },
  });

  const STEPS = T.steps;

  // Locale-aware budget bands, built from numeric thresholds + the locale currency.
  const budgetBands: string[] = [
    `< ${formatCurrency(BUDGET_THRESHOLDS[0], locale)}`,
    ...BUDGET_THRESHOLDS.slice(0, -1).map(
      (lo, i) =>
        `${formatCurrency(lo, locale)} – ${formatCurrency(BUDGET_THRESHOLDS[i + 1], locale)}`,
    ),
    `${formatCurrency(BUDGET_THRESHOLDS[BUDGET_THRESHOLDS.length - 1], locale)}+`,
    T.budgetUnknown,
  ];

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [softError, setSoftError] = useState(false);

  const defaultCity = cities[0]?.slug ?? "amsterdam";

  const [segment, setSegment] = useState(
    segParam && getSegment(segParam) ? segParam : SEGMENTS[0]?.slug ?? "vastgoed",
  );
  const [city, setCity] = useState(
    cityParam && getCity(cityParam) ? cityParam : defaultCity,
  );
  const [date, setDate] = useState("");
  const [budgetBand, setBudgetBand] = useState("");
  const [details, setDetails] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const count = availablePilots(segment, city, country);
  const segmentName = segmentText(segment, locale).name;
  const cityName = getCity(city)?.name ?? "";

  function validateStep1() {
    const e: Record<string, string> = {};
    if (!segment) e.segment = T.errSegment;
    if (!city) e.city = T.errCity;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = T.errName;
    if (!email.trim()) e.email = T.errEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = T.errEmailInvalid;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step === 0 && !validateStep1()) return;
    if (step === 1 && !validateStep2()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setSoftError(false);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) {
      setStep(!validateStep1() ? 0 : 1);
      return;
    }
    setSubmitting(true);
    setSoftError(false);

    const payload: RequestInput = {
      segment,
      citySlug: city,
      date: date || undefined,
      budgetBand: budgetBand || undefined,
      details: details.trim() || undefined,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      company: company.trim() || undefined,
      marketingConsent,
    };

    const dest = localized(
      locale,
      `/aanvraag/bedankt?segment=${encodeURIComponent(
        segment,
      )}&stad=${encodeURIComponent(city)}`,
    );

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push(dest);
    } catch {
      // Demo-resilience: laat de gebruiker niet stranden — navigeer alsnog door.
      setSoftError(true);
      setTimeout(() => router.push(dest), 900);
    }
  }

  return (
    <div className="card card-pad shadow-lift">
      {/* Stepper */}
      <ol className="flex items-center gap-2" aria-label={T.progress}>
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-sm font-semibold transition-colors",
                  active && "bg-brand-600 text-white",
                  done && "bg-brand-100 text-brand-700",
                  !active && !done && "bg-paper-tint text-ink-faint",
                )}
                aria-current={active ? "step" : undefined}
              >
                {done ? <Check className="h-4 w-4" strokeWidth={2.5} /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-sm font-medium sm:block",
                  active ? "text-ink" : "text-ink-muted",
                )}
              >
                {label}
              </span>
              {i < STEPS.length - 1 ? (
                <span
                  className={cn(
                    "ml-1 h-px flex-1 transition-colors",
                    done ? "bg-brand-300" : "bg-line",
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      <form onSubmit={submit} className="mt-8">
        {/* ── Step 1: klus ── */}
        {step === 0 ? (
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={T.needLabel} htmlFor="segment" error={errors.segment}>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <select
                    id="segment"
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    className={cn(inputClass, "appearance-none pl-9 pr-8")}
                  >
                    {SEGMENTS.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {segmentText(s.slug, locale).name}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>

              <Field label={T.whereLabel} htmlFor="city" error={errors.city}>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={cn(inputClass, "appearance-none pl-9 pr-8")}
                  >
                    {cities.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={T.whenLabel} htmlFor="date">
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={cn(inputClass, "pl-9 pr-3")}
                  />
                </div>
              </Field>

              <Field label={T.budgetLabel} htmlFor="budget">
                <div className="relative">
                  <Euro className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <select
                    id="budget"
                    value={budgetBand}
                    onChange={(e) => setBudgetBand(e.target.value)}
                    className={cn(inputClass, "appearance-none pl-9 pr-8")}
                  >
                    <option value="">{T.budgetPlaceholder}</option>
                    {budgetBands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
            </div>

            <Field label={T.detailsLabel} htmlFor="details">
              <div className="relative">
                <FileText className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-ink-faint" />
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={4}
                  placeholder={T.detailsPlaceholder}
                  className={cn(inputClass, "resize-y pl-9 pr-3 leading-relaxed")}
                />
              </div>
            </Field>

            <p className="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" />
              <span>
                <strong className="font-semibold">{count}</strong> {T.availA}{" "}
                {segmentName.toLowerCase()} {T.availIn} {cityName}.
              </span>
            </p>
          </div>
        ) : null}

        {/* ── Step 2: contact ── */}
        {step === 1 ? (
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={T.nameLabel} htmlFor="name" error={errors.name}>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={T.namePlaceholder}
                    className={cn(inputClass, "pl-9 pr-3")}
                  />
                </div>
              </Field>

              <Field label={T.emailLabel} htmlFor="email" error={errors.email}>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={T.emailPlaceholder}
                    className={cn(inputClass, "pl-9 pr-3")}
                  />
                </div>
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={T.phoneLabel} htmlFor="phone">
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={T.phonePlaceholder}
                    className={cn(inputClass, "pl-9 pr-3")}
                  />
                </div>
              </Field>

              <Field label={T.companyLabel} htmlFor="company">
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={T.companyPlaceholder}
                    className={cn(inputClass, "pl-9 pr-3")}
                  />
                </div>
              </Field>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-paper-soft px-4 py-3.5 text-sm text-ink-soft transition-colors hover:border-brand-300">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand-600 focus:ring-brand-400"
              />
              <span>{T.consent}</span>
            </label>

            <p className="flex items-start gap-2 text-sm text-ink-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              {T.privacy}
            </p>
          </div>
        ) : null}

        {/* ── Step 3: overzicht ── */}
        {step === 2 ? (
          <div className="grid gap-5">
            <h2 className="font-display text-xl font-bold">{T.reviewTitle}</h2>
            <dl className="overflow-hidden rounded-xl border border-line">
              <SummaryRow label={T.sumApplication} value={segmentName} />
              <SummaryRow label={T.sumCity} value={cityName} />
              <SummaryRow label={T.sumDate} value={date || T.dateFlexible} />
              <SummaryRow label={T.sumBudget} value={budgetBand || T.notGiven} />
              {details.trim() ? <SummaryRow label={T.sumDetails} value={details.trim()} /> : null}
              <SummaryRow label={T.sumName} value={name.trim()} />
              <SummaryRow label={T.sumEmail} value={email.trim()} />
              {phone.trim() ? <SummaryRow label={T.sumPhone} value={phone.trim()} /> : null}
              {company.trim() ? <SummaryRow label={T.sumCompany} value={company.trim()} /> : null}
              <SummaryRow
                label={T.sumPromo}
                value={marketingConsent ? T.promoAllowed : T.promoDenied}
                last
              />
            </dl>

            <p className="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" />
              <span>
                {T.matchA} <strong className="font-semibold">{count}</strong>{" "}
                {T.matchB} {cityName}.
              </span>
            </p>

            {softError ? (
              <p className="flex items-center gap-2 rounded-xl bg-signal/10 px-4 py-3 text-sm text-ink-soft">
                <AlertCircle className="h-4 w-4 shrink-0 text-signal" />
                {T.sendError}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* ── Navigatie ── */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
          {step > 0 ? (
            <button type="button" onClick={back} className="btn btn-md btn-ghost">
              <ArrowLeft className="h-4 w-4" />
              {T.back}
            </button>
          ) : (
            <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
              {T.stepOf(step + 1, STEPS.length)}
            </span>
          )}

          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} className="btn btn-md btn-primary">
              {T.nextBtn}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-md btn-primary disabled:opacity-60"
            >
              {submitting ? T.submitting : T.submitBtn}
              {!submitting ? <ArrowRight className="h-4 w-4" /> : null}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 flex items-center gap-1 text-xs font-medium text-signal">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </span>
      ) : null}
    </label>
  );
}

function SummaryRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[7rem_1fr] gap-3 px-4 py-3 text-sm sm:grid-cols-[9rem_1fr]",
        !last && "border-b border-line",
      )}
    >
      <dt className="font-mono text-xs uppercase tracking-wider text-ink-muted">{label}</dt>
      <dd className="text-ink-soft pretty">{value}</dd>
    </div>
  );
}
