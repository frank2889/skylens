import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HtmlLangSync } from "@/components/html-lang-sync";
import { LOCALES, getLocaleConfig, isLocale } from "@/lib/i18n/config";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cfg = getLocaleConfig(locale);
  return {
    openGraph: { locale: cfg.ogLocale, siteName: SITE.name },
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [getLocaleConfig(l).htmlLang, `${SITE.url}/${l}`]),
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const cfg = getLocaleConfig(locale);

  return (
    <>
      <HtmlLangSync lang={cfg.htmlLang} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} />
    </>
  );
}
