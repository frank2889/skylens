"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localized } from "@/lib/i18n/messages";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/types";

/** Current locale derived from the URL (first path segment). Works on static export. */
export function useLocale(): Locale {
  const pathname = usePathname() || "/";
  const seg = pathname.split("/")[1];
  return isLocale(seg) ? seg : DEFAULT_LOCALE;
}

/** <Link> that automatically prefixes the active locale. `href` is locale-less, e.g. "/pakketten". */
export function LocaleLink({
  href,
  children,
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href">) {
  const locale = useLocale();
  return (
    <Link href={localized(locale, href)} className={className} {...rest}>
      {children}
    </Link>
  );
}
