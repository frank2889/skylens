import Link from "next/link";
import { ArrowRight, Compass, LayoutGrid, FileText } from "lucide-react";
import { Logo } from "@/components/logo";

const LINKS = [
  {
    icon: Compass,
    title: "Naar de homepage",
    text: "Begin opnieuw en ontdek hoe Skylens werkt.",
    href: "/",
  },
  {
    icon: LayoutGrid,
    title: "Bekijk toepassingen",
    text: "Van vastgoed tot inspectie en landmeten.",
    href: "/toepassingen",
  },
  {
    icon: FileText,
    title: "Plaats een aanvraag",
    text: "Vertel ons wat je nodig hebt — gratis en vrijblijvend.",
    href: "/aanvraag",
  },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center sm:py-28">
        <Logo />

        <p className="eyebrow mt-10 justify-center">Foutcode 404</p>
        <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
          Pagina niet gevonden
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted pretty">
          Deze pagina bestaat niet (meer) of is verplaatst. Geen zorgen — je vindt hieronder
          snel je weg terug.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn-lg btn-primary">
            Terug naar home
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/aanvraag" className="btn btn-lg btn-outline">
            Plaats een aanvraag
          </Link>
        </div>

        <div className="mt-14 grid w-full max-w-3xl gap-4 text-left sm:grid-cols-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="card card-pad group transition-shadow hover:shadow-lift"
            >
              <l.icon className="h-6 w-6 text-brand-600" strokeWidth={1.7} />
              <h2 className="mt-4 font-bold">{l.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{l.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                Bekijken
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
