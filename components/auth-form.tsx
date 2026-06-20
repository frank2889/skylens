"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2, Info, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/locale-link";
import { localized, pick } from "@/lib/i18n/messages";

type Mode = "login" | "signup";
type Role = "klant" | "piloot";
type Status = "idle" | "loading" | "sent" | "demo" | "error";

export function AuthForm({ mode }: { mode: Mode }) {
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("piloot");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === "signup";

  const T = pick(locale, {
    nl: {
      checkMail: "Check je mail",
      sentLink: "We hebben een inloglink gestuurd naar",
      openLink: ". Open de link op dit apparaat om verder te gaan.",
      useOtherEmail: "Ander e-mailadres gebruiken",
      signupAs: "Ik meld me aan als",
      client: "Opdrachtgever",
      pilot: "Piloot",
      email: "E-mailadres",
      emailPlaceholder: "naam@bedrijf.nl",
      demo:
        "Inloggen wordt actief zodra Supabase is gekoppeld. Voeg je Supabase-keys toe om magic-link login en live data in te schakelen.",
      somethingWrong: "Er ging iets mis: ",
      busy: "Bezig…",
      createAccount: "Account aanmaken",
      sendLink: "Inloglink versturen",
      haveAccount: "Heb je al een account?",
      login: "Inloggen",
      noAccount: "Nog geen account?",
      signupFree: "Gratis aanmelden",
    },
    en: {
      checkMail: "Check your inbox",
      sentLink: "We've sent a sign-in link to",
      openLink: ". Open the link on this device to continue.",
      useOtherEmail: "Use a different email address",
      signupAs: "I'm signing up as",
      client: "Client",
      pilot: "Pilot",
      email: "Email address",
      emailPlaceholder: "name@company.co.uk",
      demo:
        "Sign-in goes live once Supabase is connected. Add your Supabase keys to enable magic-link login and live data.",
      somethingWrong: "Something went wrong: ",
      busy: "Working…",
      createAccount: "Create account",
      sendLink: "Send sign-in link",
      haveAccount: "Already have an account?",
      login: "Log in",
      noAccount: "No account yet?",
      signupFree: "Sign up free",
    },
    de: {
      checkMail: "Sieh in deinem Postfach nach",
      sentLink: "Wir haben einen Anmeldelink gesendet an",
      openLink: ". Öffne den Link auf diesem Gerät, um fortzufahren.",
      useOtherEmail: "Andere E-Mail-Adresse verwenden",
      signupAs: "Ich melde mich an als",
      client: "Auftraggeber",
      pilot: "Pilot",
      email: "E-Mail-Adresse",
      emailPlaceholder: "name@firma.de",
      demo:
        "Die Anmeldung wird aktiv, sobald Supabase verbunden ist. Füge deine Supabase-Keys hinzu, um Magic-Link-Login und Live-Daten zu aktivieren.",
      somethingWrong: "Etwas ist schiefgelaufen: ",
      busy: "Wird bearbeitet…",
      createAccount: "Konto erstellen",
      sendLink: "Anmeldelink senden",
      haveAccount: "Hast du schon ein Konto?",
      login: "Anmelden",
      noAccount: "Noch kein Konto?",
      signupFree: "Kostenlos registrieren",
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const supabase = createClient();

    // Demo mode: no Supabase keys configured.
    if (!supabase) {
      setStatus("demo");
      return;
    }

    setStatus("loading");
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: isSignup ? { data: { role } } : undefined,
    });

    if (otpError) {
      setError(otpError.message);
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700">
          <CheckCircle2 className="h-6 w-6" strokeWidth={1.7} />
        </span>
        <h2 className="mt-5 text-xl font-bold">{T.checkMail}</h2>
        <p className="mt-2 text-ink-muted pretty">
          {T.sentLink}{" "}
          <span className="font-semibold text-ink">{email}</span>{T.openLink}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm link-underline"
        >
          {T.useOtherEmail}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isSignup ? (
        <div>
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-ink-muted">
            {T.signupAs}
          </span>
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-line bg-paper-soft p-1">
            {(["klant", "piloot"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                aria-pressed={role === r}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
                  role === r
                    ? "bg-white text-ink shadow-card"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {r === "klant" ? T.client : T.pilot}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-mono text-xs uppercase tracking-wider text-ink-muted"
        >
          {T.email}
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={T.emailPlaceholder}
            className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-4 text-ink placeholder:text-ink-faint focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      {status === "demo" ? (
        <div className="flex gap-3 rounded-xl border border-line bg-paper-soft p-4 text-sm text-ink-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <p className="pretty">{T.demo}</p>
        </div>
      ) : null}

      {status === "error" && error ? (
        <p className="rounded-xl border border-line bg-paper-soft p-4 text-sm text-ink-soft">
          {T.somethingWrong}{error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-lg btn-primary w-full disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {T.busy}
          </>
        ) : (
          <>
            {isSignup ? T.createAccount : T.sendLink}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-ink-muted">
        {isSignup ? (
          <>
            {T.haveAccount}{" "}
            <Link href={localized(locale, "/login")} className="link-underline">
              {T.login}
            </Link>
          </>
        ) : (
          <>
            {T.noAccount}{" "}
            <Link href={localized(locale, "/signup")} className="link-underline">
              {T.signupFree}
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
