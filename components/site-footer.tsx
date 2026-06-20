import Link from "next/link";
import { Logo } from "./logo";
import { SITE, FOOTER_NAV } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-soft">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{SITE.tagline}</p>
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-ink-faint">
              {SITE.coords} · Nederland
            </p>
          </div>
          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors hover:text-brand-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>
            © {SITE.name} · Geverifieerde, verzekerde, EASA-gecertificeerde dronepiloten
          </p>
          <p className="font-mono uppercase tracking-wider">
            Demo-build · prijzen indicatief, ex BTW
          </p>
        </div>
      </div>
    </footer>
  );
}
