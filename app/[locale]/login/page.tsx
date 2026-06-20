import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";
import { AuthForm } from "@/components/auth-form";
import { pick } from "@/lib/i18n/messages";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = pick(locale, {
    nl: {
      title: "Inloggen",
      description:
        "Log in op je Skylens-account met een veilige inloglink. Voor opdrachtgevers en geverifieerde dronepiloten.",
    },
    en: {
      title: "Log in",
      description:
        "Sign in to your Skylens account with a secure sign-in link. For clients and verified drone pilots.",
    },
    de: {
      title: "Anmelden",
      description:
        "Melde dich mit einem sicheren Anmeldelink bei deinem Skylens-Konto an. Für Auftraggeber und geprüfte Drohnenpiloten.",
    },
  });
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/login`,
        "en-GB": `${SITE.url}/en/login`,
        de: `${SITE.url}/de/login`,
      },
    },
  };
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const T = pick(locale, {
    nl: {
      welcome: "Welkom terug",
      lede:
        "Voer je e-mailadres in en we sturen je een veilige inloglink — geen wachtwoord nodig.",
      secure: "Veilige magic-link login",
    },
    en: {
      welcome: "Welcome back",
      lede:
        "Enter your email address and we'll send you a secure sign-in link — no password needed.",
      secure: "Secure magic-link sign-in",
    },
    de: {
      welcome: "Willkommen zurück",
      lede:
        "Gib deine E-Mail-Adresse ein und wir senden dir einen sicheren Anmeldelink — kein Passwort nötig.",
      secure: "Sicherer Magic-Link-Login",
    },
  });

  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-x relative flex min-h-[78vh] items-center justify-center py-16 sm:py-24">
        <div className="w-full max-w-md">
          <div className="mb-7 flex justify-center">
            <Logo />
          </div>

          <div className="card card-pad">
            <div className="text-center">
              <h1 className="text-2xl font-bold">{T.welcome}</h1>
              <p className="mt-2 text-ink-muted pretty">{T.lede}</p>
            </div>

            <div className="mt-7">
              <AuthForm mode="login" />
            </div>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-center font-mono text-xs uppercase tracking-wider text-ink-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
            {T.secure}
          </p>
        </div>
      </div>
    </section>
  );
}
