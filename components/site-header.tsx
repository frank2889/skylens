"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowRight, Globe, Check } from "lucide-react";
import { Logo } from "./logo";
import { useLocale } from "./locale-link";
import { chrome, localized } from "@/lib/i18n/messages";
import { LOCALES, LOCALE_CONFIG } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

function navItems(locale: string) {
  const t = chrome(locale).nav;
  return [
    { label: t.howItWorks, href: "/hoe-het-werkt" },
    { label: t.segments, href: "/toepassingen" },
    { label: t.packages, href: "/pakketten" },
    { label: t.rules, href: "/regels" },
    { label: t.showcase, href: "/showcase" },
    { label: t.pilots, href: "/piloten" },
  ];
}

function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function switchTo(next: string) {
    const rest = "/" + pathname.split("/").slice(2).join("/");
    router.push(localized(next, rest === "/" ? "/" : rest));
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn btn-sm btn-ghost"
        aria-label={chrome(locale).language}
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
      </button>
      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-line bg-white shadow-lift">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-paper-tint"
            >
              {LOCALE_CONFIG[l].label}
              {l === locale ? <Check className="h-4 w-4 text-brand-600" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = navItems(locale);
  const t = chrome(locale).actions;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-200",
        scrolled ? "border-b border-line bg-white/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Hoofdmenu">
          {items.map((item) => (
            <Link
              key={item.href}
              href={localized(locale, item.href)}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 lg:flex">
          <LanguageSwitcher locale={locale} />
          <Link href={localized(locale, "/login")} className="btn btn-sm btn-ghost">
            {t.login}
          </Link>
          <Link href={localized(locale, "/aanvraag")} className="btn btn-sm btn-primary">
            {t.postRequest}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-paper-tint"
            aria-label={open ? "Sluit menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <nav className="container-x flex flex-col py-4" aria-label="Mobiel menu">
            {items.map((item) => (
              <Link
                key={item.href}
                href={localized(locale, item.href)}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-lg font-medium text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <Link href={localized(locale, "/aanvraag")} onClick={() => setOpen(false)} className="btn btn-lg btn-primary">
                {t.postRequest}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={localized(locale, "/login")} onClick={() => setOpen(false)} className="btn btn-lg btn-outline">
                {t.login}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
