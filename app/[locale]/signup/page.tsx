import type { Metadata } from "next";
import { Check } from "lucide-react";
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
      title: "Aanmelden",
      description:
        "Meld je gratis aan als dronepiloot op Skylens. Betaal alleen voor leads die je accepteert, bouw je profiel en ontvang betaalde klussen in jouw regio.",
    },
    en: {
      title: "Sign up",
      description:
        "Sign up free as a drone pilot on Skylens. Pay only for the leads you accept, build your profile and win paid jobs in your area.",
    },
    de: {
      title: "Registrieren",
      description:
        "Registriere dich kostenlos als Drohnenpilot bei Skylens. Zahle nur für Leads, die du annimmst, baue dein Profil auf und erhalte bezahlte Aufträge in deiner Region.",
    },
  });
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/signup`,
        "en-GB": `${SITE.url}/en/signup`,
        de: `${SITE.url}/de/signup`,
      },
    },
  };
}

export default async function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const T = pick(locale, {
    nl: {
      eyebrow: "Voor piloten",
      title: "Meld je gratis aan als piloot",
      lede:
        "Krijg betaalde drone-klussen bij jou in de buurt. Bouw je profiel, verzamel reviews en kies zelf welke leads je oppakt.",
      heading: "Maak je account aan",
      formLede: "We sturen je een veilige inloglink — geen wachtwoord nodig.",
      perks: [
        "Gratis aanmelden, geen abonnement verplicht",
        "Betaal alleen voor leads die je accepteert",
        "Geverifieerd profiel = tot 3,5× meer leads",
        "Wij lichten je beste werk uit in de showcase",
      ],
    },
    en: {
      eyebrow: "For pilots",
      title: "Sign up free as a pilot",
      lede:
        "Win paid drone jobs near you. Build your profile, gather reviews and choose which leads you take on.",
      heading: "Create your account",
      formLede: "We'll send you a secure sign-in link — no password needed.",
      perks: [
        "Free to join, no subscription required",
        "Pay only for the leads you accept",
        "Verified profile = up to 3.5× more leads",
        "We feature your best work in the showcase",
      ],
    },
    de: {
      eyebrow: "Für Piloten",
      title: "Registriere dich kostenlos als Pilot",
      lede:
        "Erhalte bezahlte Drohnenaufträge in deiner Nähe. Baue dein Profil auf, sammle Bewertungen und wähle selbst, welche Leads du annimmst.",
      heading: "Erstelle dein Konto",
      formLede: "Wir senden dir einen sicheren Anmeldelink — kein Passwort nötig.",
      perks: [
        "Kostenlos registrieren, kein Abo erforderlich",
        "Zahle nur für Leads, die du annimmst",
        "Geprüftes Profil = bis zu 3,5× mehr Leads",
        "Wir präsentieren deine besten Arbeiten im Showcase",
      ],
    },
  });

  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-x relative grid min-h-[78vh] items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        {/* Sales side */}
        <div className="order-2 lg:order-1">
          <span className="eyebrow">{T.eyebrow}</span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.06] sm:text-5xl">
            {T.title}
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted pretty">
            {T.lede}
          </p>
          <ul className="mt-8 space-y-3">
            {T.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-ink-soft">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form side */}
        <div className="order-1 lg:order-2">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-7 flex justify-center lg:hidden">
              <Logo />
            </div>
            <div className="card card-pad">
              <div className="text-center">
                <h2 className="text-2xl font-bold">{T.heading}</h2>
                <p className="mt-2 text-ink-muted pretty">{T.formLede}</p>
              </div>
              <div className="mt-7">
                <AuthForm mode="signup" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
