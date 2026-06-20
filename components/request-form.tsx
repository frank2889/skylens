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
import { SEGMENTS, CITIES, BUDGET_BANDS } from "@/lib/catalog";
import { availablePilots } from "@/lib/matching";
import { getSegment, getCity } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { RequestInput } from "@/lib/types";

const STEPS = ["Je klus", "Contact", "Overzicht"] as const;

const inputClass =
  "w-full rounded-xl border border-line bg-paper-soft py-3 text-sm font-medium text-ink transition-colors focus:border-brand-400 focus:bg-white placeholder:text-ink-faint";

export function RequestForm({
  initialSegment,
  initialCity,
}: {
  initialSegment?: string;
  initialCity?: string;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const segParam = initialSegment ?? sp.get("segment") ?? undefined;
  const cityParam = initialCity ?? sp.get("stad") ?? undefined;

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [softError, setSoftError] = useState(false);

  const [segment, setSegment] = useState(
    segParam && getSegment(segParam) ? segParam : "vastgoed",
  );
  const [city, setCity] = useState(
    cityParam && getCity(cityParam) ? cityParam : "amsterdam",
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

  const count = availablePilots(segment, city);
  const segmentName = getSegment(segment)?.name ?? "";
  const cityName = getCity(city)?.name ?? "";

  function validateStep1() {
    const e: Record<string, string> = {};
    if (!segment) e.segment = "Kies een toepassing.";
    if (!city) e.city = "Kies een stad.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Vul je naam in.";
    if (!email.trim()) e.email = "Vul je e-mailadres in.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Vul een geldig e-mailadres in.";
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

    const dest = `/aanvraag/bedankt?segment=${encodeURIComponent(
      segment,
    )}&stad=${encodeURIComponent(city)}`;

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Aanvraag mislukt");
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
      <ol className="flex items-center gap-2" aria-label="Voortgang">
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
              <Field label="Wat heb je nodig?" htmlFor="segment" error={errors.segment}>
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
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>

              <Field label="Waar?" htmlFor="city" error={errors.city}>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={cn(inputClass, "appearance-none pl-9 pr-8")}
                  >
                    {CITIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Wanneer? (optioneel)" htmlFor="date">
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

              <Field label="Budget (optioneel)" htmlFor="budget">
                <div className="relative">
                  <Euro className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <select
                    id="budget"
                    value={budgetBand}
                    onChange={(e) => setBudgetBand(e.target.value)}
                    className={cn(inputClass, "appearance-none pl-9 pr-8")}
                  >
                    <option value="">Kies een indicatie</option>
                    {BUDGET_BANDS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
            </div>

            <Field label="Details (optioneel)" htmlFor="details">
              <div className="relative">
                <FileText className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-ink-faint" />
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={4}
                  placeholder="Vertel kort over de klus: locatie, doel, wat je opgeleverd wilt hebben…"
                  className={cn(inputClass, "resize-y pl-9 pr-3 leading-relaxed")}
                />
              </div>
            </Field>

            <p className="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" />
              <span>
                <strong className="font-semibold">{count}</strong> geverifieerde piloten
                beschikbaar voor {segmentName.toLowerCase()} in {cityName}.
              </span>
            </p>
          </div>
        ) : null}

        {/* ── Step 2: contact ── */}
        {step === 1 ? (
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Naam" htmlFor="name" error={errors.name}>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Voor- en achternaam"
                    className={cn(inputClass, "pl-9 pr-3")}
                  />
                </div>
              </Field>

              <Field label="E-mail" htmlFor="email" error={errors.email}>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jij@voorbeeld.nl"
                    className={cn(inputClass, "pl-9 pr-3")}
                  />
                </div>
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Telefoon (optioneel)" htmlFor="phone">
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className={cn(inputClass, "pl-9 pr-3")}
                  />
                </div>
              </Field>

              <Field label="Bedrijf (optioneel)" htmlFor="company">
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Bedrijfsnaam"
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
              <span>
                Skylens mag deze beelden gebruiken voor promotie (optioneel)
              </span>
            </label>

            <p className="flex items-start gap-2 text-sm text-ink-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              Je gegevens worden alleen gebruikt om je te koppelen aan passende piloten.
              Gratis en vrijblijvend.
            </p>
          </div>
        ) : null}

        {/* ── Step 3: overzicht ── */}
        {step === 2 ? (
          <div className="grid gap-5">
            <h2 className="font-display text-xl font-bold">Controleer je aanvraag</h2>
            <dl className="overflow-hidden rounded-xl border border-line">
              <SummaryRow label="Toepassing" value={segmentName} />
              <SummaryRow label="Stad" value={cityName} />
              <SummaryRow label="Datum" value={date || "Flexibel / nader te bepalen"} />
              <SummaryRow label="Budget" value={budgetBand || "Niet opgegeven"} />
              {details.trim() ? <SummaryRow label="Details" value={details.trim()} /> : null}
              <SummaryRow label="Naam" value={name.trim()} />
              <SummaryRow label="E-mail" value={email.trim()} />
              {phone.trim() ? <SummaryRow label="Telefoon" value={phone.trim()} /> : null}
              {company.trim() ? <SummaryRow label="Bedrijf" value={company.trim()} /> : null}
              <SummaryRow
                label="Promotie"
                value={marketingConsent ? "Toegestaan" : "Niet toegestaan"}
                last
              />
            </dl>

            <p className="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" />
              <span>
                We matchen je direct met <strong className="font-semibold">{count}</strong>{" "}
                geverifieerde piloten in {cityName}.
              </span>
            </p>

            {softError ? (
              <p className="flex items-center gap-2 rounded-xl bg-signal/10 px-4 py-3 text-sm text-ink-soft">
                <AlertCircle className="h-4 w-4 shrink-0 text-signal" />
                Er ging iets mis bij het versturen. We sturen je alvast door naar je matches…
              </p>
            ) : null}
          </div>
        ) : null}

        {/* ── Navigatie ── */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
          {step > 0 ? (
            <button type="button" onClick={back} className="btn btn-md btn-ghost">
              <ArrowLeft className="h-4 w-4" />
              Terug
            </button>
          ) : (
            <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
              Stap {step + 1} van {STEPS.length}
            </span>
          )}

          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} className="btn btn-md btn-primary">
              Volgende
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-md btn-primary disabled:opacity-60"
            >
              {submitting ? "Versturen…" : "Verstuur aanvraag"}
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
